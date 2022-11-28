import { getProduct } from './api.js';

// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
let allProduct = await getProduct("")

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
      getProduct(product.id)
      .then((apiProduct) => {
         displayProductFromApi(product, apiProduct);
         modifyQtt();
         deleteArticle(); 
        
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
function deleteArticle() {
  const deleteItem = document.querySelectorAll('.deleteItem');

  for (let k = 0; k < deleteItem.length; k++) { 
    deleteItem[k].addEventListener('click', () => {
    
    // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
    let deleteId = productInLocalStorage[k].id;
    let deleteColor = productInLocalStorage[k].color;

    // filtrer l'élément cliqué par le bouton supprimer
   
    productInLocalStorage = productInLocalStorage.filter( elt => elt.id !== deleteId || elt.color !== deleteColor);
      
    // envoyer les nouvelles données dans le localStorage
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));

    window.location.href = "cart.html";
    });
  }
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
 
   //vérifier la validation des entrées //
   
//contrôle prénom
   function controlFirstName() {
     const validFirstName = contact.firstName;
     if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validFirstName)) {
       return true;
     } else {
       let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
       firstNameErrorMsg.innerText = "Merci de vérifier le prénom, 3 caractères minimum";
     }
   } 
 
// contrôle nom
   function controlName() {
     const validName = contact.lastName;
     if (/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(validName)) {
       return true;
     } else {
       let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
       lastNameErrorMsg.innerText = "Merci de vérifier le nom, 3 caractères minimum, avec des lettres uniquement";
     }
   }

// contrôle adresse
  function controlAddress() {
   const validAddress = contact.address;
   if (/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(validAddress)) {
     return true;
   } else {
     let addressErrorMsg = document.getElementById('addressErrorMsg');
     addressErrorMsg.innerText = "Merci de vérifier l'adresse, alphanumérique et sans caractères spéciaux";
   }
 } 

// contrôle ville
   function controlCity() {
     const validAddress = contact.city;
     if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validAddress)) {
       return true;
     } else {
       let cityErrorMsg = document.getElementById('cityErrorMsg');
       cityErrorMsg.innerText = "Merci de vérifier le nom de la ville, 3 caractères minimum, avec des lettres uniquement";
     }
   }
 
// contrôle email
   function controlEmail() {
     const validEmail = contact.email;
     if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validEmail)) {
       return true;
     } else {
       let emailErrorMsg = document.getElementById('emailErrorMsg');
       emailErrorMsg.innerText = "Erreur ! Email non valide";
     }
   }
 
// Après vérification des entrées, j'envoie l'objet contact dans le localStorage
   function validControl() {
     if (controlFirstName() && controlName() && controlCity() && controlAddress() && controlEmail()) {
       localStorage.setItem('contact', JSON.stringify(contact));
       return true;
     } else {
         alert('Merci de revérifier les données du formulaire')
       }
   }

   validControl();
  
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
 
   fetch("http://localhost:3000/api/products/order", options)
     .then(response => response.json())
     .then(data => {
      window.localStorage.removeItem('product');
         if (validControl()) {
           document.location.href = 'confirmation.html?id='+ data.orderId;
         }
     });
 
 })
 }

 mainCart();
