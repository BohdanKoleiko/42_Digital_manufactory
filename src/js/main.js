"use strict";

const cards = document.querySelectorAll(".card");
const tabs = document.querySelectorAll(".tab");
const heroImage = document.querySelector(".hero__image path");

function isInViewport(element) {
   const { top, left, bottom, right } = element.getBoundingClientRect();
   return (
      top >= 0 &&
      left >= 0 &&
      bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      right <= (window.innerWidth || document.documentElement.clientWidth)
   );
}

tabs.forEach((tab, i) => {
   const tabIcon = tab.querySelector("figure");

   tab.addEventListener("click", (e) => {
      e.preventDefault();
      cards[i].scrollIntoView({ behavior: "smooth", block: "center" });
      heroImage.setAttribute("fill", window.getComputedStyle(tabIcon).backgroundColor);
   });
});
