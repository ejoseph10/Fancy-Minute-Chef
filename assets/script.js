//API key and id for edamam.com 
var EDAMAM_ID = "a6d7f68a";
var EDAMAM_key = "8b4d17c343033fa42a2337d2263c8846";

$(document).ready(function () {

    //Edamam button click event
    $("#search-category-btn").on("click", function (event) {
        event.preventDefault()
        
        var edamamSearch = $("#search-input").val();
        

        getRecipeEdamam(edamamSearch)

    });

    //Edamam fetch Api recipe
    async function getRecipeEdamam(searchQuery) {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=false&app_id=a6d7f68a&app_key=8b4d17c343033fa42a2337d2263c8846&random=true&q=${searchQuery}&imageSize=SMALL`)
        const recipes = await response.json();
        if (recipes) {
            var currentSearches = getRecentSearchesFromLS();
            if(searchQuery === "" || searchQuery === null || searchQuery === undefined) {
                if (!currentSearches.includes("Random"))
                    localStorage.setItem('recentSearches', JSON.stringify(["Random", ...currentSearches]));
            }
            else if (!currentSearches.includes(searchQuery)) {
                localStorage.setItem('recentSearches', JSON.stringify([searchQuery, ...currentSearches]));
            } else {
                localStorage.setItem('recentSearches', JSON.stringify([searchQuery, ...currentSearches.filter(search => search !== searchQuery)]))
            }
            currentSearches = getRecentSearchesFromLS();
            if (currentSearches.length > 5) {
                localStorage.setItem('recentSearches', JSON.stringify(currentSearches.splice(0, 5)));
            }
            displayRecentSearches()
            displaySearchResultsEdamam(recipes)
        }
    }

    //Displays edamam search history under searchbox
    function displayRecentSearches() {
        var recentSearchEl = $("#recent-search-container");
        var currentSearches = getRecentSearchesFromLS();
        recentSearchEl.empty()
        currentSearches.forEach(search => {
            var searchHistoryEl = $(`<button class='btn btn-light-grey'>${search}</button>`)
            searchHistoryEl.on("click", function () {
                getRecipeEdamam(search)
            })
            recentSearchEl.append(searchHistoryEl)
        })
    }

    //Gets edamam data from localstorage 
    function getRecentSearchesFromLS() {
        return JSON.parse(localStorage.getItem("recentSearches")) || [];
    }

    //Saves individual recipes
    function saveIndividualRecipe(label, tags, type, url, imageUrl) {
        var recipes = getSavedRecipesFromLS()
        for (var i = 0; i < recipes.length; i++) {
            if (url === recipes[i].urlProp) {
                return
            }
        }
        localStorage.setItem('recipes', JSON.stringify([...getSavedRecipesFromLS(), {
            labelProp: label,
            tagsProp: tags,
            typeProp: type,
            urlProp: url,
            imageProp: imageUrl
        }]));
        displaySavedRecipes()
    }

    //Delete saved recipes
    function deleteIndividualRecipe(url) {
        localStorage.setItem('recipes', JSON.stringify([...getSavedRecipesFromLS().filter(recipe => recipe.urlProp !== url)]));
        displaySavedRecipes()
    }

    //Gets recipes from localstorage 
    function getSavedRecipesFromLS() {
        return JSON.parse(localStorage.getItem("recipes")) || [];
    }

    //Displays saved recipes
    function displaySavedRecipes() {
        var recipeSavedEl = $("#saved-recipe-container");
        var savedRecipes = getSavedRecipesFromLS();
        recipeSavedEl.empty()
        savedRecipes.forEach(recipe => {
            var savedRecipeEl = $(`
                <div class="col-xl col-lg col-md col-sm-12 col-xs-12 col-12 card"> 
                    <h4>${recipe.labelProp}</h4>
                    <div>${recipe.tagsProp}</div>
                    <div>${recipe.typeProp}</div>
                    <a target="_blank" href="${recipe.urlProp}">
                    <img width="75px" src="${recipe.imageProp}" alt="some delicious ${recipe.labelProp}"></a>
                </div>`)
            var recipeDeleteButtonEl = $("<button>Delete Recipe</button> ")
            recipeDeleteButtonEl.on("click", function () {
                deleteIndividualRecipe(recipe.urlProp)
            })

            recipeSavedEl.append(savedRecipeEl)
            savedRecipeEl.append(recipeDeleteButtonEl)
        })
    }

    //Displays edamam search results
    function displaySearchResultsEdamam(results) {
        var resultContainerEl = $("#recipe-result-container");
        resultContainerEl.empty()

        results.hits.forEach(hit => {
            var recipeEl = $(`
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 col-12 card"> 
                    <div class="card-header">${hit.recipe.label}</div>
                    <div>${hit.recipe.dietLabels}</div>
                    <div>${hit.recipe.mealType} - ${hit.recipe.dishType}</div>
                    <a target="_blank" href="${hit.recipe.url}">
                    <img src="${hit.recipe.images.SMALL.url}" alt="some delicious ${hit.recipe.label}"></a>
                </div>`)
            var recipeSaveButtonEl = $("<div class='card-footer'><button class='btn btn-secondary'>Save Recipe</button></div>")
            $(recipeSaveButtonEl).on("click", function () {
                saveIndividualRecipe(hit.recipe.label, hit.recipe.dietLabels, hit.recipe.mealType + " - " + hit.recipe.dishType, hit.recipe.url, hit.recipe.images.SMALL.url)
            })
            resultContainerEl.append(recipeEl)
            recipeEl.append(recipeSaveButtonEl)
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
        if (recipeList) {
            displaySearchResultsMealDB(recipeList)
        }
    }

    //Displays MealDB recipe
    function displaySearchResultsMealDB(results) {
        var resultContainerEl = $("#recipe-result-container");
        resultContainerEl.empty()

        results.meals.forEach(meal => {
            var recipeEl = $(`
                <div> 
                    <h3>${meal.strMeal}</h3>
                    <div>${meal.strCategory}</div>
                    <a target="_blank" href="${meal.strSource}">
                    <img width="200px" src="${meal.strMealThumb}" alt="some delicious ${meal.strMeal}"></a> 
                </div>`)
            var recipeSaveButtonEl = $("<button>Save Recipe</button> ")
            recipeSaveButtonEl.on("click", function () {
                saveIndividualRecipe(meal.strMeal, "", meal.strCategory, meal.strSource, meal.strMealThumb)
            })
            resultContainerEl.append(recipeEl)
            resultContainerEl.append(recipeSaveButtonEl)
        })
    }
    displaySavedRecipes()
    displayRecentSearches()
})