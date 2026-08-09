/*
  NETLEAFA
  Phase image cross-dissolve

  Phase1 -> Phase2 -> Phase3 -> repeat

  The timing is intentionally slow and understated.
*/


document.addEventListener("DOMContentLoaded", () => {

  const images = [
    document.querySelector(".phase-image-one"),
    document.querySelector(".phase-image-two"),
    document.querySelector(".phase-image-three")
  ];

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /*
    Cross-dissolve settings.

    HOLD_TIME:
    How long each image remains visible.

    FADE_TIME:
    How long the transition between images takes.
  */

  const HOLD_TIME = 6500;
  const FADE_TIME = 3000;


  if (images.some(image => !image)) {
    return;
  }


  /*
    Preload the original image files so the transition
    doesn't wait for a file to download.
  */

  [
    "assets/Phase1.PNG",
    "assets/Phase2.PNG",
    "assets/Phase3.PNG"
  ].forEach(src => {
    const image = new Image();
    image.src = src;
  });


  /*
    The first image begins visible.
  */

  images.forEach((image, index) => {
    image.style.transition = `opacity ${FADE_TIME}ms ease-in-out`;
    image.style.opacity = index === 0 ? "1" : "0";
  });


  if (prefersReducedMotion) {
    return;
  }


  let current = 0;


  function showNextImage() {

    const next = (current + 1) % images.length;


    images[next].style.zIndex = "2";
    images[current].style.zIndex = "1";


    /*
      Force the browser to recognize the initial state
      before beginning the fade.
    */

    requestAnimationFrame(() => {

      images[next].style.opacity = "1";
      images[current].style.opacity = "0";

    });


    current = next;
  }


  function scheduleNext() {

    window.setTimeout(() => {

      showNextImage();

      scheduleNext();

    }, HOLD_TIME + FADE_TIME);

  }


  /*
    Begin the slow repeating sequence.
  */

  scheduleNext();


  /*
    Smooth navigation.

    CSS handles the actual smooth scrolling. This small
    handler makes sure the browser lands with the section
    itself positioned cleanly below the header.
  */

  const navigationLinks = document.querySelectorAll(
    ".main-nav a[href^='#']"
  );


  navigationLinks.forEach(link => {

    link.addEventListener("click", event => {

      const targetID = link.getAttribute("href");
      const target = document.querySelector(targetID);

      if (!target) {
        return;
      }

      event.preventDefault();

      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        Math.max(20, headerHeight * 0.08);

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });

      /*
        Keep the URL anchor in sync without forcing
        another browser jump.
      */

      if (history.replaceState) {
        history.replaceState(null, "", targetID);
      }

    });

  });

});
