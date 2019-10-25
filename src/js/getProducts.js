document.addEventListener("DOMContentLoaded", function() {
    fetch("/data/products.json")
        .then(response => response.json())
        .then(function(data){
            const cardTemplate = document.getElementById("cardTemplate");
            const list = document.getElementsByClassName("cardList")[0];

            data.forEach(function(product) {
                const clone = cardTemplate.content.cloneNode(true);
                clone.querySelector(".img").src = product.billeder[0];
                clone.querySelector("h1").innerText = product.navn;
                clone.querySelector("p").innerText = product.beskrivelse;
                clone.querySelector(".land").innerText = product.land;
                clone.querySelector(".vægt").innerText = `${product.vægt}g`;
                clone.querySelector(".pris").innerText = `DKK ${product.pris}`;
                clone.querySelector("a").href = `../product/?product_id=${product.id}`
                list.appendChild(clone);
            });
        });
});