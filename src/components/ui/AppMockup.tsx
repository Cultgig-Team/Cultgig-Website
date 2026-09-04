import { Button } from "./Button";

export function AppMockup({ onCreateProfile }: { onCreateProfile?: () => void }) {
  return (
    <div className="app-mockup-stage" aria-label="Concept preview of the upcoming Cultgig mobile app">
      <div className="app-mockup">
        <div className="app-mockup-screen">
          <span className="app-mockup-status">9:41 <b>● ◒ ▰</b></span>
          <span className="app-mockup-notch" />
          <div className="app-mockup-topline"><strong>Cultgig</strong><span>Profile</span></div>
          <div className="app-mockup-art" aria-hidden="true"><i /><b /><em /></div>
          <p className="app-mockup-label">YOUR CREATIVE PROFILE</p>
          <h3>Make your work easier to find.</h3>
          <p className="app-mockup-copy">Keep your story, city, category, and creative proof ready for the next introduction.</p>
          <div className="app-mockup-lines"><i /><i /><i /></div>
          <Button variant="glow" className="app-mockup-button" onClick={onCreateProfile}>Create your profile</Button>
          <div className="app-mockup-nav"><span>⌂</span><span>⌕</span><span>＋</span><span>◉</span></div>
        </div>
      </div>
    </div>
  );
}