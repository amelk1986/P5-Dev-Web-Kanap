import { getProduct } from './api.js';
import{controlFirstName,controlName,controlAddress,controlCity,controlEmail} from './form.js';


// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
let allProduct = await getProduct("")
console.log(allProduct);

async function mainCart() {
  createCartItems();
  getCartProducts();
  totalArticles();
  totalPrice(allProduct);
  postForm();
}

// AFFICHER LES PRODUITS DU PANIER

// 1/ Parcourir la variable productInLocalStorage contenant tous les éléments du localStorage en créant une nouvelle fonction
// 2/ Pour chaque produit il faudra faire l'appel à l'API /products/id à partir de la fonction 

// Parcourir la variable productInLocalStorage contenant tous les éléments du localStorage
function createCartItems() {
  for (let i = 0; i < productInLocalStorage.length; i++) {
    
    let cartItem = document.getElementById("cart__items");
  
    // ajouter l'élément article
    let cartArticles = document.createElement("article");
    
    cartArticles.classList.add("cart__item");
    cartArticles.setAttribute("data-id", productInLocalStorage[i].id);
    cartArticles.setAttribute("data-color",  productInLocalStorage[i].color);

    cartItem.appendChild(cartArticles);
    
  }
}

function showProductQuantityAndColor(productId, quantityContainer, descriptionContainer, productColor) {
  for (let i = 0; i < productInLocalStorage.length; i++) {
      if (productInLocalStorage[i].id === productId && productInLocalStorage[i].color === productColor) {

      let color = document.createElement("p");
      
      color.innerHTML = productInLocalStorage[i].color;
      descriptionContainer.appendChild(color);

      let quantityInput = document.createElement("input");
      quantityInput.classList.add("itemQuantity");
      
      quantityInput.value = productInLocalStorage[i].quantity;
      quantityContainer.appendChild(quantityInput);
      quantityInput.setAttribute("type", "number");
      quantityInput.setAttribute("min", "1");
      quantityInput.setAttribute("max", "100");
      quantityInput.setAttribute("name", "itemQuantity");
      }
   }
}

  function getCartProducts() {
   const cartProducts = JSON.parse(localStorage.getItem('product'));

   cartProducts.forEach(product => {
  let result = getProduct(product.id);
      result
      .then((apiProduct) => {
         displayProductFromApi(product, apiProduct);
         modifyQtt();
         
        
      }); 
   });
    
 }
 
 async function displayProductFromApi(product, apiProduct) {
  
    let cartArticles = document.querySelectorAll(".cart__item");
    let cartCurrentArticle = null;
    
     cartArticles.forEach(cartArticle => {
       if (cartArticle.dataset.id === product.id && cartArticle.dataset.color == product.color) {
        cartCurrentArticle = cartArticle;
      }
    });
    
    // ajouter l'élément div qui va contenir l'image
     let divCartImages = document.createElement("div");
     divCartImages.className = "cart__item__img";
     cartCurrentArticle.appendChild(divCartImages);
 
     let cartImages = document.createElement("img");
     cartImages.setAttribute("src", apiProduct.imageUrl);
     cartImages.setAttribute("alt", apiProduct.altTxt);
     divCartImages.appendChild(cartImages);
     
    // ajouter l'élément div qui contien la description

      let divCartContent = document.createElement("div");
      divCartContent.className = "cart__item__content";
      cartCurrentArticle.appendChild(divCartContent);

      let divCartDescription = document.createElement("div");
      divCartDescription.className = "cart__item__content__description";
      divCartContent.appendChild(divCartDescription);
 
      let title = document.createElement("h2");
      title.innerHTML = apiProduct.name;
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

      showProductQuantityAndColor(product.id, divCartSettingQuantity, divCartDescription, product.color);
      
      let price = document.createElement("p");
      price.innerHTML = `${apiProduct.price} €`;
      divCartDescription.appendChild(price);

     // ajouter l'élément div delete

      let divDeleteSettigs = document.createElement("div");
      divDeleteSettigs.className = "cart__item__content__settings__delete"
      divCartContent.appendChild(divDeleteSettigs);

      let deleteItem = document.createElement("p");
      deleteItem.className = "deleteItem";
      divDeleteSettigs.appendChild(deleteItem);
      deleteItem.innerHTML = "Supprimer";
      deleteArticle(deleteItem);
 }
 
 // j'affiche le total des articles dans le panier
function totalArticles() {
   let totalItems = 0;
   
   for (const l of productInLocalStorage) {
// analyser et convertir la valeur 'quantité' dans le localstorage en une chaîne
// et renvoie un entier (parseInt), sur la base décimale de 10
   const newQuantity = parseInt(l.quantity, 10);
 
// attribuer la valeur retournée par parseInt à la variable totalItems
   totalItems += newQuantity;
}
// attribuer à #totalQuantité la valeur de totalItems et l'afficher dans le DOM
   const totalQuantity = document.getElementById('totalQuantity');
   totalQuantity.textContent = totalItems;
}
 
//je calcule le montant total du panier

function totalPrice(apiProducts){
   let total = 0;
   productInLocalStorage.forEach((product)=>{
      let apiProduct = apiProducts.find(el => el._id === product.id )
      const totalUnitPrice = apiProduct.price * product.quantity;
      total += totalUnitPrice;
   })
   const totalPrice = document.getElementById("totalPrice");
   totalPrice.textContent = total;
   }

    // Modification d'une quantité de produit
function modifyQtt() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let l = 0; l < qttModif.length; l++){
      qttModif[l].addEventListener("change" , (event) => {
          event.preventDefault();

          //Selection de l'element à modifier en fonction de son id ET sa couleur

          let quantityModif = productInLocalStorage[l].id;
          let qttModifValue = qttModif[l].valueAsNumber;
          const resultFind = productInLocalStorage.find((el) => el.qttModifValue !== quantityModif);

          resultFind.quantity = qttModifValue;
          productInLocalStorage[l].quantity = resultFind.quantity;
          

          localStorage.setItem("product", JSON.stringify(productInLocalStorage));
      
        totalArticles();
        totalPrice(allProduct); 
      })
  }
}

// je supprime un produit dans le panier
function deleteArticle(deleteItem) {
 
    deleteItem.addEventListener('click', () => {
    const articleContainer = deleteItem.parentNode.parentNode.parentNode;
    
    // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
    
    let deleteId = articleContainer.dataset.id;
    let deleteColor = articleContainer.dataset.color;

    // filtrer l'élément cliqué par le bouton supprimer
   
    productInLocalStorage = productInLocalStorage.filter( elt => elt.id+'/'+elt.color !== deleteId+'/'+deleteColor);
     console.log(productInLocalStorage);
    // envoyer les nouvelles données dans le localStorage
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));

    window.location.href = "cart.html";
    });
  }

 
   //DEMANDER LES INFOS DE L'UTILISATEUR//

// j'envoie le formulaire dans le serveur
function postForm() {
   const order = document.getElementById('order');
   order.addEventListener('click', (event) => {
   event.preventDefault();
 
// je récupère les données du formulaire dans un objet
const contact = {
     firstName : document.getElementById('firstName').value,
     lastName : document.getElementById('lastName').value,
     address : document.getElementById('address').value,
     city : document.getElementById('city').value,
     email : document.getElementById('email').value
   }
 
 // Après vérification des entrées, j'envoie l'objet contact dans le localStorage
 function validControl() {
  if (controlFirstName(contact) && controlName(contact) && controlCity(contact) && controlAddress(contact) && controlEmail(contact)) {
    localStorage.setItem('contact', JSON.stringify(contact));
    return true;
  } else {
      alert('Merci de revérifier les données du formulaire')
      return false;
    }
}

   //validControl();
  
// je mets les valeurs du formulaire et les produits sélectionnés dans un objet //
   const sendFormData = {
     contact,
     products,
   }
 
// j'envoie le formulaire + localStorage (sendFormData) que j'envoie au serveur //
 
   const options = {
     method: 'POST',
     body: JSON.stringify(sendFormData),
     headers: { 
       'Content-Type': 'application/json',
     }
   };
   if (validControl()) {
   fetch("http://localhost:3000/api/products/order", options)
     .then(response => response.json())
     .then(data => {
      window.localStorage.removeItem('product');
         
           document.location.href = 'confirmation.html?id='+ data.orderId;
         
     });
 }
 })
 }

 mainCart();
