import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";
import { CheckCircle2, ShieldCheck, Star, X } from "lucide-react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { Button, IconButton } from "../ui/Button";
import { motionTokens } from "../../styles/motion";
import type { ArtistProfile } from "../../content/artists";

export interface BookingRequestData {
  artistId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  eventCity: string;
  durationHours: string;
  budget: string;
  notes: string;
}

export function BookingModal({
  artist,
  isOpen,
  onClose,
}: {
  artist: ArtistProfile | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen, onClose);

  const [formData, setFormData] = useState<BookingRequestData>({
    artistId: artist?.id || "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    eventType: "Corporate Event",
    eventDate: "",
    eventCity: artist?.city || "Mumbai",
    durationHours: "3",
    budget: artist ? String(artist.startingPrice) : "15000",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof BookingRequestData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.clientName.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(formData.clientEmail) &&
    formData.clientPhone.trim().length >= 8 &&
    formData.eventDate.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("Please fill in all required fields accurately.");
      return;
    }

    setError("");
    setSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError("");
    setFormData({
      artistId: "",
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      eventType: "Corporate Event",
      eventDate: "",
      eventCity: "Mumbai",
      durationHours: "3",
      budget: "15000",
      notes: "",
    });
    onClose();
  };

  if (!isOpen || !artist) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: motionTokens.standard }}
      >
        <div
          ref={modalRef}
          className="booking-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Booking request for ${artist.name}`}
        >
          <IconButton
            label="Close booking modal"
            className="modal-close"
            onClick={handleResetAndClose}
          >
            <X size={18} />
          </IconButton>

          {!submitted ? (
            <div className="booking-modal-content">
              <div className="booking-header">
                <span className="booking-eyebrow">DIRECT BOOKING INQUIRY</span>
                <h2>Request to Book {artist.name}</h2>
                <p>
                  Submit your event specifications directly to the artist. You'll receive a confirmation and direct follow-up.
                </p>
              </div>

              <div className="booking-artist-summary">
                <img src={artist.image} alt={artist.name} className="artist-thumb" />
                <div className="summary-meta">
                  <strong>{artist.name}</strong>
                  <span>{artist.specialty} • {artist.city}</span>
                  <div className="summary-trust">
                    <span className="rating-pill">
                      <Star size={12} className="star-icon" /> {artist.rating} ({artist.reviewCount} reviews)
                    </span>
                    {artist.phoneVerified && (
                      <span className="verified-pill">
                        <ShieldCheck size={12} /> Phone Verified
                      </span>
                    )}
                  </div>
                </div>
                <div className="summary-rate">
                  <small>Starting from</small>
                  <b>₹{artist.startingPrice.toLocaleString("en-IN")}</b>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-grid-2">
                  <label>
                    Your Name *
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditi Roy"
                      value={formData.clientName}
                      onChange={(e) => updateField("clientName", e.target.value)}
                    />
                  </label>
                  <label>
                    Your Email Address *
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.clientEmail}
                      onChange={(e) => updateField("clientEmail", e.target.value)}
                    />
                  </label>
                </div>

                <div className="form-grid-2">
                  <label>
                    Phone / WhatsApp Number *
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.clientPhone}
                      onChange={(e) => updateField("clientPhone", e.target.value)}
                    />
                  </label>
                  <label>
                    Event Type
                    <select
                      value={formData.eventType}
                      onChange={(e) => updateField("eventType", e.target.value)}
                    >
                      <option value="Corporate Event">Corporate Event / Summit</option>
                      <option value="Wedding / Sangeet">Wedding / Sangeet / Reception</option>
                      <option value="Cafe / Lounge Gig">Cafe / Lounge / Restaurant Night</option>
                      <option value="Private Celebration">Private Birthday / Anniversary</option>
                      <option value="College Festival">College / Cultural Festival</option>
                      <option value="Brand Launch">Brand Activation / Pop-up</option>
                    </select>
                  </label>
                </div>

                <div className="form-grid-3">
                  <label>
                    Event Date *
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => updateField("eventDate", e.target.value)}
                    />
                  </label>
                  <label>
                    Event City / Venue
                    <input
                      type="text"
                      placeholder="e.g. Bandra, Mumbai"
                      value={formData.eventCity}
                      onChange={(e) => updateField("eventCity", e.target.value)}
                    />
                  </label>
                  <label>
                    Est. Budget (₹)
                    <input
                      type="number"
                      step="1000"
                      value={formData.budget}
                      onChange={(e) => updateField("budget", e.target.value)}
                    />
                  </label>
                </div>

                <label>
                  Event Requirements & Details (Optional)
                  <textarea
                    rows={3}
                    placeholder="Tell the artist about the theme, acoustic setup, stage size, or special songs you'd like..."
                    value={formData.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                  />
                </label>

                {error && (
                  <p className="form-error-banner" role="alert">
                    {error}
                  </p>
                )}

                <div className="booking-form-footer">
                  <p className="privacy-note">
                    🔒 Direct connection. No spam, no hidden commissions.
                  </p>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting}
                    className="submit-booking-btn"
                  >
                    {submitting ? "Sending Request…" : "Submit Booking Request"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="booking-success-content">
              <div className="success-icon-wrap">
                <CheckCircle2 size={48} className="success-icon" />
              </div>
              <h2>Booking Request Sent!</h2>
              <p>
                We have received your booking inquiry for <strong>{artist.name}</strong>.
                A confirmation has been logged for <strong>{formData.clientEmail}</strong>.
              </p>
              <div className="booking-summary-box">
                <div>
                  <span>Event:</span> <strong>{formData.eventType}</strong>
                </div>
                <div>
                  <span>Date & City:</span> <strong>{formData.eventDate} ({formData.eventCity})</strong>
                </div>
                <div>
                  <span>Offered Budget:</span> <strong>₹{Number(formData.budget).toLocaleString("en-IN")}</strong>
                </div>
              </div>
              <p className="next-steps-copy">
                The artist will review your event requirements and connect directly via phone/email to finalize schedule and technical details.
              </p>
              <Button variant="primary" onClick={handleResetAndClose}>
                Done & Back to Discover
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
