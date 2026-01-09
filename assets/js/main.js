// Parallax scrolling for app rows
document.addEventListener('DOMContentLoaded', () => {
  const appRows = document.querySelectorAll('.app-row');

  // Duplicate icons for seamless scrolling effect
  appRows.forEach(row => {
    const track = row.querySelector('.app-track');
    const icons = track.innerHTML;
    track.innerHTML = icons + icons + icons;
  });

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY;

    appRows.forEach(row => {
      const track = row.querySelector('.app-track');
      const direction = row.dataset.direction;
      const speed = parseFloat(row.dataset.speed) || 0.15;

      // Get current transform value
      const currentTransform = track.style.transform;
      const match = currentTransform.match(/translateX\(([^)]+)px\)/);
      let currentX = match ? parseFloat(match[1]) : 0;

      // Calculate new position based on scroll direction
      if (direction === 'right') {
        currentX += delta * speed;
      } else {
        currentX -= delta * speed;
      }

      // Get track width for wrapping
      const trackWidth = track.scrollWidth / 3;

      // Wrap around
      if (currentX > 0) {
        currentX -= trackWidth;
      } else if (currentX < -trackWidth) {
        currentX += trackWidth;
      }

      track.style.transform = `translateX(${currentX}px)`;
    });

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // Initial position to center the icons
  appRows.forEach(row => {
    const track = row.querySelector('.app-track');
    const trackWidth = track.scrollWidth / 3;
    track.style.transform = `translateX(-${trackWidth / 2}px)`;
  });
});

// Modal functions
function openModal() {
  document.getElementById('contact-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('contact-modal').classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('contact-modal');
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
