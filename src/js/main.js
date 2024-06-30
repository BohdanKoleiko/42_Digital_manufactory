"use strict";

const cards = document.querySelectorAll(".card");
const tabs = document.querySelectorAll(".tab");
const heroImage = document.querySelector(".hero__image path");

const isInViewport = function (element) {
   const { top, left, bottom, right } = element.getBoundingClientRect();
   return (
      top >= 0 &&
      left >= 0 &&
      bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      right <= (window.innerWidth || document.documentElement.clientWidth)
   );
};

const removeActiveClass = function () {
   tabs.forEach((tab) => {
      tab.classList.remove("tab__active");
   });
};

const addActiveClass = function (index) {
   tabs[index].classList.add("tab__active");
};

const setBackgroundColor = function (index) {
   const tabIcon = tabs[index].querySelector("figure");
   heroImage.setAttribute("fill", window.getComputedStyle(tabIcon).backgroundColor);
   addActiveClass(index);
};
setBackgroundColor(0);

tabs.forEach((tab, i) => {
   tab.addEventListener("click", (e) => {
      e.preventDefault();
      cards[i].scrollIntoView({ behavior: "smooth", block: "center" });
      removeActiveClass();
      addActiveClass(i);
   });
});

document.querySelector("body").addEventListener("scroll", () => {
   cards.forEach((card, i) => {
      if (isInViewport(card)) {
         removeActiveClass();
         setBackgroundColor(i);
      }
   });
});
