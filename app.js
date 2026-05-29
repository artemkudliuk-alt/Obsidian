/**
 * OBSIDIAN YACHTS MANAGEMENT — STATIC TEXT DRIFT & ACTIVE CTA (V10)
 * Unified atmospheric breathing drift calculation at locked minimum intensity.
 */

document.addEventListener('DOMContentLoaded', () => {
  const bgVideo = document.getElementById('obsidian-video-bg');

  // Video Autoplay integrity
  if (bgVideo) {
    bgVideo.play().catch(error => {
      console.warn("Media Engine Autoplay Override Active: ", error);
    });
  }

  // Keyboard Accessibility
  const ctaBtn = document.getElementById('cta-action');
  if (ctaBtn) {
    ctaBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        ctaBtn.click();
      }
    });
  }

  const container = document.getElementById('kinetic-container');

  // Unified Render Loop for Autonomous Breathing Drift
  function renderLoop() {
    const time = Date.now();

    // Subtle breathing shimmer at locked minimum intensity: X: 0.5px, Y: 0.3px
    const driftX = Math.sin(time * 0.0002) * 0.5;
    const driftY = Math.cos(time * 0.0002) * 0.3;

    if (container) {
      container.style.setProperty('--mx-depth', `${driftX.toFixed(4)}px`);
      container.style.setProperty('--my-depth', `${driftY.toFixed(4)}px`);
    }

    requestAnimationFrame(renderLoop);
  }

  // Initialize hardware acceleration hint
  if (container) {
    container.style.willChange = 'transform';
  }

  requestAnimationFrame(renderLoop);
});
