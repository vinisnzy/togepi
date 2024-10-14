export function initHeader() {
    const header = document.getElementById("header");
    let prevScrollPos = window.scrollY;

    window.onscroll = () => {
        const currentScrollPos = window.scrollY;
        header.style.top = prevScrollPos > currentScrollPos ? "0" : "-80px";
        prevScrollPos = currentScrollPos;
    };
}
