document.addEventListener('DOMContentLoaded', function () {

  // Smooth scroll for nav links
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Back to top button
  var backToTopBtn = document.getElementById('backToTop');
  var topEl = document.getElementById('top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    topEl.scrollIntoView({ behavior: 'smooth' });
  });

  // Phase image auto-cycle (Phase1 -> Phase2 -> Phase3 -> loop)
  var phaseImages = document.querySelectorAll('.phase-image');
  var currentPhase = 0;

  if (phaseImages.length > 0) {
    setInterval(function () {
      phaseImages[currentPhase].classList.remove('active');
      currentPhase = (currentPhase + 1) % phaseImages.length;
      phaseImages[currentPhase].classList.add('active');
    }, 3000);
  }

});


