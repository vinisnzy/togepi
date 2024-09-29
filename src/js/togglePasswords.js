const togglePasswords = document.querySelectorAll(".togglePassword")
const passwords = document.querySelectorAll(".password")

togglePasswords.forEach((toggle, index) => {
    toggle.addEventListener('click', function() {
        const type = passwords[index].getAttribute('type') === 'password' ? 'text' : 'password';
        passwords[index].setAttribute('type', type);

        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});