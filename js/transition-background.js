// GSAP ScrollTrigger - Section Background Color Change with Attributes
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Map attribute values to CSS variables
  const colorMap = {
    'dark': 'var(--background-color--dark)',
    'light': 'var(--background-color--light)',
    // Add more color mappings as needed
  };
  
  // Track current theme (not the CSS variable, but the theme name)
  let currentTheme = null;
  
  // Store the animation tween to kill it if needed
  let bgTween = null;
  
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
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => changeBackground(themeValue, bgColor),
        onEnterBack: () => changeBackground(themeValue, bgColor),
        // markers: true // Uncomment to see trigger points (debug mode)
      });
    }
  });
  
  // Function to change background with GSAP animation
  function changeBackground(theme, color) {
    // Only animate if theme is different
    if (theme !== currentTheme) {
      // Kill any ongoing animation
      if (bgTween) {
        bgTween.kill();
      }
      
      // Create new animation
      bgTween = gsap.to('body', {
        backgroundColor: color,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    // Always update current theme (even if we didn't animate)
    currentTheme = theme;
  }
  
  // Set initial background color from first section
  const firstSection = sections[0];
  if (firstSection) {
    const firstTheme = firstSection.getAttribute('background-color-theme');
    const firstColor = colorMap[firstTheme];
    if (firstColor) {
      gsap.set('body', { backgroundColor: firstColor });
      currentTheme = firstTheme;
    }
  }
});