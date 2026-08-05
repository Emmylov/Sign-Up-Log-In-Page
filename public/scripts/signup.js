// Signup form validation with live feedback
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

function validateName() {
  const value = nameInput.value.trim();
  if (value === '') {
    nameError.textContent = 'Full name is required';
    return false;
  }
  if (value.length < 2) {
    nameError.textContent = 'Please enter your full name';
    return false;
  }
  nameError.textContent = '';
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value === '') {
    emailError.textContent = 'Email is required';
    return false;
  }
  if (!re.test(value)) {
    emailError.textContent = 'Enter a valid email';
    return false;
  }
  emailError.textContent = '';
  return true;
}

function passwordStrength(password) {
  const checks = {
    length: password.length >= 8,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
  return checks;
}

function validatePassword() {
  const value = passwordInput.value;
  if (value.trim() === '') {
    passwordError.textContent = 'Password is required';
    return false;
  }
  const checks = passwordStrength(value);
  const passed = Object.values(checks).every(Boolean);
  if (!passed) {
    const missing = [];
    if (!checks.length) missing.push('at least 8 characters');
    if (!checks.upper) missing.push('an uppercase letter');
    if (!checks.lower) missing.push('a lowercase letter');
    if (!checks.number) missing.push('a number');
    if (!checks.special) missing.push('a special character');
    passwordError.textContent = 'Password must include ' + missing.join(', ');
    return false;
  }
  passwordError.textContent = '';
  return true;
}

function validateConfirmPassword() {
  const p = passwordInput.value;
  const c = confirmPasswordInput.value;
  if (c.trim() === '') {
    confirmPasswordError.textContent = 'Please confirm your password';
    return false;
  }
  if (p !== c) {
    confirmPasswordError.textContent = "Passwords don't match";
    return false;
  }
  confirmPasswordError.textContent = '';
  return true;
}

// Toggle password visibility
function toggleVisibility(toggleBtn, inputEl) {
  toggleBtn.addEventListener('click', () => {
    if (inputEl.type === 'password') {
      inputEl.type = 'text';
      toggleBtn.classList.remove('ph-eye');
      toggleBtn.classList.add('ph-eye-slash');
    } else {
      inputEl.type = 'password';
      toggleBtn.classList.remove('ph-eye-slash');
      toggleBtn.classList.add('ph-eye');
    }
  });
}

if (togglePassword && passwordInput) toggleVisibility(togglePassword, passwordInput);
if (toggleConfirmPassword && confirmPasswordInput) toggleVisibility(toggleConfirmPassword, confirmPasswordInput);

// Live validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', () => {
  validatePassword();
  // also re-validate confirm if present
  if (confirmPasswordInput.value.length) validateConfirmPassword();
});
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

signupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const validName = validateName();
  const validEmail = validateEmail();
  const validPassword = validatePassword();
  const validConfirm = validateConfirmPassword();
  const agreed = termsCheckbox.checked;

  if (!agreed) {
    alert('You must agree to the terms to continue.');
    return;
  }

  if (validName && validEmail && validPassword && validConfirm && agreed) {
    // In a real app you'd send the data to the server here
    alert('Signup successful! You can now log in.');
    // Optionally redirect to the login page
    window.location.href = 'index.html';
  }
});
