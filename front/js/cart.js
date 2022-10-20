// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
console.log(products);

// AFFICHER LES PRODUITS DU PANIER

   for (let i = 0; i < productInLocalStorage.length; i++){

   let cartItem = document.getElementById("cart__items");

   console.log(cartItem)
   // j'ajoute l'élément article
    let cartArticles = document.createElement("article");
    console.log(productInLocalStorage);

    cartItem.appendChild(cartArticles);

    cartArticles.setAttribute("data-id", productInLocalStorage[i].id);

    cartArticles.setAttribute("data-color",  productInLocalStorage[i].color);
    console.log(cartArticles);

    cartArticles.className = "cart__item";

    // j'ajoute l'élément div qui va contenir l'image
    let divCartImages = document.createElement("div");
    divCartImages.className = "cart__item__img";
    cartArticles.appendChild(divCartImages);

    let cartImages = document.createElement("img");
    cartImages.setAttribute('src', products.imageUrl);
    cartImages.setAttribute('alt', products.altTxt);
    divCartImages.appendChild(cartImages);
 console.log(divCartImages);

   
   

    //j'ajoute l'élément img
       
      function displayBasket() {
         

      let title = document.createComment("h2");
      title.innerHTML = products.name;
      divCartImages.appendChild(title);

      let color = document.createElement("p");
      color.innerHTML = products.color;
      divCartImages.appendChild(color);

      let price = document.createElement("p");
      price.innerHTML = products.price;
      divCartImages.appendChild(price);

      let quantity = document.createElement("p");
      quantity.innerHTML = products.quantity;
      divCartImages.appendChild(quantity);

      let delet = document.createElement("p");
      delet.innerHTML = products.delet;
      divCartImages.appendChild(delet)

   
      }
    
}

   displayBasket();
