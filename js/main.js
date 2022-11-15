const dropdownList = document.getElementById('dropdownList');
const inputCantidadSeleccionada = document.getElementById('inputCantidadSeleccionada');
const totalParcial = document.getElementById('totalParcial');
const btnSumarAlCarrito = document.getElementById('btnSumarAlCarrito');
const listaOrdenes = document.getElementById('listaOrdenes');
const selectorProductoYCantidad = document.querySelector("#selectorProductoYCantidad");
const totalesParcialesEnCarrito = document.getElementsByClassName("classTotalesParciales");
const totalAPagar = document.querySelector('#totalAPagar');
let btnMostrarProductos = document.getElementById('btnMostrarProductos');
let containerProductos = document.getElementById('containerProductos');
let btnOcultarProductos;
let botonesEliminar;
let numeroOrden = 0;
const btnEnviarPedido = document.getElementById('btnEnviarPedido');

async function crearDropdownListProductos() {
    const respuesta = await fetch('./data/productos.json');
    const productos = await respuesta.json();
    for (const producto of productos) {
        dropdownList.innerHTML += `<option value="${producto.id}">${producto.nombre}</option>`;
    };
};

async function traerProductosDeBD_guardarlosEnLocalStorage() {
    await fetch("./data/productos.json")
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
    const containerGeneral = document.querySelector('.gridSinProductos');
    containerGeneral.classList.add('gridConProductos');
    containerGeneral.classList.remove('gridSinProductos');
    containerProductos.style.justifyContent='space-between';
    containerProductos.innerHTML = `
    <button id="btnOcultarProductos" class="btn btn-dark d-grid gap-2 col-6 mx-auto" type="button">Ocultar productos</button>
    <div id="containerCardsDeProductos" class="row row-cols-3 g-3 m-1"></div>
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
    const containerGeneral = document.querySelector('.gridConProductos');
    containerGeneral.classList.add('gridSinProductos');
    containerGeneral.classList.remove('gridConProductos');
    containerProductos.innerHTML = `<button id="btnMostrarProductos" class="btn btn-dark w-auto" type="button">Ver productos</button>`;
    containerProductos.style.justifyContent='center';
    btnMostrarProductos = document.getElementById('btnMostrarProductos');
    btnMostrarProductos.addEventListener("click", MostrarProductos);
};

function validarProductoYCantidadIngresada() {
    let cantidadSeleccionada = parseInt(inputCantidadSeleccionada.value);
    let idProductoSeleccionado = parseInt(dropdownList.value);
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

function guardarOrdenEnLocalStorage(valorNoValido) {
    if (valorNoValido === false) {
        const ordenNueva = new ConstructorOrdenes();
        const jsonOrdenNueva = JSON.stringify(ordenNueva);
        localStorage.setItem(ordenNueva.numeroOrden, jsonOrdenNueva);
    };
};

function mostrarOcultarCarrito() {
    const containerCarrito = document.getElementById('containerCarrito');
    if (listaOrdenes.childElementCount > 1) {
        containerCarrito.removeAttribute('hidden')
    } else { containerCarrito.setAttribute('hidden', '') }
};

function implementarFuncionalidadEliminarOrden() {
    botonesEliminar = document.getElementsByClassName('botonesEliminar');
    for (let i = 0; i < botonesEliminar.length; i += 1) {
        botonesEliminar[i].addEventListener('click', (evt) => {
            evt.preventDefault();
            console.log(evt.target.parentElement.parentElement)
            evt.target.parentElement.parentElement.remove();
            mostrarOcultarCarrito();
        });
    };
};

function sumarOrdenAlCarrito(valorNoValido) {
    if (valorNoValido === false) {
        const ordenNueva = JSON.parse(localStorage.getItem(numeroOrden));
        listaOrdenes.innerHTML += `
        <li class="ordenes list-group-item">
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
                <button class="botonesEliminar col-1 btn btn-outline-danger w-auto">X</button>
            </div>
        </li>
        `;
        mostrarOcultarCarrito();
        implementarFuncionalidadEliminarOrden();
    } else {
        mensajeDeErrorToastify();
    };
};


function mensajeDeErrorToastify() {
    Toastify({
        text: "Complete los campos faltantes",
        duration: 2500,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
            background: "#ca4545" ,
            color: "white",
        },
    }).showToast();
};

function calcularTotal() {
    let total = 0;
    for (let i = 0; i < totalesParcialesEnCarrito.length; i += 1) {
        total += parseInt(totalesParcialesEnCarrito[i].textContent);
    };
    totalAPagar.setAttribute('value', total);
};

function enviarPedido() {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: '¿Enviar el pedido?',
        text: "Revise que sus ordenes sean correctas",
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Volver',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const ordenes = document.getElementsByClassName('ordenes');
            let ordenesAEnviar = [];
            for (let i = 0; i <= ordenes.length; i += 1) {
                if (ordenes[i] === undefined) {
                    continue;
                } else {
                    ordenesAEnviar.push(ordenes[i].getAttribute('id'));
                };
            };
            let preJson = [];
            ordenesAEnviar.forEach((ordenAEnviar) => {
                preJson.push(JSON.parse(localStorage.getItem(ordenAEnviar)));
            });
            let jsonAEnviar = JSON.stringify(preJson);
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: jsonAEnviar,
                headers: {
                    'Content-type': 'application/json ; charset=UTF-8',
                }
            })
                .then(() => {
                    swalWithBootstrapButtons.fire(
                        '¡Su pedido ha sido enviado!',
                        'En breve le llegará a su domicilio',
                        'success'
                    );
                    limpiarCarrito();
                    mostrarOcultarCarrito();
                })
                .catch((error) => {
                    swalWithBootstrapButtons.fire(
                        '¡Problema en la transmisión del pedido a la API!',
                        'Revise la excepción en la consola',
                        'error'
                    );
                    console.log("Error en el envío de datos: " + error)
                });


        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
    });

};

function limpiarCarrito() {
    const list = document.getElementById("listaOrdenes");

    while (list.hasChildNodes() && list.children.length > 1) {
        list.removeChild(list.lastChild);
    };
    mostrarOcultarCarrito();
};

btnEnviarPedido.addEventListener("click", () => {
    enviarPedido();
});

btnSumarAlCarrito.addEventListener('click', function (evt) {
    evt.preventDefault();
    const valorNoValido = validarProductoYCantidadIngresada();
    guardarOrdenEnLocalStorage(valorNoValido);
    sumarOrdenAlCarrito(valorNoValido);
    calcularTotal();
    selectorProductoYCantidad.reset();
});

dropdownList.addEventListener('input', calcularTotalParcial);
inputCantidadSeleccionada.addEventListener('input', calcularTotalParcial);
crearDropdownListProductos();
traerProductosDeBD_guardarlosEnLocalStorage();

