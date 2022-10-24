
// Récupération du paramètre id stocké dans l'URL de la page
const products_url_id = window.location.search;
const params = new URLSearchParams(products_url_id);
const id = params.get("id");

// récupérer les données du produit qui a été sélectioner par l'ID

function getProduct(){
  return fetch(`http://localhost:3000/api/products/${id}`)
  .then(res => res.json())
  .then(product => product)
  .catch (err => console.log(err));   
};

//Insérer les infos d'un produit (modification du DOM)

function showProduct(product){

  let picture = document.querySelector(".item__img");
  let title = document.getElementById("js_title");
  let price = document.getElementById("js_price");
  let colorsArray = document.getElementById("js_colors");
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

    const selection = {
      id: productId,
      color: colorsArray.value,
      quantity: selectQuantity.value,
    };
  
    // Récupère les données contenues dans l'objet product du localStorage 
    let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));
 
    // ajouter les produits sélectionnés dans le localStorage
    function addProductLocalStorage(){
      // Ajout de l'objet, contenant les infos du produit choisi, dans le tableau de product (récupéré juste avant du localStorage)
      productInLocalStorage.push(selection);
      // Ajout de l'objet product, contenant le nouveau produit, au localStorage
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));
    };

    // créer une boîte de dialogue pour confirmer l'ajout au panier
    let addConfirm = () => {
      alert('Le produit a bien été ajouté au panier');
    };

    let update = false;
    // s'il y a des produits enregistrés dans le localStorage
    if (productInLocalStorage) {
    // verifier que le produit ne soit pas deja dans le localstorage/panier
    // avec la même couleur
      productInLocalStorage.forEach(function (productOk, key) {
        if (productOk.id == productId && productOk.color == colorsArray.value) {
          productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
          localStorage.setItem('product', JSON.stringify(productInLocalStorage));
          update = true;
          addConfirm();
        }; 
      });
      //
      if (!update) {
      addProductLocalStorage();
      addConfirm();
      };
    } else { // s'il n'y a aucun produit enregistré dans le localStorage 
      // créer alors un tableau avec les éléments choisi par l'utilisateur
      productInLocalStorage = [];
      addProductLocalStorage();
      addConfirm();
    };
  });
};

async function main(){
  const product = await getProduct();
  showProduct(product);
  addKanapToCart(product._id);
};

main();