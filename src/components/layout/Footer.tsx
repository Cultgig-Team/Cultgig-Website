import { Camera, Globe, Mail, Play, Share2 } from "lucide-react";
import { Link } from "../../app/App";
import { siteConfig } from "../../config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top-grid">
        {/* Brand column */}
        <div className="footer-brand-col">
          <Link className="logo" to="/">
            <span className="logo-text">Cultgig</span>
          </Link>
          <p className="footer-tagline">{siteConfig.tagline}</p>
          <p className="footer-desc">
            The two-sided marketplace connecting independent artists with venues, brands, and event hosts across India. Book with confidence.
          </p>
          <div className="footer-social-row">
            {siteConfig.socialLinks.instagram && (
              <a
                aria-label="Cultgig on Instagram"
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <Camera size={18} />
              </a>
            )}
            {siteConfig.socialLinks.linkedin && (
              <a
                aria-label="Cultgig on LinkedIn"
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <Share2 size={18} />
              </a>
            )}
            {siteConfig.socialLinks.youtube && (
              <a
                aria-label="Cultgig on YouTube"
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <Play size={18} />
              </a>
            )}
            {siteConfig.supportEmail && (
              <a
                aria-label="Email Cultgig Support"
                href={`mailto:${siteConfig.supportEmail}`}
                className="social-link"
              >
                <Mail size={18} />
              </a>
            )}
          </div>
        </div>

        {/* For Artists */}
        <div className="footer-col">
          <h4>For Artists</h4>
          <Link to="/for-artists">Why Join Cultgig</Link>
          <Link to="/how-it-works">How Onboarding Works</Link>
          <Link to="/#categories">Creative Disciplines</Link>
          <Link to="/faq">Artist FAQs</Link>
        </div>

        {/* For Businesses */}
        <div className="footer-col">
          <h4>For Businesses</h4>
          <Link to="/for-businesses">Hire Creative Talent</Link>
          <Link to="/#discover-artists">Find an Artist</Link>
          <Link to="/how-it-works">Booking & Inquiries</Link>
          <Link to="/faq">Client FAQs</Link>
        </div>

        {/* Company & Support */}
        <div className="footer-col">
          <h4>Company & Support</h4>
          <Link to="/about">About Cultgig</Link>
          <Link to="/contact">Contact Support</Link>
          <Link to="/faq">Help Center / FAQ</Link>
        </div>

        {/* Legal */}
        <div className="footer-col">
          <h4>Legal & Safety</h4>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <span className="footer-security-note">🔒 256-Bit SSL Encrypted</span>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>
          © {new Date().getFullYear()} Cultgig Technologies Pvt. Ltd. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy</Link>
          <span>•</span>
          <Link to="/terms">Terms</Link>
          <span>•</span>
          <Link to="/contact">Support</Link>
        </div>
      </div>
    </footer>
  );
}
