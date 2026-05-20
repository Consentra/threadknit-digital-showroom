<?php
/**
 * ThreadKnit — Inquiry Form Backend (cPanel-ready, lightweight, no Composer needed)
 *
 * HOW TO CONFIGURE (edit the CONFIG block below from cPanel → File Manager):
 *   - SMTP_HOST       : your SMTP server (e.g. mail.yourdomain.com or smtp.gmail.com)
 *   - SMTP_PORT       : 465 (SSL) or 587 (TLS)
 *   - SMTP_SECURE     : "ssl" or "tls"
 *   - SMTP_USER       : full mailbox username (usually the sending email)
 *   - SMTP_PASS       : mailbox password / app password
 *   - MAIL_FROM       : From address shown to recipients (must usually match SMTP_USER)
 *   - MAIL_FROM_NAME  : Friendly From name
 *   - MAIL_TO         : Where inquiries are delivered
 *
 * If SMTP credentials are left as placeholders, the script falls back to PHP's
 * built-in mail() function (works on most cPanel hosts out of the box).
 *
 * Place this file at:  public_html/api/submit.php
 * Uploads are saved to: public_html/uploads/inquiries/ (auto-created)
 */

// ============== CONFIG — EDIT THESE VALUES ==============
$CONFIG = [
    'SMTP_HOST'      => 'YOUR_SMTP_HOST',         // e.g. mail.yourdomain.com
    'SMTP_PORT'      => 'YOUR_SMTP_PORT',         // 465 or 587
    'SMTP_SECURE'    => 'ssl',                    // 'ssl' or 'tls'
    'SMTP_USER'      => 'YOUR_EMAIL_ADDRESS',     // e.g. inquiries@yourdomain.com
    'SMTP_PASS'      => 'YOUR_EMAIL_PASSWORD',    // mailbox password
    'MAIL_FROM'      => 'YOUR_EMAIL_ADDRESS',     // must usually match SMTP_USER
    'MAIL_FROM_NAME' => 'ThreadKnit Website',
    'MAIL_TO'        => 'YOUR_RECEIVER_EMAIL',    // where inquiries go (e.g. abir0729@gmail.com)
];
// =========================================================

// CORS / JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// ---------- Helpers ----------
function clean($v, $max = 500) {
    $v = is_string($v) ? trim($v) : '';
    $v = preg_replace('/[\r\n]+/', ' ', $v);
    return mb_substr(strip_tags($v), 0, $max);
}
function fail($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(['success' => false, 'message' => $msg]);
    exit;
}

// ---------- Honeypot ----------
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

// ---------- Validate ----------
$name    = clean($_POST['name']    ?? '', 100);
$company = clean($_POST['company'] ?? '', 120);
$email   = clean($_POST['email']   ?? '', 150);
$phone   = clean($_POST['phone']   ?? '', 30);
$subject = clean($_POST['subject'] ?? '', 150);
$message = clean($_POST['message'] ?? '', 2000);

if ($name === '')                                 fail('Name is required.');
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) fail('Valid email is required.');
if ($subject === '')                              fail('Subject is required.');
if ($message === '')                              fail('Message is required.');

// ---------- File upload (optional) ----------
$attachmentPath = null;
$attachmentName = null;
if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] !== UPLOAD_ERR_NO_FILE) {
    $f = $_FILES['attachment'];
    if ($f['error'] !== UPLOAD_ERR_OK)           fail('File upload failed.');
    if ($f['size'] > 5 * 1024 * 1024)            fail('File exceeds 5MB limit.');

    $allowedMimes = ['image/jpeg', 'image/png', 'application/pdf',
                     'application/msword',
                     'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    $allowedExt   = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'];

    $finfo = function_exists('finfo_open') ? finfo_open(FILEINFO_MIME_TYPE) : null;
    $mime  = $finfo ? finfo_file($finfo, $f['tmp_name']) : ($f['type'] ?? '');
    if ($finfo) finfo_close($finfo);

    $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
    if (!in_array($mime, $allowedMimes, true) || !in_array($ext, $allowedExt, true)) {
        fail('Unsupported file type.');
    }

    $dir = __DIR__ . '/../uploads/inquiries';
    if (!is_dir($dir)) @mkdir($dir, 0755, true);

    $safe = preg_replace('/[^A-Za-z0-9_.-]/', '_', pathinfo($f['name'], PATHINFO_FILENAME));
    $filename = date('Ymd_His') . '_' . substr(bin2hex(random_bytes(4)), 0, 8) . '_' . $safe . '.' . $ext;
    $dest = $dir . '/' . $filename;

    if (!move_uploaded_file($f['tmp_name'], $dest)) fail('Could not save attachment.');
    $attachmentPath = $dest;
    $attachmentName = $f['name'];
}

// ---------- Build email ----------
$siteName = $CONFIG['MAIL_FROM_NAME'];
$subjectLine = "[Inquiry] {$subject} — {$name}";

$bodyHtml  = "<h2 style='font-family:Arial,sans-serif'>New Website Inquiry</h2>";
$bodyHtml .= "<table cellpadding='6' style='font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse'>";
foreach ([
    'Name' => $name, 'Company' => $company, 'Email' => $email,
    'Phone' => $phone, 'Subject' => $subject
] as $k => $v) {
    if ($v !== '') $bodyHtml .= "<tr><td style='color:#666'><b>$k</b></td><td>" . htmlspecialchars($v) . "</td></tr>";
}
$bodyHtml .= "</table>";
$bodyHtml .= "<h3 style='font-family:Arial,sans-serif;margin-top:18px'>Message</h3>";
$bodyHtml .= "<div style='font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap'>" . htmlspecialchars($message) . "</div>";
if ($attachmentName) {
    $bodyHtml .= "<p style='font-family:Arial,sans-serif;font-size:13px;color:#666;margin-top:18px'>Attachment: " . htmlspecialchars($attachmentName) . "</p>";
}

$bodyText  = "New Website Inquiry\n\n";
$bodyText .= "Name: $name\nCompany: $company\nEmail: $email\nPhone: $phone\nSubject: $subject\n\nMessage:\n$message\n";
if ($attachmentName) $bodyText .= "\nAttachment: $attachmentName\n";

// ---------- Send: try SMTP, fall back to mail() ----------
$smtpConfigured = $CONFIG['SMTP_HOST'] !== 'YOUR_SMTP_HOST'
               && $CONFIG['SMTP_USER'] !== 'YOUR_EMAIL_ADDRESS'
               && $CONFIG['SMTP_PASS'] !== 'YOUR_EMAIL_PASSWORD';

$sent = false;
$sendError = '';

if ($smtpConfigured) {
    try { $sent = sendViaSmtp($CONFIG, $subjectLine, $bodyHtml, $bodyText, $email, $name, $attachmentPath, $attachmentName); }
    catch (Throwable $e) { $sendError = $e->getMessage(); $sent = false; }
}

if (!$sent) {
    // Fallback: PHP mail()
    $to = $smtpConfigured ? $CONFIG['MAIL_TO'] : ($CONFIG['MAIL_TO'] ?: $CONFIG['MAIL_FROM']);
    $boundary = '=_b_' . bin2hex(random_bytes(8));
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "From: " . $CONFIG['MAIL_FROM_NAME'] . " <" . $CONFIG['MAIL_FROM'] . ">\r\n";
    $headers .= "Reply-To: $name <$email>\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n";
    $body  = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n$bodyText\r\n";
    $body .= "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n$bodyHtml\r\n";
    $body .= "--$boundary--";
    $sent = @mail($to, $subjectLine, $body, $headers);
    if (!$sent) $sendError = $sendError ?: 'mail() failed';
}

if (!$sent) fail('Could not send your message. ' . ($sendError ? "($sendError)" : ''), 500);

echo json_encode(['success' => true, 'message' => 'Inquiry received']);
exit;

// ============================================================
//  Minimal SMTP sender (no external libraries required)
// ============================================================
function sendViaSmtp($cfg, $subject, $html, $text, $replyEmail, $replyName, $attachPath = null, $attachName = null) {
    $host   = $cfg['SMTP_HOST'];
    $port   = (int)$cfg['SMTP_PORT'];
    $secure = strtolower($cfg['SMTP_SECURE']);
    $user   = $cfg['SMTP_USER'];
    $pass   = $cfg['SMTP_PASS'];
    $from   = $cfg['MAIL_FROM'];
    $fromName = $cfg['MAIL_FROM_NAME'];
    $to     = $cfg['MAIL_TO'];

    $remote = ($secure === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
    $errno = 0; $errstr = '';
    $sock = @stream_socket_client($remote, $errno, $errstr, 15, STREAM_CLIENT_CONNECT);
    if (!$sock) throw new Exception("SMTP connect failed: $errstr");
    stream_set_timeout($sock, 15);

    $read = function() use ($sock) {
        $data = '';
        while (($line = fgets($sock, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $data;
    };
    $send = function($cmd) use ($sock, $read) {
        fwrite($sock, $cmd . "\r\n");
        return $read();
    };

    $read(); // greeting
    $send("EHLO " . ($_SERVER['HTTP_HOST'] ?? 'localhost'));

    if ($secure === 'tls') {
        $send("STARTTLS");
        if (!stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT
            | STREAM_CRYPTO_METHOD_TLSv1_1_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT)) {
            throw new Exception("STARTTLS failed");
        }
        $send("EHLO " . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
    }

    $send("AUTH LOGIN");
    $r1 = $send(base64_encode($user));
    if (strpos($r1, '334') !== 0 && strpos($r1, '235') !== 0) throw new Exception("SMTP user rejected: $r1");
    $r2 = $send(base64_encode($pass));
    if (strpos($r2, '235') !== 0) throw new Exception("SMTP auth failed: $r2");

    $send("MAIL FROM:<$from>");
    $send("RCPT TO:<$to>");
    $send("DATA");

    $boundary = '=_mix_' . bin2hex(random_bytes(8));
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

    // Dot-stuffing
    $payload = preg_replace('/^\./m', '..', $headers . "\r\n" . $msg);
    fwrite($sock, $payload . "\r\n.\r\n");
    $resp = $read();
    if (strpos($resp, '250') !== 0) throw new Exception("SMTP send failed: $resp");

    $send("QUIT");
    fclose($sock);
    return true;
}
function encodeHeader($s) { return '=?UTF-8?B?' . base64_encode($s) . '?='; }
