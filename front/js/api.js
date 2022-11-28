//faire l'appel à l'API /products à partir de la fonction getProduct POUR récupérer les données des produits
export async function getProduct(id) {
    let uri = 'http://localhost:3000/api/products';
    
    if (null !== id) {
        //récupérer les données des produits par l'ID
        uri = 'http://localhost:3000/api/products/' + id; 
    }

    return await fetch(uri)
    .then(res=>res.json())
    .then(data=>data)
    .catch(err=>console.log(err))
}