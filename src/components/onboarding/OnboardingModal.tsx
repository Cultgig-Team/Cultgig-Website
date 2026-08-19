import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, ChevronRight, X } from "lucide-react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { sendOtp, verifyOtp } from "../../lib/appwriteAuth";
import { saveSubmission } from "../../lib/appwriteSubmissions";
import { uploadFile } from "../../lib/appwriteStorage";
import { useOnboarding } from "../../state/onboardingContext";
import type {
  OnboardingData,
  OnboardingStep,
  Role,
} from "../../types/onboarding";
import { motionTokens } from "../../styles/motion";
import { Button, IconButton } from "../ui/Button";
const artist: OnboardingStep[] = [
    "bio",
    "location",
    "about",
    "category",
    "work",
    "social",
    "budget",
    "experience",
    "interests",
  ],
  client: OnboardingStep[] = [
    "bio",
    "business",
    "location",
    "about",
    "category",
    "social",
    "work",
  ];
const optional = new Set<OnboardingStep>([
  "business",
  "about",
  "work",
  "social",
  "experience",
  "interests",
]);
export function OnboardingModal({
  open,
  role,
  close,
}: {
  open: boolean;
  role?: Role;
  close: () => void;
}) {
  const { data, patch, reset } = useOnboarding();
  const [step, setStep] = useState<OnboardingStep>("email"),
    [code, setCode] = useState(""),
    [token, setToken] = useState<{ userId: string; local: boolean } | null>(
      null,
    ),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [cooldown, setCooldown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, close);
  useEffect(() => {
    if (!cooldown) return;
    const timer = window.setInterval(
      () => setCooldown((value) => value - 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [cooldown]);
  const flow = data.role === "artist" ? artist : client;
  const valid =
    step === "email"
      ? /^\S+@\S+\.\S+$/.test(data.email)
      : step === "otp"
        ? code.length === 6
        : step === "role"
          ? !!data.role
          : step === "bio"
            ? !!data.fullName.trim()
            : step === "location"
              ? !!data.city.trim() &&
                (data.role === "client" || data.willingToTravel !== null)
              : step === "category"
                ? !!data.category
                : step === "budget"
                  ? data.budgetConfirmed
                  : true;
  const start = () => {
    reset(role);
    setStep("email");
    setCode("");
    setError("");
    setCooldown(0);
  };
  const resend = async () => {
    if (cooldown || busy) return;
    try {
      setError("");
      setBusy(true);
      setToken(await sendOtp(data.email));
      setCode("");
      setCooldown(30);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to resend the code.");
    } finally {
      setBusy(false);
    }
  };
  if (step === "email" && data.email === "" && role && data.role !== role)
    reset(role);
  const next = async (skip = false) => {
    try {
      setError("");
      setBusy(true);
      if (step === "email") {
        setToken(await sendOtp(data.email));
        setCooldown(30);
        setStep("otp");
      } else if (step === "otp") {
        await verifyOtp(token!.userId, code, token!.local);
        setStep("role");
      } else if (step === "role") setStep(flow[0]);
      else {
        const i = flow.indexOf(step);
        if (i < flow.length - 1) setStep(flow[i + 1]);
        else {
          const photoUrl = data.photo
            ? await uploadFile(data.photo)
            : undefined;
          const portfolioUrls = await Promise.all(
            data.portfolio.map(uploadFile),
          );
          const common = {
            email: data.email,
            fullName: data.fullName,
            photoUrl,
            city: data.city,
            bio: data.bio || undefined,
            category: data.category!,
            portfolioUrls,
            instagram: data.instagram || undefined,
            youtube: data.youtube || undefined,
            website: data.website || undefined,
            createdAt: new Date().toISOString(),
          };
          await saveSubmission(
            data.role === "artist"
              ? {
                  ...common,
                  role: "artist",
                  willingToTravel: data.willingToTravel!,
                  hourlyBudgetMin: data.budget[0],
                  hourlyBudgetMax: data.budget[1],
                  experienceLevel: data.experience || undefined,
                  gigInterests: data.interests,
                }
              : {
                  ...common,
                  role: "client",
                  businessEmail: data.businessEmail || undefined,
                  businessPhone: data.businessPhone || undefined,
                  businessAddress: data.businessAddress || undefined,
                },
          );
          setStep("done");
        }
      }
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };
  const back = () => {
    if (step === "otp") setStep("email");
    else if (step === "role") setStep("otp");
    else {
      const i = flow.indexOf(step);
      setStep(i ? flow[i - 1] : "role");
    }
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTokens.standard }}
        >
          <div
            ref={ref}
            className="onboarding-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Create your Cultgig profile"
          >
            {step !== "email" && step !== "done" && (
              <IconButton label="Go back" onClick={back}>
                <ArrowLeft />
              </IconButton>
            )}
            <IconButton
              label="Close onboarding"
              className="modal-close"
              onClick={() => {
                start();
                close();
              }}
            >
              <X />
            </IconButton>
            {step !== "email" && step !== "otp" && step !== "done" && (
              <div className="progress" aria-label="Onboarding progress">
                <i
                  style={{
                    width: `${Math.round(((flow.indexOf(step) + 1) / (flow.length + 1)) * 100)}%`,
                  }}
                />
              </div>
            )}
            <motion.div
              key={step}
              className="modal-content"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: motionTokens.standard,
                ease: motionTokens.easeOut,
              }}
            >
              {step === "email" && (
                <>
                  <p className="brand">Cultgig</p>
                  use it to shape more useful creative connections as the
                  marketplace grows.
                  <label>
                    Email address
                    <input
                      value={data.email}
                      type="email"
                      onChange={(e) => patch({ email: e.target.value })}
                    />
                  </label>
                  <Button disabled={!valid || busy} onClick={() => next()}>
                    {busy ? "Sending…" : "Next"}
                    <ChevronRight />
                  </Button>
                </>
              )}
              {step === "otp" && (
                <Otp
                  code={code}
                  setCode={setCode}
                  cooldown={cooldown}
                  busy={busy}
                  resend={resend}
                />
              )}{" "}
              {step === "role" && (
                <>
                  <h2>How do you want to get started?</h2>
                  <Select
                    label="I’m an Artist"
                    active={data.role === "artist"}
                    onClick={() => patch({ role: "artist" })}
                  />
                  <Select
                    label="I’m a Client"
                    active={data.role === "client"}
                    onClick={() => patch({ role: "client" })}
                  />
                  <Button disabled={!valid} onClick={() => next()}>
                    Continue
                  </Button>
                </>
              )}
              {flow.includes(step) && (
                <Fields
                  step={step}
                  role={data.role!}
                  data={data}
                  patch={patch}
                />
              )}{" "}
              {step === "done" && (
                <div className="done">
                  <Check />
                  <h2>You’re in, {data.fullName.split(" ")[0]} 🎉</h2>
                  <p>
                    Your Cultgig profile is live. We have your information and
                    will be in touch as we expand in your city.
                  </p>
                  <Button
                    onClick={() => {
                      start();
                      close();
                    }}
                  >
                    Close
                  </Button>
                </div>
              )}{" "}
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              {flow.includes(step) && (
                <>
                  <Button disabled={!valid || busy} onClick={() => next()}>
                    {busy
                      ? "Saving…"
                      : step === flow.at(-1)
                        ? "Create profile"
                        : "Continue"}
                    <ChevronRight />
                  </Button>
                  {optional.has(step) && (
                    <button className="text-button" onClick={() => next(true)}>
                      Skip for now
                    </button>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
function Otp({
  code,
  setCode,
  cooldown,
  busy,
  resend,
}: {
  code: string;
  setCode: (v: string) => void;
  cooldown: number;
  busy: boolean;
  resend: () => void;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const values = Array.from({ length: 6 }, (_, i) => code[i] || "");
  const change = (i: number, v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 6);
    const next = (
      code.slice(0, i) +
      digits +
      code.slice(i + digits.length)
    ).slice(0, 6);
    setCode(next);
    refs.current[Math.min(5, i + digits.length)]?.focus();
  };
  return (
    <>
      <h2>We sent you a code.</h2>
      <p>Please enter the 6-digit code sent to your email.</p>
      <div className="otp-group" aria-label="Verification code">
        {values.map((v, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            aria-label={`Verification code digit ${i + 1}`}
            inputMode="numeric"
            maxLength={6}
            value={v}
            onChange={(e) => change(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !v) refs.current[i - 1]?.focus();
            }}
            onPaste={(e) => {
              e.preventDefault();
              setCode(
                e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6),
              );
              refs.current[5]?.focus();
            }}
          />
        ))}
      </div>
      <Button
        disabled={code.length !== 6}
        onClick={() =>
          document
            .querySelector<HTMLButtonElement>(
              ".modal-content > .button:last-of-type",
            )
            ?.click()
        }
      >
        Verify
      </Button>
      <button
        className="text-button resend-control"
        type="button"
        disabled={cooldown > 0 || busy}
        onClick={resend}
      >
        {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
      </button>
      {import.meta.env.DEV && (
        <p className="dev-only">Local preview code: 123456</p>
      )}
    </>
  );
}
function Select({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`selection ${active ? "selected" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
function Fields({
  step,
  role,
  data,
  patch,
}: {
  step: OnboardingStep;
  role: Role;
  data: OnboardingData;
  patch: (x: Partial<OnboardingData>) => void;
}) {
  const titles: Record<string, string> = {
    bio: "Let’s put a face to the talent.",
    business: "A few business details.",
    location: "Hey, where are you based?",
    about:
      role === "artist"
        ? "Tell us about yourself & your skill."
        : "Tell us about your business.",
    category:
      role === "artist"
        ? "What do you do best?"
        : "What best describes your business?",
    work: "Showcase your best work.",
    social: "Where can we find you?",
    budget: "What’s your hourly budget?",
    experience: "How much experience do you have?",
    interests: "What kind of gigs excite you?",
  };
  return (
    <>
      <h2>{titles[step]}</h2>
      {step === "bio" && (
        <label>
          Full name
          <input
            value={data.fullName}
            onChange={(e) => patch({ fullName: e.target.value })}
          />
        </label>
      )}
      {step === "business" && (
        <>
          <label>
            Business email (optional)
            <input
              value={data.businessEmail}
              onChange={(e) => patch({ businessEmail: e.target.value })}
            />
          </label>
          <label>
            Business phone (optional)
            <input
              value={data.businessPhone}
              onChange={(e) => patch({ businessPhone: e.target.value })}
            />
          </label>
        </>
      )}
      {step === "location" && (
        <>
          <label>
            City
            <input
              value={data.city}
              onChange={(e) => patch({ city: e.target.value })}
            />
          </label>
          {role === "artist" ? (
            <div className="toggle">
              Willing to travel?
              <button
                onClick={() => patch({ willingToTravel: true })}
                className={data.willingToTravel === true ? "selected" : ""}
              >
                Yes
              </button>
              <button
                onClick={() => patch({ willingToTravel: false })}
                className={data.willingToTravel === false ? "selected" : ""}
              >
                No
              </button>
            </div>
          ) : (
            <label>
              Business address (optional)
              <textarea
                value={data.businessAddress}
                onChange={(e) => patch({ businessAddress: e.target.value })}
              />
            </label>
          )}
        </>
      )}
      {step === "about" && (
        <label>
          About (optional)
          <textarea
            maxLength={250}
            value={data.bio}
            onChange={(e) => patch({ bio: e.target.value })}
          />
        </label>
      )}
      {step === "category" && (
        <div className="card-grid">
          {(role === "artist"
            ? [
                "Photographer",
                "Dancer",
                "Musician",
                "Performer",
                "Comedian",
                "Videographer",
                "Event Host",
                "Singer",
              ]
            : [
                "Personal Use",
                "Cafe",
                "Restaurant",
                "Club",
                "Hotel",
                "Brand / Corporate",
              ]
          ).map((x) => (
            <Select
              key={x}
              label={x}
              active={data.category === x}
              onClick={() => patch({ category: x })}
            />
          ))}
        </div>
      )}
      {step === "social" &&
        (["instagram", "youtube", "website"] as const).map((x) => (
          <label key={x}>
            {x} (optional)
            <input
              value={data[x]}
              onChange={(e) => patch({ [x]: e.target.value })}
            />
          </label>
        ))}
      {step === "budget" && (
        <>
          <label>
            Minimum hourly budget ₹{data.budget[0]}
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={data.budget[0]}
              onChange={(e) =>
                patch({
                  budget: [+e.target.value, data.budget[1]],
                  budgetConfirmed: true,
                })
              }
            />
          </label>
          <label>
            Maximum hourly budget ₹{data.budget[1]}
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={data.budget[1]}
              onChange={(e) =>
                patch({
                  budget: [data.budget[0], +e.target.value],
                  budgetConfirmed: true,
                })
              }
            />
          </label>
        </>
      )}
      {step === "work" && (
        <label>
          Portfolio files (optional)
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) =>
              patch({ portfolio: Array.from(e.target.files || []).slice(0, 4) })
            }
          />
        </label>
      )}
      {step === "experience" && (
        <div className="card-grid">
          {["Beginner", "Intermediate", "Experienced"].map((x) => (
            <Select
              key={x}
              label={x}
              active={data.experience === x}
              onClick={() => patch({ experience: x })}
            />
          ))}
        </div>
      )}
      {step === "interests" && (
        <div className="card-grid">
          {[
            "Live Performances",
            "Corporate Events",
            "Weddings",
            "Personal Services",
            "Clubs / Bars",
            "Festivals",
          ].map((x) => (
            <Select
              key={x}
              label={x}
              active={data.interests.includes(x)}
              onClick={() =>
                patch({
                  interests: data.interests.includes(x)
                    ? data.interests.filter((a: string) => a !== x)
                    : [...data.interests, x],
                })
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
