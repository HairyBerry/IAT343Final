"use strict"

const slider = document.getElementById("indexCarousel");
const slides = document.querySelectorAll(".carousel-item");
const button = document.querySelectorAll(".carousel-button");




/* Caresoul Tutorial was referred from https://codepen.io/YousifW/pen/yLeroBz */
if(button.length > 0){
let current = 1;
let prev = 0;
let next = 2;

const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);
const gotoNext = () => current < 2 ? gotoNum(current + 1) : gotoNum(0);

const gotoNum = number => {
    current = number;
    prev = current - 1;
    next = current + 1;

    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      slides[i].classList.remove("prev");
      slides[i].classList.remove("next");
    }

    if (next == 3) {
      next = 0;
    }

    if (prev == -1) {
      prev = 2;
    }

    var link = "ocean.html";
    if(current == 2){
      link = "sky.html";
    }
    else if(current == 0){
      link = "forest.html";
    }
    else if(current == 1){
      link = "ocean.html";
    }

    slides[current].classList.add("active");
    slides[current].classList.remove("hide");

    slides[prev].classList.add("prev");
    slides[prev].classList.add("hide");

    slides[next].classList.add("next");
    slides[next].classList.add("hide");


  }

  for (let i = 0; i < button.length; i++) {

      button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());

    }
  }
