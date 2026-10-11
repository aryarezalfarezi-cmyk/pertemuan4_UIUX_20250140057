const pages = document.querySelectorAll(".page");
const pageButtons = document.querySelectorAll("[data-page]");
const navLinks = document.querySelectorAll(".nav-link");
const messages = document.getElementById("messages");
const chatForm = document.getElementById("chat-form");
const questionInput = document.getElementById("question");

function showPage(id) {
  const target = document.getElementById(id);
  if (!target) return;

  pages.forEach((page) => {
    const isActive = page === target;
    page.classList.toggle("active", isActive);
    page.setAttribute("aria-hidden", String(!isActive));
  });

  navLinks.forEach((link) => {
    const isActive = link.dataset.page === id;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = `msg ${type}`;
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function choose(option) {
  addMessage(option, "user");

  if (option === "Produk") {
    addMessage("Berikut informasi produk yang tersedia. Silakan lihat detail List Gypsum atau tanyakan produk lain kepada kami.", "bot");
    window.setTimeout(() => showPage("detail"), 400);
  } else if (option === "Pemasangan") {
    addMessage("Toko Seni Gypsum menyediakan informasi layanan pemasangan. Silakan hubungi toko untuk informasi dan pemesanan lebih lanjut.", "bot");
  } else {
    addMessage("Silakan tuliskan pertanyaan Anda. Saya akan membantu memberikan informasi berdasarkan data yang tersedia.", "bot");
    questionInput.focus();
  }
}

function sendQuestion(event) {
  event.preventDefault();
  const question = questionInput.value.trim();
  if (!question) {
    questionInput.focus();
    return;
  }

  addMessage(question, "user");
  questionInput.value = "";

  window.setTimeout(() => {
    if (/pasang|pemasangan/i.test(question)) {
      addMessage("Untuk informasi pemasangan gypsum, silakan pilih topik Layanan pemasangan atau hubungi toko.", "bot");
    } else if (/produk|gypsum|hollow|cat/i.test(question)) {
      addMessage("Untuk melihat informasi produk, silakan pilih menu Produk. Anda juga bisa bertanya lebih lanjut kepada kami.", "bot");
    } else {
      addMessage("Maaf, pertanyaan belum dikenali. Silakan coba kata kunci produk atau pemasangan.", "bot");
    }
  }, 350);
}

pageButtons.forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

document.querySelectorAll("[data-page-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(link.dataset.pageLink);
  });
});

document.querySelectorAll("[data-choice]").forEach((button) => {
  button.addEventListener("click", () => choose(button.dataset.choice));
});

chatForm.addEventListener("submit", sendQuestion);
