// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer map toggle
const mapToggle = document.getElementById("mapToggle");
const mapEmbed = document.getElementById("mapEmbed");

if (mapToggle && mapEmbed) {
  mapToggle.addEventListener("click", () => {
    const isHidden = mapEmbed.hasAttribute("hidden");
    if (isHidden) {
      mapEmbed.removeAttribute("hidden");
      mapToggle.textContent = "Close the map";
    } else {
      mapEmbed.setAttribute("hidden", "");
      mapToggle.textContent = "Open the map";
    }
    mapToggle.setAttribute("aria-expanded", String(isHidden));
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Hero parallax — the animated gradient layer drifts slower than scroll for depth
const heroMedia = document.querySelectorAll(".hero-media");

if (heroMedia.length && !prefersReducedMotion) {
  let ticking = false;

  const updateParallax = () => {
    heroMedia.forEach((media) => {
      const hero = media.closest(".hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = Math.max(Math.min(rect.top * -0.15, 50), -50);
      media.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  };

  updateParallax();
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );
}

// Scroll-reveal animations
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Animated section transitions — each full-page section scales/fades in as it
// becomes the active "slide" and recedes when it isn't, repeatable both ways.
const snapSections = document.querySelectorAll("html.snap-page .hero, html.snap-page .section, html.snap-page .site-footer");

if (snapSections.length && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-active", entry.isIntersecting);
      });
    },
    { threshold: 0.6 }
  );

  snapSections.forEach((section) => sectionObserver.observe(section));
} else {
  snapSections.forEach((section) => section.classList.add("is-active"));
}

// 3D tilt on cards — follows the cursor, desktop-with-mouse only
const tiltEls = document.querySelectorAll(".panel-card, .profile-card, .preview-grid .list-item");
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (tiltEls.length && canHover && !prefersReducedMotion) {
  const maxTilt = 8;

  tiltEls.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${(-y * maxTilt).toFixed(2)}deg) rotateY(${(x * maxTilt).toFixed(2)}deg) scale(1.03) translateY(-4px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(800px)";
    });
  });
}

// Word-by-word hero text reveal — splits text into words, then reveals them
// with a stagger on load and every time the hero scrolls back into view.
const splitIntoWords = (el) => {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = "";
  words.forEach((word, i) => {
    const mask = document.createElement("span");
    mask.className = "word-mask";
    const inner = document.createElement("span");
    inner.className = "word-inner";
    inner.textContent = word;
    inner.style.transitionDelay = `${i * 0.05}s`;
    mask.appendChild(inner);
    el.appendChild(mask);
    el.appendChild(document.createTextNode(" "));
  });
};

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  document.querySelectorAll(".hero-content").forEach((content) => {
    [".hero-title", ".tagline", ".lede"].forEach((selector) => {
      const el = content.querySelector(selector);
      if (el) splitIntoWords(el);
    });

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-revealed", entry.isIntersecting);
        });
      },
      { threshold: 0.4 }
    );

    textObserver.observe(content);
  });
}
