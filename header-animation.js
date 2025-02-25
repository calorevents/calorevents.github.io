// List of image paths
const imagePaths = [
    "pics/test 1.png",
    "pics/test 2.png",
    "pics/test 3.png",
    "pics/test 4 ctx.png",
    "pics/test 5 ctx.png",
    "pics/test 6 ctx.png",
    "pics/test 6 cas.png",
    "pics/test 7 cas.png",
    "pics/test 8 stan.png",
    "pics/test stan 8.png",
    "pics/test 9 stan.png",
    "pics/test 10 pieter.png",
    "pics/test 11 pieter.png", 
    "pics/test 12 pieter.png",
    "pics/test 13 pieter.png",
    "pics/test 17 cas.png",
  ];
  
  // Initialize header animation
  function initHeaderAnimation() {
    const container = document.getElementById('imageContainer');
    if (!container) {
      console.error('Image container not found. Make sure to add an element with id "imageContainer"');
      return;
    }
    
    let headerHeight = document.querySelector('header').offsetHeight;
    
    // Create a new floating image
    function createRandomImage() {
      // Get random image from the array
      const randomIndex = Math.floor(Math.random() * imagePaths.length);
      const imagePath = imagePaths[randomIndex];
      
      // Create image element
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = "Decorative background";
      img.classList.add('floating-image');
      
      // Set random starting position (left side of screen)
      img.style.left = "-50px";
      img.style.top = Math.floor(Math.random() * (headerHeight - 48)) + "px";
      
      // Add to container
      container.appendChild(img);
      
      // Animate the image
      const duration = 6000 + Math.random() * 500; // 5-8 seconds
      const start = performance.now();
      const startLeft = -50;
      const endLeft = window.innerWidth + 50; // Just beyond right edge
      
      function animate(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Calculate new position (left to right)
        const newLeft = startLeft + (endLeft - startLeft) * progress;
        img.style.left = newLeft + "px";
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Remove image once it's off-screen
          img.remove();
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    // Start creating images at intervals
    function startImageAnimation() {
      // Initial batch of images
      for (let i = 0; i < 1; i++) {
        setTimeout(() => createRandomImage(), i * 1000);
      }
      
      // Create new image every 800-1500ms
      setInterval(() => {
        createRandomImage();
      }, 900 + Math.random() * 200);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
      // Update header height measurement
      headerHeight = document.querySelector('header').offsetHeight;
    });
    
    // Start animation
    startImageAnimation();
  }
  
  // Run initialization when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initHeaderAnimation);