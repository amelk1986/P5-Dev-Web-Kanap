// récupération de la chaine de requète dans l'url

const products_url_id = window.location.search;
console.log(products_url_id);

//extraire l'id

const params = new URLSearchParams(products_url_id);
console.log(params);

const id = params.get("id");
console.log(id);

// récupérer les données du produit qui a été sélectioner par l'ID

const getProduct = async()=>{
  await   fetch(`http://localhost:3000/api/products/${id}`)
  .then(res => res.json())
  .then(function(product){
      //console.log(data);
      showProduct(product);
  })
  .catch (function (error){
  console.log(error)
  })    
}

getProduct();

//Insérer un produit et ses détails dans la page 

// stocker dans des variables les classes et les id du fichier HTML
let picture = document.querySelector(".item__img");
console.log(picture);

let title = document.getElementById("js_title");
console.log(title);

let price = document.getElementById("js_price");
console.log(price);

let description = document.getElementById("js_description");
console.log(description);

let colorsArray = document.getElementById("js_colors");
console.log(colorsArray);

let imageURL = "";

let imageAlt = "";


//lier les éléments HTML avec l'API

const showProduct = (product) => {
  
  console.log(product);
  console.log(product.imageUrl);
  console.log(product.name);

  const image = document.createElement("img");
  image.setAttribute('src', product.imageUrl);
  image.setAttribute('alt', product.altTxt);
  picture.appendChild(image);

  title.innerHTML = product.name;

  price.innerHTML = product.price;

  description.innerHTML = product.description;

  product.colors.forEach(function(color) {
    console.log(color);

  const tagOption = document.createElement("option");

  tagOption.innerHTML = color;
  tagOption.value = color.toLowerCase();

  colorsArray.appendChild(tagOption);
  console.log(tagOption);
  });

  addKanapToCart(product._id);
}


const addKanapToCart = (productId) => {
  /**
   * 1- Récupérer l'id, la quantité et la couleur sélectionnée
   * 2- Enregistrer la sélection de l'utilisateur dans le localStorage au moment où il clique sur le bouton submit
   * 4- Si l'utilisateur a déjà des produits dans son panier, alors je récupère le contenu du localStorage
   * 5- Sinon, si l'utilisateur n'a pas de produits dans son panier, je créé un nouvel objet que j'ajouté au localStorage
   * 3- Le produit est enregistré dans le localStorage 
   */


   const buttonElement = document.getElementById("js_addToCart");

   buttonElement.addEventListener('click', () => {
     let selectQuantity = document.getElementById("js_quantity")
     const selection = {
       id: productId,
       color: colorsArray.value,
       quantity: selectQuantity.value,
       image: imageURL,
       alt: imageAlt,
     };
 
     // je déclare une variable productInLocalStorage 
     // dans laquelle je mets les clés+valeurs dans le local storage
     // JSON.parse permet de convertir les données au format JSON en objet JavaScript
     let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));
 
     // j'ajoute les produits sélectionnés dans le localStorage
     const addProductLocalStorage = () => {
     // je récupère la sélection de l'utilisateur dans le tableau de l'objet :
     // on peut voir dans la console qu'il y a les données,
     // mais pas encore stockées dans le storage à ce stade
     console.log(productInLocalStorage);
     productInLocalStorage.push(selection);
     // je poush les données récupérées dans le localStorage :
     // JSON.stringify permet de convertir les données au format JavaScript en JSON 
     // vérifier que key et value dans l'inspecteur contiennent bien des données
     localStorage.setItem('product', JSON.stringify(productInLocalStorage));
     }
 
     // je crée une boîte de dialogue pour confirmer l'ajout au panier
     let addConfirm = () => {
       alert('Le produit a bien été ajouté au panier');
     }
     let update = false;
     // s'il y a des produits enregistrés dans le localStorage
     if (productInLocalStorage) {
     // verifier que le produit ne soit pas deja dans le localstorage/panier
     // avec la couleur
      productInLocalStorage.forEach (function (productOk, key) {
       if (productOk.id == productId && productOk.color == colorsArray.value) {
         productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
         localStorage.setItem('product', JSON.stringify(productInLocalStorage));
         update = true;
         addConfirm();
       }
     });
 
     //
       if (!update) {
       addProductLocalStorage();
       addConfirm();
       }
     }
 
     // s'il n'y a aucun produit enregistré dans le localStorage 
     else {
       // je crée alors un tableau avec les éléments choisi par l'utilisateur
       productInLocalStorage = [];
       addProductLocalStorage();
       addConfirm();
     }
   });
 }