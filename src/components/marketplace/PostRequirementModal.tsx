import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles, X } from "lucide-react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { Button, IconButton } from "../ui/Button";
import { motionTokens } from "../../styles/motion";

export interface ClientRequirementData {
  category: string;
  eventType: string;
  eventDate: string;
  eventCity: string;
  expectedAudience: string;
  budgetMin: string;
  budgetMax: string;
  description: string;
  clientName: string;
  clientOrg: string;
  clientEmail: string;
  clientPhone: string;
}

export function PostRequirementModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen, onClose);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<ClientRequirementData>({
    category: "Singers & Vocalists",
    eventType: "Corporate Gala",
    eventDate: "",
    eventCity: "Mumbai",
    expectedAudience: "50-150 guests",
    budgetMin: "15000",
    budgetMax: "35000",
    description: "",
    clientName: "",
    clientOrg: "",
    clientEmail: "",
    clientPhone: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof ClientRequirementData, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const isStepValid = () => {
    if (step === 1) return Boolean(formData.category && formData.eventType);
    if (step === 2) return Boolean(formData.eventDate && formData.eventCity);
    if (step === 3) return Boolean(formData.budgetMin && formData.budgetMax);
    if (step === 4)
      return Boolean(
        formData.clientName.trim().length > 1 &&
        /^\S+@\S+\.\S+$/.test(formData.clientEmail) &&
        formData.clientPhone.trim().length >= 8
      );
    return true;
  };

  const handleNext = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");

    if (!isStepValid()) {
      setError("Please complete the required details for this step.");
      return;
    }

    if (step < 4) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    } else {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 700);
    }
  };

  const handleBack = () => {
    setError("");
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    setError("");
    setFormData({
      category: "Singers & Vocalists",
      eventType: "Corporate Gala",
      eventDate: "",
      eventCity: "Mumbai",
      expectedAudience: "50-150 guests",
      budgetMin: "15000",
      budgetMax: "35000",
      description: "",
      clientName: "",
      clientOrg: "",
      clientEmail: "",
      clientPhone: "",
    });
    onClose();
  };

  if (!isOpen) return null;

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
          className="post-requirement-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Post a Gig Requirement"
        >
          {step > 1 && !submitted && (
            <IconButton label="Go back" className="modal-back" onClick={handleBack}>
              <ArrowLeft size={18} />
            </IconButton>
          )}

          <IconButton
            label="Close requirement modal"
            className="modal-close"
            onClick={handleResetAndClose}
          >
            <X size={18} />
          </IconButton>

          {!submitted ? (
            <div className="post-req-content">
              {/* Progress Indicator */}
              <div className="post-req-progress-bar">
                <div
                  className="post-req-progress-fill"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>

              <div className="post-req-header">
                <span className="post-req-step-indicator">
                  Step {step} of 4 • {step === 1 ? "Service Needed" : step === 2 ? "Event Details" : step === 3 ? "Budget & Scope" : "Contact Information"}
                </span>
                <h2>
                  {step === 1 && "What talent are you looking to hire?"}
                  {step === 2 && "Tell us about your event"}
                  {step === 3 && "Budget & specific requirements"}
                  {step === 4 && "Where should artists send proposals?"}
                </h2>
              </div>

              <form onSubmit={handleNext} className="post-req-form">
                {step === 1 && (
                  <div className="step-content">
                    <label>
                      Creative Discipline
                      <select
                        value={formData.category}
                        onChange={(e) => update("category", e.target.value)}
                      >
                        <option value="Singers & Vocalists">Singers & Vocalists</option>
                        <option value="Live Bands & Instrumentalists">Live Bands & Instrumentalists</option>
                        <option value="DJs & Electronic Acts">DJs & Electronic Acts</option>
                        <option value="Event Photographers">Event Photographers</option>
                        <option value="Cinematographers & Videographers">Cinematographers & Videographers</option>
                        <option value="Decorators & Stage Designers">Decorators & Stage Designers</option>
                        <option value="Dancers & Choreographers">Dancers & Choreographers</option>
                        <option value="Anchors & Emcees">Anchors & Emcees</option>
                        <option value="Makeup & Beauty Artists">Makeup & Beauty Artists</option>
                      </select>
                    </label>

                    <label>
                      Event Type
                      <select
                        value={formData.eventType}
                        onChange={(e) => update("eventType", e.target.value)}
                      >
                        <option value="Corporate Gala / Summit">Corporate Gala / Summit</option>
                        <option value="Wedding / Sangeet / Reception">Wedding / Sangeet / Reception</option>
                        <option value="Cafe / Restaurant Live Night">Cafe / Restaurant Live Night</option>
                        <option value="Private Birthday / Soiree">Private Birthday / Soiree</option>
                        <option value="Brand Launch / Pop-up">Brand Launch / Pop-up</option>
                        <option value="College / Community Festival">College / Community Festival</option>
                      </select>
                    </label>
                  </div>
                )}

                {step === 2 && (
                  <div className="step-content">
                    <div className="form-grid-2">
                      <label>
                        Event Date *
                        <input
                          type="date"
                          required
                          value={formData.eventDate}
                          onChange={(e) => update("eventDate", e.target.value)}
                        />
                      </label>
                      <label>
                        City / Location *
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mumbai, BKC"
                          value={formData.eventCity}
                          onChange={(e) => update("eventCity", e.target.value)}
                        />
                      </label>
                    </div>
                    <label>
                      Estimated Audience Size
                      <select
                        value={formData.expectedAudience}
                        onChange={(e) => update("expectedAudience", e.target.value)}
                      >
                        <option value="Under 30 guests">Intimate (Under 30 guests)</option>
                        <option value="30-100 guests">Medium (30–100 guests)</option>
                        <option value="100-300 guests">Large (100–300 guests)</option>
                        <option value="300+ guests">Grand Scale (300+ guests)</option>
                      </select>
                    </label>
                  </div>
                )}

                {step === 3 && (
                  <div className="step-content">
                    <div className="form-grid-2">
                      <label>
                        Minimum Budget (₹)
                        <input
                          type="number"
                          step="1000"
                          value={formData.budgetMin}
                          onChange={(e) => update("budgetMin", e.target.value)}
                        />
                      </label>
                      <label>
                        Maximum Budget (₹)
                        <input
                          type="number"
                          step="1000"
                          value={formData.budgetMax}
                          onChange={(e) => update("budgetMax", e.target.value)}
                        />
                      </label>
                    </div>
                    <label>
                      Requirement Brief (Optional)
                      <textarea
                        rows={3}
                        placeholder="e.g. Need a 2-hour acoustic Bollywood/Pop set with sound setup included. Must be comfortable with live audience requests."
                        value={formData.description}
                        onChange={(e) => update("description", e.target.value)}
                      />
                    </label>
                  </div>
                )}

                {step === 4 && (
                  <div className="step-content">
                    <div className="form-grid-2">
                      <label>
                        Your Name *
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikram Singhania"
                          value={formData.clientName}
                          onChange={(e) => update("clientName", e.target.value)}
                        />
                      </label>
                      <label>
                        Organization / Venue (Optional)
                        <input
                          type="text"
                          placeholder="e.g. Singhania Hospitality"
                          value={formData.clientOrg}
                          onChange={(e) => update("clientOrg", e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="form-grid-2">
                      <label>
                        Email Address *
                        <input
                          type="email"
                          required
                          placeholder="vikram@example.com"
                          value={formData.clientEmail}
                          onChange={(e) => update("clientEmail", e.target.value)}
                        />
                      </label>
                      <label>
                        Phone / WhatsApp *
                        <input
                          type="tel"
                          required
                          placeholder="+91 98200 12345"
                          value={formData.clientPhone}
                          onChange={(e) => update("clientPhone", e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                )}

                {error && (
                  <p className="form-error-banner" role="alert">
                    {error}
                  </p>
                )}

                <div className="post-req-footer">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting}
                    className="post-req-submit-btn"
                  >
                    {submitting ? (
                      "Posting Requirement…"
                    ) : step === 4 ? (
                      "Post Requirement Now"
                    ) : (
                      <>
                        Continue <ChevronRight size={16} />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="post-req-success-content">
              <div className="success-icon-wrap">
                <CheckCircle2 size={48} className="success-icon" />
              </div>
              <h2>Requirement Successfully Posted!</h2>
              <p>
                Your gig requirement for <strong>{formData.category}</strong> has been received and verified.
              </p>
              <div className="booking-summary-box">
                <div>
                  <span>Category:</span> <strong>{formData.category}</strong>
                </div>
                <div>
                  <span>Event & City:</span> <strong>{formData.eventType} in {formData.eventCity}</strong>
                </div>
                <div>
                  <span>Budget Range:</span> <strong>₹{Number(formData.budgetMin).toLocaleString("en-IN")} - ₹{Number(formData.budgetMax).toLocaleString("en-IN")}</strong>
                </div>
              </div>
              <p className="next-steps-copy">
                Matching verified artists in {formData.eventCity} will receive notification of your requirement and you will receive curated profile submissions directly.
              </p>
              <Button variant="primary" onClick={handleResetAndClose}>
                Explore Artists in Meanwhile
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
