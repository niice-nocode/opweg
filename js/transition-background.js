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
  
  let activeTheme = null;

  // Find all elements with the background-color-theme attribute
  const sections = document.querySelectorAll('[background-color-theme]');
  
  if (sections.length === 0) return;
  
  // Apply ScrollTrigger to each section
  sections.forEach((section) => {
    const themeValue = section.getAttribute('background-color-theme');
    const bgColor = colorMap[themeValue];
            console.log('section before:', section)

    
    if (bgColor) {
              console.log('section:', section)

      ScrollTrigger.create({
        trigger: section,
        start: 'top 10px', // When section hits middle of viewport
        end: 'bottom 10px',
        onEnter: () => changeBackground(bgColor, themeValue),
        onEnterBack: () => changeBackground(bgColor, themeValue),
        markers: true // Uncomment to see trigger points (debug mode)
      });
    }
  });
  
  // Function to change background with GSAP animation
  function changeBackground(color, theme) {
      console.log('activeTheme:', activeTheme, ' | section themeValue:', theme);

    if (activeTheme !== theme) {
      gsap.to('body', {
        backgroundColor: color,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          activeTheme = theme;
          console.log('Animation complete, activeTheme is now:', activeTheme);
        }
      });
    } else {
      return;
    }
  }
  
  // Set initial background color from first section
  const firstSection = sections[0];
  if (firstSection) {
    const firstTheme = firstSection.getAttribute('background-color-theme');
    const firstColor = colorMap[firstTheme];
    if (firstColor) {
      gsap.set('body', { backgroundColor: firstColor });
      activeTheme = firstTheme;
      console.log('Initial theme:', activeTheme);
    }
  }
});