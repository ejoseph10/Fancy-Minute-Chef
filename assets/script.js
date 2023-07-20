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
            var currentSearches =  getRecentSearchesFromLS(); 
            if (
                !currentSearches.includes(searchQuery)
            )
            localStorage.setItem('recentSearches', JSON.stringify([...currentSearches, searchQuery]));
            displayRecentSearches()
            displaySearchResultsEdamam(recipes)
        }
    }

    function displayRecentSearches() {
        var recentSearchEl = $("#recent-search-container");
        var currentSearches =  getRecentSearchesFromLS(); 
        recentSearchEl.empty()
        currentSearches.forEach(search => {
            var searchHistoryEl = $(`<button>${search}</button>`)
            searchHistoryEl.on("click", function(){
                getRecipeEdamam(search)
            })
            recentSearchEl.append(searchHistoryEl)
        })
    }

    function getRecentSearchesFromLS() {
        return JSON.parse(localStorage.getItem("recentSearches")) || [];
    }

    function displaySearchResultsEdamam(results) {
        console.log(results)
        var resultContainerEl = $("#recipe-result-container");
        resultContainerEl.empty()

        results.hits.forEach(hit => {
            var recipeEl = $(`
                <div> 
                    <h3>${hit.recipe.label}</h3>
                    <img src="${hit.recipe.images.THUMBNAIL.url}" alt="recipe picture">
                </div>`)
            recipeEl.on("click", function(){
                getRecipeEdamam(search)
            })
            resultContainerEl.append(recipeEl)
        })
    }

    label:
    img:
    url:
    dietLabel:
    mealDishType:

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

    displayRecentSearches()  
})