const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const togglePassword = document.getElementById("togglePassword");

// email validation
function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === ""){
        emailError.textContent = "Email is required";
        return false;
    }
    
    if (!emailPattern.test(email.value.trim())){
        emailError.textContent = "Enter a valid email";
        return false;
    }

    emailError.textContent = "";
    return true;
}

// password validation
function validatePassword(){
    if (password.value.trim() === ""){
        passwordError.textContent = "Password is required";
        return false;
    }
    if (password.value.length < 8){
        passwordError.textContent = "Password must be at least 8 characters";
        return false;
    }
    passwordError.textContent = "";
    return true;
}
togglePassword.addEventListener("click",() =>{
    if (password.type === "password"){
        password.type = "text";
        togglePassword.classList.remove("ph-eye");
        togglePassword.classList.add("ph-eye-slash");
    } else {
        password.type = "password";
        togglePassword.classList.remove("ph-eye-slash");
        togglePassword.classList.add("ph-eye");
    }
});

// live validation
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);

// form submit
loginForm.addEventListener("submit", function (e){
    e.preventDefault();

    const emailValid = validateEmail();
    const passwordValid = validatePassword();

    if (emailValid && passwordValid){
        alert("Login Successful!");
    }
});
