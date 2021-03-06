const bookmark = window.location.hash.substring(1)
let bookmarkSpot = null
const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'

if(bookmark !== undefined){
    
    bookmarkSpot = '?id=' + bookmark
}


let allData
fetch(URL + bookmarkSpot)
    .then(response => response.json())      // convert it to json 
    .then(data => displayData(data))


document.addEventListener('click', event =>{
    if(event.target.id === "rating-post"){
        postARating()
    }
})

function postARating(){
    const ratingSelector = document.getElementById("user-rating")
    const rating = ratingSelector.options[ratingSelector.selectedIndex].value

    

    const postData = {
        id: allData._id,
        rating: rating
    }

    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(postData)
    })
    .then(()=>{
        allData.ratings.push(rating)
    })
    
    .catch((err) => {
        console.error(err)
    })

}

function displayData(data){
    allData = data

    document.location.hash = data._id

    const title = data.title
    const description = data.desc
    const ingredients = data.ingredients        //another json object
    const recipeImg = data.picture
    const instructions = data.instructions
    const ratings = data.ratings

    const descArea  = document.getElementById("desc")
    descArea.textContent = description

    const titleArea = document.getElementById("title")
    titleArea.textContent = title

    const instructionArea = document.getElementById("inst")
    instructionArea.textContent = instructions

    const imgArea = document.getElementById("imgSpot")
    imgArea.src = recipeImg

    const ingredientArea = document.getElementById("ingredientList")
    
    for(i in ingredients){
        var node = document.createElement("LI")
        var text = document.createTextNode(i)
        var formatting = document.createTextNode(": ")
        
        node.appendChild(text)
        node.appendChild(formatting)
        
        var internalNode = document.createElement("span")
        var ammount = document.createTextNode(ingredients[i])
        internalNode.setAttribute("class", "counter")
        internalNode.setAttribute("ammount", ingredients[i])
        
        internalNode.appendChild(ammount)
        node.appendChild(internalNode)
        ingredientArea.appendChild(node)
        
    }

    const ratingArea = document.getElementById("rating")
    var totalCount = 0
    Array.prototype.map.call(ratings, i => {
        totalCount = totalCount + i
    } )
    totalCount = totalCount/ratings.length
    ratingArea.textContent = totalCount.toFixed(10)
    

}