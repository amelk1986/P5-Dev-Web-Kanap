// récupération de la chaine de requète dans l'url

const products_url_id = window.location.search;
console.log(products_url_id);

//extraire l'id

const params = new URLSearchParams(products_url_id);
console.log(params);

const id = params.get("id");
console.log(id);

// affichage du produit qui a été sélectioner par l'ID

  fetch(`http://localhost:3000/api/products/${id}`)
.then(res => res.json())
.then(function(data){
    console.log(data)
})
.catch (function (error){
console.log(error)
})  


//Insérer un produit et ses détails dans la page 
const item__img = document.querySelector(".item__img")
console.log(item__img);
function displayProduct(img){

  const item__img = document.createElement("item__img")
  img.setAttribue("src".imageUrl)
  img.setAttribue("alt".altTxt)
  item__img.appendChild(img);
}

displayProduct();


function displayDesciption(products) {

const item__content = document.getElementById("item__content")
  for(let i in products){

let title = document.createElement("js_title")
  title.innerHTML = products[i].name;
  item__content.appendChild(title);

let prix = document.createElement("js_price")
  prix.innerHTML = products[i].price;
  item__content.appendChild(prix);

let description = document.createElement("js_description")
  description.innerHTML = products[i].description;
  item__content.appendChild(description);
  
}  
}

displayDesciption();







