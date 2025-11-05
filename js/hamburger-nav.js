function initCenteredScalingNavigationBar() {
  const navigationInnerItems = document.querySelectorAll("[data-navigation-item]")
  
  // Apply CSS transition delay
  navigationInnerItems.forEach((item, index)=> {
      item.style.transitionDelay = `${index * 0.05}s`;
  });
  
  // Toggle Navigation
  document.querySelectorAll('[data-navigation-toggle="toggle"]').forEach(toggleBtn => {
    toggleBtn.addEventListener('click', () => {
      const navStatusEl = document.querySelector('[data-navigation-status]');
      if (!navStatusEl) return;
      if (navStatusEl.getAttribute('data-navigation-status') === 'not-active') {
        navStatusEl.setAttribute('data-navigation-status', 'active');
        // If you use Lenis you can 'stop' Lenis here: Example Lenis.stop();
      } else {
        navStatusEl.setAttribute('data-navigation-status', 'not-active');
        // If you use Lenis you can 'start' Lenis here: Example Lenis.start();
      }
    });
  });

  // Close Navigation
  document.querySelectorAll('[data-navigation-toggle="close"]').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const navStatusEl = document.querySelector('[data-navigation-status]');
      if (!navStatusEl) return;
      navStatusEl.setAttribute('data-navigation-status', 'not-active');
      // If you use Lenis you can 'start' Lenis here: Example Lenis.start();
    });
  });

  // Key ESC - Close Navigation
  document.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
      const navStatusEl = document.querySelector('[data-navigation-status]');
      if (!navStatusEl) return;
      if (navStatusEl.getAttribute('data-navigation-status') === 'active') {
        navStatusEl.setAttribute('data-navigation-status', 'not-active');
       // If you use Lenis you can 'start' Lenis here: Example Lenis.start();
      }
    }
  });
}

// Initialize Centered Scaling Navigation Bar
document.addEventListener('DOMContentLoaded', function() {
  initCenteredScalingNavigationBar();
});


// Get your navigation element
const navigation = document.querySelector('[data-navigation-status]');

if (navigation) {
  // Function to toggle body scroll
  const toggleBodyScroll = (status) => {
    if (status === 'active') {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
  };

  // Set initial state
  toggleBodyScroll(navigation.getAttribute('data-navigation-status'));

  // Watch for attribute changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-navigation-status') {
        const status = navigation.getAttribute('data-navigation-status');
        toggleBodyScroll(status);
      }
    });
  });

  // Start observing
  observer.observe(navigation, { attributes: true });
}