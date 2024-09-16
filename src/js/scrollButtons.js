const scrollTopButton = document.getElementById("logoFooter");

scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});