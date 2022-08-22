const element = document.getElementById("items");
function getProduct(){
    return fetch("http://localhost:3000/api/products")
    .then(res=>res.json())
    .then(data=>data)
    .catch(err=>console.log(err))
}
function displayProduct(products){
    for(let i in products){
    let link = document.createElement("a");
    link.setAttribute("href", "product.html?id=" + products[i]._id);
    element.appendChild(link);

    let article = document.createElement("article");
    link.appendChild(article);
console.log(article)
    let img = document.createElement("img");
    img.setAttribute("src", products[i].imageUrl);
    img.setAttribute("alt", products[i].altTxt);
    article.appendChild(img);

    let title = document.createElement("h3");
    title.innerHTML= products[i].name;
    article.appendChild(title);

    let description = document.createElement("p");
    description.innerHTML= products[i].description;
    article.appendChild(description);
    }
    
}



async function main(){
    const products = await getProduct();
    displayProduct(products);
}
main();