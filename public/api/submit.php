<?php
/**
 * ThreadKnit — Inquiry Form Backend (cPanel-ready, lightweight, no Composer needed)
 *
 * ============================================================================
 *  HOW TO CONFIGURE (edit values in the CONFIG block below from
 *  cPanel → File Manager → public_html/api/submit.php → Edit)
 * ============================================================================
 *
 *  1. Create a professional email account in cPanel → Email Accounts
 *     (e.g. inquiry@yourdomain.com).
 *  2. Replace the placeholder values in $CONFIG with the real ones.
 *  3. Set MAIL_TO to the Gmail (or any) inbox where inquiries should arrive.
 *  4. Save the file. No server restart needed.
 *
 *  Behaviour:
 *   - Emails are sent FROM the custom-domain mailbox (MAIL_FROM)
 *   - Delivered TO a Gmail (or any) inbox (MAIL_TO)
 *   - Reply-To is set to the visitor's submitted email
 *   - Attachments are embedded in the email and then unlinked from disk
 *   - If SMTP fails or is left unconfigured, falls back to PHP mail()
 *
 *  File locations:
 *   - This script:    public_html/api/submit.php
 *   - Temp uploads:   public_html/uploads/inquiries/      (auto-created)
 *   - Folder lockdown: public_html/uploads/inquiries/.htaccess (auto-written)
 * ============================================================================
 */

// ====================== CONFIG — EDIT THESE VALUES ========================
$CONFIG = [
    // --- SMTP (recommended for reliable delivery to Gmail) ---
    'SMTP_HOST'      => 'mail.yourdomain.com',         // e.g. mail.threadknit.com
    'SMTP_PORT'      => 465,                           // 465 (SSL) or 587 (TLS)
    'SMTP_SECURE'    => 'ssl',                         // 'ssl' or 'tls'
    'SMTP_USER'      => 'inquiry@yourdomain.com',      // full mailbox username
    'SMTP_PASS'      => 'YOUR_CPANEL_EMAIL_PASSWORD',  // mailbox password

    // --- From / To addresses ---
    'MAIL_FROM'      => 'inquiry@yourdomain.com',      // must match SMTP_USER for most hosts
    'MAIL_FROM_NAME' => 'ThreadKnit',                  // friendly From name
    'MAIL_TO'        => 'yourgmail@gmail.com',         // where inquiries are delivered

    // --- CORS: restrict to your real production domain(s) ---
    // Add every origin that will POST to this endpoint (no trailing slash).
    'ALLOWED_ORIGINS' => [
        'https://yourdomain.com',
        'https://www.yourdomain.com',
    ],
];
// ===========================================================================

// ---------------------- CORS (restricted) ----------------------
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $CONFIG['ALLOWED_ORIGINS'], true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
}
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// ---------------------- Helpers ----------------------
function clean($v, $max = 500) {
    $v = is_string($v) ? trim($v) : '';
    $v = preg_replace('/[\r\n]+/', ' ', $v);
    return mb_substr(strip_tags($v), 0, $max);
}
function fail($msg, $code = 400, $cleanupPath = null) {
    if ($cleanupPath && is_file($cleanupPath)) @unlink($cleanupPath);
    http_response_code($code);
    echo json_encode(['success' => false, 'message' => $msg]);
    exit;
}

// ---------------------- Honeypot ----------------------
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

// ---------------------- Validate fields ----------------------
$name    = clean($_POST['name']    ?? '', 100);
$company = clean($_POST['company'] ?? '', 120);
$email   = clean($_POST['email']   ?? '', 150);
$phone   = clean($_POST['phone']   ?? '', 30);
$subject = clean($_POST['subject'] ?? '', 150);
$message = clean($_POST['message'] ?? '', 2000);

if ($name === '')                                                fail('Name is required.');
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) fail('Valid email is required.');
if ($subject === '')                                             fail('Subject is required.');
if ($message === '')                                             fail('Message is required.');

// ---------------------- Ensure upload folder + .htaccess lockdown ----------------------
$uploadDir = __DIR__ . '/../uploads/inquiries';
if (!is_dir($uploadDir)) @mkdir($uploadDir, 0755, true);

$htaccessPath = $uploadDir . '/.htaccess';
if (!file_exists($htaccessPath)) {
    $htaccess = <<<HTA
# Auto-generated — protects temporary inquiry uploads
Options -Indexes
<FilesMatch "\.(php|phtml|phps|pl|py|jsp|asp|sh|cgi)$">
    Require all denied
</FilesMatch>
<IfModule mod_php.c>
    php_flag engine off
</IfModule>
HTA;
    @file_put_contents($htaccessPath, $htaccess);
}

// ---------------------- File upload (optional, temporary) ----------------------
$attachmentPath = null;   // absolute path on disk (will be unlinked after send)
$attachmentName = null;   // original filename shown in the email

if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] !== UPLOAD_ERR_NO_FILE) {
    $f = $_FILES['attachment'];
    if ($f['error'] !== UPLOAD_ERR_OK)   fail('File upload failed.');
    if ($f['size'] <= 0)                 fail('Empty file.');
    if ($f['size'] > 5 * 1024 * 1024)    fail('File exceeds 5MB limit.');
    if (!is_uploaded_file($f['tmp_name'])) fail('Invalid upload.');

    $allowedMimes = [
        'image/jpeg', 'image/png',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    $allowedExt = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'];

    $finfo = function_exists('finfo_open') ? finfo_open(FILEINFO_MIME_TYPE) : null;
    $mime  = $finfo ? finfo_file($finfo, $f['tmp_name']) : ($f['type'] ?? '');
    if ($finfo) finfo_close($finfo);

    $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
    if (!in_array($mime, $allowedMimes, true) || !in_array($ext, $allowedExt, true)) {
        fail('Unsupported file type.');
    }

    $safeBase = preg_replace('/[^A-Za-z0-9_.-]/', '_', pathinfo($f['name'], PATHINFO_FILENAME));
    $safeBase = substr($safeBase, 0, 60);
    $filename = date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '_' . $safeBase . '.' . $ext;
    $dest = $uploadDir . '/' . $filename;

    if (!move_uploaded_file($f['tmp_name'], $dest)) fail('Could not save attachment.');
    @chmod($dest, 0644);
    $attachmentPath = $dest;
    $attachmentName = $f['name'];
}

// ---------------------- Build email content ----------------------
$subjectLine = "[Inquiry] {$subject} — {$name}";

$bodyHtml  = "<h2 style='font-family:Arial,sans-serif'>New Website Inquiry</h2>";
$bodyHtml .= "<table cellpadding='6' style='font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse'>";
foreach ([
    'Name' => $name, 'Company' => $company, 'Email' => $email,
    'Phone' => $phone, 'Subject' => $subject,
] as $k => $v) {
    if ($v !== '') {
        $bodyHtml .= "<tr><td style='color:#666'><b>$k</b></td><td>"
                  . htmlspecialchars($v, ENT_QUOTES, 'UTF-8') . "</td></tr>";
    }
}
$bodyHtml .= "</table>";
$bodyHtml .= "<h3 style='font-family:Arial,sans-serif;margin-top:18px'>Message</h3>";
$bodyHtml .= "<div style='font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap'>"
          . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . "</div>";
if ($attachmentName) {
    $bodyHtml .= "<p style='font-family:Arial,sans-serif;font-size:13px;color:#666;margin-top:18px'>Attachment: "
              . htmlspecialchars($attachmentName, ENT_QUOTES, 'UTF-8') . "</p>";
}

$bodyText  = "New Website Inquiry\n\n";
$bodyText .= "Name: $name\nCompany: $company\nEmail: $email\nPhone: $phone\nSubject: $subject\n\nMessage:\n$message\n";
if ($attachmentName) $bodyText .= "\nAttachment: $attachmentName\n";

// ---------------------- Send: SMTP first, fall back to mail() ----------------------
$smtpConfigured = $CONFIG['SMTP_HOST'] !== ''
               && stripos($CONFIG['SMTP_HOST'], 'yourdomain.com') === false
               && $CONFIG['SMTP_PASS'] !== 'YOUR_CPANEL_EMAIL_PASSWORD'
               && $CONFIG['SMTP_USER'] !== 'inquiry@yourdomain.com';

$sent      = false;
$sendError = '';

if ($smtpConfigured) {
    try {
        $sent = sendViaSmtp($CONFIG, $subjectLine, $bodyHtml, $bodyText, $email, $name, $attachmentPath, $attachmentName);
    } catch (Throwable $e) {
        $sendError = $e->getMessage();
        $sent = false;
    }
}

if (!$sent) {
    // Fallback: PHP mail() — attachments included if present
    $to       = $CONFIG['MAIL_TO'];
    $boundary = '=_mix_' . bin2hex(random_bytes(8));
    $altBoundary = '=_alt_' . bin2hex(random_bytes(8));

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "From: " . encodeHeader($CONFIG['MAIL_FROM_NAME']) . " <" . $CONFIG['MAIL_FROM'] . ">\r\n";
    $headers .= "Reply-To: " . encodeHeader($name) . " <$email>\r\n";
    $headers .= "Date: " . date('r') . "\r\n";

    if ($attachmentPath && is_file($attachmentPath)) {
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
        $body  = "--$boundary\r\n";
        $body .= "Content-Type: multipart/alternative; boundary=\"$altBoundary\"\r\n\r\n";
        $body .= "--$altBoundary\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n$bodyText\r\n\r\n";
        $body .= "--$altBoundary\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n$bodyHtml\r\n\r\n";
        $body .= "--$altBoundary--\r\n\r\n";
        $data = chunk_split(base64_encode(file_get_contents($attachmentPath)));
        $safeName = preg_replace('/[\r\n"]+/', '', $attachmentName ?: basename($attachmentPath));
        $body .= "--$boundary\r\nContent-Type: application/octet-stream; name=\"$safeName\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"$safeName\"\r\n\r\n$data\r\n";
        $body .= "--$boundary--\r\n";
    } else {
        $headers .= "Content-Type: multipart/alternative; boundary=\"$altBoundary\"\r\n";
        $body  = "--$altBoundary\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n$bodyText\r\n\r\n";
        $body .= "--$altBoundary\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n$bodyHtml\r\n\r\n";
        $body .= "--$altBoundary--\r\n";
    }

    $sent = @mail($to, encodeHeader($subjectLine), $body, $headers, '-f' . $CONFIG['MAIL_FROM']);
    if (!$sent) $sendError = $sendError ?: 'mail() failed';
}

// ---------------------- Always remove temp attachment ----------------------
if ($attachmentPath && is_file($attachmentPath)) @unlink($attachmentPath);

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Could not send your message. ' . ($sendError ? "($sendError)" : ''),
    ]);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Inquiry received']);
exit;

// ============================================================================
//  Minimal SMTP sender — no external libraries required
// ============================================================================
function sendViaSmtp($cfg, $subject, $html, $text, $replyEmail, $replyName, $attachPath = null, $attachName = null) {
    $host     = $cfg['SMTP_HOST'];
    $port     = (int)$cfg['SMTP_PORT'];
    $secure   = strtolower($cfg['SMTP_SECURE']);
    $user     = $cfg['SMTP_USER'];
    $pass     = $cfg['SMTP_PASS'];
    $from     = $cfg['MAIL_FROM'];
    $fromName = $cfg['MAIL_FROM_NAME'];
    $to       = $cfg['MAIL_TO'];

    $remote = ($secure === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
    $errno = 0; $errstr = '';
    $sock = @stream_socket_client($remote, $errno, $errstr, 20, STREAM_CLIENT_CONNECT);
    if (!$sock) throw new Exception("SMTP connect failed: $errstr");
    stream_set_timeout($sock, 20);

    $read = function() use ($sock) {
        $data = '';
        while (($line = fgets($sock, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $data;
    };
    $expect = function($resp, $codes) {
        $code = substr(ltrim($resp), 0, 3);
        if (!in_array($code, (array)$codes, true)) {
            throw new Exception("SMTP unexpected response: " . trim($resp));
        }
    };
    $send = function($cmd) use ($sock, $read) {
        fwrite($sock, $cmd . "\r\n");
        return $read();
    };

    $expect($read(), ['220']);
    $expect($send("EHLO " . ($_SERVER['HTTP_HOST'] ?? 'localhost')), ['250']);

    if ($secure === 'tls') {
        $expect($send("STARTTLS"), ['220']);
        if (!stream_socket_enable_crypto($sock, true,
            STREAM_CRYPTO_METHOD_TLS_CLIENT
            | STREAM_CRYPTO_METHOD_TLSv1_1_CLIENT
            | STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT)) {
            throw new Exception("STARTTLS failed");
        }
        $expect($send("EHLO " . ($_SERVER['HTTP_HOST'] ?? 'localhost')), ['250']);
    }

    $expect($send("AUTH LOGIN"), ['334']);
    $expect($send(base64_encode($user)), ['334']);
    $expect($send(base64_encode($pass)), ['235']);

    $expect($send("MAIL FROM:<$from>"), ['250']);
    $expect($send("RCPT TO:<$to>"), ['250', '251']);
    $expect($send("DATA"), ['354']);

    $boundary    = '=_mix_' . bin2hex(random_bytes(8));
    $altBoundary = '=_alt_' . bin2hex(random_bytes(8));

    $headers  = "From: " . encodeHeader($fromName) . " <$from>\r\n";
    $headers .= "To: <$to>\r\n";
    $headers .= "Reply-To: " . encodeHeader($replyName) . " <$replyEmail>\r\n";
    $headers .= "Subject: " . encodeHeader($subject) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Date: " . date('r') . "\r\n";

    if ($attachPath && is_file($attachPath)) {
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
        $msg  = "--$boundary\r\n";
        $msg .= "Content-Type: multipart/alternative; boundary=\"$altBoundary\"\r\n\r\n";
        $msg .= "--$altBoundary\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n$text\r\n\r\n";
        $msg .= "--$altBoundary\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n$html\r\n\r\n";
        $msg .= "--$altBoundary--\r\n\r\n";
        $data = chunk_split(base64_encode(file_get_contents($attachPath)));
        $safeName = preg_replace('/[\r\n"]+/', '', $attachName ?: basename($attachPath));
        $msg .= "--$boundary\r\nContent-Type: application/octet-stream; name=\"$safeName\"\r\n";
        $msg .= "Content-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"$safeName\"\r\n\r\n$data\r\n";
        $msg .= "--$boundary--\r\n";
    } else {
        $headers .= "Content-Type: multipart/alternative; boundary=\"$altBoundary\"\r\n";
        $msg  = "--$altBoundary\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n$text\r\n\r\n";
        $msg .= "--$altBoundary\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n$html\r\n\r\n";
        $msg .= "--$altBoundary--\r\n";
    }

    // RFC 5321 dot-stuffing
    $payload = preg_replace('/^\./m', '..', $headers . "\r\n" . $msg);
    fwrite($sock, $payload . "\r\n.\r\n");
    $expect($read(), ['250']);

    @fwrite($sock, "QUIT\r\n");
    fclose($sock);
    return true;
}

function encodeHeader($s) {
    return '=?UTF-8?B?' . base64_encode($s) . '?=';
}
