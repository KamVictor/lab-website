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

// Hero parallax — image drifts slower than scroll for a smoother, more gradual feel
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroImages = document.querySelectorAll(".hero-image");

if (heroImages.length && !prefersReducedMotion) {
  let ticking = false;

  const updateParallax = () => {
    heroImages.forEach((img) => {
      const hero = img.closest(".hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = rect.top * -0.15;
      img.style.transform = `translateY(${offset}px) scale(1.1)`;
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
