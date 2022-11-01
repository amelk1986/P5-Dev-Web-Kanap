// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
console.log(products);
console.log(productInLocalStorage);

// AFFICHER LES PRODUITS DU PANIER

// 1/ Parcourir la variable productInLocalStorage contenant tous les éléments du localStorage en créant une nouvelle fonction
// 2/ Pour chaque produit il faudra faire l'appel à l'API /products/id à partir de la fonction 

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

// afficher la couleur

   let color = document.createElement("p");
   console.log(color);
   color.innerHTML = productInLocalStorage[i].color
   cartItem.appendChild(color);

   //afficher la quantité
   let quantity = document.createElement("p");
   console.log(quantity)
   quantity.innerHTML = productInLocalStorage[i].quantity;
   cartItem.appendChild(quantity);

}

// faire l'appel à l'API /products/id à partir de la fonction getProduct
function getProduct(id) {
   return fetch(`http://localhost:3000/api/products/${id}`)
     .then((res) => res.json())
     .then((product) => product)
     .catch((err) => console.log(err));
 }

 function getCartProducts() {
   const cartProducts = JSON.parse(localStorage.getItem('product'));

   cartProducts.forEach(product => {
      getProduct(product.id).then((apiProduct) => {
         displayProductFromApi(apiProduct);
      });
   });
 }
 
 async function displayProductFromApi(product) {

   // let product = await getProduct();
   let cartArticles = document.querySelector(".cart__item");
 
     // ajouter l'élément div qui va contenir l'image
     let divCartImages = document.createElement("div");
     divCartImages.className = "cart__item__img";
     cartArticles.appendChild(divCartImages);
 
     let cartImages = document.createElement("img");
     cartImages.setAttribute("src", product.imageUrl);
     cartImages.setAttribute("alt", product.altTxt);
     divCartImages.appendChild(cartImages);
     
// ajouter l'élément div qui contien la description

      let divCartContent = document.createElement("div");
      console.log(divCartContent);
      divCartContent.className = "cart__item__content";
      cartArticles.appendChild(divCartContent);

      let divCartDescription = document.createElement("div");
      console.log(divCartDescription);
      divCartDescription.className = "cart__item__content__description";
      divCartContent.appendChild(divCartDescription);
 
      let title = document.createElement("h2");
      title.innerHTML = product.name;
      divCartDescription.appendChild(title);
   
      let price = document.createElement("p");
      price.innerHTML = product.price;
      divCartDescription.appendChild(price);

     // ajouter l'élément div setting

      let divCartSetting = document.createElement("div");
      divCartSetting.className = "cart__item__content__settings";
      divCartContent.appendChild(divCartSetting);
      console.log(divCartSetting);

      let divCartSettingQuantity = document.createElement("div");
      divCartSettingQuantity.className = "cart__item__content__settings__quantity";
      divCartSetting.appendChild(divCartSettingQuantity);
      console.log(divCartSettingQuantity);

      let Qte = document.createElement("p");
      Qte.innerHTML = product.quantity;
      divCartSettingQuantity.appendChild(Qte);

      let quantityInput = document.createElement("input");
      console.log(quantityInput);
      quantityInput.className = "itemQuantity";
      divCartSettingQuantity.appendChild(quantityInput);

      let divDeleteSettigs = document.createElement("div");
      console.log(divDeleteSettigs);
      divDeleteSettigs.className = "cart__item__content__settings__delete"
      divCartContent.appendChild(divDeleteSettigs);

      let deleteItem = document.createElement("p");
      deleteItem.className = "deleteItem";
      divDeleteSettigs.appendChild(deleteItem);
      deleteItem.innerHTML = product.delete;
 }

 // j'affiche le total des articles dans le panier
function totalArticles() {
   let totalItems = 0;
   for (l in productInLocalStorage) {
     // analyser et convertir la valeur 'quantité' dans le localstorage en une chaîne
     // et renvoie un entier (parseInteger), sur la base décimale de 10
     const newQuantity = parseInt(productInLocalStorage[l].quantity, 10);
 
     // attribuer la valeur retournée par parseInt à la variable totalItems
     totalItems += newQuantity;
   }
     // attribuer à #totalQuantité la valeur de totalItems et l'afficher dans le DOM
     const totalQuantity = document.getElementById('totalQuantity');
     totalQuantity.textContent = totalItems;
 }
 
 async function main() {
   //const products = await getProduct();
   getCartProducts();
   totalArticles();
 }
 
 main();
