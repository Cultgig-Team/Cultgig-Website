import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from "lucide-react";
import { Reveal, StaggerReveal, StaggerItem } from "../motion/MotionPrimitives";
import { Button } from "../ui/Button";
import { ArtistCard } from "./ArtistCard";
import {
  representativeArtists,
  artistCategories,
  artistCities,
  type ArtistProfile,
} from "../../content/artists";

export function ArtistDiscovery({
  onRequestBook,
  onPostRequirement,
}: {
  onRequestBook: (artist: ArtistProfile) => void;
  onPostRequirement: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCity, setSelectedCity] = useState<string>("All Cities");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxBudget, setMaxBudget] = useState<number>(50000);

  const filteredArtists = useMemo(() => {
    return representativeArtists.filter((artist) => {
      // Category filter
      if (selectedCategory !== "All" && artist.category !== selectedCategory) {
        return false;
      }
      // City filter
      if (selectedCity !== "All Cities" && artist.city !== selectedCity) {
        return false;
      }
      // Budget filter
      if (artist.startingPrice > maxBudget) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = artist.name.toLowerCase().includes(q);
        const matchesSpecialty = artist.specialty.toLowerCase().includes(q);
        const matchesCity = artist.city.toLowerCase().includes(q);
        const matchesSkills = artist.skills.some((s) => s.toLowerCase().includes(q));
        const matchesEvent = artist.eventTypes.some((e) => e.toLowerCase().includes(q));
        if (!matchesName && !matchesSpecialty && !matchesCity && !matchesSkills && !matchesEvent) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedCity, searchQuery, maxBudget]);

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedCity !== "All Cities" ||
    searchQuery.trim().length > 0 ||
    maxBudget < 50000;

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedCity("All Cities");
    setSearchQuery("");
    setMaxBudget(50000);
  };

  return (
    <section id="discover-artists" className="artist-discovery-section">
      <div className="discovery-container">
        <Reveal>
          <div className="discovery-header">
            <span className="discovery-eyebrow">CURATED ARTIST DISCOVERY</span>
            <h2>Discover & Book Verified Talent</h2>
            <p className="discovery-subheading">
              Browse professional artist profiles with real ratings, portfolio highlights, starting rates, and verified contact credentials.
            </p>
          </div>
        </Reveal>

        {/* Discovery Filter Toolbar */}
        <Reveal delay={0.06}>
          <div className="discovery-toolbar">
            <div className="search-box-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by artist name, skill, instrument, or event type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="discovery-search-input"
                aria-label="Search artists"
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="toolbar-controls-row">
              <div className="city-select-wrap">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="city-select"
                  aria-label="Filter by city"
                >
                  {artistCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="reset-filters-btn"
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Category Pills Rail */}
        <Reveal delay={0.1}>
          <div className="category-pills-rail" role="tablist" aria-label="Artist Categories">
            {artistCategories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  className={`category-pill ${active ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Results Metadata & Count */}
        <div className="results-status-bar">
          <span className="results-count">
            Showing <strong>{filteredArtists.length}</strong> available{" "}
            {filteredArtists.length === 1 ? "artist" : "artists"}
          </span>
          <span className="direct-book-note">
            ⚡ Direct booking inquiries • 0% client commission fee
          </span>
        </div>

        {/* Artist Grid */}
        {filteredArtists.length > 0 ? (
          <StaggerReveal className="artist-cards-grid">
            {filteredArtists.map((artist) => (
              <StaggerItem key={artist.id}>
                <ArtistCard artist={artist} onRequestBook={onRequestBook} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        ) : (
          <div className="discovery-empty-state">
            <div className="empty-state-icon">
              <Search size={32} />
            </div>
            <h3>No artists found matching your criteria</h3>
            <p>
              Try clearing some filters, searching for a different discipline, or post your requirement to let available artists reach out to you.
            </p>
            <div className="empty-state-actions">
              <Button variant="outline" onClick={handleResetFilters}>
                Clear All Filters
              </Button>
              <Button variant="primary" onClick={onPostRequirement}>
                Post a Requirement Instead
              </Button>
            </div>
          </div>
        )}

        {/* Post a Requirement Prompt Banner */}
        <Reveal delay={0.12}>
          <div className="custom-requirement-callout">
            <div className="callout-text">
              <span className="callout-badge">CAN'T FIND THE EXACT MATCH?</span>
              <h3>Have a custom event brief or specific date in mind?</h3>
              <p>
                Post your event requirements in under 2 minutes. Receive direct proposals and availability confirmation from verified artists in your city.
              </p>
            </div>
            <Button
              variant="primary"
              className="callout-btn"
              onClick={onPostRequirement}
            >
              Post a Requirement
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
