document.addEventListener("DOMContentLoaded", () => {
  let params = new URLSearchParams(document.location.search);
  let productId = parseInt(params.get("product_id"));
  const productTemplate = document.getElementById("productTemplate");
  const list = document.getElementsByClassName("product__main")[0];

  fetch("/data/products.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const product = data.find(function(e) {
        return e.id === productId;
      });
      const clone = productTemplate.content.cloneNode(true);
      clone.querySelector(".img").src = product.billeder[0];
      clone.querySelector("h1").innerText = product.navn;
      clone.querySelector("p").innerText = product.beskrivelse;
      clone.querySelector(".land").innerText = product.land;
      clone.querySelector(".vægt").innerText = `${product.vægt}g`;
      clone.querySelector(".pris").innerText = `DKK ${product.pris}`;
      list.appendChild(clone);

    });
});
