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

const dropdownList = document.getElementById('dropdownList');
const inputCantidadSeleccionada = document.getElementById('inputCantidadSeleccionada');
const totalParcial = document.getElementById('totalParcial');
const btnSumarAlCarrito = document.getElementById('btnSumarAlCarrito');
const listaOrdenes = document.getElementById('listaOrdenes');
const selectorProductoYCantidad = document.querySelector("#selectorProductoYCantidad");
const totalesParcialesEnCarrito = document.getElementsByClassName("classTotalesParciales");
const totalAPagar = document.getElementById('totalAPagar');
let numeroOrden = 0;

function dibujarCardsDeProductos() {
    for (const producto of productos) {
        const cardDeProductos = document.querySelector('#listadoProductos');
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

function crearDropdownListProductos() {
    for (const producto of productos) {
        dropdownList.innerHTML += `<option value="${producto.id}">${producto.nombre}</option>`;
    };
};

function validarProductoYCantidadIngresada() {
    let cantidadSeleccionada = parseInt(inputCantidadSeleccionada.value);
    let idProductoSeleccionado = dropdownList.value;
    let valorNoValido = false;
    // Operador OR para identificar valores falsy y setear a true "valorNoValido" para evitar un NaN en el DOM
    cantidadSeleccionada || (valorNoValido = true);
    idProductoSeleccionado || (valorNoValido = true);
    return valorNoValido;

};

function calcularTotalParcial() {
    let cantidadSeleccionada = parseInt(inputCantidadSeleccionada.value);
    let idProductoSeleccionado = dropdownList.value;
    let valorNoValido = validarProductoYCantidadIngresada();
    if (valorNoValido === false) {
        for (const producto of productos) {
            (producto.id === parseInt(idProductoSeleccionado)) && (totalParcial.value = producto.precio * cantidadSeleccionada);
        };
    } else { totalParcial.value = "" };
};

function ConstructorOrdenes() {
    numeroOrden += 1;
    const idProductoSeleccionado = parseInt(dropdownList.value);
    const cantidadSeleccionada = parseInt(inputCantidadSeleccionada.value);
    const valorTotalParcial = parseInt|(totalParcial.value);
    const p = productos.find(producto => producto.id === idProductoSeleccionado)
    this.numeroOrden = numeroOrden;
    this.idProductoSeleccionado = idProductoSeleccionado;
    this.cantidadSeleccionada = cantidadSeleccionada;
    this.nombre = p.nombre;
    this.precioUnitario = p.precio;
    this.totalParcial = valorTotalParcial;
};

function guardarOrdenEnLocalStorage() {
    const ordenNueva = new ConstructorOrdenes();
    const jsonOrdenNueva = JSON.stringify(ordenNueva);
    localStorage.setItem(ordenNueva.numeroOrden, jsonOrdenNueva);
};

function sumarOrdenAlCarrito() {
    const ordenNueva = JSON.parse(localStorage.getItem(numeroOrden));
    listaOrdenes.innerHTML += `
    <li class="list-group-item">
        <div class="row text-center d-flex justify-content-between align-items-center">
            <div class="col-1">${ordenNueva.numeroOrden}</div>
            <div class="col-2">${ordenNueva.nombre}</div>
            <div class="col-2">
                <div class="w-auto badge bg-primary rounded-pill">${ordenNueva.cantidadSeleccionada}</div>
            </div>
            <div class="col-1 fw-light">x</div>
            <div class="col-2">${ordenNueva.precioUnitario}</div>
            <div class="col-1 fw-light">=</div>
            <div class="col-2">
                <div class="classTotalesParciales w-auto badge bg-primary rounded-pill">${ordenNueva.totalParcial}</div>
            </div>
            <div class="col-1 btn btn-outline-danger w-auto">X</div>
        </div>
    </li>
    `;
};

function calcularTotal() {
    let total = 0;
    for (i=0; i < totalesParcialesEnCarrito.length ; i += 1) {
        total += parseInt(totalesParcialesEnCarrito[i].textContent);
    };
    totalAPagar.setAttribute('value', total);
};

btnSumarAlCarrito.addEventListener('click', function (evt) {
	evt.preventDefault();
    guardarOrdenEnLocalStorage();
    sumarOrdenAlCarrito();
    calcularTotal();
    selectorProductoYCantidad.reset();
});

dropdownList.addEventListener('change', calcularTotalParcial);

inputCantidadSeleccionada.addEventListener('change', calcularTotalParcial);

dibujarCardsDeProductos();

crearDropdownListProductos();
