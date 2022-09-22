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

//lier les éléments HTML avec l'API

const showProduct = (product) => {
  //await getProduct();
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

  });
}
