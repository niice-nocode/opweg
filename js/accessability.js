// Text Size Accessibility Controls
document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  const sizeOptions = document.querySelectorAll('.accessibility_size-option');
  
  // Check for saved preference
  const savedSize = localStorage.getItem('textSize') || 'text-size-regular';
  body.classList.add(savedSize);
  updateActiveState(savedSize);
  
  // Add click handlers
  sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
      const isRegular = this.classList.contains('is--regular');
      const isMedium = this.classList.contains('is--medium');
      const isLarge = this.classList.contains('is--large');
      
      // Remove all text size classes
      body.classList.remove('text-size-regular', 'text-size-medium', 'text-size-large');
      
      // Add the selected class
      if (isRegular) {
        body.classList.add('text-size-regular');
        localStorage.setItem('textSize', 'text-size-regular');
        updateActiveState('text-size-regular');
      } else if (isMedium) {
        body.classList.add('text-size-medium');
        localStorage.setItem('textSize', 'text-size-medium');
        updateActiveState('text-size-medium');
      } else if (isLarge) {
        body.classList.add('text-size-large');
        localStorage.setItem('textSize', 'text-size-large');
        updateActiveState('text-size-large');
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
        (activeSize === 'text-size-regular' && option.classList.contains('is--regular')) ||
        (activeSize === 'text-size-medium' && option.classList.contains('is--medium')) ||
        (activeSize === 'text-size-large' && option.classList.contains('is--large'))
      ) {
        option.classList.add('is--active');
      }
    });
  }
});