import { MapPin, ShieldCheck, Star, Sparkles } from "lucide-react";
import { TiltCard } from "../motion/MotionPrimitives";
import { Button } from "../ui/Button";
import type { ArtistProfile } from "../../content/artists";

export function ArtistCard({
  artist,
  onRequestBook,
  onViewDetails,
}: {
  artist: ArtistProfile;
  onRequestBook: (artist: ArtistProfile) => void;
  onViewDetails?: (artist: ArtistProfile) => void;
}) {
  return (
    <TiltCard className="artist-listing-card-shell">
      <article className="artist-listing-card">
        <div className="artist-card-image-wrap">
          <img
            src={artist.image}
            alt={`${artist.name} - ${artist.specialty}`}
            loading="lazy"
            width="400"
            height="320"
            className="artist-card-img"
          />
          <div className="artist-card-badges">
            <span className="artist-category-badge">{artist.category}</span>
            {artist.phoneVerified && (
              <span className="artist-verified-badge" title="Identity & contact verified">
                <ShieldCheck size={13} />
                <span>Verified</span>
              </span>
            )}
          </div>
          {artist.available && (
            <span className="artist-available-dot" title="Available for bookings">
              <i /> Available
            </span>
          )}
        </div>

        <div className="artist-card-body">
          <div className="artist-card-header">
            <div>
              <h3 className="artist-name">{artist.name}</h3>
              <p className="artist-specialty">{artist.specialty}</p>
            </div>
          </div>

          <div className="artist-card-meta-row">
            <span className="artist-location">
              <MapPin size={14} />
              {artist.city}
            </span>
            <div className="artist-rating">
              <Star size={14} className="star-icon" />
              <strong>{artist.rating.toFixed(1)}</strong>
              <span>({artist.reviewCount})</span>
            </div>
          </div>

          <p className="artist-bio-snippet">{artist.bio}</p>

          <div className="artist-tags-row">
            {artist.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="artist-skill-pill">
                {skill}
              </span>
            ))}
          </div>

          <div className="artist-card-footer">
            <div className="artist-price-block">
              <small>STARTING FROM</small>
              <strong>₹{artist.startingPrice.toLocaleString("en-IN")}</strong>
            </div>
            <div className="artist-card-actions">
              <Button
                variant="primary"
                className="artist-book-btn"
                onClick={() => onRequestBook(artist)}
              >
                Request to Book
              </Button>
            </div>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
