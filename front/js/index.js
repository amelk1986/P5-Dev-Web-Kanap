function getProduct(){
    return fetch("http://localhost:3000/api/products")
    .then(res=>res.json())
    .then(data=>data)
    .catch(err=>console.log(err))
}
function displayProduct(products) {
    const productItemsContainer = document.getElementById("items");

    for(let product in products){
    
    const link = document.createElement("a");
    link.setAttribute("href", "product.html?id=" + products[product]._id);
    productItemsContainer.appendChild(link);

    const article = document.createElement("article");
    link.appendChild(article);
console.log(article)

    const img = document.createElement("img");
    img.setAttribute("src", products[product].imageUrl);
    img.setAttribute("alt", products[product].altTxt);
    article.appendChild(img);

    let title = document.createElement("h3");
    title.innerHTML= products[product].name;
    article.appendChild(title);

    const description = document.createElement("p");
    description.innerHTML= products[product].description;
    article.appendChild(description);
    }
    
}



async function main(){
    const products = await getProduct();
    displayProduct(products);
}

main();