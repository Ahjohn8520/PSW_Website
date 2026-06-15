// ============================================================
// Render a gallery from image data
// ============================================================
function renderGallery(containerId, images) {
  const container = document.getElementById(containerId);
  if (!container || !images || images.length === 0) return;

  container.innerHTML = images.map((img, i) => {
    return `<div class="gallery-item">
      <img src="${img.src}" alt="${img.alt || 'Image ' + (i+1)}" loading="lazy" oncontextmenu="return false" />
      ${img.label ? `<div class="overlay">${img.label}</div>` : ''}
    </div>`;
  }).join('');
}

// ============================================================
// DOM ready
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // Mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  }

  // Active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Use LOCAL_IMAGES if available (from gallery-local.js), else GALLERY (CDN fallback)
  renderGallery('gallery-home', (typeof LOCAL_IMAGES !== 'undefined' ? LOCAL_IMAGES.home : GALLERY.home));
  renderGallery('gallery-work', (typeof LOCAL_IMAGES !== 'undefined' ? LOCAL_IMAGES.work : GALLERY.work));

  // Lightbox for work page
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('#gallery-work .gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.remove('hidden');
        }
      });
    });

    const closeLightbox = () => lightbox.classList.add('hidden');
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        closeLightbox();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

});
