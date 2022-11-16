export function getProduct(id) {
    let uri = 'http://localhost:3000/api/products';

    if (null !== id) {
        uri = 'http://localhost:3000/api/products/' + id; 
    }

    return fetch(uri)
    .then(res=>res.json())
    .then(data=>data)
    .catch(err=>console.log(err))
}