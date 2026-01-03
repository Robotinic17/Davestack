const btn = document.getElementById("theme-btn");

const currentTheme = localStorage.getItem("theme") || "light";

if (currentTheme === "dark") {
  document.documentElement.classList.add("dark");
  document.body.classList.add("dark");
}

btn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

// ===== EMAILJS INITIALIZATION =====
(function () {
  try {
    // Initialize EmailJS with your Public Key
    emailjs.init("TXTuiMPfbCzRRpGVX");
    console.log("EmailJS initialized successfully");
  } catch (error) {
    console.error("EmailJS initialization failed:", error);
  }
})();

// Particle Configuration
tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#5b5fc7",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
      random: true,
    },
    size: {
      value: 4,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#5b5fc7",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.5,
        },
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
});

const messages = [
  "UI/UX Designer.",
  "Frontend Developer.",
  "Full-Stack Developer.",
  "React & TypeScript Specialist.",
  "MERN Stack Developer.",
  "Building responsive web applications.",
  "Crafting intuitive user interfaces.",
  "Optimizing for performance.",
  "Designing seamless experiences.",
  "Turning ideas into products.",
  "Mechanical Engineering Student.",
  "Tech Enthusiast.",
  "Lifelong Learner.",
  "Problem Solver.",
];

class TypeWriter {
  constructor(element, messages, options = {}) {
    this.element = element;
    this.messages = messages;
    this.currentIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this.typingSpeed = options.typingSpeed || 100;
    this.deletingSpeed = options.deletingSpeed || 50;
    this.delayBetweenWords = options.delayBetweenWords || 2000;
    this.delayBeforeDelete = options.delayBeforeDelete || 1500;
  }

  type() {
    const currentMessage = this.messages[this.currentIndex];

    if (this.isDeleting) {
      this.element.textContent = currentMessage.substring(
        0,
        this.charIndex - 1
      );
      this.charIndex--;

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.currentIndex = (this.currentIndex + 1) % this.messages.length;
        setTimeout(() => this.type(), this.delayBetweenWords);
        return;
      }
      setTimeout(() => this.type(), this.deletingSpeed);
    } else {
      this.element.textContent = currentMessage.substring(
        0,
        this.charIndex + 1
      );
      this.charIndex++;

      if (this.charIndex === currentMessage.length) {
        this.isDeleting = true;
        setTimeout(() => this.type(), this.delayBeforeDelete);
        return;
      }

      const variance = Math.random() * 50;
      setTimeout(() => this.type(), this.typingSpeed + variance);
    }
  }

  start() {
    this.type();
  }
}

const textElement = document.getElementById("dynamic");
const typewriter = new TypeWriter(textElement, messages, {
  typingSpeed: 80,
  deletingSpeed: 40,
  delayBetweenWords: 500,
  delayBeforeDelete: 2000,
});

typewriter.start();

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".neu-link");
  const sections = document.querySelectorAll("section[id]");

  function setActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 80;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));

        const activeLink = document.querySelector(
          `.neu-link[href="#${sectionId}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });

    if (scrollY < 50) {
      navLinks.forEach((l) => l.classList.remove("active"));
      const homeLink = document.querySelector('.neu-link[href="#home"]');
      if (homeLink) homeLink.classList.add("active");
    }
  }

  window.addEventListener("scroll", setActiveLink);

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const targetId = link.getAttribute("href");

      if (targetId === "#" || targetId.toLowerCase() === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.querySelector(targetId);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });
});

const scrollTopBtn = document.getElementById("scroll-top-btn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");

      const skillItems = entry.target.querySelectorAll(".skill-item");
      skillItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animate");

          const progressBar = item.querySelector(".skill-progress");
          const targetWidth = progressBar.style.width;
          progressBar.style.setProperty("--progress-width", targetWidth);
        }, index * 100);
      });

      skillsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-category").forEach((category) => {
  skillsObserver.observe(category);
});

const WatcherOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      timelineObserver.unobserve(entry.target);
    }
  });
}, WatcherOptions);

document.querySelectorAll(".timeline-item").forEach((item) => {
  timelineObserver.observe(item);
});

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category.includes(filter)) {
        card.style.display = "block";
        setTimeout(() => card.classList.add("show"), 100);
      } else {
        card.classList.remove("show");
        setTimeout(() => (card.style.display = "none"), 400);
      }
    });
  });
});

const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 100);
        projectObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

projectCards.forEach((card) => {
  projectObserver.observe(card);
});

// ===== CONTACT FORM FUNCTIONALITY =====

document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message");
  const charCount = document.getElementById("charCount");

  if (messageInput && charCount) {
    messageInput.addEventListener("input", () => {
      const length = messageInput.value.length;
      charCount.textContent = `${length} / 1000`;
    });
  }

  const validateName = (name) => name.trim().length >= 2;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateSubject = (subject) => subject.trim().length >= 3;
  const validateMessage = (message) =>
    message.trim().length >= 10 && message.trim().length <= 1000;

  const setupValidation = (input, errorId, validator) => {
    if (!input) return;

    const errorElement = document.getElementById(errorId);

    input.addEventListener("blur", () => {
      const value = input.value.trim();

      if (value === "") {
        input.classList.remove("error", "success");
        errorElement.classList.remove("show");
      } else if (validator(value)) {
        input.classList.remove("error");
        input.classList.add("success");
        errorElement.classList.remove("show");
      } else {
        input.classList.add("error");
        input.classList.remove("success");
        errorElement.classList.add("show");
      }
    });

    input.addEventListener("input", () => {
      if (input.classList.contains("error") && validator(input.value.trim())) {
        input.classList.remove("error");
        input.classList.add("success");
        errorElement.classList.remove("show");
      }
    });
  };

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");

  if (nameInput) setupValidation(nameInput, "nameError", validateName);
  if (emailInput) setupValidation(emailInput, "emailError", validateEmail);
  if (subjectInput)
    setupValidation(subjectInput, "subjectError", validateSubject);
  if (messageInput)
    setupValidation(messageInput, "messageError", validateMessage);

  // Toast notification function
  const showToast = (message, type = "success") => {
    const toast = document.getElementById("toast");
    if (!toast) return;

    const toastMessage = toast.querySelector(".toast-message");
    const toastIcon = toast.querySelector(".toast-icon i");

    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;

    if (type === "success") {
      toastIcon.className = "bi bi-check-circle-fill";
    } else {
      toastIcon.className = "bi bi-x-circle-fill";
    }

    setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  };

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      const isNameValid = validateName(name);
      const isEmailValid = validateEmail(email);
      const isSubjectValid = validateSubject(subject);
      const isMessageValid = validateMessage(message);

      if (!isNameValid) {
        nameInput.classList.add("error");
        document.getElementById("nameError").classList.add("show");
      } else {
        nameInput.classList.remove("error");
        document.getElementById("nameError").classList.remove("show");
      }

      if (!isEmailValid) {
        emailInput.classList.add("error");
        document.getElementById("emailError").classList.add("show");
      } else {
        emailInput.classList.remove("error");
        document.getElementById("emailError").classList.remove("show");
      }

      if (!isSubjectValid) {
        subjectInput.classList.add("error");
        document.getElementById("subjectError").classList.add("show");
      } else {
        subjectInput.classList.remove("error");
        document.getElementById("subjectError").classList.remove("show");
      }

      if (!isMessageValid) {
        messageInput.classList.add("error");
        document.getElementById("messageError").classList.add("show");
      } else {
        messageInput.classList.remove("error");
        document.getElementById("messageError").classList.remove("show");
      }

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        showToast("Please fill in all required fields correctly", "error");
        return;
      }

      const submitBtn = contactForm.querySelector(".submit-btn");
      const btnText = submitBtn.querySelector(".btn-text");
      const originalText = btnText.textContent;
      btnText.textContent = "Sending...";
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      try {
        const now = new Date();
        const emailData = {
          name: name,
          email: email,
          subject: subject,
          message: message,
          date: now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          timestamp: now.toLocaleString(),
          page_url: window.location.href,
        };

        console.log("Sending email with data:", emailData);

        const response = await emailjs.send(
          "service_pypmk2d",
          "template_5ahdghb",
          emailData
        );

        console.log("Email sent successfully!", response);

        showToast(
          "Message sent successfully! I'll get back to you within 24 hours.",
          "success"
        );

        contactForm.reset();
        if (charCount) charCount.textContent = "0 / 1000";

        [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
          input.classList.remove("error", "success");
        });

        document.querySelectorAll(".error-message").forEach((error) => {
          error.classList.remove("show");
        });
      } catch (error) {
        console.error("Email sending failed:", error);

        let errorMessage = "Failed to send message";

        if (error.status === 0) {
          errorMessage += " - Please check your internet connection";
        } else if (error.status === 400) {
          errorMessage += " - Invalid form data";
        } else {
          errorMessage += " - Please try again or email me directly";
        }

        showToast(errorMessage, "error");
      } finally {
        btnText.textContent = originalText;
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      }
    });
  }

  document.querySelectorAll(".error-message").forEach((error) => {
    error.classList.remove("show");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// ===== REALISTIC LOADING SCREEN =====
let progress = 0;
const progressBar = document.getElementById("progressBar");
const percentage = document.getElementById("percentage");
const loader = document.getElementById("loader");

// Track what's loaded
const loadingStages = {
  dom: false,
  emailjs: false,
  images: false,
  fonts: false,
  particles: false,
};

// Smooth progress animation
function updateProgress(target) {
  const interval = setInterval(() => {
    if (progress < target) {
      progress += Math.random() * 3; // Slower, more realistic
      if (progress > target) progress = target;

      progressBar.style.width = progress + "%";
      percentage.textContent = Math.floor(progress) + "%";
    } else {
      clearInterval(interval);
    }
  }, 50);
}

// Stage 1: DOM Ready (20%)
document.addEventListener("DOMContentLoaded", () => {
  loadingStages.dom = true;
  updateProgress(20);
  console.log("✓ DOM loaded");
});

// Stage 2: EmailJS Ready (40%)
function checkEmailJS() {
  if (typeof emailjs !== "undefined") {
    loadingStages.emailjs = true;
    updateProgress(40);
    console.log("✓ EmailJS loaded");
  } else {
    setTimeout(checkEmailJS, 100);
  }
}
checkEmailJS();

// Stage 3: Images Loaded (70%)
function checkImages() {
  const images = document.querySelectorAll("img");
  let loadedCount = 0;

  if (images.length === 0) {
    loadingStages.images = true;
    updateProgress(70);
    console.log("✓ No images to load");
    return;
  }

  images.forEach((img) => {
    if (img.complete) {
      loadedCount++;
    } else {
      img.addEventListener("load", () => {
        loadedCount++;
        if (loadedCount === images.length) {
          loadingStages.images = true;
          updateProgress(70);
          console.log("✓ Images loaded");
        }
      });
      img.addEventListener("error", () => {
        loadedCount++;
        if (loadedCount === images.length) {
          loadingStages.images = true;
          updateProgress(70);
          console.log("⚠ Some images failed, continuing...");
        }
      });
    }
  });

  if (loadedCount === images.length) {
    loadingStages.images = true;
    updateProgress(70);
  }
}

// Stage 4: Fonts Loaded (85%)
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    loadingStages.fonts = true;
    updateProgress(85);
  });
} else {
  // Fallback if Font Loading API not supported
  setTimeout(() => {
    loadingStages.fonts = true;
    updateProgress(85);
  }, 1000);
}

// Stage 5: Particles Ready (95%)
function checkParticles() {
  if (typeof tsParticles !== "undefined") {
    loadingStages.particles = true;
    updateProgress(95);
  } else {
    setTimeout(checkParticles, 100);
  }
}
checkParticles();

// Final Stage: Everything Ready (100%)
function checkAllLoaded() {
  const allLoaded = Object.values(loadingStages).every(
    (stage) => stage === true
  );

  if (allLoaded) {
    updateProgress(100);

    // Hide loader smoothly
    setTimeout(() => {
      loader.classList.add("hidden");
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 500);
  } else {
    setTimeout(checkAllLoaded, 100);
  }
}

// Start checking images once DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  checkImages();
  checkAllLoaded();
});

// Fallback: Force complete after 10 seconds (safety net)
setTimeout(() => {
  if (progress < 100) {
    console.log("⚠ Loading timeout - forcing completion");
    progress = 100;
    progressBar.style.width = "100%";
    percentage.textContent = "100%";

    setTimeout(() => {
      loader.classList.add("hidden");
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 500);
  }
}, 3000);
// ===== INITIALIZE AOS =====
AOS.init();
