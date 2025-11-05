// GSAP ScrollTrigger - Section Background Color Change with Attributes
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Map attribute values to CSS variables
  const colorMap = {
    'dark': 'var(--background-color--dark)',
    'light': 'var(--background-color--light)',
    'green': 'var(--background-color--green)',
    'blue': 'var(--background-color--blue)',
    // Add more color mappings as needed
  };
  
  // Find all elements with the background-color-theme attribute
  const sections = document.querySelectorAll('[background-color-theme]');
  
  if (sections.length === 0) return;
  
  // Apply ScrollTrigger to each section
  sections.forEach((section) => {
    const themeValue = section.getAttribute('background-color-theme');
    const bgColor = colorMap[themeValue];
    
    if (bgColor) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%', // When section hits middle of viewport
        end: 'bottom 50%',
        onEnter: () => changeBackground(bgColor),
        onEnterBack: () => changeBackground(bgColor),
        // markers: true // Uncomment to see trigger points (debug mode)
      });
    }
  });
  
  // Function to change background with GSAP animation
  function changeBackground(color) {
    gsap.to('body', {
      backgroundColor: color,
      duration: 0.4,
      ease: 'power2.out'
    });
  }
  
  // Set initial background color from first section
  const firstSection = sections[0];
  if (firstSection) {
    const firstTheme = firstSection.getAttribute('background-color-theme');
    const firstColor = colorMap[firstTheme];
    if (firstColor) {
      gsap.set('body', { backgroundColor: firstColor });
    }
  }
});