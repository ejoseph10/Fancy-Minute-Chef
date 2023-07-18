// const searchForm = document.querySelector('form');
// const searchResultDiv = document.querySelector('.search-result');
// const container = document.querySelector('.container');
// let searchQuery = '';

// searchForm.addEventListener('submit', (e) => {
//     e.preventDefault(); 
//     searchQuery = e.target.querySelector('input').value;
//     console.log(searchQuery)
//     fetchAPI();
//     });

//     async function fetchAPI (){
//         const baseURL = 'https://api.edamam.com/api/recipes/v2?q=chicken&app_id=${EDAMAM_ID}&app_key${EDAMAM_key}';
//         const response = await fetch(baseURL);
//         const data = await response.json();
//         generateHTML(data.hits);
//         console.log(data);
//     }
//-----------------------------------------------------
$(document).ready(function () {

    //API key and id for edamam.com 
    var EDAMAM_ID = "a6d7f68a";
    var EDAMAM_key = "8b4d17c343033fa42a2337d2263c8846";



    //Search Box click event
    $("#search-btn").on("click", function (event) {
        event.preventDefault()

        var searchBox = $("#search-input")

        getRecipieEdamam(searchBox.val())
        getRecipieMealDB(searchBox.val())
    });


    //Edamam Api recipies
    // function getRecipieEdamam(recipie) {

    //     $.ajax({
    //         url: 'https://api.edamam.com/api/recipes/v2?type=public&beta=false&app_id=a6d7f68a&app_key=8b4d17c343033fa42a2337d2263c8846&ingr=8&diet=balanced&diet=high-fiber&diet=high-protein&diet=low-carb&diet=low-fat&diet=low-sodium&health=wheat-free&cuisineType=American&cuisineType=Asian&cuisineType=British&cuisineType=Caribbean&cuisineType=Central%20Europe&cuisineType=Chinese&cuisineType=Eastern%20Europe&cuisineType=French&cuisineType=Indian&cuisineType=Italian&cuisineType=Japanese&cuisineType=Kosher&cuisineType=Mediterranean&cuisineType=Mexican&cuisineType=Middle%20Eastern&cuisineType=Nordic&cuisineType=South%20American&cuisineType=South%20East%20Asian&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&mealType=Teatime&dishType=Biscuits%20and%20cookies&dishType=Bread&dishType=Cereals&dishType=Condiments%20and%20sauces&dishType=Desserts&dishType=Drinks&dishType=Main%20course&dishType=Pancake&dishType=Preps&dishType=Preserve&dishType=Salad&dishType=Sandwiches&dishType=Side%20dish&dishType=Soup&dishType=Starter&dishType=Sweets&imageSize=REGULAR&random=true',
    //         method: 'GET',
    //         dataType: 'JSON',
    //         success: function (response) {
    //             console.log(response)
    //             var stringResponse = JSON.stringify(response);

    //             localStorage.setItem('apiData', stringResponse);
    //         }
    //     })
    // }
    async function  getRecipieEdamam() {
        const response = await fetch("https://api.edamam.com/api/recipes/v2?type=public&beta=false&app_id=a6d7f68a&app_key=8b4d17c343033fa42a2337d2263c8846&ingr=8&health=wheat-free&cuisineType=American&cuisineType=Asian&cuisineType=British&cuisineType=Caribbean&cuisineType=Central%20Europe&cuisineType=Chinese&cuisineType=Eastern%20Europe&cuisineType=French&cuisineType=Indian&cuisineType=Italian&cuisineType=Japanese&cuisineType=Kosher&cuisineType=Mediterranean&cuisineType=Mexican&cuisineType=Middle%20Eastern&cuisineType=Nordic&cuisineType=South%20American&cuisineType=South%20East%20Asian&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&mealType=Teatime&random=true");
        const recipies = await response.json();
        console.log(recipies);
      }

    //displays edamam results
    function displayEdamamResults() {
        var recipieResult = $("#recipie-result")
        recipieResult.empty()
    }

    //Get mealDB recipies
    async function  getRecipieMealDB() {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const recipies = await response.json();
        console.log(recipies);
      }

    //displays MealDB results
    function displayMealResults() {
        var recipieResult = $("#recipie-result")
        recipieResult.empty()
    }
    displayEdamamResults()
    displayMealResults()
})