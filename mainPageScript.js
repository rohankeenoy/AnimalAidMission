// https://stackoverflow.com/a/43704679
document.getElementById("scroll-button").addEventListener("click", (event) => {
    document.getElementById("more-info-header").scrollIntoView({
        behavior: 'smooth'
    });
});
 
document.getElementById("more_info_button").addEventListener("click", (event) => {
    window.open("https://www.stoponlinepuppymills.org/", "_blank");
});