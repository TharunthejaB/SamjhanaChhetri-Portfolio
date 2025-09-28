const loader = document.getElementById("loader");
const loaderRose = loader.querySelector(".rose-color");
const t1 = gsap.timeline({    duration: 1.5,
    ease: "power2.inOut"});
// Looping rose fill animation
function loopLoader(element, duration = 1200) {
  let progress = 0;
  let direction = 1; // 1 = filling, -1 = emptying

  function animate() {
    progress += direction * (100 / ((duration / 1000) * 60));

    if (progress >= 100) {
      progress = 100;
      direction = -1;
    } else if (progress <= 0) {
      progress = 0;
      direction = 1;
    }

    element.style.opacity = progress + "%";
    requestAnimationFrame(animate);
  }

  animate();
}

// Start looping loader
loopLoader(loaderRose);

// Function to wait for all images
function imagesLoaded() {
  const imgs = Array.from(document.images);
  return Promise.all(imgs.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = img.onerror = resolve;
    });
  }));
}

// Ensure loader runs at least 3s
const minTime = new Promise(resolve => setTimeout(resolve, 4500));
const imgLoad = imagesLoaded();

Promise.all([minTime, imgLoad]).then(() => {
  gsapAnimations();
});


function gsapAnimations(){
    const path = window.location.pathname;
    const page = path.split("/").pop();
    if(page === "index.html" || page === ""){
    t1.to("#loader", {
    y: -1000, // start 200px to the left
    ease: "power3.out"
    })
    .from(".main-text",{
    opacity: 0,
    ease: "power3.out"
    })
    .from("#link1",{
    top: 60,
    ease: "power3.out"
    })
  }
  if(page === "gallery.html"){
    t1.to("#loader", {
    y: -1000, // start 200px to the left
    })
    .from("#nav-logo , #link1 ,#link2",{
    top: -90,
    ease: "power3.out"
    })
  }
}


