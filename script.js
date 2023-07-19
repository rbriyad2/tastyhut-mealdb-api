const loadData = async (searchText, datalimit) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    displayData(data.meals, datalimit)
}



const displayData = (datamenu, datalimit) => {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = '';

    if(datalimit && datamenu.length > 6){
        datamenu = datamenu.slice(0, 6)
        document.getElementById('showall').classList.remove('hidden');
    }
    else{
        document.getElementById('showall').classList.add('hidden');
    }

    datamenu.forEach(signleData => {
        // console.log(signleData.idMeal)

        const newDiv = document.createElement('div')
        newDiv.classList.add('everyitem')
        newDiv.innerHTML = `
        <div class="fooditem flex items-center border rounded">
                <div class="img">
                    <img class="h-5/6 w-11/12 rounded-lg" src="${signleData.strMealThumb}" alt="">
                </div>
                <div class="content ml-6">
                    <h3 class="font-bold text-2xl mb-4">${signleData.strMeal}</h3>
                    <p class="text-lg font-normal w-8/12 mb-6">${signleData.strInstructions.slice(1, 120)}</p>
    <button onclick="ViewModalDetails(${signleData.idMeal})"  class="text-info text-xl" data-bs-toggle="modal" data-bs-target="#exampleModal">
    View Details
  </button>

                </div>
            </div>
        `
        menuContainer.appendChild(newDiv)
    });
}


const ViewModalDetails = async (mealid) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
    const res = await fetch(url)
    const resData = await res.json()
    displayModal(resData.meals[0])
    
}


const displayModal = modalItem =>{
    console.log(modalItem)
    document.getElementById('modalTitle').innerText =modalItem.strMeal;
    const melImage = document.getElementById('mealimagemodal')
    melImage.innerHTML = `<img src="${modalItem.strMealThumb}" alt="">`
    document.getElementById('mealParagraph').innerText = modalItem.strInstructions;


}
// const displayModal =everymealitem=>{
//    document.getElementById('modalTitle').innerText = everymealitem.strMeal;
//    document.getElementById('melparagraph').innerText = everymealitem.strInstructions.slice(120, 350)


// }

const precessSearch =(datalimit)=>{
const searchField = document.getElementById('searchfield').value;
    loadData(searchField, datalimit)
}


// search input field enter event handler
document.getElementById('searchfield').addEventListener("keypress", (e) => {
    console.log(e.key)
    if (e.key == "Enter") {
        precessSearch(6)
     }
   });

const searchMeal =() =>{
    precessSearch(6)
}


document.getElementById('btnShowall').addEventListener('click', function(){
    precessSearch()
})

loadData('fish', 6);

document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
     enterKey.innerText = "Enter Key is Pressed";
     }
   });