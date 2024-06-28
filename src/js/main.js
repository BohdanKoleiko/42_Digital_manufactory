"use strict";

const cards = document.querySelectorAll(".card");
const tabs = document.querySelectorAll(".tab");
const heroImage = document.querySelector(".hero__image path");

const colors = [
   "rgb(90, 88, 207)",
   "rgb(64, 139, 252)",
   "rgb(79, 98, 88)",
   "rgb(249, 210, 112)",
   "rgb(207, 109, 88)",
];

tabs.forEach((tab, i) => {
   tab.addEventListener("click", (e) => {
      e.preventDefault();
      cards[i].scrollIntoView({ behavior: "smooth", block: "center" });
      heroImage.style.transition = "all 0.3s";
      heroImage.setAttribute("fill", colors[i]);
   });
});

document.querySelector("body").addEventListener("scroll", () => {
   console.log();
});

//function isInViewport(element) {
//   const rect = element.getBoundingClientRect();
//   return (
//      rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
//   );
//}
