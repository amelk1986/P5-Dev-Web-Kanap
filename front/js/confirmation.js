//confirmation de la commande, un affichage du numéro de commande en question.

function checkout(){
    const orderId = document.getElementById('orderId');
    orderId.innerHTML = localStorage.getItem('orderId');

// retirer tous les éléments

    localStorage.clear();
}
checkout();