export function AppMockup() {
  return (
    <div className="app-preview" aria-label="Preview of the upcoming Cultgig mobile app">
      <div className="app-preview-panel app-preview-side app-preview-discover">
        <span className="app-preview-kicker">DISCOVER</span>
        <strong>Find the work behind the idea.</strong>
        <div className="preview-art preview-art-small" />
        <small>Creative profiles</small>
      </div>
      <div className="app-preview-panel app-preview-main">
        <div className="app-preview-topline"><strong>Cultgig</strong><span>Coming soon</span></div>
        <span className="app-preview-kicker">CULTGIG APP</span>
        <h3>Make room for what&apos;s next.</h3>
        <p>Discover creative talent, opportunities, and better conversations.</p>
        <div className="preview-art" />
        <div className="preview-row"><span>Discover</span><span>Connect</span><span>Create</span></div>
      </div>
      <div className="app-preview-panel app-preview-side app-preview-connect">
        <span className="app-preview-kicker">CONNECT</span>
        <strong>Start the right conversation.</strong>
        <div className="preview-message"><i /><span /><span /></div>
        <small>Meaningful introductions</small>
      </div>
    </div>
  );
}
