// récupérer les données du produit qui a été sélectioner par l'ID

import { getProduct } from './api.js';

let colorsArray = document.getElementById("js_colors");

// Récupération du paramètre id stocké dans l'URL de la page pour transmettre les variables de la page index à la page product
const products_url_id = window.location.search;
const params = new URLSearchParams(products_url_id);
const id = params.get("id");


//Appeler les fonction
async function mainproduct(){
  
  showProduct(await getProduct(id));
  addKanapToCart(id);
 
};


//Insérer les infos d'un produit 

function showProduct(product){

  let picture = document.querySelector(".item__img");
  let title = document.getElementById("js_title");
  let price = document.getElementById("js_price");
  console.log(price);
  
  let description = document.getElementById("js_description");

  const image = document.createElement("img");
  image.setAttribute('src', product.imageUrl);
  image.setAttribute('alt', product.altTxt);
  picture.appendChild(image);

  title.innerHTML = product.name;

  price.innerHTML = product.price;

  description.innerHTML = product.description;

  product.colors.forEach(function(color) {
    const tagOption = document.createElement("option");
    tagOption.innerHTML = color;
    tagOption.value = color.toLowerCase();
    colorsArray.appendChild(tagOption);
  });
  return;
};


function addKanapToCart(productId){
  /**
   * Au clic sur ajouter au panier :
   * 1- Vérifier qu'une couleur et un nombre d'article soient bien renseignés
   * 2- Récupérer l'id, la quantité et la couleur sélectionnée
   * 3- Vérifier si l'utilisateur a déjà un panier dans le localStorage, si non alors le créer + ajouter le produit
   * 4- Si l'utilisateur a déjà des produits dans son panier, alors je récupère le contenu du localStorage
   * 5- Puis je vérifie que le produit n'existe pas déjà, si oui j'ajoute la quantité à celle déjà contenue dans le localStorage
   * 6- Le produit est enregistré ou modifié dans le localStorage 
   */

   const buttonElement = document.getElementById("js_addToCart");

  buttonElement.addEventListener('click', () => {
 let selectQuantity = document.getElementById("js_quantity");
//DONNEES ENREGISTREES DANS LE LOCAL STORAGE
    const selection = {
      id: productId,
      color: colorsArray.value,
      quantity: selectQuantity.value,
    };
     addProductLocalStorage(selection);
  })

  /*ENREGISTRER LES CLES ET VALEURS DU LOCAL STORAGE
*Envoie les produits dans le tableau productInLocalStorage puis enregistre dans le localStorage
*Recherche si un produit est déjà présent
*/
function addProductLocalStorage(selection){
  // Récupère les données contenues dans l'objet product du localStorage 
  let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));
  if(productInLocalStorage === null){
    productInLocalStorage = [];
    productInLocalStorage.push(selection);
    localStorage.setItem("product" , JSON.stringify (productInLocalStorage)); 
  } else {
    // SUR LE PRODUIT AVEC LE MEME ID ET CHANGER LA COULEUR
    const found = productInLocalStorage.find(element => element.id == selection.id && element.color == selection.color);
    if (!found) {
      productInLocalStorage.push(selection);
      localStorage.setItem("product" , JSON.stringify(productInLocalStorage));
      //SI PRODUIT AVEC MEME ID AUGMENTER LA QUANTITE ET CHOISIR UNE AUTRE COULEUR
    } else {
       let newQuantity = parseInt(selection.quantity) + parseInt(found.quantity);
       found.quantity = newQuantity;
       localStorage.setItem("product" , JSON.stringify(productInLocalStorage));
    }
  };   
}
      
  }
 


  mainproduct();