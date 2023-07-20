//API key and id for edamam.com 
 var EDAMAM_ID = "a6d7f68a";
 var EDAMAM_key = "8b4d17c343033fa42a2337d2263c8846";

$(document).ready(function () {

    //Edamam button click event
    $("#search-category-btn").on("click", function (event) {
        event.preventDefault()

        var edamamSearch = $("#search-input").val();
        console.log(edamamSearch)

        getRecipeEdamam(edamamSearch)
    });

    //Edamam Api recipe
    async function getRecipeEdamam(searchQuery) {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=false&app_id=a6d7f68a&app_key=8b4d17c343033fa42a2337d2263c8846&random=true&q=${searchQuery}`)
        const recipes = await response.json();
        console.log(recipes);
        if (recipes) {
            var currentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
            if (
                !currentSearches.includes(searchQuery)
            )
            localStorage.setItem('recentSearches', JSON.stringify([...currentSearches, searchQuery]));
        // TODO: add to localstorage. Decide a standard format to store in that works for both APIs
        }
    }

    //MealDB button click event
    $("#random-meal").on("click", function (event) {
        event.preventDefault()

        getRecipeMeal()
    });

    //Meal Api recipes
    async function getRecipeMeal() {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const recipeList = await response.json();
        console.log(recipeList);
        if (recipeList) {
            localStorage.setItem('apiData', JSON.stringify(recipeList));
        }
        // TODO: add to localstorage. Decide a standard format to store in that works for both APIs
    }

    
    // TODO: make a display function 
    function displayResults() {
    var edResult = $("#recipe-result")
    var dbResult = $("#recipe-result")
        edResult.empty()
        dbResult.empty()
    
    } 

    displayResults()
})