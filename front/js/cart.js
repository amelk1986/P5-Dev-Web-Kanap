// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
console.log(products);
console.log(productInLocalStorage);

/**
 * 
 * 
 * 3/ Dans le second then, il te faudra appeler une fonction qui va afficher dans le DOM l'image et le prix
 * 4/ Le reste des éléments tu peux l'afficher directement dans la boucle
 */
//2/ Pour chaque produit il te faudra faire l'appel à l'API /products/id à partir de la fonction getProduct
const getProduct = async(id)=>{
   await fetch(`http://localhost:3000/api/products/${id}`)
   .then(res => res.json())
   .then(function(product){
      console.log(product);
   displayBasketApi();
   
   })
   .catch (function (error){
   console.log(error)
   })   
 }

// AFFICHER LES PRODUITS DU PANIER
// 1/ Parcourir la variable productInLocalStorage contenant tous les éléments du localStorage en créant une nouvelle fonction
   for (let i = 0; i < productInLocalStorage.length; i++){

   let cartItem = document.getElementById("cart__items");

   console.log(cartItem)
   // j'ajoute l'élément article
    let cartArticles = document.createElement("article");
      cartItem.appendChild(cartArticles);
      cartArticles.setAttribute("data-id", productInLocalStorage[i].id);
      cartArticles.setAttribute("data-color",  productInLocalStorage[i].color);
      console.log(cartArticles);
      cartArticles.className = "cart__item";


    let color = document.createElement("p");
      color.innerHTML = productInLocalStorage[i].color;
      cartItem.appendChild(color);

    let quantity = document.createElement("p");
      quantity.innerHTML = productInLocalStorage[i].quantity;
      cartItem.appendChild(quantity);

   getProduct(productInLocalStorage[i].id);


   let divCartContent = document.createElement("div");
      console.log(divCartContent);
      divCartContent.className = "cart__item__content";
      cartArticles.appendChild(divCartContent);

   let divCartDescription = document.createElement("div");
      console.log(divCartDescription);
      divCartDescription.className = "cart__item__content__description";
      cartArticles.appendChild(divCartDescription);


    //j'ajoute les éléments
    
}


function displayBasketApi() {
         
   // j'ajoute l'élément div qui va contenir l'image
  let divCartImages = document.createElement("div");
   divCartImages.className = "cart__item__img";
   divCartImages.appendChild(divCartImages);

  let cartImages = document.createElement("img");
   cartImages.setAttribute('src', products.imageUrl);
   cartImages.setAttribute('alt', products.altTxt);
   divCartImages.appendChild(cartImages);
      console.log(divCartImages); 

  let title = document.createComment("h2");
   title.innerHTML = products.name;
   divCartImages.appendChild(title);

  let price = document.createElement("p");
   price.innerHTML = products.price;
   divCartImages.appendChild(price);

  }

  

