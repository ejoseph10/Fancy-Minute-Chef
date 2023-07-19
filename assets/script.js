//API key and id for edamam.com 
 var EDAMAM_ID = "a6d7f68a";
 var EDAMAM_key = "8b4d17c343033fa42a2337d2263c8846";

$(document).ready(function () {

    $("#search-category-btn").on("click", function (event) {
        event.preventDefault()

        var edamamSearch = $("#search-input").val();
        console.log(edamamSearch)

        getRecipeEdamam(edamamSearch)
    });

    async function getRecipeEdamam(searchQuery) {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=false&app_id=a6d7f68a&app_key=8b4d17c343033fa42a2337d2263c8846&random=true&q=${searchQuery}`)
        const recipes = await response.json();
        console.log(recipes);
        // TODO: add to localstorage. Decide a standard format to store in that works for both APIs
    }
    
    //Meal Api recipies
    async function getRecipeMeal() {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const recipes = await response.json();
        console.log(recipes);
        // TODO: add to localstorage. Decide a standard format to store in that works for both APIs
    }

    //Randomn button click event
    $("#random-meal").on("click", function (event) {
        event.preventDefault()
        
        getRecipeMeal()
    });

    // TODO: make a display function 



    //displays edamam results
    function displayEdamamResults() {
        var recipeResult = $("#recipe-result")
            recipeResult.empty()
    }
   
    //displays Meal results
    function displayMealResults() {
        var recipeResult = $("#recipe-result")
            recipeResult.empty()
    }
    displayEdamamResults()
    displayMealResults()
})