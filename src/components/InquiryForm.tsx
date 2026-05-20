import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Paperclip, X } from "lucide-react";

// Endpoint can be overridden via VITE_INQUIRY_ENDPOINT (e.g. https://yourdomain.com/api/submit.php)
const ENDPOINT =
  (import.meta as any).env?.VITE_INQUIRY_ENDPOINT || "/api/submit.php";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

type Status = "idle" | "loading" | "success" | "error";

interface Props {
  onClose?: () => void;
}

const InquiryForm = ({ onClose }: Props) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const f = e.target.files?.[0];
    if (!f) {
      setFile(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(f.type)) {
      setFileError(t("inquiry.errors.fileType"));
      e.target.value = "";
      setFile(null);
      return;
    }
    if (f.size > MAX_SIZE) {
      setFileError(t("inquiry.errors.fileSize"));
      e.target.value = "";
      setFile(null);
      return;
    }
    setFile(f);
  };

  const clearFile = () => {
    setFile(null);
    setFileError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("loading");
    try {
      const fd = new FormData(e.currentTarget);
      // Honeypot anti-spam
      if (fd.get("website")) {
        setStatus("success");
        return;
      }
      const res = await fetch(ENDPOINT, { method: "POST", body: fd });
      let data: any = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON response */
      }
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || `HTTP ${res.status}`);
      }
      setStatus("success");
      formRef.current?.reset();
      setFile(null);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || t("inquiry.errors.generic"));
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center py-10 px-6"
      >
        <CheckCircle2 className="w-14 h-14 text-accent mb-4" />
        <h3 className="font-serif text-xl font-bold mb-2">
          {t("inquiry.success.title")}
        </h3>
        <p className="font-sans text-sm text-muted-foreground max-w-sm mb-6">
          {t("inquiry.success.desc")}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setStatus("idle")}
            className="px-5 py-2 border border-accent/40 text-accent rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {t("inquiry.success.another")}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-5 py-2 bg-accent text-accent-foreground rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors"
            >
              {t("inquiry.success.close")}
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  const inputCls =
    "w-full h-10 px-3 rounded-sm border border-border bg-background text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors";
  const labelCls =
    "block text-[11px] font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-1.5";

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="iq-name" className={labelCls}>
            {t("inquiry.labels.name")} *
          </label>
          <input
            id="iq-name"
            name="name"
            type="text"
            required
            maxLength={100}
            placeholder={t("inquiry.placeholders.name")}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="iq-company" className={labelCls}>
            {t("inquiry.labels.company")}
          </label>
          <input
            id="iq-company"
            name="company"
            type="text"
            maxLength={120}
            placeholder={t("inquiry.placeholders.company")}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="iq-email" className={labelCls}>
            {t("inquiry.labels.email")} *
          </label>
          <input
            id="iq-email"
            name="email"
            type="email"
            required
            maxLength={150}
            placeholder={t("inquiry.placeholders.email")}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="iq-phone" className={labelCls}>
            {t("inquiry.labels.phone")}
          </label>
          <input
            id="iq-phone"
            name="phone"
            type="tel"
            maxLength={30}
            placeholder={t("inquiry.placeholders.phone")}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="iq-subject" className={labelCls}>
          {t("inquiry.labels.subject")} *
        </label>
        <input
          id="iq-subject"
          name="subject"
          type="text"
          required
          maxLength={150}
          placeholder={t("inquiry.placeholders.subject")}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="iq-message" className={labelCls}>
          {t("inquiry.labels.message")} *
        </label>
        <textarea
          id="iq-message"
          name="message"
          required
          rows={4}
          maxLength={2000}
          placeholder={t("inquiry.placeholders.message")}
          className="w-full px-3 py-2 rounded-sm border border-border bg-background text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors resize-y"
        />
      </div>

      <div>
        <label className={labelCls}>{t("inquiry.labels.attachment")}</label>
        <div className="flex items-center gap-3 flex-wrap">
          <label
            htmlFor="iq-file"
            className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-sm text-xs font-sans font-medium text-muted-foreground hover:border-accent hover:text-accent cursor-pointer transition-colors"
          >
            <Paperclip className="w-4 h-4" />
            {t("inquiry.labels.chooseFile")}
          </label>
          <input
            ref={fileRef}
            id="iq-file"
            name="attachment"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            onChange={handleFile}
            className="hidden"
          />
          {file && (
            <span className="inline-flex items-center gap-2 text-xs font-sans text-foreground bg-muted/50 px-3 py-1.5 rounded-sm">
              <span className="truncate max-w-[180px]">{file.name}</span>
              <button
                type="button"
                onClick={clearFile}
                className="text-muted-foreground hover:text-destructive"
                aria-label="Remove file"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground mt-1.5 font-sans">
          {t("inquiry.labels.fileHint")}
        </p>
        {fileError && (
          <p className="text-[11px] text-destructive mt-1 font-sans">
            {fileError}
          </p>
        )}
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-sm"
          >
            <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <p className="text-xs font-sans text-destructive">
              {errorMsg || t("inquiry.errors.generic")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-end gap-3 pt-1">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("inquiry.buttons.cancel")}
          </button>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-sm text-xs font-sans font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {status === "loading"
            ? t("inquiry.buttons.sending")
            : t("inquiry.buttons.send")}
        </button>
      </div>
    </form>
  );
};

export default InquiryForm;
