// récupération de la chaine de requète dans l'url

const products_url_id = window.location.search;
console.log(products_url_id);

//extraire l'id

const params = new URLSearchParams(products_url_id);
console.log(params);

const id = params.get("id");
console.log(id);

// affichage du produit qui a été sélectioner par l'ID

  fetch(`http://localhost:3000/api/products/${id}`)
.then(res => res.json())
.then(function(data){
    console.log(data)
})
.catch (function (error){
console.log(error)
})  


//Insérer un produit et ses détails dans la page 







