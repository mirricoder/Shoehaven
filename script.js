document.addEventListener("DOMContentLoaded", function () {
  // Toggle mobile menu
  function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");

    const btn = document.getElementById("menu-btn");
    if (btn) {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !expanded);
    }
  }
  window.toggleMenu = toggleMenu;

  // Testimonial slider
  const slides = document.querySelectorAll('.testimonial-slide');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('hidden', i !== index);
      slide.classList.toggle('block', i === index);
    });
  }

  function autoSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;

  showSlide(currentIndex);
  setInterval(autoSlide, 5000);

  // FAQ Section
  const faqList = document.getElementById("faq-list");
  const questions = [
    { q: "What sizes are available for your shoes?", a: "We offer sizes ranging from US 5 to 13 for most styles. Availability may vary by product." },
    { q: "How can I track my order?", a: "Once your order ships, you’ll receive a tracking number via email to monitor delivery progress." },
    { q: "Do you offer returns or exchanges?", a: "Yes, we accept returns within 30 days of purchase as long as the shoes are unworn and in original packaging." },
    { q: "Are your shoes authentic?", a: "Absolutely. Shoe Haven guarantees 100% authentic and brand-new footwear." },
    { q: "Do you ship internationally?", a: "Currently, we only ship within the country, but international shipping is coming soon!" },
    { q: "Can I cancel or change my order after placing it?", a: "Orders can be modified within 2 hours of placing them. Contact our support team right away for changes." }
  ];

  function renderFAQs() {
    faqList.innerHTML = "";
    questions.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "bg-white rounded-lg shadow px-6 py-4 mb-2";
      div.innerHTML = `
        <button
          onclick="toggleAnswer(${index})"
          class="flex justify-between w-full text-left font-semibold"
          aria-expanded="false"
          aria-controls="answer-${index}"
          id="question-${index}"
        >
          <span>${item.q}</span>
          <span id="icon-${index}">+</span>
        </button>
        <div id="answer-${index}" class="mt-2 text-gray-600 hidden" role="region" aria-labelledby="question-${index}">
          <p>${item.a}</p>
        </div>`;
      faqList.appendChild(div);
    });
  }

  window.toggleAnswer = function (index) {
    const answer = document.getElementById(`answer-${index}`);
    const icon = document.getElementById(`icon-${index}`);
    const questionBtn = document.getElementById(`question-${index}`);
    const isHidden = answer.classList.contains("hidden");

    document.querySelectorAll('[id^="answer-"]').forEach(el => el.classList.add("hidden"));
    document.querySelectorAll('[id^="icon-"]').forEach(el => el.textContent = "+");
    document.querySelectorAll('button[aria-expanded]').forEach(btn => btn.setAttribute("aria-expanded", "false"));

    if (isHidden) {
      answer.classList.remove("hidden");
      icon.textContent = "−";
      questionBtn.setAttribute("aria-expanded", "true");
    }
  }

  window.addQuestion = function () {
    const qInput = document.getElementById("new-question");
    const aInput = document.getElementById("new-answer");
    const q = qInput.value.trim();
    const a = aInput.value.trim();

    if (q && a) {
      questions.push({ q, a });
      renderFAQs();
      qInput.value = "";
      aInput.value = "";
    } else {
      alert("Please enter both a question and an answer.");
    }
  }

  function showPopupMessage(message) {
    const popup = document.getElementById("popup-message");
    popup.textContent = message;
    popup.classList.remove("hidden");
    popup.style.opacity = "1";

    setTimeout(() => {
      popup.style.opacity = "0";
      setTimeout(() => popup.classList.add("hidden"), 300);
    }, 3000);
  }

  // ✅ Show popup only when contact form is submitted
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // prevent default form action (optional, depends on your setup)

      // show popup message
      showPopupMessage("Message sent successfully!");

      // reset the form
      contactForm.reset();
    });
  }

  renderFAQs();
});
