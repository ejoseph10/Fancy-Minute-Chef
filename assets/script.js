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

    //Edamam fetch Api recipe
    async function getRecipeEdamam(searchQuery) {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=false&app_id=a6d7f68a&app_key=8b4d17c343033fa42a2337d2263c8846&random=true&q=${searchQuery}&imageSize=SMALL`)
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

    //Displays edamam search history under searchbox
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

    //Gets edamam data from localstorage 
    function getRecentSearchesFromLS() {
        return JSON.parse(localStorage.getItem("recentSearches")) || [];
    }

    //Displays edamam search results
    function displaySearchResultsEdamam(results) {
        console.log(results)
        var resultContainerEl = $("#recipe-result-container");
        resultContainerEl.empty()

        results.hits.forEach(hit => {
            var recipeEl = $(`
                <div> 
                    <h3>${hit.recipe.label}</h3>
                    <div>${hit.recipe.dietLabels}</div>
                    <div>${hit.recipe.mealType} - ${hit.recipe.dishType}</div>
                    <a target="_blank" href="${hit.recipe.url}">
                    <img src="${hit.recipe.images.SMALL.url}" alt="recipe picture"></a> 
                </div>`)
            resultContainerEl.append(recipeEl)
        })
    }

    //MealDB button click event
    $("#random-meal").on("click", function (event) {
        event.preventDefault()

        getRecipeMeal()
    });

    //Meal fetch Api recipes
    async function getRecipeMeal() {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const recipeList = await response.json();
        console.log(recipeList);
        if (recipeList) {
            localStorage.setItem('apiData', JSON.stringify(recipeList));
            displaySearchResultsMealDB(recipeList)
        }
        // TODO: add to localstorage. Decide a standard format to store in that works for both APIs
    }

    //Displays MealDB recipe
    function displaySearchResultsMealDB(results) {
        console.log(results)
        var resultContainerEl = $("#recipe-result-container");
        resultContainerEl.empty()

        results.meals.forEach(meal => {
            var recipeEl = $(`
                <div> 
                    <h3>${meal.strMeal}</h3>
                    <div>${meal.strCategory}</div>
                    <a target="_blank" href="${meal.strSource}">
                    <img width="200px" src="${meal.strMealThumb}" alt="recipe picture"></a> 
                </div>`)
            resultContainerEl.append(recipeEl)
        })
    }

    displayRecentSearches()  
})