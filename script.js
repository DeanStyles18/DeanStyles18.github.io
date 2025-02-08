// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })
  
  // Navbar scroll effect with visibility
  const navbar = document.querySelector(".navbar")
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      navbar.classList.add("show")
    } else {
      navbar.classList.remove("show")
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  })
  
  // Ensure navbar starts invisible
  document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector(".navbar")
    navbar.classList.remove("show")
  })
  
  // Reveal animations on scroll
  const revealElements = document.querySelectorAll(".service-card, .project-card, .about-content, .contact-content")
  
  const revealOnScroll = () => {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.8) {
        element.classList.add("reveal");
      } else {
        element.classList.remove("reveal");
      }
    });
  }
  
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Initial check
  
  // Contact button functionality
  document.querySelector(".contact-btn").addEventListener("click", () => {
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" })
  })

  // Projects View More and Image Modal
  document.addEventListener('DOMContentLoaded', () => {
    const viewMoreBtn = document.getElementById('view-more-projects');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const projectCards = document.querySelectorAll('.project-card');

    // Add images to project cards
    const projectImages = [
        '/placeholder.svg?height=500&width=800',
        '/placeholder.svg?height=500&width=800',
        '/placeholder.svg?height=500&width=800',
        '/placeholder.svg?height=500&width=800',
        '/placeholder.svg?height=500&width=800',
        '/placeholder.svg?height=500&width=800',
        '/placeholder.svg?height=500&width=800'
    ];

    // Create modal for images
    const createImageModal = () => {
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        modal.innerHTML = `
            <div class="image-modal-content">
                <img src="" alt="Project Image" style="width: 100%; height: auto;">
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        return modal;
    };

    const imageModal = createImageModal();

    viewMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Toggle hidden projects
        hiddenProjects.forEach((project, index) => {
            project.classList.toggle('hidden-project');
            
            // Add image to project card if not already added
            if (!project.querySelector('.project-image')) {
                const projectImageDiv = document.createElement('div');
                projectImageDiv.classList.add('project-image');
                const img = document.createElement('img');
                img.src = projectImages[index + 2];
                img.alt = project.querySelector('h3').textContent;
                
                // Add click event to show image in modal
                img.addEventListener('click', () => {
                    const modalImg = imageModal.querySelector('img');
                    modalImg.src = img.src;
                    imageModal.classList.add('show');
                });

                projectImageDiv.appendChild(img);
                project.appendChild(projectImageDiv);
            }
        });

        // Update button text
        viewMoreBtn.textContent = viewMoreBtn.textContent === 'View More Projects' 
            ? 'View Less Projects' 
            : 'View More Projects';
    });
});

// Project Details Overlay
document.addEventListener('DOMContentLoaded', () => {
    // Create project details overlay
    const createProjectDetailsOverlay = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('project-details-overlay');
        overlay.innerHTML = `
            <div class="project-details-content">
                <button class="project-details-close">&times;</button>
                <div class="project-details-images"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Close button functionality
        const closeBtn = overlay.querySelector('.project-details-close');
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('show');
        });

        // Close overlay when clicking outside content
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('show');
            }
        });

        return overlay;
    };

    const projectDetailsOverlay = createProjectDetailsOverlay();

    // Add event listeners to all "View Details" links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get project details from data attributes
            const projectCard = link.closest('.project-card');
            const projectName = projectCard.dataset.projectName;
            const projectVideo = projectCard.dataset.projectVideo;

            // Update overlay content
            const overlayImages = projectDetailsOverlay.querySelector('.project-details-images');

            // Clear previous content
            overlayImages.innerHTML = '';

            // Add project images
            if (projectName === 'Virtual Try-On') {
                const img = document.createElement('img');
                img.src = 'images/projects/p2a.png';
                img.alt = projectName;
                
                // Add click to zoom functionality for image
                img.addEventListener('click', () => {
                    const zoomModal = document.createElement('div');
                    zoomModal.classList.add('image-modal');
                    zoomModal.innerHTML = `
                        <div class="image-modal-content">
                            <h2 class="image-modal-title">${projectName}</h2>
                            <img src="images/projects/p2a.png" alt="${projectName}">
                        </div>
                    `;
                    document.body.appendChild(zoomModal);
                    
                    zoomModal.classList.add('show');
                    zoomModal.addEventListener('click', () => {
                        zoomModal.classList.remove('show');
                        setTimeout(() => {
                            document.body.removeChild(zoomModal);
                        }, 500);
                    });
                });

                overlayImages.appendChild(img);

                // Add video link below the image
                if (projectVideo) {
                    const videoLinkContainer = document.createElement('div');
                    videoLinkContainer.innerHTML = `
                        <a href="${projectVideo}" target="_blank" style="display: block; text-align: center; margin-top: 1rem; color: var(--secondary); text-decoration: none;">
                            View Project Demo
                        </a>
                    `;
                    overlayImages.appendChild(videoLinkContainer);
                }
            }
            
            // Add images for Meloverse
            if (projectName === 'Meloverse') {
                const meloverseImages = [
                    'images/projects/p1a.jpg',
                    'images/projects/p1b.jpg',
                    'images/projects/p1c.jpg'
                ];

                meloverseImages.forEach(imageSrc => {
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = projectName;
                    
                    // Add click to zoom functionality for images
                    img.addEventListener('click', () => {
                        const zoomModal = document.createElement('div');
                        zoomModal.classList.add('image-modal');
                        zoomModal.innerHTML = `
                            <div class="image-modal-content">
                                <h2 class="image-modal-title">${projectName}</h2>
                                <img src="${imageSrc}" alt="${projectName}">
                            </div>
                        `;
                        document.body.appendChild(zoomModal);
                        
                        zoomModal.classList.add('show');
                        zoomModal.addEventListener('click', () => {
                            zoomModal.classList.remove('show');
                            setTimeout(() => {
                                document.body.removeChild(zoomModal);
                            }, 500);
                        });
                    });

                    overlayImages.appendChild(img);
                });
            }

            // Add images for Enchanted Events
            if (projectName === 'Enchanted Events') {
                const enchantedEventsImages = [
                    'images/projects/p3a.jpg',
                    'images/projects/p3b.jpg',
                    'images/projects/p3c.jpg'
                ];

                enchantedEventsImages.forEach(imageSrc => {
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = projectName;
                    
                    // Add click to zoom functionality for images
                    img.addEventListener('click', () => {
                        const zoomModal = document.createElement('div');
                        zoomModal.classList.add('image-modal');
                        zoomModal.innerHTML = `
                            <div class="image-modal-content">
                                <h2 class="image-modal-title">${projectName}</h2>
                                <img src="${imageSrc}" alt="${projectName}">
                            </div>
                        `;
                        document.body.appendChild(zoomModal);
                        
                        zoomModal.classList.add('show');
                        zoomModal.addEventListener('click', () => {
                            zoomModal.classList.remove('show');
                            setTimeout(() => {
                                document.body.removeChild(zoomModal);
                            }, 500);
                        });
                    });

                    overlayImages.appendChild(img);
                });
            }

            // Add image for Medicare
            if (projectName === 'Medicare') {
                const medicareImage = 'images/projects/p4a.png';
                
                const img = document.createElement('img');
                img.src = medicareImage;
                img.alt = projectName;
                
                // Add click to zoom functionality for image
                img.addEventListener('click', () => {
                    const zoomModal = document.createElement('div');
                    zoomModal.classList.add('image-modal');
                    zoomModal.innerHTML = `
                        <div class="image-modal-content">
                            <h2 class="image-modal-title">${projectName}</h2>
                            <img src="${medicareImage}" alt="${projectName}">
                        </div>
                    `;
                    document.body.appendChild(zoomModal);
                    
                    zoomModal.classList.add('show');
                    zoomModal.addEventListener('click', () => {
                        zoomModal.classList.remove('show');
                        setTimeout(() => {
                            document.body.removeChild(zoomModal);
                        }, 500);
                    });
                });

                overlayImages.appendChild(img);
            }

            // Add images for Quiz App
            if (projectName === 'Quiz App') {
                const quizAppImages = [
                    'images/projects/p5a.jpg',
                    'images/projects/p5b.jpg',
                    'images/projects/p5c.jpg'
                ];

                quizAppImages.forEach(imageSrc => {
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = projectName;
                    
                    // Add click to zoom functionality for images
                    img.addEventListener('click', () => {
                        const zoomModal = document.createElement('div');
                        zoomModal.classList.add('image-modal');
                        zoomModal.innerHTML = `
                            <div class="image-modal-content">
                                <h2 class="image-modal-title">${projectName}</h2>
                                <img src="${imageSrc}" alt="${projectName}">
                            </div>
                        `;
                        document.body.appendChild(zoomModal);
                        
                        zoomModal.classList.add('show');
                        zoomModal.addEventListener('click', () => {
                            zoomModal.classList.remove('show');
                            setTimeout(() => {
                                document.body.removeChild(zoomModal);
                            }, 500);
                        });
                    });

                    overlayImages.appendChild(img);
                });

                // Add GitHub link
                const githubLinkContainer = document.createElement('div');
                githubLinkContainer.innerHTML = `
                    <a href="https://github.com/DeanStyles18/quiz_app.git" target="_blank" style="display: block; text-align: center; margin-top: 1rem; color: var(--secondary); text-decoration: none;">
                        View on GitHub
                    </a>
                `;
                overlayImages.appendChild(githubLinkContainer);

                // Add GitHub icon
                const githubIconContainer = document.createElement('div');
                githubIconContainer.innerHTML = `
                    <a href="https://github.com/DeanStyles18/quiz_app.git" target="_blank" 
                       style="
                           display: flex;
                           justify-content: center;
                           align-items: center;
                           width: 100%;
                           margin-top: 1rem;
                           text-decoration: none;
                       ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" 
                             fill="none" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                    </a>
                `;
                overlayImages.appendChild(githubIconContainer);
            }

            // Add images for Music App
            if (projectName === 'Music App') {
                const musicAppImages = [
                    'images/projects/p6a.jpg',
                    'images/projects/p6b.jpg',
                    'images/projects/p6c.jpg'
                ];

                musicAppImages.forEach(imageSrc => {
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = projectName;
                    
                    // Add click to zoom functionality for images
                    img.addEventListener('click', () => {
                        const zoomModal = document.createElement('div');
                        zoomModal.classList.add('image-modal');
                        zoomModal.innerHTML = `
                            <div class="image-modal-content">
                                <h2 class="image-modal-title">${projectName}</h2>
                                <img src="${imageSrc}" alt="${projectName}">
                            </div>
                        `;
                        document.body.appendChild(zoomModal);
                        
                        zoomModal.classList.add('show');
                        zoomModal.addEventListener('click', () => {
                            zoomModal.classList.remove('show');
                            setTimeout(() => {
                                document.body.removeChild(zoomModal);
                            }, 500);
                        });
                    });

                    overlayImages.appendChild(img);
                });
            }

            // Add images for Sports Blog
            if (projectName === 'Sportsblog') {
                const sportsBlogImages = [
                    'images/projects/p7a.jpg',
                    'images/projects/p7b.jpg',
                    'images/projects/p7c.jpg'
                ];

                sportsBlogImages.forEach(imageSrc => {
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = projectName;
                    
                    // Add click to zoom functionality for images
                    img.addEventListener('click', () => {
                        const zoomModal = document.createElement('div');
                        zoomModal.classList.add('image-modal');
                        zoomModal.innerHTML = `
                            <div class="image-modal-content">
                                <h2 class="image-modal-title">${projectName}</h2>
                                <img src="${imageSrc}" alt="${projectName}">
                            </div>
                        `;
                        document.body.appendChild(zoomModal);
                        
                        zoomModal.classList.add('show');
                        zoomModal.addEventListener('click', () => {
                            zoomModal.classList.remove('show');
                            setTimeout(() => {
                                document.body.removeChild(zoomModal);
                            }, 500);
                        });
                    });

                    overlayImages.appendChild(img);
                });

                // Add GitHub icon
                const githubIconContainer = document.createElement('div');
                githubIconContainer.innerHTML = `
                    <a href="https://github.com/DeanStyles18/sportsblog.git" target="_blank" 
                       style="
                           display: flex;
                           justify-content: center;
                           align-items: center;
                           width: 100%;
                           margin-top: 1rem;
                           text-decoration: none;
                       ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" 
                             fill="none" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                    </a>
                `;
                overlayImages.appendChild(githubIconContainer);
            }

            // Add video link if available
            if (projectName !== 'Virtual Try-On' && projectVideo) {
                const videoLinkContainer = document.createElement('div');
                videoLinkContainer.innerHTML = `
                    <a href="${projectVideo}" target="_blank" style="display: block; text-align: center; margin-top: 1rem; color: var(--secondary); text-decoration: none;">
                        View Project Demo
                    </a>
                `;
                overlayImages.appendChild(videoLinkContainer);
            }

            // Show overlay
            projectDetailsOverlay.classList.add('show');
        });
    });
});