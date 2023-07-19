//API key and id for edamam.com 
 var EDAMAM_ID = "a6d7f68a";
 var EDAMAM_key = "8b4d17c343033fa42a2337d2263c8846";

$(document).ready(function () {

    $("#search-category-btn").on("click", function(event) {
        event.preventDefault()

        var cuisineDropdownElValue = $("#cuisine-drop-down").val();
        console.log(cuisineDropdownElValue)
        var mealDropdownElValue = $("#meal-drop-down").val();
        console.log(mealDropdownElValue)
        
        var apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&beta=false&app_id=a6d7f68a&app_key=8b4d17c343033fa42a2337d2263c8846'
        
        if (cuisineDropdownElValue !== "all") {
          apiUrl = apiUrl + `&cuisineType=${cuisineDropdownElValue}`;
        }
        if (mealDropdownElValue !== "all") {
          apiUrl = apiUrl + `&mealType=${mealDropdownElValue}`;
        }
       
        getRecipieEdamam(apiUrl)
      });

      async function getRecipieEdamam(url){
        console.log(url)
        const response = await fetch(url)
        const recipies = await response.json();
        console.log(recipies);
    }

    //Randomn button click event
    $("#search-btn").on("click", function (event) {
        event.preventDefault()
        
        var submitBox = $("#search-input")
        
        getRecipieMeal(submitBox.val())
    });

    //random meal function

    // function getRandomMeal(){
    //     fetch('URL', {
    //        headers: {
    //             'Accept': 'appliction/json'
    //         }
    //     }).then(data=> data.json())
    // change randomText to corresponding HTML class & random Meal to corresponding html class
    //       .then(obj => randomText.innerHTML=obj.random-meal)
    // }

// main
    //displays edamam results
    function displayEdamamResults() {
        var recipieResult = $("#recipie-result")
            recipieResult.empty()
    }
    //Meal Api recipies
        async function  getRecipieMeal() {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
            const recipies = await response.json();
            console.log(recipies);
          }
        
    //displays Meal results
    function displayMealResults() {
        var recipieResult = $("#recipie-result")
            recipieResult.empty()
    }
    displayEdamamResults()
    displayMealResults()
})