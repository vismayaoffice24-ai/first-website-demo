/**
 * Dr. Neelima - Nephrologist & Kidney Specialist, Kannur
 * Master Client-Side Application Script (js/main.js)
 * Handles curtain transitions, navigation, dynamic fields,
 * WhatsApp forms, EmailJS confirmations, scroll progress, scroll reveal, and tilt effects.
 */

(function () {
  "use strict";

  // Helper to read EmailJS configuration safely from js/config.js or window
  function getEmailConfig() {
    if (typeof window !== "undefined" && window.EMAILJS_CONFIG) {
      return window.EMAILJS_CONFIG;
    }
    if (typeof CONFIG !== "undefined" && CONFIG.emailjs) {
      return CONFIG.emailjs;
    }
    return {
      publicKey: "AKQHr6OCf_s1cOXcg",
      serviceId: "service_mq7h8s8",
      templateId: "template_1dj11uf",
      doctorEmail: "drneelima@gmail.com",
      hospitalName: "MIMS Hospital, Kannur"
    };
  }

  // 1. Initial Page Load & Curtain Sweep-Away
  function initCurtainOnLoad() {
    var cur = document.getElementById("cur");
    if (!cur) return;

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      cur.style.display = "none";
      return;
    }

    // Ensure curtain starts covering or at 0 if coming from page transition, then sweeps away
    cur.style.pointerEvents = "none";
    requestAnimationFrame(function () {
      cur.style.transition = "transform 0.45s cubic-bezier(0.7, 0, 0.3, 1)";
      cur.style.transform = "translateY(-100%)";
      setTimeout(function () {
        cur.style.transition = "none";
        cur.style.transform = "translateY(100%)";
      }, 480);
    });
  }

  // 2. Page Navigation Curtain Transition
  function setupPageTransitions() {
    var cur = document.getElementById("cur");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) return;

      var href = link.getAttribute("href");
      if (!href) return;

      // Ignore external links, hash-only anchors, mailto, tel, javascript, new tabs
      if (
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        href.startsWith("http://") ||
        href.startsWith("https://")
      ) {
        return;
      }

      // Only handle internal HTML page links
      if (href.endsWith(".html") || href.includes(".html#") || href === "./" || href === "/") {
        if (reducedMotion || !cur) return; // Allow normal navigation without animation

        e.preventDefault();
        cur.style.transition = "transform 0.38s cubic-bezier(0.7, 0, 0.3, 1)";
        cur.style.transform = "translateY(0)";

        setTimeout(function () {
          window.location.href = href;
        }, 400);
      }
    });
  }

  // 3. Render Doctor Information from CONFIG
  function populateDoctorDetails() {
    if (typeof CONFIG === "undefined" || !CONFIG.doctor) return;
    var doc = CONFIG.doctor;

    // Replace text in [data-c] elements
    document.querySelectorAll("[data-c]").forEach(function (el) {
      var key = el.dataset.c;
      if (doc[key] !== undefined) {
        el.textContent = doc[key];
      }
    });

    // Wire telephone links
    document.querySelectorAll("[data-tel]").forEach(function (el) {
      el.href = "tel:" + doc.tel;
      if (!el.textContent.trim() && el.dataset.c === undefined) {
        el.textContent = doc.phone;
      }
    });

    // Wire email links
    document.querySelectorAll("[data-mail]").forEach(function (el) {
      el.href = "mailto:" + doc.email;
      if (!el.textContent.trim() && el.dataset.c === undefined) {
        el.textContent = doc.email;
      }
    });

    // Wire WhatsApp float button & links
    document.querySelectorAll(".wa, [data-wa]").forEach(function (el) {
      el.href = "https://wa.me/" + doc.wa;
    });

    // Wire directions buttons
    document.querySelectorAll("#dir, .btn-directions, [data-directions]").forEach(function (el) {
      el.href = doc.mapLink;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });

    // Canonical & OG URL injection if siteUrl is specified
    if (CONFIG.siteUrl && CONFIG.siteUrl.trim() !== "") {
      var currentPath = window.location.pathname.replace(/^\//, "");
      var fullUrl = CONFIG.siteUrl.replace(/\/$/, "") + "/" + (currentPath || "index.html");

      var canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = fullUrl;

      var ogUrl = document.querySelector("meta[property='og:url']");
      if (!ogUrl) {
        ogUrl = document.createElement("meta");
        ogUrl.setAttribute("property", "og:url");
        document.head.appendChild(ogUrl);
      }
      ogUrl.content = fullUrl;
    }
  }

  // 4. Highlight Active Navigation Pill
  function highlightActiveNavigation() {
    var rawPath = window.location.pathname;
    var filename = rawPath.substring(rawPath.lastIndexOf("/") + 1) || "index.html";

    var activeSection = "home";
    if (filename === "index.html" || filename === "") {
      activeSection = "home";
    } else if (filename === "about.html") {
      activeSection = "about";
    } else if (filename === "services.html" || filename.startsWith("service-")) {
      activeSection = "services";
    } else if (filename === "conditions.html" || filename.startsWith("condition-")) {
      activeSection = "conditions";
    } else if (filename === "reviews-faq.html") {
      activeSection = "faq";
    } else if (filename === "blog.html" || filename.startsWith("blog-")) {
      activeSection = "blog";
    } else if (filename === "contact.html") {
      activeSection = "contact";
    } else if (filename === "appointment.html") {
      activeSection = "appointment";
    }

    document.querySelectorAll("#links a[data-n]").forEach(function (link) {
      if (link.dataset.n === activeSection) {
        link.classList.add("act");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("act");
        link.removeAttribute("aria-current");
      }
    });
  }

  // 5. Scroll Progress Bar
  function setupProgressBar() {
    var bar = document.getElementById("bar");
    if (!bar) return;

    window.addEventListener(
      "scroll",
      function () {
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        bar.style.width = Math.min(100, Math.max(0, progress)) + "%";
      },
      { passive: true }
    );
  }

  // 6. Mobile Hamburger Menu
  function setupMobileMenu() {
    var burger = document.getElementById("burger");
    var links = document.getElementById("links");
    if (!burger || !links) return;

    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when clicking outside or clicking any link inside
    document.addEventListener("click", function (e) {
      if (!links.contains(e.target) && e.target !== burger) {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 7. Word-by-word Headline Animation on Hero
  function setupHeroHeadline() {
    var h1 = document.getElementById("h1");
    if (!h1 || h1.querySelector(".wd")) return; // already parsed

    var text = h1.textContent.trim();
    if (!text) return;

    var words = text.split(/\s+/);
    h1.innerHTML = words
      .map(function (w, i) {
        var delay = (0.1 + i * 0.08).toFixed(2);
        return (
          '<span class="wd"><i style="animation-delay:' +
          delay +
          's">' +
          w +
          "</i></span>"
        );
      })
      .join(" ");
  }

  // 8. Scroll-Reveal & Experience Count-Up Animation
  function setupScrollReveal() {
    var reveals = document.querySelectorAll(".rv");
    var cnt = document.getElementById("cnt");
    var countDone = false;

    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (el) {
        el.classList.add("in");
      });
      if (cnt && typeof CONFIG !== "undefined") {
        cnt.textContent = CONFIG.doctor.experienceYears || 14;
      }
      return;
    }

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      reveals.forEach(function (el) {
        el.classList.add("in");
      });
      if (cnt && typeof CONFIG !== "undefined") {
        cnt.textContent = CONFIG.doctor.experienceYears || 14;
      }
      return;
    }

    // Activate JS reveal animations only when JS and IntersectionObserver run successfully
    document.documentElement.classList.add("js-reveal");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);

            // Trigger count up if this container or element has #cnt
            if (cnt && !countDone && (entry.target === cnt || entry.target.contains(cnt))) {
              countDone = true;
              var targetNumber = parseInt(cnt.dataset.to, 10) || 14;
              var startTime = null;
              var duration = 1400; // ms

              function animateCount(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                cnt.textContent = Math.round(targetNumber * progress);
                if (progress < 1) {
                  requestAnimationFrame(animateCount);
                } else {
                  cnt.textContent = targetNumber;
                }
              }
              requestAnimationFrame(animateCount);
            }
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach(function (el, index) {
      el.style.transitionDelay = (index % 4) * 0.08 + "s";
      observer.observe(el);
    });
  }

  // 9. 3D Tilt Effect on Desktop Bento Tiles
  function setupTileTilt() {
    var isFinePointer = window.matchMedia("(pointer:fine)").matches;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (!isFinePointer || reducedMotion) return;

    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(800px) rotateY(" +
          (x * 7).toFixed(2) +
          "deg) rotateX(" +
          (-y * 7).toFixed(2) +
          "deg) translateY(-4px)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  // Helper functions for date and time formatting (local timezone)
  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function getLocalDateString(date) {
    var d = date || new Date();
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }

  function getLocalTimeString(date) {
    var d = date || new Date();
    return pad2(d.getHours()) + ":" + pad2(d.getMinutes());
  }

  // 10. Appointment Form Validation, EmailJS Confirmation & WhatsApp Hand-off
  function setupAppointmentForm() {
    var form = document.getElementById("appointment-form") || document.getElementById("f");
    if (!form) return;

    var dateInput = form.d;
    var timeInput = form.t;
    var st = document.getElementById("st");
    var successCard = document.getElementById("appointment-success");
    var bookAnotherBtn = document.getElementById("btn-book-another");

    // Helper to detect if a key is missing or still an unreplaced placeholder
    function isPlaceholderValue(val) {
      if (!val || typeof val !== "string") return true;
      var clean = val.trim();
      return (
        !clean ||
        clean.indexOf("YOUR_") !== -1 ||
        clean.indexOf("PASTE_") !== -1 ||
        clean.indexOf("placeholder") !== -1
      );
    }

    // Initialize EmailJS browser SDK if available and valid public key
    var activeEmailConfig = getEmailConfig();
    if (typeof emailjs !== "undefined" && typeof emailjs.init === "function") {
      if (activeEmailConfig && !isPlaceholderValue(activeEmailConfig.publicKey)) {
        try {
          emailjs.init({ publicKey: activeEmailConfig.publicKey });
          console.log("[EmailJS] SDK initialized with public key:", activeEmailConfig.publicKey);
        } catch (err) {
          console.error("[EmailJS] Initialization error:", err);
        }
      } else {
        console.warn("[EmailJS] SDK loaded, but public key is not configured.");
      }
    }

    function updateTimeRestrictions() {
      if (!dateInput || !timeInput) return;
      var now = new Date();
      var todayStr = getLocalDateString(now);
      var currentTimeStr = getLocalTimeString(now);

      // Keep date min set to today's date (local timezone)
      dateInput.min = todayStr;

      if (dateInput.value === todayStr) {
        timeInput.min = currentTimeStr;
        if (timeInput.value && timeInput.value <= currentTimeStr) {
          timeInput.value = "";
          if (st && st.style.color !== "var(--aqt)") {
            st.textContent = "Please select a future date and time.";
            st.style.color = "#E53E3E";
          }
        }
      } else {
        timeInput.removeAttribute("min");
      }
    }

    if (dateInput) {
      dateInput.min = getLocalDateString();
      dateInput.addEventListener("change", function () {
        updateTimeRestrictions();
        if (st && st.textContent === "Please select a future date and time.") {
          st.textContent = "";
        }
      });
      dateInput.addEventListener("input", function () {
        updateTimeRestrictions();
      });
    }

    if (timeInput) {
      timeInput.addEventListener("change", function () {
        var now = new Date();
        var todayStr = getLocalDateString(now);
        var currentTimeStr = getLocalTimeString(now);
        if (dateInput && dateInput.value === todayStr && timeInput.value && timeInput.value <= currentTimeStr) {
          timeInput.value = "";
          if (st) {
            st.textContent = "Please select a future date and time.";
            st.style.color = "#E53E3E";
          }
        } else if (st && st.textContent === "Please select a future date and time.") {
          st.textContent = "";
        }
      });
      timeInput.addEventListener("input", function () {
        var now = new Date();
        var todayStr = getLocalDateString(now);
        var currentTimeStr = getLocalTimeString(now);
        if (dateInput && dateInput.value === todayStr && timeInput.value && timeInput.value <= currentTimeStr) {
          timeInput.value = "";
          if (st) {
            st.textContent = "Please select a future date and time.";
            st.style.color = "#E53E3E";
          }
        }
      });
    }

    function renderSuccessState(name, mobile, email, formattedDate, formattedTime, visitType, reason, whatsappUrl, emailStatus) {
      if (!successCard) return;

      // Hide the form
      form.style.display = "none";

      // Populate Success Card Header & Intro
      var nameEl = document.getElementById("success-name");
      if (nameEl) nameEl.textContent = name;

      var emailMsgEl = document.getElementById("success-email-line");
      var emailEl = document.getElementById("success-email");
      var emailNote = document.getElementById("email-note");

      var hasEmail = (email && email !== "-" && email.indexOf("@") !== -1);

      if (hasEmail && emailStatus && emailStatus.sent === true) {
        if (emailEl) emailEl.textContent = email;
        if (emailMsgEl) {
          emailMsgEl.style.display = "inline";
          emailMsgEl.innerHTML = 'Confirmation email sent to <strong id="success-email" style="color:var(--ink);">' + email + '</strong>.';
        }
        if (emailNote) {
          emailNote.style.display = "none";
          emailNote.innerHTML = "";
        }
      } else {
        if (emailMsgEl) {
          emailMsgEl.style.display = "inline";
          if (!hasEmail) {
            emailMsgEl.textContent = "The clinic will confirm your appointment by phone/WhatsApp.";
          } else {
            emailMsgEl.textContent = "We could not send the confirmation email, the clinic will confirm by phone/WhatsApp.";
          }
        }
        if (emailNote) {
          if (emailStatus && emailStatus.unconfigured) {
            emailNote.style.display = "block";
            emailNote.style.background = "rgba(229, 62, 62, 0.08)";
            emailNote.style.borderColor = "rgba(229, 62, 62, 0.25)";
            emailNote.style.color = "var(--ink)";
            emailNote.innerHTML = '<strong>EmailJS Setup Notice:</strong> Confirmation email was not dispatched because EmailJS keys are still set to default placeholders in <code>js/config.js</code>. Once you paste your real keys, emails will send automatically. Your appointment request has been prepared for WhatsApp below.';
          } else if (!hasEmail) {
            emailNote.style.display = "none";
            emailNote.innerHTML = "";
          } else {
            emailNote.style.display = "block";
            emailNote.style.background = "rgba(229, 62, 62, 0.08)";
            emailNote.style.borderColor = "rgba(229, 62, 62, 0.25)";
            emailNote.style.color = "var(--ink)";
            emailNote.innerHTML = '<strong>Notice:</strong> We could not send the confirmation email, the clinic will confirm by phone/WhatsApp.';
          }
        }
      }

      // Populate Requested Details
      var dName = document.getElementById("detail-name");
      if (dName) dName.textContent = name;
      var dMobile = document.getElementById("detail-mobile");
      if (dMobile) dMobile.textContent = mobile;
      var dEmail = document.getElementById("detail-email");
      if (dEmail) dEmail.textContent = email;
      var dDate = document.getElementById("detail-date");
      if (dDate) dDate.textContent = formattedDate;
      var dTime = document.getElementById("detail-time");
      if (dTime) dTime.textContent = formattedTime;
      var dVisit = document.getElementById("detail-visittype");
      if (dVisit) dVisit.textContent = visitType;
      var dReason = document.getElementById("detail-reason");
      if (dReason) dReason.textContent = reason;

      // Link WhatsApp button on success card
      var waBtn = document.getElementById("success-wa-btn");
      if (waBtn) {
        waBtn.href = whatsappUrl;
      }

      // Show the success card
      successCard.style.display = "block";
      successCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (bookAnotherBtn) {
      bookAnotherBtn.addEventListener("click", function () {
        if (successCard) successCard.style.display = "none";
        form.reset();
        form.style.display = "grid";
        if (st) st.textContent = "";
        updateTimeRestrictions();
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.n ? form.n.value : "").trim();
      var mobile = (form.m ? form.m.value : "").trim();
      var date = form.d ? form.d.value : "";
      var email = (form.e ? form.e.value : "").trim() || "-";
      var time = (form.t ? form.t.value : "").trim() || "-";
      var visitType = form.v ? form.v.value : "In-person consultation";
      var reason = (form.r ? form.r.value : "").trim() || "-";

      if (!name || !mobile || !date) {
        if (st) {
          st.textContent = "Please enter your name, mobile number and preferred date.";
          st.style.color = "#E53E3E";
        }
        return;
      }

      var now = new Date();
      var todayStr = getLocalDateString(now);
      var currentTimeStr = getLocalTimeString(now);

      // Validate date is not in the past
      if (date < todayStr) {
        if (st) {
          st.textContent = "Please select a future date and time.";
          st.style.color = "#E53E3E";
        }
        return;
      }

      // If date is today and time is provided, validate time is in the future
      if (date === todayStr && time && time !== "-") {
        if (time <= currentTimeStr) {
          if (st) {
            st.textContent = "Please select a future date and time.";
            st.style.color = "#E53E3E";
          }
          if (timeInput) {
            timeInput.value = "";
          }
          return;
        }
      }

      // Convert YYYY-MM-DD to DD-MM-YYYY for WhatsApp message using string split (avoids timezone issues)
      var formattedDate = date;
      if (date && date.indexOf("-") !== -1) {
        var dParts = date.split("-");
        if (dParts.length === 3) {
          formattedDate = dParts[2] + "-" + dParts[1] + "-" + dParts[0];
        }
      }

      // Convert HH:MM (24-hour) to 12-hour format with AM/PM
      var formattedTime = time;
      if (time && time !== "-" && time.indexOf(":") !== -1) {
        var tParts = time.split(":");
        var hour = parseInt(tParts[0], 10);
        var minute = tParts[1].substring(0, 2);
        var ampm = hour >= 12 ? "PM" : "AM";
        var hour12 = hour % 12;
        if (hour12 === 0) {
          hour12 = 12;
        }
        formattedTime = hour12 + ":" + minute + " " + ampm;
      }

      var messageText =
        "Appointment request for Dr. Neelima\n" +
        "Name: " + name + "\n" +
        "Mobile: " + mobile + "\n" +
        "Email: " + email + "\n" +
        "Preferred Date: " + formattedDate + "\n" +
        "Preferred Time: " + formattedTime + "\n" +
        "Visit Type: " + visitType + "\n" +
        "Reason for Visit: " + reason;

      var waNumber = (typeof CONFIG !== "undefined" && CONFIG.doctor) ? CONFIG.doctor.wa : "919037822668";
      var whatsappUrl = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(messageText);

      // Loading state on submit button
      var submitBtn = form.querySelector('button[type="submit"]');
      var origBtnHtml = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending confirmation...';
      }
      if (st) {
        st.textContent = "Sending confirmation and opening WhatsApp...";
        st.style.color = "var(--aqt)";
      }

      // Template params for EmailJS
      var activeConfig = getEmailConfig();
      var hospitalName = (activeConfig && activeConfig.hospitalName) ? activeConfig.hospitalName : "MIMS Hospital, Kannur";
      var doctorEmail = (activeConfig && activeConfig.doctorEmail) ? activeConfig.doctorEmail : ((typeof CONFIG !== "undefined" && CONFIG.doctor) ? CONFIG.doctor.email : "drneelima@gmail.com");

      var templateParams = {
        to_name: name,
        to_email: (email && email !== "-") ? email : "",
        mobile: mobile,
        preferred_date: formattedDate,
        preferred_time: formattedTime,
        visit_type: visitType,
        reason: reason,
        hospital_name: hospitalName,
        doctor_name: (typeof CONFIG !== "undefined" && CONFIG.doctor) ? CONFIG.doctor.name : "Dr. Neelima",
        doctor_email: doctorEmail
      };

      function triggerEmail() {
        if (!activeConfig) {
          console.warn("[EmailJS] No configuration found.");
          return Promise.resolve({ sent: false, reason: "No config" });
        }

        var isConfigured = Boolean(
          typeof emailjs !== "undefined" &&
          typeof emailjs.send === "function" &&
          activeConfig &&
          !isPlaceholderValue(activeConfig.publicKey) &&
          !isPlaceholderValue(activeConfig.serviceId) &&
          !isPlaceholderValue(activeConfig.templateId)
        );

        if (!isConfigured) {
          console.warn(
            "[EmailJS] Sending skipped: EmailJS keys in js/config.js are not configured or still placeholders.\n" +
            "  - publicKey: " + (activeConfig && activeConfig.publicKey ? activeConfig.publicKey : "missing") + "\n" +
            "  - serviceId: " + (activeConfig && activeConfig.serviceId ? activeConfig.serviceId : "missing") + "\n" +
            "  - templateId: " + (activeConfig && activeConfig.templateId ? activeConfig.templateId : "missing") + "\n" +
            "Please paste your real EmailJS keys in js/config.js to activate automated patient emails."
          );
          return Promise.resolve({ sent: false, unconfigured: true });
        }

        var hasEmail = (email && email !== "-" && email.indexOf("@") !== -1);
        if (!hasEmail) {
          console.log("[EmailJS] No valid patient email address entered. Skipping confirmation email.");
          return Promise.resolve({ sent: false, noEmail: true });
        }

        console.log("[EmailJS] Sending confirmation email to " + email + " with template params:", templateParams);

        var sendPromises = [];
        sendPromises.push(
          emailjs.send(activeConfig.serviceId, activeConfig.templateId, templateParams, activeConfig.publicKey)
            .then(function (response) {
              console.log("[EmailJS] Success Response (Patient):", response.status, response.text, response);
              return { success: true, response: response };
            })
            .catch(function (error) {
              console.error(
                "[EmailJS] Send Failed (Patient)!\n" +
                "  Status: " + ((error && error.status) || "N/A") + "\n" +
                "  Text: " + ((error && error.text) || (error && error.message) || error) + "\n" +
                "  Full Error:", error
              );
              return { success: false, error: error };
            })
        );

        // If a separate doctor template is defined, send copy to doctor as well
        if (activeConfig.doctorTemplateId && !isPlaceholderValue(activeConfig.doctorTemplateId)) {
          var docParams = Object.assign({}, templateParams, { to_email: doctorEmail, to_name: "Dr. Neelima" });
          sendPromises.push(
            emailjs.send(activeConfig.serviceId, activeConfig.doctorTemplateId, docParams, activeConfig.publicKey)
              .then(function (res) {
                console.log("[EmailJS] Success Response (Doctor copy):", res.status, res.text, res);
                return { success: true, response: res };
              })
              .catch(function (err) {
                console.error("[EmailJS] Send Failed (Doctor copy):", (err && err.status) || "N/A", (err && err.text) || err, err);
                return { success: false, error: err };
              })
          );
        }

        return Promise.all(sendPromises).then(function (results) {
          var patientResult = results[0];
          if (patientResult && patientResult.success) {
            return { sent: true, response: patientResult.response };
          } else {
            return { sent: false, error: (patientResult && patientResult.error) || results };
          }
        });
      }

      triggerEmail().then(function (result) {
        // Reset button state
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnHtml;
        }

        // Keep existing WhatsApp flow: automatically open pre-filled WhatsApp link
        try {
          window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        } catch (err) {
          console.warn("WhatsApp popup intercepted:", err);
        }

        // Transition form to Success State Card
        renderSuccessState(name, mobile, email, formattedDate, formattedTime, visitType, reason, whatsappUrl, result);
      });
    });
  }

  // 11. Contact Form Validation & WhatsApp Hand-off
  function setupContactForm() {
    var contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var st = document.getElementById("contact-st");
      var name = (contactForm.cn ? contactForm.cn.value : "").trim();
      var mobile = (contactForm.cm ? contactForm.cm.value : "").trim();
      var email = (contactForm.ce ? contactForm.ce.value : "").trim() || "-";
      var message = (contactForm.cmsg ? contactForm.cmsg.value : "").trim();

      if (!name || !mobile || !message) {
        if (st) {
          st.textContent = "Please provide your name, mobile number and query.";
          st.style.color = "#E53E3E";
        }
        return;
      }

      var q = function (s) {
        return encodeURIComponent(s);
      };

      var msg =
        "Enquiry for Dr. Neelima (MIMS Hospital, Kannur)%0A" +
        "Name: " + q(name) + "%0A" +
        "Mobile: " + q(mobile) + "%0A" +
        "Email: " + q(email) + "%0A" +
        "Message: " + q(message);

      var waNumber = (typeof CONFIG !== "undefined" && CONFIG.doctor) ? CONFIG.doctor.wa : "919037822668";

      if (st) {
        st.textContent = "Opening WhatsApp with your enquiry...";
        st.style.color = "var(--aqt)";
      }

      var whatsappUrl = "https://wa.me/" + waNumber + "?text=" + msg;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  // Helper to trigger existing hero entrance animations (.au, h1#h1, #cnt)
  function triggerHeroAnimations() {
    document.body.classList.remove("intro-active");
    try { setupHeroHeadline(); } catch (err) { console.warn("setupHeroHeadline:", err); }
    try { setupScrollReveal(); } catch (err) { console.warn("setupScrollReveal:", err); }
  }

  // 12. First-Impression Brand Intro Animation (index.html only)
  function setupIntroAnimation() {
    var intro = document.getElementById("intro");
    if (!intro) return false;

    // Check prefers-reduced-motion
    var reducedMotion = false;
    try {
      reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {}

    // Check sessionStorage
    var alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("neelima_intro_seen") === "1";
    } catch (e) {}

    if (reducedMotion || alreadySeen) {
      document.body.classList.remove("intro-active", "intro-locked");
      if (intro.parentNode) intro.parentNode.removeChild(intro);
      return false;
    }

    // Lock body scroll and mark intro active to pause hero aurora drift
    document.body.classList.add("intro-active", "intro-locked");

    var isEnded = false;
    var timerId = null;

    function finishIntro(instant) {
      if (isEnded) return;
      isEnded = true;
      if (timerId) clearTimeout(timerId);

      // Record in session storage so it never replays in this session
      try {
        sessionStorage.setItem("neelima_intro_seen", "1");
      } catch (e) {}

      // Trigger hero entrance animations right as curtain starts lifting
      triggerHeroAnimations();

      // Unlock body scroll
      document.body.classList.remove("intro-locked");

      if (instant) {
        intro.style.transition = "opacity 0.28s ease, transform 0.35s ease";
        intro.style.opacity = "0";
        intro.style.transform = "translateY(-100%)";
        setTimeout(function () {
          if (intro.parentNode) intro.parentNode.removeChild(intro);
        }, 360);
      } else {
        intro.classList.add("intro-exit");
        var onTransEnd = function () {
          intro.removeEventListener("transitionend", onTransEnd);
          if (intro.parentNode) intro.parentNode.removeChild(intro);
        };
        intro.addEventListener("transitionend", onTransEnd);
        setTimeout(function () {
          if (intro.parentNode) intro.parentNode.removeChild(intro);
        }, 900);
      }

      // Cleanup event listeners
      document.removeEventListener("keydown", handleKey);
      intro.removeEventListener("click", handleClick);
    }

    // Skip button
    var skipBtn = document.getElementById("intro-skip");
    if (skipBtn) {
      skipBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        finishIntro(true);
      });
    }

    // End on click anywhere on overlay
    function handleClick(e) {
      finishIntro(false);
    }
    intro.addEventListener("click", handleClick);

    // End on key press (Escape, Space, Enter, or any key)
    function handleKey(e) {
      finishIntro(false);
    }
    document.addEventListener("keydown", handleKey, { once: true });

    // Auto-advance sequence (2.65s presentation before curtain lift)
    timerId = setTimeout(function () {
      finishIntro(false);
    }, 2650);

    return true;
  }

  // Initialize all components safely with guards and error isolation
  function initApp() {
    try { initCurtainOnLoad(); } catch (err) { console.warn("initCurtainOnLoad:", err); }
    try { setupPageTransitions(); } catch (err) { console.warn("setupPageTransitions:", err); }
    try { populateDoctorDetails(); } catch (err) { console.warn("populateDoctorDetails:", err); }
    try { highlightActiveNavigation(); } catch (err) { console.warn("highlightActiveNavigation:", err); }
    try { setupProgressBar(); } catch (err) { console.warn("setupProgressBar:", err); }
    try { setupMobileMenu(); } catch (err) { console.warn("setupMobileMenu:", err); }

    // First-impression intro animation (index.html only)
    var hasIntro = false;
    try {
      hasIntro = setupIntroAnimation();
    } catch (err) {
      console.warn("setupIntroAnimation:", err);
    }

    // If intro is not active, run hero animations immediately
    if (!hasIntro) {
      try { setupHeroHeadline(); } catch (err) { console.warn("setupHeroHeadline:", err); }
      try { setupScrollReveal(); } catch (err) { console.warn("setupScrollReveal:", err); }
    }

    try { setupTileTilt(); } catch (err) { console.warn("setupTileTilt:", err); }
    try { setupAppointmentForm(); } catch (err) { console.warn("setupAppointmentForm:", err); }
    try { setupContactForm(); } catch (err) { console.warn("setupContactForm:", err); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
