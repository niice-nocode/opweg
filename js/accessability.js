// Text Size Accessibility Controls
document.addEventListener('DOMContentLoaded', function() {
  const html = document.documentElement; // Target HTML element instead of body
  const sizeOptions = document.querySelectorAll('.accessibility_size-option');
  
  // Check for saved preference
  const savedSize = localStorage.getItem('textSize') || 'accessibility-text-regular';
  html.classList.add(savedSize);
  updateActiveState(savedSize);
  
  // Add click handlers
  sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
      const isRegular = this.classList.contains('is--regular');
      const isMedium = this.classList.contains('is--medium');
      const isLarge = this.classList.contains('is--large');
      
      // Remove all text size classes
      html.classList.remove('accessibility-text-regular', 'accessibility-text-medium', 'accessibility-text-large');
      
      // Add the selected class
      if (isRegular) {
        html.classList.add('accessibility-text-regular');
        localStorage.setItem('textSize', 'accessibility-text-regular');
        updateActiveState('accessibility-text-regular');
      } else if (isMedium) {
        html.classList.add('accessibility-text-medium');
        localStorage.setItem('textSize', 'accessibility-text-medium');
        updateActiveState('accessibility-text-medium');
      } else if (isLarge) {
        html.classList.add('accessibility-text-large');
        localStorage.setItem('textSize', 'accessibility-text-large');
        updateActiveState('accessibility-text-large');
      }
    });
    
    // Add keyboard accessibility
    option.setAttribute('role', 'button');
    option.setAttribute('tabindex', '0');
    option.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Update active state styling
  function updateActiveState(activeSize) {
    sizeOptions.forEach(option => {
      option.classList.remove('is--active');
      
      if (
        (activeSize === 'accessibility-text-regular' && option.classList.contains('is--regular')) ||
        (activeSize === 'accessibility-text-medium' && option.classList.contains('is--medium')) ||
        (activeSize === 'accessibility-text-large' && option.classList.contains('is--large'))
      ) {
        option.classList.add('is--active');
      }
    });
  }
});