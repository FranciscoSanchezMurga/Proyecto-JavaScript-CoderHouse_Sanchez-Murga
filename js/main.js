let productos = [
    p1 = {
        id: 1,
        nombre: "Sándwich de milanesa",
        precio: 500,
        imagen: "https://lh3.googleusercontent.com/lcn0osAXTRZedXLFntYvZFjHCXlKjVjt5fv-JAzRHt-dOubZ3oRhrbnxBcuDwboHMkT_MjqZTXzDdYqqVYs6pPpGq1aHxGamLCATNbCzqEmP34MHgdegnuxFD-7s3ktRLmp6HC5_Mg=w2400"
    },
    p2 = {
        id: 2,
        nombre: "Sándwich de lomito",
        precio: 600,
        imagen: "https://lh3.googleusercontent.com/hAClHNkCCYYkElrvYuWFo2A8nSpgC49jesphUrELgan92tjqb5EKyO_iX0-hiBqEDfA3l4LHqCsK4Ukk_Rb6llFibrkELTaiVYMGiGQuE39-PpZ-Ve1yH1kewEYHwy-iwFLL_jq-Wg=w2400" 
    },
    p3 = {
        id: 3,
        nombre: "Pizza especial",
        precio: 1000,
        imagen: "https://lh3.googleusercontent.com/a2_GdGDxCpkHe6YeKlf03qDx_RqzjCGi7P8fWeERDXsifnIQFOxVRiJEbK2JEXXDJbmWYsvxPQa7owK_1ZyMfVFlJfvAPJGvDtPbVxt6eT2FclC5VYcOK61bQmLZax6W4QB65vgmfQ=w2400" 
    }
];

function dibujarCardsDeProductos () { 
    for (let producto of productos) {
        let cardDeProductos = document.querySelector('#listadoProductos');
        cardDeProductos.innerHTML += `
        <div class="col">
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$ ${producto.precio}</p>
                </div>
            </div>
        </div>
        `;
    };
};

function crearListaDesplegableProductos () {
    for (let producto of productos) {
        let dropdownList = document.querySelector('#dropdownList');
        dropdownList.innerHTML += `<option value="${producto.id}">${producto.nombre}</option>`;
    };
};

dibujarCardsDeProductos();
crearListaDesplegableProductos();
