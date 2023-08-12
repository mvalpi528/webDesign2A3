// progress bar --- update value on scroll

// selecting the progress bar
const progressBar = document.getElementById("progress-bar");

// Listening for the scroll event on the document object
// This means that the webpage will detect when the user scrolls anywhere on the page
document.addEventListener("scroll", () => {
  // This is the number of pixels that the user has scrolled from the top of the page
  const pixelsFromTop = document.documentElement.scrollTop;

  // this calculation subtracts the client height (the size of the user's viewport)
  // so that the progress bar completes when the user reaches the bottom of the page
  // this is because the top of the viewport can never reach the bottom of the page
  const totalPixelsOnPage =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  // This calculates the percentage scrolled from the top
  const scrollProgress = (pixelsFromTop / totalPixelsOnPage) * 100;

  progressBar.value = scrollProgress;
});

// image popups ------

// Store all gallery images in a variable
// Selects all images that are contained within elements that have the class "image-container"
const galleryImages = document.querySelectorAll(".img-container img");

function createImagePopUp(imageCollection) {
  imageCollection.forEach((image) => {
    image.onclick = () => {
      document.querySelector(".popup-image").style.display = "block";
      document.querySelector(".popup-image img").src =
        image.getAttribute("src");
    };
  });

  document.querySelector(".popup-image span").onclick = () => {
    document.querySelector(".popup-image").style.display = "none";
  };
}

createImagePopUp(galleryImages);
