/**
 * OBSIDIAN YACHTS MANAGEMENT — PRECISION MOTION ENGINE (V16)
 * High-fidelity LERP-driven magnetic approach loop and 
 * extremely slow background idle breathing drift for contact elements.
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

  // Premium Interactive Email System
  const emailLinks = document.querySelectorAll('.email-contact-link');
  let mouseX = -9999;
  let mouseY = -9999;

  // Track window mousemove coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Track cursor exits
  window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget || e.relatedTarget.nodeName === "HTML") {
      mouseX = -9999;
      mouseY = -9999;
    }
  });

  // Establish state tracking list for individual elements
  const emailData = [];
  emailLinks.forEach((el) => {
    emailData.push({
      element: el,
      currentX: 0,
      currentY: 0
    });
  });

  const LERP_FACTOR = 0.02; // Very slow, premium hydraulic easing lag (extremely smooth & stable)
  const THRESHOLD = 120; // Proximity threshold radius: strictly 120px
  const MAX_MAG_MOVE = 3.5; // Maximum magnetic drag displacement (never exceeds 4px)

  let start = null;

  function renderLoop(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start; // Clean millisecond timer from 0 (no precision loss)

    // Faint, almost imperceptible autonomous breathing drift: max X: 1.0px, Y: 0.5px, slow cycle (~31s)
    const idleDriftX = Math.sin(elapsed * 0.0002) * 1.0;
    const idleDriftY = Math.cos(elapsed * 0.0002) * 0.5;

    emailData.forEach((data) => {
      // Check element visibility first
      if (data.element.offsetWidth === 0 && data.element.offsetHeight === 0) {
        return;
      }

      const rect = data.element.getBoundingClientRect();
      const emailX = rect.left + rect.width / 2;
      const emailY = rect.top + rect.height / 2;

      let targetX = idleDriftX;
      let targetY = idleDriftY;

      if (mouseX !== -9999 && mouseY !== -9999) {
        const dx = mouseX - emailX;
        const dy = mouseY - emailY;
        const distance = Math.hypot(dx, dy);

        if (distance <= THRESHOLD) {
          // Approach ratio factor: 0 at THRESHOLD, 1 at center
          const t = 1 - (distance / THRESHOLD);

          // Normalized unit direction vectors
          const ux = dx / distance;
          const uy = dy / distance;

          const magTargetX = ux * t * MAX_MAG_MOVE;
          const magTargetY = uy * t * MAX_MAG_MOVE;

          // Smoothly blend idle drift out and magnetic offsets in
          targetX = (1 - t) * idleDriftX + t * magTargetX;
          targetY = (1 - t) * idleDriftY + t * magTargetY;
        }
      }

      // Linear Interpolation (LERP) coordinate updates with high damping
      data.currentX += (targetX - data.currentX) * LERP_FACTOR;
      data.currentY += (targetY - data.currentY) * LERP_FACTOR;

      // Update hardware GPU translation matrix with sub-pixel float accuracy
      data.element.style.transform = `translate3d(${data.currentX.toFixed(4)}px, ${data.currentY.toFixed(4)}px, 0)`;
    });

    requestAnimationFrame(renderLoop);
  }

  // Pre-enable hardware acceleration will-change hint
  emailLinks.forEach((el) => {
    el.style.willChange = 'transform';
  });

  requestAnimationFrame(renderLoop);
});
