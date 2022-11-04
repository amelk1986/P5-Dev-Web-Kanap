// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

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
   cartArticles.className = "cart__item";
}

function showProductQuantityAndColor(productId, quantityContainer, descriptionContainer) {
   for (let i = 0; i < productInLocalStorage.length; i++) {
      if (productInLocalStorage[i].id !== productId) {
         continue;
      }

      let color = document.createElement("p");
      color.innerHTML = productInLocalStorage[i].color;
      descriptionContainer.appendChild(color);

      let quantityInput = document.createElement("input");
      quantityInput.className = "itemQuantity";
      quantityInput.value = productInLocalStorage[i].quantity;
      quantityContainer.appendChild(quantityInput);
   }
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
      divCartContent.className = "cart__item__content";
      cartArticles.appendChild(divCartContent);

      let divCartDescription = document.createElement("div");
      divCartDescription.className = "cart__item__content__description";
      divCartContent.appendChild(divCartDescription);
 
      let title = document.createElement("h2");
      title.innerHTML = product.name;
      divCartDescription.appendChild(title);

     // ajouter l'élément div setting

      let divCartSetting = document.createElement("div");
      divCartSetting.className = "cart__item__content__settings";
      divCartContent.appendChild(divCartSetting);

      let divCartSettingQuantity = document.createElement("div");
      divCartSettingQuantity.className = "cart__item__content__settings__quantity";
      divCartSetting.appendChild(divCartSettingQuantity);

      let Qte = document.createElement("p");
      Qte.innerHTML = "Qté :";
      divCartSettingQuantity.appendChild(Qte);

      showProductQuantityAndColor(product._id, divCartSettingQuantity, divCartDescription);

      let price = document.createElement("p");
      price.innerHTML = `${product.price} €`;
      divCartDescription.appendChild(price);

      let divDeleteSettigs = document.createElement("div");
      divDeleteSettigs.className = "cart__item__content__settings__delete"
      divCartContent.appendChild(divDeleteSettigs);

      let deleteItem = document.createElement("p");
      deleteItem.className = "deleteItem";
      divDeleteSettigs.appendChild(deleteItem);
      deleteItem.innerHTML = 'Supprimer';
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
 
 //je calcule le montant total du panier

 function totalPrice(){
   let total = 0;
   productInLocalStorage.forEach((product)=>{
      const totalUnitPrice = product.price * product.quantity;
      total += totalUnitPrice;
   })
   const totalPrice = document.getElementById("totalPrice");
   totalPrice.textContent = total;
   }
 


 // je fait un eventListener postForm
function postForm() {
   const orderButton = document.getElementById('order');
   orderButton.addEventListener('click', () =>submitForm());

   
     // je récupère les données du formulaire dans un objet
  const contact = {
   firstName : document.getElementById('firstName').value,
   lastName : document.getElementById('lastName').value,
   address : document.getElementById('address').value,
   city : document.getElementById('city').value,
   email : document.getElementById('email').value,
 }

    // je mets les valeurs du formulaire et les produits sélectionnés dans un objet
  const sendFormData = {
   contact,
   products,
 }
    // j'envoie le formulaire + localStorage (sendFormData) 

   fetch("http://localhost:3000/api/products/order", {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: { 
        'Content-Type': 'application/json',
      }
   })
   .then(response => response.json())
   .then((data) => console.log(data));
}

function submitForm(){
   const form = document.querySelector(".cart__order__form");
 }


 async function main() {
   //const products = await getProduct();
   getCartProducts();
   totalArticles();
   totalPrice();
   postForm();
   submitForm();
 }
 
 main();
