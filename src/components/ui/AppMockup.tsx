const mockups = [
  {
    className: "app-mockup-profile",
    eyebrow: "YOUR PROFILE",
    headline: "Make your work easier to find.",
    body: "Craft a clearer first impression with your story, city, and creative proof.",
    action: "Complete profile",
  },
  {
    className: "app-mockup-discover",
    eyebrow: "CREATIVE DISCOVERY",
    headline: "The right context changes everything.",
    body: "Keep your category, portfolio, and availability ready for the next introduction.",
    action: "Explore categories",
  },
  {
    className: "app-mockup-story",
    eyebrow: "YOUR CREATIVE STORY",
    headline: "More than a name in a DM.",
    body: "Give businesses a thoughtful way to understand the work behind the profile.",
    action: "Shape your story",
  },
];

export function AppMockup() {
  return (
    <div className="app-mockup-stage" aria-label="Concept previews of the upcoming Cultgig mobile app">
      {mockups.map((mockup, index) => (
        <div className={`app-mockup ${mockup.className}`} key={mockup.eyebrow}>
          <div className="app-mockup-screen">
            <span className="app-mockup-status">9:41 <b>● ◒ ▰</b></span>
            <span className="app-mockup-notch" />
            <div className="app-mockup-topline"><strong>Cultgig</strong><span>{index === 1 ? "Discover" : "Profile"}</span></div>
            <div className="app-mockup-art" aria-hidden="true"><i /><b /><em /></div>
            <p className="app-mockup-label">{mockup.eyebrow}</p>
            <h3>{mockup.headline}</h3>
            <p className="app-mockup-copy">{mockup.body}</p>
            <div className="app-mockup-lines"><i /><i /><i /></div>
            <div className="app-mockup-button">{mockup.action}</div>
            <div className="app-mockup-nav"><span>⌂</span><span>⌕</span><span>＋</span><span>◉</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}