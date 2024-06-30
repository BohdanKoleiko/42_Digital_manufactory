"use strict";

document.addEventListener("DOMContentLoaded", () => {
   const cards = document.querySelectorAll(".card");
   const tabs = document.querySelectorAll(".tab");
   const heroImage = document.querySelectorAll("[class|='hero__image'] path");
   let widthOfWindow = window.innerWidth || document.documentElement.clientWidth;

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
      tabs.forEach((tab, i) => {
         tab.classList.remove("tab__active");
         cards[i].classList.remove("hero__card_active");
      });
   };

   const addActiveClass = function (index) {
      tabs[index].classList.add("tab__active");
      cards[index].classList.add("hero__card_active");
   };

   const setBackgroundColor = function (index) {
      const tabIcon = tabs[index].querySelector("figure");
      heroImage.forEach((img) => {
         img.setAttribute("fill", window.getComputedStyle(tabIcon).backgroundColor);
      });
   };

   const initialization = function (index = 0) {
      removeActiveClass();
      addActiveClass(index);
      setBackgroundColor(index);
   };
   initialization();

   tabs.forEach((tab, i) => {
      tab.addEventListener("click", (e) => {
         e.preventDefault();
         cards[i].scrollIntoView({ behavior: "smooth", block: "center" });
         initialization(i);
      });
   });

   window.addEventListener("resize", () => {
      widthOfWindow = window.innerWidth || document.documentElement.clientWidth;
   });

   document.querySelector("body").addEventListener("scroll", () => {
      if (widthOfWindow >= 992) {
         cards.forEach((card, i) => {
            if (isInViewport(card)) {
               initialization(i);
            }
         });
      }
   });
});

//# sourceMappingURL=main.js.map
