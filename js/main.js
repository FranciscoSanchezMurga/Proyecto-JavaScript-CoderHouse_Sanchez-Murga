const dropdownList = document.getElementById('dropdownList');
const inputCantidadSeleccionada = document.getElementById('inputCantidadSeleccionada');
const totalParcial = document.getElementById('totalParcial');
const btnSumarAlCarrito = document.getElementById('btnSumarAlCarrito');
const listaOrdenes = document.getElementById('listaOrdenes');
const selectorProductoYCantidad = document.querySelector("#selectorProductoYCantidad");
const totalesParcialesEnCarrito = document.getElementsByClassName("classTotalesParciales");
const totalAPagar = document.getElementById('totalAPagar');
let btnMostrarProductos = document.getElementById('btnMostrarProductos');
let seccionProductos = document.getElementById('seccionProductos');
let btnOcultarProductos;
let numeroOrden = 0;

async function crearDropdownListProductos() {
    const respuesta = await fetch('./data/productos.json');
    const productos = await respuesta.json();
    for (const producto of productos) {
        dropdownList.innerHTML += `<option value="${producto.id}">${producto.nombre}</option>`;
    };
};

function traerProductosDeBD_guardarlosEnLocalStorage() {
    fetch("./data/productos.json")
        .then(respuesta => respuesta.json())
        .then(productos => {
            const productosJSON = JSON.stringify(productos);
            localStorage.setItem("productos", productosJSON);
        })
        .catch(error => console.log("No se pudo extraer datos de la BD o guardarla en localStorage: " + error));
};

function extraerProductosDeLocalStorage() {
    return JSON.parse(localStorage.getItem("productos"));
};


function MostrarProductos() {
    seccionProductos.innerHTML = `
    <button id="btnOcultarProductos" class="btn btn-dark d-grid gap-2 col-6 mx-auto" type="button">Ocultar productos</button>
    <div id="containerCardsDeProductos" class="row row-cols-3 g-3"></div>
    `;
    const productos = extraerProductosDeLocalStorage();
    for (const producto of productos) {
        const containerCardsDeProductos = document.querySelector('#containerCardsDeProductos');
        containerCardsDeProductos.innerHTML += `
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
    btnOcultarProductos = document.getElementById('btnOcultarProductos');
    btnOcultarProductos.addEventListener("click", OcultarProductos);
};

btnMostrarProductos.addEventListener("click", MostrarProductos);

function OcultarProductos() {
    seccionProductos.innerHTML = `<button id="btnMostrarProductos" class="btn btn-dark d-grid gap-2 col-6 mx-auto" type="button">Ver productos</button>`;
    btnMostrarProductos = document.getElementById('btnMostrarProductos');
    btnMostrarProductos.addEventListener("click", MostrarProductos);
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
    const productos = extraerProductosDeLocalStorage();
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
    const valorTotalParcial = parseInt | (totalParcial.value);
    const productos = extraerProductosDeLocalStorage();
    const p = productos.find(producto => producto.id === idProductoSeleccionado);
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
    <li id="orden${ordenNueva.numeroOrden}" class="list-group-item">
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
    for (i = 0; i < totalesParcialesEnCarrito.length; i += 1) {
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

crearDropdownListProductos();
traerProductosDeBD_guardarlosEnLocalStorage();




