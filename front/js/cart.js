// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
console.log(products);
console.log(productInLocalStorage);

// AFFICHER LES PRODUITS DU PANIER
// 1/ Parcourir la variable productInLocalStorage contenant tous les éléments du localStorage en créant une nouvelle fonction
// 2/ Pour chaque produit il te faudra faire l'appel à l'API /products/id à partir de la fonction 

// Parcourir la variable productInLocalStorage contenant tous les éléments du localStorage
for (let i = 0; i < productInLocalStorage.length; i++){

   let cartItem = document.getElementById("cart__items");
   console.log(cartItem);

// ajouter l'élément article
   let cartArticles = document.createElement("article");
   cartItem.appendChild(cartArticles);
   cartArticles.setAttribute("data-id", productInLocalStorage[i].id);
   cartArticles.setAttribute("data-color",  productInLocalStorage[i].color);
   console.log(cartArticles);
   cartArticles.className = "cart__item";

// ajouter l'élément div qui contien la description

   let divCartContent = document.createElement("div");
   console.log(divCartContent);
   divCartContent.className = "cart__item__content";
   cartArticles.appendChild(divCartContent);

   let divCartDescription = document.createElement("div");
   console.log(divCartDescription);
   divCartDescription.className = "cart__item__content__description";
   cartArticles.appendChild(divCartDescription);

// afficher la couleur

   let color = document.createElement("p");
   console.log(color);
   color.innerHTML = productInLocalStorage[i].color;
   cartItem.appendChild(color);

// ajouter l'élément div setting

   let divCartSetting = document.createElement("div");
   divCartSetting.className = "cart__item__content__settings";
   cartArticles.appendChild(divCartSetting);
   console.log(divCartSetting);

   let divCartSettingQuantity = document.createElement("div");
   divCartSettingQuantity.className = "cart__item__content__settings__quantity";
   cartArticles.appendChild(divCartSettingQuantity);
   console.log(divCartSettingQuantity);

//afficher la quantité
   let quantity = document.createElement("p");
   console.log(quantity)
   quantity.innerHTML = productInLocalStorage[i].quantity;
   cartItem.appendChild(quantity);

}

// faire l'appel à l'API /products/id à partir de la fonction getProduct
function getProduct(id){
   return fetch(`http://localhost:3000/api/products/${id}`)
   .then(res => res.json())
   .then(product => product)
   .catch (err => console.log(err));   
 };

function displayBasketApi(product){
         
   // ajouter l'élément div qui va contenir l'image 
   let divCartImages = document.createElement("div");
   divCartImages.className = "cart__item__img";
   cartItem.appendChild(divCartImages);
   console.log(divCartImages);
  
   let cartImages = document.createElement("img");
   cartImages.setAttribute('src', product.imageUrl);
   cartImages.setAttribute('alt', product.altTxt);
   cartItem.appendChild(cartImages);
  
   let title = document.createComment("h2");
   title.innerHTML = product.name;
   cartItem.appendChild(title);
  
   let price = document.createElement("p");
   price.innerHTML = product.price;
   cartItem.appendChild(price);
  
   getProduct(productInLocalStorage[i].id);

}
  
 async function main(){
   const product = await getProduct();
   displayBasketApi(product);
 };
 
 main();