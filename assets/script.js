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


