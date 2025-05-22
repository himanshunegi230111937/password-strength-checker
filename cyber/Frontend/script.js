const password = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const togglePassword = document.getElementById("toggle-password");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// Condition elements
const conditions = {
  length: document.getElementById("length"),
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  number: document.getElementById("number"),
  special: document.getElementById("special"),
};

// Toggle password visibility
togglePassword.addEventListener("click", () => {
  const isText = password.type === "text";
  password.type = isText ? "password" : "text";
  togglePassword.textContent = isText ? "👁️" : "🙈";
});

// Update strength + conditions
password.addEventListener("input", () => {
  const val = password.value;

  const checks = {
    length: val.length >= 8,
    uppercase: /[A-Z]/.test(val),
    lowercase: /[a-z]/.test(val),
    number: /[0-9]/.test(val),
    special: /[\W_]/.test(val),
  };

  let passed = 0;

  for (const [key, valid] of Object.entries(checks)) {
    if (valid) {
      conditions[key].classList.add("valid");
      passed++;
    } else {
      conditions[key].classList.remove("valid");
    }
  }

  const percent = (passed / 5) * 100;
  strengthBar.style.width = percent + "%";

  if (passed === 5) {
    strengthText.textContent = "Strength: Strong";
    strengthBar.style.background = "#4caf50";
  } else if (passed >= 3) {
    strengthText.textContent = "Strength: Medium";
    strengthBar.style.background = "#fdd835";
  } else {
    strengthText.textContent = "Strength: Weak";
    strengthBar.style.background = "#ff3d00";
  }
});

// Theme toggle
themeIcon.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  themeIcon.textContent = body.classList.contains("light-mode") ? "☀️" : "🌙";
  localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
});

// Load theme from storage
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    themeIcon.textContent = "☀️";
  }
});
