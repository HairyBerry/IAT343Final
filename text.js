var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

var tagline = document.getElementById("delay-1");
var button = document.getElementById("delay-2");

anime.timeline({loop: false})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  })


function loadText(){
  tagline.style.transitionDelay = '2.0s';
  tagline.style.transform = 'translateY(0px)';
  tagline.style.opacity = 1;
  console.log(tagline);
  button.style.transitionDelay = '3s';
  button.style.opacity = 1;
  button.style.transform = 'translateY(0px)';
  console.log("Working");

}
