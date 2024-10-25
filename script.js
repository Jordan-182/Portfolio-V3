// GESTION DU SCROLL AU CLIC DE LA NAV //
document.querySelectorAll('.hero--nav li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
      });

      if(navLinksContainer.classList.contains('open')){
          navLinksContainer.classList.remove('open');
          hamburgerToggler.classList.toggle("open");
      };
  });
});

// GESTION DE LA CLASSE ACTIVE QUI MET LA COULEUR DANS LE LIEN DE LA SECTION OBSERVEE
const sections = document.querySelectorAll('section'); // Récupère les sections correspondant aux liens de la nav
const links = document.querySelector('.hero--nav li a'); // Récupère les liens de la nav

const observerOptions = {
    root: null, // Utilise la fenêtre du navigateur comme root
    rootMargin: '0px',
    threshold: 0.2 // A changer selon les besoins (0.5 signifie que 50% de la section doit être visible)
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      const id = entry.target.getAttribute('id'); // Prends l'ID de la section
      const navLink = document.querySelector(`.hero--nav li a[href="#${id}"]`);

      if (entry.isIntersecting) {
          // Ajouter la classe active au lien correspondant
          links.querySelectorAll('a').forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
      } else{
          navLink.classList.remove('active');
      };
  });
}, observerOptions);

// Observer chaque section
sections.forEach(section => {
  observer.observe(section);
});

// GESTION DU POSITIONNEMENT STICKY DE LA NAV //
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.hero--nav');
  const navContainer = document.querySelector('.hero--nav ul');
  const heroSection = document.querySelector('.hero');
  
  // On vérifie si le bas de .hero est visible dans la fenêtre
  const heroBottom = heroSection.getBoundingClientRect().bottom;
  
  if (heroBottom <= 300) {
      // Fixe la nav en haut si .hero n'est plus visible
      nav.style.position = 'fixed';
      nav.style.top = '30';
      nav.style.width = '100%';
      navContainer.style.background = 'rgba(0, 0, 0, 0.9)';
  } else {
      // Remet la nav en sticky quand on est dans .hero
      nav.style.position = 'sticky';
      navContainer.style.background = 'transparent';
  };
});


// LENIS SMOOTH SCROLL //
// Initialize Lenis
const lenis = new Lenis();

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);