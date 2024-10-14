const togglePasswords = document.querySelectorAll(".togglePassword");
const passwords = document.querySelectorAll(".password");

togglePasswords.forEach((toggle, index) => {
    toggle.addEventListener("click", () => {
        const passwordField = passwords[index];
        const isPassword = passwordField.type === "password";

        passwordField.type = isPassword ? "text" : "password";
        toggle.classList.toggle("fa-eye", isPassword);
        toggle.classList.toggle("fa-eye-slash", !isPassword);
    });
});
