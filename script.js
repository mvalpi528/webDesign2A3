// progress bar --- update value on scroll ------------------------------------------

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

// Hamburger Menu ------------------------------------------------------------------

// selecting the hamburger button
const hamburgerMenu = document.querySelector(".hamburger-menu");

// selecting the nav links
const navLinks = document.getElementById("nav-links");
// selecting the nav buttons
const navButtons = document.getElementById("nav-buttons");

// hamburger button listening for click event
hamburgerMenu.addEventListener("click", () => {
  // click event toggles the 'active' class which activates a CSS style rule
  // that changes the display property from 'none' to 'flex'
  navLinks.classList.toggle("active");
  navButtons.classList.toggle("active");
});

// Surfboard Dialogs ---------------------------------------------------------------

// Shortboard

const shortboardDialog = document.querySelector("#shortboard-dialog");
const shortboardOpenButton = document.querySelector("#shortboard-learn-more");
const shortboardCloseButton = shortboardDialog.querySelector(
  'sl-button[slot="footer"]'
);

shortboardOpenButton.addEventListener("click", () => shortboardDialog.show());
shortboardCloseButton.addEventListener("click", () => shortboardDialog.hide());

// Fish

const fishDialog = document.querySelector("#fish-dialog");
const fishOpenButton = document.querySelector("#fish-learn-more");
const fishCloseButton = fishDialog.querySelector('sl-button[slot="footer"]');

fishOpenButton.addEventListener("click", () => fishDialog.show());
fishCloseButton.addEventListener("click", () => fishDialog.hide());

// Midlength

const midlengthDialog = document.querySelector("#midlength-dialog");
const midlengthOpenButton = document.querySelector("#midlength-learn-more");
const midlengthCloseButton = midlengthDialog.querySelector(
  'sl-button[slot="footer"]'
);

midlengthOpenButton.addEventListener("click", () => midlengthDialog.show());
midlengthCloseButton.addEventListener("click", () => midlengthDialog.hide());

// Surfboard Calculator

// display values for range inputs

const yearsSurfingSlider = document.getElementById("user-years-surfing");
const yearsSurfingSliderValue = document.getElementById("years-surfing-value");

yearsSurfingSlider.addEventListener("input", function () {
  yearsSurfingSliderValue.textContent = yearsSurfingSlider.value;
});

const surfFrequencySlider = document.getElementById("user-surf-frequency");
const surfFrequencySliderValue = document.getElementById(
  "surf-frequency-value"
);

surfFrequencySlider.addEventListener("input", function () {
  surfFrequencySliderValue.textContent = surfFrequencySlider.value;
});

// Defining a helper function that is called by the calculate board type function
function calculateBMI(height, weight) {
  const heightInMeters = height / 100;
  const BMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
  return BMI;
}

// Helper function to clear the recommendations content
function clearRecommendationContent(boardTypes) {
  // This will be a nodeList containing the title and image for the current board type
  let boardType;

  for (const board of boardTypes) {
    boardType = document.querySelectorAll(`.${board}-recommendation`);
    // sets the display of the current title and image to none
    for (const element of boardType) {
      element.style.display = "none";
    }
  }
}

// Helper function to show the recommendations content
function showRecommendation(boardType) {
  console.log("Show recommendations function called");
  const recommendationContent = document.querySelectorAll(
    `.${boardType}-recommendation`
  );

  for (const element of recommendationContent) {
    element.style.display = "block";
  }
}

// As the inputs are not inside of a form element a custom function has been created
// to prevent form submission before all of the inputs have been added
function checkUserInputCompleted() {
  let userInputsCompleted = true;
  const userInputs = document.querySelectorAll("input");

  for (let i = 0; i < userInputs.length; i++) {
    if (userInputs[i].value == "") {
      userInputsCompleted = false;
    }
  }

  return userInputsCompleted;
}

// Calculate the board type
function calculateBoardType() {
  const userHeight = parseInt(document.querySelector("#user-height").value);
  console.log(`userHeight: ${userHeight}`);
  const userAge = parseInt(document.querySelector("#user-age").value);
  console.log(`userAge: ${userAge}`);
  const userWeight = parseInt(document.querySelector("#user-weight").value);
  console.log(`userWeight: ${userWeight}`);
  const BMI = calculateBMI(userHeight, userWeight);
  console.log(`BMI: ${BMI}`);

  const userYearsSurfing = document.querySelector("#user-years-surfing").value;
  console.log(`userYearsSurfing: ${userYearsSurfing}`);
  const userSurfFrequency = document.querySelector(
    "#user-surf-frequency"
  ).value;
  console.log(`userSurfFrequency: ${userSurfFrequency}`);

  // Preferences from the shoelace UI components
  const likesSharpTurns = document.getElementById("switch-sharp-turns").checked;
  console.log(`likesSharpTurns: ${likesSharpTurns}`);

  const likesWavesEarlier = document.getElementById(
    "switch-waves-earlier"
  ).checked;
  console.log(`likesWavesEarlier: ${likesWavesEarlier}`);

  const likesTheHighLine = document.getElementById("switch-high-line").checked;
  console.log(`likesTheHighLine: ${likesTheHighLine}`);

  const likesPaddlePower = document.getElementById(
    "switch-paddle-power"
  ).checked;
  console.log(`likesPaddlePower: ${likesPaddlePower}`);

  const likesLooseFlowingTurns = document.getElementById(
    "switch-loose-flowing-turns"
  ).checked;
  console.log(`likesLooseFlowingTurns: ${likesLooseFlowingTurns}`);

  const likesRailToRail = document.getElementById(
    "switch-rail-to-rail"
  ).checked;
  console.log(`likesRailToRail: ${likesRailToRail}`);

  // each board type will be represented by a number
  // factors that mean the user will likely ride a short board will be represented by a 1
  // fish = 2, midlength = 3
  // the most frequently occuring number will determine the board that is recommended
  const boardTypeWeightings = [];

  // people with lower BMIs require less surfboard volume for the same buoyancy
  if (BMI < 22) {
    // increase weighting for shortboard
    boardTypeWeightings.push(1);
  } else if (BMI < 26) {
    // increase weighting for fish
    boardTypeWeightings.push(2);
  } else {
    // increase weighting for midlength
    boardTypeWeightings.push(3);
  }

  // people generally lose strength and mobilty as they age making it increasingly
  // difficult to ride smaller boards
  if (userAge < 35) {
    // increase weighting for shortboard
    boardTypeWeightings.push(1);
  } else if (userAge < 50) {
    // increase weighting for fish
    boardTypeWeightings.push(2);
  } else {
    // increase weighting for midlength
    boardTypeWeightings.push(3);
  }

  // people with less experience find it difficult to ride smaller boards
  if (userYearsSurfing > 5) {
    // increase weighting for shortboard
    boardTypeWeightings.push(1);
  } else if (userYearsSurfing > 3) {
    // increase weighting for fish
    boardTypeWeightings.push(2);
  } else {
    // increase weighting for midlength
    boardTypeWeightings.push(3);
  }

  // people who surf more frequently are more likely to handle a smaller board
  if (userSurfFrequency > 4) {
    // increase weighting for shortboard
    boardTypeWeightings.push(1);
  } else if (userSurfFrequency > 2) {
    // increase weighting for fish
    boardTypeWeightings.push(2);
  } else {
    // increase weighting for midlength
    boardTypeWeightings.push(3);
  }

  if (likesSharpTurns == true) {
    // increase weighting for shortboard
    boardTypeWeightings.push(1);
  }

  if (likesWavesEarlier == true) {
    // increase weighting for midlength
    boardTypeWeightings.push(3);
  }

  if (likesTheHighLine == true) {
    // increase weighting for midlength
    boardTypeWeightings.push(3);
  }

  if (likesPaddlePower == true) {
    // increase weighting for fish
    boardTypeWeightings.push(2);
  }

  if (likesLooseFlowingTurns == true) {
    // increase weighting for fish
    boardTypeWeightings.push(2);
  }

  if (likesRailToRail == true) {
    // increase weighting for shortboard
    boardTypeWeightings.push(1);
  }

  // initialise variables to store the counts for each board
  let shortboardWeighting = 0;
  let fishWeighting = 0;
  let midlengthWeighting = 0;

  // loop through the array and count the frequency of each number
  for (let i = 0; i < boardTypeWeightings.length; i++) {
    if (boardTypeWeightings[i] == 1) {
      shortboardWeighting++;
    } else if (boardTypeWeightings[i] == 2) {
      fishWeighting++;
    } else if (boardTypeWeightings[i] == 3) {
      midlengthWeighting++;
    }
  }

  console.log(`shortboardWeighting: ${shortboardWeighting}`);
  console.log(`fishWeighting: ${fishWeighting}`);
  console.log(`midlengthWeighting: ${midlengthWeighting}`);

  let boardRecommendation;
  // recommend the board based on the ratings
  if (
    shortboardWeighting >= fishWeighting &&
    shortboardWeighting >= midlengthWeighting
  ) {
    boardRecommendation = "shortboard";
  } else if (
    fishWeighting >= shortboardWeighting &&
    fishWeighting >= midlengthWeighting
  ) {
    boardRecommendation = "fish";
  } else if (
    midlengthWeighting >= shortboardWeighting &&
    midlengthWeighting >= fishWeighting
  ) {
    boardRecommendation = "midlength";
  }

  console.log(`boardRecommendation: ${boardRecommendation}`);

  // clearing previous recommendations
  const boardTypes = ["shortboard", "fish", "midlength"];
  clearRecommendationContent(boardTypes);

  // displaying the relevant board based on the recommendations
  // placing an if statement as validation because the function will break if the argument
  // is not "shortboard", "fish" or "midlength"
  if (
    boardRecommendation == "shortboard" ||
    boardRecommendation == "fish" ||
    boardRecommendation == "midlength"
  ) {
    showRecommendation(boardRecommendation);
  }
}

// getting the button to store in a variable
const calculateButton = document.getElementById("choose-board-button");
// Calls the function when the button is pushed
calculateButton.addEventListener("click", () => {
  const userInputsCompleted = checkUserInputCompleted();
  if (userInputsCompleted) {
    calculateBoardType();
  } else {
    alert("We can't recommend a board unless you fill out your preferences");
  }
});

// Spot types ---- modals ------

// selecting all videos to make sure that they stop playing when the user leaves the modal

const allVideos = document.getElementsByClassName("modal-video");
const reefVideo = document.getElementById("reef-video");
const pointVideo = document.getElementById("point-video");
const beachVideo = document.getElementById("beach-video");

// reef

const reefModal = document.getElementById("reef-modal");
const reefImage = document.getElementById("reef");
const reefCloseButton = document.getElementById("reef-close");

reefImage.addEventListener("click", () => {
  reefModal.style.display = "block";
});

reefCloseButton.addEventListener("click", () => {
  reefModal.style.display = "none";
  reefVideo.pause();
});

// point

const pointModal = document.getElementById("point-modal");
const pointImage = document.getElementById("point");
const pointCloseButton = document.getElementById("point-close");

pointImage.addEventListener("click", () => {
  pointModal.style.display = "block";
});

pointCloseButton.addEventListener("click", () => {
  pointModal.style.display = "none";
  pointVideo.pause();
});

// beach

const beachModal = document.getElementById("beach-modal");
const beachImage = document.getElementById("beachbreak");
const beachCloseButton = document.getElementById("beach-close");

beachImage.addEventListener("click", () => {
  beachModal.style.display = "block";
});

beachCloseButton.addEventListener("click", () => {
  beachModal.style.display = "none";
  beachVideo.pause();
});

// leave modal without close button click - also pauses the video
// get all modals in a HTML collection
const allModals = document.getElementsByClassName("spot-type-modal");

// this listens for a click event anywhere on the page and if the click
// occurs in the modal area but not in the modal content then all modals will
// be closed and all videos paused
window.addEventListener("click", (event) => {
  if (event.target.className === "spot-type-modal") {
    // close all modals
    for (let i = 0; i < allModals.length; i++) {
      allModals[i].style.display = "none";
    }

    // pause all videos
    for (let i = 0; i < allVideos.length; i++) {
      allVideos[i].pause();
    }
  }
});

// video should pause when the user leaves the modal

// Gallery Images -- image popups ------

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

// Scroll Animation

// gsap

// Animating the equipment section ----

// equipment title

let equipmentTitleGSAP = gsap.timeline({
  scrollTrigger: {
    trigger: "#equipment-heading",
    start: "top 85%",
    scrub: false,
    markers: false,
  },
});

equipmentTitleGSAP.to("#equipment-heading", {
  opacity: 1,
  duration: 1.4,
  ease: "ease-in-out",
});

// shortboard

let shortBoardGSAP = gsap.timeline({
  scrollTrigger: {
    trigger: "#shortboard-content-card",
    start: "top 85%",
    // having scrub set to true makes the animation continuously tied to the scroll position
    scrub: false,
    markers: false,
  },
});

shortBoardGSAP.to("#shortboard-content-card", {
  x: 500,
  opacity: 1,
  duration: 1.4,
  ease: "ease-in-out",
});

// fish

let fishGSAP = gsap.timeline({
  scrollTrigger: {
    trigger: "#fish-content-card",
    start: "top 85%",
    scrub: false,
    markers: false,
  },
});

fishGSAP.to("#fish-content-card", {
  x: 500,
  opacity: 1,
  duration: 1.2,
  ease: "ease-in-out",
});

// midlength

let midlengthGSAP = gsap.timeline({
  scrollTrigger: {
    trigger: "#midlength-content-card",
    start: "top 85%",
    // having scrub set to true makes the animation continuously tied to the scroll position
    scrub: false,
    markers: false,
  },
});

midlengthGSAP.to("#midlength-content-card", {
  x: 500,
  opacity: 1,
  duration: 1,
  ease: "ease-in-out",
});

// smooth scroll
const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Text reveal animation ---- TODO

// splitting the element
const aboutUsSplit = new SplitType("#about-us-heading");

gsap.to(".char", {
  y: 0,
  // an offset for each element of the character class
  stagger: 0.05,
  delay: 0.2,
  duration: 0.1,
});

// References

// Videos

// https://www.youtube.com/watch?v=Hh1ckWJF7_0 - beach modal
// https://www.youtube.com/watch?v=A3X-SjtGj3k - point modal
