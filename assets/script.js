//API key and id for edamam.com 
 var EDAMAM_ID = "a6d7f68a";
 var EDAMAM_key = "8b4d17c343033fa42a2337d2263c8846";

$(document).ready(function () {

    //Search Box click event
    $("#search-btn").on("click", function (event) {
        event.preventDefault()

        var submitBox = $("#search-input")

        getRecipieEdamam(submitBox.val())
    });

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
    //Edamam Api recipies
    function getRecipieEdamam() {

        $.ajax({
            url: 'https://api.edamam.com/api/recipes/v2?type=public&beta=false&app_id=a6d7f68a&app_key=8b4d17c343033fa42a2337d2263c8846&ingr=8&health=wheat-free&cuisineType=American&cuisineType=Asian&cuisineType=British&cuisineType=Caribbean&cuisineType=Central%20Europe&cuisineType=Chinese&cuisineType=Eastern%20Europe&cuisineType=French&cuisineType=Indian&cuisineType=Italian&cuisineType=Japanese&cuisineType=Kosher&cuisineType=Mediterranean&cuisineType=Mexican&cuisineType=Middle%20Eastern&cuisineType=Nordic&cuisineType=South%20American&cuisineType=South%20East%20Asian&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&mealType=Teatime&random=true',
            method: 'GET',
            dataType: 'JSON',
            success: function (response) {
                var stringResponse = JSON.stringify(response);

                localStorage.setItem('apiData', stringResponse);
            }
        })
    }
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