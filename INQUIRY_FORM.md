# Inquiry Form — Backend Setup (cPanel)

The website's "Query" / inquiry popup posts to a lightweight PHP backend.
No external services (Firebase, Formspree, EmailJS, etc.) are used.

## Files

```
public_html/
├── api/
│   └── submit.php          ← inquiry handler (edit credentials at top)
└── uploads/
    └── inquiries/          ← attachments are saved here (auto-created)
```

When you build the site (`npm run build`), Vite copies `public/api/submit.php`
and `public/uploads/inquiries/` into `dist/` exactly as-is. Upload the
contents of `dist/` to your `public_html/` via cPanel File Manager.

## Configure SMTP

Open `public_html/api/submit.php` in cPanel File Manager → Edit, and update
the `$CONFIG` block at the top:

| Placeholder            | Replace with                                            |
| ---------------------- | ------------------------------------------------------- |
| `YOUR_SMTP_HOST`       | e.g. `mail.yourdomain.com` or `smtp.gmail.com`          |
| `YOUR_SMTP_PORT`       | `465` (SSL) or `587` (TLS)                              |
| `YOUR_EMAIL_ADDRESS`   | The mailbox that sends the email (SMTP_USER + MAIL_FROM)|
| `YOUR_EMAIL_PASSWORD`  | Mailbox password or app password                        |
| `YOUR_RECEIVER_EMAIL`  | Where inquiries are delivered (e.g. `abir0729@gmail.com`)|

Also update `SMTP_SECURE` to `"ssl"` or `"tls"` to match the port.

**Fallback:** If you leave the SMTP placeholders unchanged, the script falls
back to PHP's built-in `mail()` function — which works on most cPanel hosts
out of the box but has poorer deliverability than SMTP.

## Frontend endpoint

By default the frontend POSTs to `/api/submit.php` (same origin as the site).
If you host the API on a different domain, set in `.env`:

```
VITE_INQUIRY_ENDPOINT=https://yourdomain.com/api/submit.php
```

## Security & validation

- Honeypot field blocks bots.
- Server validates name/email/subject/message lengths and email format.
- File uploads limited to 5 MB and types: JPG, PNG, PDF, DOC, DOCX.
- MIME type is checked with `finfo`; filenames are sanitized.
- Credentials live only in `submit.php` (never in frontend code).
