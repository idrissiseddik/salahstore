// Fonction pour mettre à jour la quantité et le prix dans la modale
function updateModalQuantity(button, change) {
  var quantityInput = document.getElementById("modal-quantity");
  var quantity = parseInt(quantityInput.value) + change;

  if (quantity < 1) return;
  quantityInput.value = quantity;
  updateModalPrice();
}

// Fonction pour mettre à jour le prix total dans la modale
function updateModalPrice() {
  var quantity = parseInt(document.getElementById("modal-quantity").value);
  var price = parseFloat(document.querySelector(".modal-body").querySelector("#modal-prix").textContent);
  var totalPrice = quantity * price;
  document.getElementById("modal-total-price").innerText = totalPrice + " DH";
}

// Remplir la modale avec les informations du produit
var modal = document.getElementById('commandeModal');
modal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget; // Bouton qui a déclenché l'ouverture
  var produit = button.getAttribute('data-produit');
  var prix = parseFloat(button.getAttribute('data-prix'));
  var image = button.getAttribute('data-image');
  var description = button.getAttribute('data-description');

  // Mettre à jour les informations dans la modale
  document.getElementById('modal-produit').textContent = produit; // Désignation du produit
  document.getElementById('modal-prix').textContent = prix + " DH";
  document.getElementById('modal-image').src = image;
  document.getElementById('modal-description').textContent = description;

  // Réinitialiser la quantité et le total à chaque ouverture de la modale
  document.getElementById('modal-quantity').value = 1;
  document.getElementById('modal-total-price').innerText = prix + " DH";
});

// Envoyer la commande via WhatsApp
function sendToWhatsApp(event) {
  event.preventDefault();

  // Récupérer les informations de la modale
  var produit = document.getElementById('modal-produit') 
    ? document.getElementById('modal-produit').textContent 
    : "Produit non spécifié"; // Gérer l'absence du titre
  var prix = document.getElementById('modal-prix').textContent;
  var quantity = document.getElementById('modal-quantity').value;
  var totalPrice = document.getElementById('modal-total-price').textContent;
  var telephone = document.getElementById('telephone').value;
  var adresse = document.getElementById('adresse').value;

  // Construire le message à envoyer
  var message = `Bonjour, je souhaite commander ${quantity} x ${produit} à ${totalPrice}.\n
                 Prix unitaire: ${prix}\n
                 Téléphone: ${telephone}\n
                 Adresse: ${adresse}`;

  // Générer l'URL WhatsApp
  var url = `https://wa.me/+212664813513?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
