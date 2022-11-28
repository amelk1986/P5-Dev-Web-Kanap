//confirmation de la commande, un affichage du numéro de commande en question.

const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

const orderId = document.getElementById('orderId');
orderId.innerHTML = id;