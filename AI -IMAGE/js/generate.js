
const promptInput = document.querySelector(" .prompt-input");
const promptBtn = document.querySelector(" .prompt-btn");
const promptFrom = document.querySelector(" .prompt-form");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const gridGallery = document.querySelector(".gallery")

const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
  "A cosmic beach with glowing sand and an aurora in the night sky",
  "A medieval marketplace with colorful tents and street performers",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
  "A giant turtle carrying a village on its back in the ocean",
  "ultra-detailed cyberpunk city skyline at dusk, neon reflections, rainy streets, cinematic",
  "a cozy reading nook by a window with plants and warm sunlight, photorealistic",
  "ancient temple in a misty forest, volumetric light, high detail, 4k",
  "studio portrait of a golden retriever wearing round glasses, softbox lighting",
  "isometric game asset: tiny bakery shop with pastel colors and cute details",
  "futuristic sports car in a desert, motion blur, low angle, dramatic lighting",
  "watercolor illustration of a mountain village at sunrise, gentle brush strokes",
  "astronaut relaxing on a floating chair, cosmic background, whimsical, vibrant"
];

// calculated width  / height based 
const getImageDimensions = (aspectRatio, baseSize = 512) => {
   const [width,height] = aspectRatio.split("/").map(Number);
   const saleFactor = baseSize / Math.sqrt(width * height);

   let calculatedWidth = Math.round(width *saleFactor );
   let calculatedHeight =  Math.round(width *saleFactor );

   calculatedWidth = Math.floor(calculatedWidth /16) *16
   calculatedHeight = Math.floor(calculatedHeight /16) *16

   return {
    width : calculatedWidth ,
    height : calculatedHeight
   };
}


// actual image
const updateImageCard = (imgIndex, imgUrl) =>{
    const imgCard = document.getElementById(`img-card-${imgIndex}`);
    if(!imgCard) return;

    imgCard.classList.remove("loading");
    imgCard.innerHTML = `
    <img src="${imgUrl}" class="Result-img">
    <div class="img-overlay">
        <a href="${imgUrl}" class="img-download-btn" download="image-${Date.now()}.png">
            <i class="fa-solid fa-download"></i>
        </a>
    </div>`;

};

const generateImages = async (selectedModel, imageCount, aspectRatio, promptText) => {
  const { width, height } = getImageDimensions(aspectRatio);

  const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
    try {
      // Pollinations API directly returns image
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=${width}&height=${height}&model=${selectedModel}`;

      updateImageCard(i, imageUrl);
    } catch (error) {
      console.error(error);
    }
  });

  await Promise.allSettled(imagePromises);
};


// create placeholder card with loadig spinners
const  createImageCards = (selectedModel, imageCount , aspectRatio, promptText) => {
   gridGallery.innerHTML = "";

      for (let i = 0; i< imageCount ; i++) {
              gridGallery.innerHTML += ` <div class="img-card  loading" id = "img-card-${i}" style = "aspect-ratio: ${aspectRatio}" >
                            <div class="status-container">
                                <div class="spinner"></div>
                                <i class="fa-solid fa-triangle-exclamation"></i>
                                 <p class="status-text">Generating...</p>
                            </div>                      
                        </div>` ;
      }

      generateImages(selectedModel, imageCount , aspectRatio, promptText) ;
}

// Handle submission Form
const handleFormSubmit = (e) => {
   e.preventDefault();

    const selectedModel = modelSelect.value;
    const imageCount    = parseInt(countSelect.value) || 1;
    const aspectRatio = ratioSelect.value || "1/1"
    const promptText = promptInput.value.trim();

    createImageCards(selectedModel, imageCount , aspectRatio, promptText);
    

}  

// prompt input with random example
promptBtn.addEventListener("click", () => {
    const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)] ;
    promptInput.value = prompt;
    promptInput.focus();
})

promptFrom.addEventListener("submit", handleFormSubmit);

