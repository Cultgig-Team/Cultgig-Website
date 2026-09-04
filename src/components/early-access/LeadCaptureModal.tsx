import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useRef, useState } from "react";
import { saveLead } from "../../lib/appwriteSubmissions";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { Button, IconButton } from "../ui/Button";

type LeadRole = "artist" | "business";

export function LeadCaptureModal({
  open,
  role: initialRole,
  onClose,
}: {
  open: boolean;
  role?: LeadRole;
  onClose: () => void;
}) {
  const [role, setRole] = useState<LeadRole | undefined>(initialRole);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<Record<string, string>>({});
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);

  const update = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const close = () => {
    setSubmitted(false);
    setBusy(false);
    setError("");
    setForm({});
    onClose();
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!role) return;
    setBusy(true);
    setError("");
    try {
      await saveLead({ ...form, role, createdAt: new Date().toISOString() });
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We could not save your details. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div ref={ref} className="lead-modal" role="dialog" aria-modal="true" aria-label="Cultgig early access">
            <IconButton label="Close early access form" className="modal-close" onClick={close}><X /></IconButton>
            {submitted ? (
              <div className="lead-success">
                <span className="success-icon"><Check /></span>
                <p className="eyebrow">CULTGIG EARLY ACCESS</p>
                <h2>You&apos;re on the list.</h2>
                <p>Thanks for joining Cultgig. We&apos;ll keep you updated as the mobile app gets closer to launch.</p>
                <Button onClick={close}>Close</Button>
              </div>
            ) : (
              <>
                <p className="eyebrow">JOIN CULTGIG</p>
                <h2>{role ? (role === "artist" ? "Your work deserves a head start." : "Be first to know what is next.") : "What best describes you?"}</h2>
                {!role ? (
                  <div className="lead-role-grid">
                    <button type="button" onClick={() => setRole("artist")}><strong>I&apos;m an Artist</strong><span>Share your work with the right people.</span></button>
                    <button type="button" onClick={() => setRole("business")}><strong>I&apos;m a Business</strong><span>Get updates on the app for creative discovery.</span></button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="lead-form">
                    <label>Full Name *<input required value={form.fullName || ""} onChange={(event) => update("fullName", event.target.value)} /></label>
                    {role === "business" && <label>Business / Company Name *<input required value={form.businessName || ""} onChange={(event) => update("businessName", event.target.value)} /></label>}
                    <div className="form-grid-2"><label>Email *<input required type="email" value={form.email || ""} onChange={(event) => update("email", event.target.value)} /></label><label>Phone / WhatsApp *<input required type="tel" value={form.phone || ""} onChange={(event) => update("phone", event.target.value)} /></label></div>
                    <div className="form-grid-2"><label>{role === "artist" ? "Category / Skill" : "Business Type"}<input value={form.category || ""} onChange={(event) => update("category", event.target.value)} /></label><label>City<input value={form.city || ""} onChange={(event) => update("city", event.target.value)} /></label></div>
                    {role === "business" ? <label>Event Type<input value={form.eventType || ""} onChange={(event) => update("eventType", event.target.value)} /></label> : null}
                    <label>{role === "artist" ? "Short Bio (optional)" : "Short Requirement (optional)"}<textarea rows={3} value={form.notes || ""} onChange={(event) => update("notes", event.target.value)} /></label>
                    {role === "artist" && <label>Portfolio / Instagram / Website (optional)<input value={form.portfolio || ""} onChange={(event) => update("portfolio", event.target.value)} /></label>}
                    {error && <p className="form-error" role="alert">{error}</p>}
                    <Button type="submit" disabled={busy}>{busy ? "Saving..." : role === "artist" ? "Join as an Artist" : "Get Early Access"}</Button>
                  </form>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
