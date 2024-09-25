const appId = "9d4f1475";
const appKey = "b87cc69adda594409fdba84ed23f428e";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const recipeContainer = document.getElementById('recipe-container');
const textSearch = document.getElementById('textSearch');
const btnFind = document.querySelector(".btn");

// Event listener for button click to load recipes
btnFind.addEventListener('click', () => loadRecipies(textSearch.value));

// Event listener for Enter key press to load recipes
textSearch.addEventListener('keyup', (e) => {
    const inputVal = textSearch.value;
    if (e.keyCode === 13) {
        loadRecipies(inputVal);
    }
});

// Scroll the whole page to top
const setScrollPosition = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// Function to fetch and load recipes from API
function loadRecipies(type = "chicken") {
    const url = baseUrl + `&q=${type}`;
    fetch(url)
        .then(res => res.json())
        .then(data => renderRecipies(data.hits))
        .catch(error => console.log(error))
        .finally(() => setScrollPosition());
}

// Initial recipe load on page load
loadRecipies();

// Function to create a list of recipe steps (ingredients)
const getRecipeStepStr = (ingredientLines = []) => {
    let str = '';
    for (const step of ingredientLines) {
        str += `<li>${step}</li>`;
    }
    return str;
};

// Function to render the recipes on the page
const renderRecipies = (recipeList = []) => {
    recipeContainer.innerHTML = "";
    recipeList.forEach(recipeObj => {
        const { label: recipeTitle, ingredientLines, image: recipeImage } = recipeObj.recipe;
        const recipeStepStr = getRecipeStepStr(ingredientLines);
        
        // Create the HTML structure for each recipe card
        const htmlStr = `<div class="recipe">
                <div class="recipe-title">${recipeTitle}</div>
                <div class="recipe-image">
                    <img src="${recipeImage}" alt="Recipe">
                </div>
                <div class="recipe-text">
                    <ul>
                        ${recipeStepStr}
                    </ul>
                </div>
            </div>`;
        
        // Append the recipe card to the container
        recipeContainer.innerHTML += htmlStr;
    });
};
