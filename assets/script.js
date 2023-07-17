const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
//API fetch for edamam.com 
const EDAMAM_ID = "e1b10d34";
const EDAMAM_key = "3c4edb1e57b0bd9b14a49d02567f6fe9";

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
//Search Box click event
$("#search-btn").on("click", function (event) {
    event.preventDefault()

    var searchBox = $("#search-input")

    getRecipeEdamam()
});


//Edamam Api recipies
function getRecipieEdamam(){

$.ajax({
    url: 'https://api.edamam.com/api/recipes/v2?type=public&beta=true&app_id=e1b10d34&app_key=3c4edb1e57b0bd9b14a49d02567f6fe9&ingr=8&diet=&diet=balanced&diet=high-fiber&diet=high-protein&diet=low-carb&diet=low-fat&diet=low-sodium&health=&health=alcohol-cocktail&health=alcohol-free&health=celery-free&health=crustacean-free&health=dairy-free&health=DASH&health=egg-free&health=fish-free&health=fodmap-free&health=gluten-free&health=immuno-supportive&health=keto-friendly&health=kidney-friendly&health=kosher&health=low-fat-abs&health=low-potassium&health=low-sugar&health=lupine-free&health=Mediterranean&health=mollusk-free&health=mustard-free&health=no-oil-added&health=paleo&health=peanut-free&health=pescatarian&health=pork-free&health=red-meat-free&health=sesame-free&health=shellfish-free&health=soy-free&health=sugar-conscious&health=sulfite-free&health=tree-nut-free&health=vegan&health=vegetarian&health=wheat-free&cuisineType=&cuisineType=American&cuisineType=Asian&cuisineType=British&cuisineType=Caribbean&cuisineType=Central%20Europe&cuisineType=Chinese&cuisineType=Eastern%20Europe&cuisineType=French&cuisineType=Indian&cuisineType=Italian&cuisineType=Japanese&cuisineType=Kosher&cuisineType=Mediterranean&cuisineType=Mexican&cuisineType=Middle%20Eastern&cuisineType=Nordic&cuisineType=South%20American&cuisineType=South%20East%20Asian&mealType=&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&mealType=Teatime&dishType=&dishType=Biscuits%20and%20cookies&dishType=Bread&dishType=Cereals&dishType=Condiments%20and%20sauces&dishType=Desserts&dishType=Drinks&dishType=Main%20course&dishType=Pancake&dishType=Preps&dishType=Preserve&dishType=Salad&dishType=Sandwiches&dishType=Side%20dish&dishType=Soup&dishType=Starter&dishType=Sweets&imageSize=REGULAR&random=true',
    method: 'GET',
    dataType: 'JSON',
    success: function (response)
})
}
