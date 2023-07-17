const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery)
    fetchAPI();
    });

    async function fetchAPI (){
        const baseURL = 'https://api.edamam.com/api/recipes/v2?q=chicken&app_id=${EDAMAM_ID}&app_key${EDAMAM_key}';
        const response = await fetch(baseURL);
        const data = await response.json();
        generateHTML(data.hits);
        console.log(data);
    }
//-----------------------------------------------------
$(document).ready(function () {

    //API key and id for edamam.com 
    var EDAMAM_ID = "a6d7f68a";
    var EDAMAM_key = "8b4d17c343033fa42a2337d2263c8846";
    var SPOON_KEY = "a017483ed1744113afdf55b34eb1a802"



    //Search Box click event
    $("#search-btn").on("click", function (event) {
        event.preventDefault()

        var searchBox = $("#search-input")

        getRecipeEdamam(searchBox.val())
    });


    //Edamam Api recipies
    function getRecipieEdamam() {

        $.ajax({
            url: 'https://api.edamam.com/api/recipes/v2?type=public&beta=true&app_id=a6d7f68a&app_key=8b4d17c343033fa42a2337d2263c8846&ingr=8&health=&health=alcohol-cocktail&health=alcohol-free&health=celery-free&health=crustacean-free&health=dairy-free&health=DASH&health=egg-free&health=fish-free&health=fodmap-free&health=gluten-free&health=immuno-supportive&health=keto-friendly&health=kidney-friendly&health=kosher&health=low-fat-abs&health=low-potassium&health=low-sugar&health=lupine-free&health=Mediterranean&health=mollusk-free&health=mustard-free&health=no-oil-added&health=paleo&health=peanut-free&health=pescatarian&health=pork-free&health=red-meat-free&health=sesame-free&health=shellfish-free&health=soy-free&health=sugar-conscious&health=sulfite-free&health=tree-nut-free&health=vegan&health=vegetarian&health=wheat-free&cuisineType=&cuisineType=American&cuisineType=Asian&cuisineType=British&cuisineType=Caribbean&cuisineType=Central%20Europe&cuisineType=Chinese&cuisineType=Eastern%20Europe&cuisineType=French&cuisineType=Indian&cuisineType=Italian&cuisineType=Japanese&cuisineType=Kosher&cuisineType=Mediterranean&cuisineType=Mexican&cuisineType=Middle%20Eastern&cuisineType=Nordic&cuisineType=South%20American&cuisineType=South%20East%20Asian&mealType=&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&mealType=Teatime&dishType=&dishType=Biscuits%20and%20cookies&dishType=Bread&dishType=Cereals&dishType=Condiments%20and%20sauces&dishType=Desserts&dishType=Drinks&dishType=Main%20course&dishType=Pancake&dishType=Preps&dishType=Preserve&dishType=Salad&dishType=Sandwiches&dishType=Side%20dish&dishType=Soup&dishType=Starter&dishType=Sweets&imageSize=REGULAR&random=true',
            method: 'GET',
            dataType: 'JSON',
            success: function (response) {
                localStorage.setItem("recipies", JSON.stringify)
            }
        })
    }

    function getRecipieSpoon(){

        $.ajax({
            url: 'https://api.spoonacular.com/recipes/findByIngredients&number=10',
            method: 'GET',
            dataType: 'JSON',
            success: function (response) {
                localStorage.setItem("recipies", JSON.stringify)
            }
        })
    }
})
//todo display images next to recipies
//todo display edamam api
//todo write spoon api
//todo display spoon results
//todo local storage get and set
