// Optional: Reset animation when dropdown closes
document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown_list');
  
  dropdowns.forEach(dropdown => {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          const isOpen = dropdown.classList.contains('w--open');
          
          if (!isOpen) {
            // Reset the animation by removing and re-adding the class
            const links = dropdown.querySelectorAll('.dropdown-link');
            links.forEach(link => {
              link.style.animation = 'none';
              setTimeout(() => {
                link.style.animation = '';
              }, 10);
            });
          }
        }
      });
    });
    
    observer.observe(dropdown, {
      attributes: true
    });
  });
});
