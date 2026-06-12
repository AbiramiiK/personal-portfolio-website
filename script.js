document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Mobile Navigation Toggle
  // =========================
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    document.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================
  // Theme Toggle
  // =========================
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // =========================
  // Smooth Scrolling
  // =========================
  document.querySelectorAll('.nav__link[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // =========================
  // Active Navigation Highlight
  // =========================
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  const sections = [...navLinks]
    .map((link) => {
      const id = link.getAttribute("href");
      return document.querySelector(id);
    })
    .filter(Boolean);

  const updateActiveNav = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;

      if (
        window.scrollY >= top &&
        window.scrollY < top + height
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  // =========================
  // Scroll Reveal Animation
  // =========================
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  // =========================
  // Skill Bar Animation
  // =========================
  const skillBars = document.querySelectorAll(".skill-card__bar");

  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percentage = bar.dataset.pct || "0";

          bar.style.width = "0%";
          bar.style.transition = "width 1.5s ease";

          requestAnimationFrame(() => {
            bar.style.width = `${percentage}%`;
          });

          observer.unobserve(bar);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  skillBars.forEach((bar) => {
    skillObserver.observe(bar);
  });

  // =========================
  // Contact Form Validation
  // =========================
  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const messageInput = document.getElementById("contactMessage");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const formSuccess = document.getElementById("formSuccess");

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const clearErrors = () => {
    if (nameError) nameError.textContent = "";
    if (emailError) emailError.textContent = "";
    if (messageError) messageError.textContent = "";
    if (formSuccess) formSuccess.textContent = "";
  };

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      clearErrors();

      let isValid = true;

      const name = nameInput?.value.trim() || "";
      const email = emailInput?.value.trim() || "";
      const message = messageInput?.value.trim() || "";

      if (!name) {
        isValid = false;
        if (nameError) {
          nameError.textContent = "Please enter your name.";
        }
      }

      if (!email) {
        isValid = false;
        if (emailError) {
          emailError.textContent = "Please enter your email address.";
        }
      } else if (!emailRegex.test(email)) {
        isValid = false;
        if (emailError) {
          emailError.textContent =
            "Please enter a valid email address.";
        }
      }

      if (!message) {
        isValid = false;
        if (messageError) {
          messageError.textContent = "Please enter a message.";
        }
      } else if (message.length < 10) {
        isValid = false;
        if (messageError) {
          messageError.textContent =
            "Message must be at least 10 characters long.";
        }
      }

      if (isValid) {
        if (formSuccess) {
          formSuccess.textContent =
            "Your message has been sent successfully!";
        }

        contactForm.reset();
      }
    });
  }

  // =========================
  // Back To Top Button
  // =========================
  const backToTop = document.getElementById("backToTop");

  const toggleBackToTop = () => {
    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  };

  window.addEventListener("scroll", toggleBackToTop);
  toggleBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});