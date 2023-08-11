// Code for image popups

// Store all gallery images in a variable
const galleryImages = document.querySelectorAll(".image-container img");

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
