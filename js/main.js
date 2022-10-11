let productos = [
    p1 = {
        id: 1,
        nombre: "Sándwich de milanesa",
        precio: 500,
    },
    p2 = {
        id: 2,
        nombre: "Sándwich de lomito",
        precio: 600,
    },
    p3 = {
        id: 3,
        nombre: "Pizza especial",
        precio: 1000,
    },
];

const PRECIO1 = 450;
const PRECIO2 = 550;
const PRECIO3 = 1000;
let total = 0;
let continuar;

function continuarOTerminar(total) {
    continuar = prompt("Hasta ahora debería pagar $" + total + "\nSi desea continuar añadiendo productos presione 1, en caso contrario 2.");
    while ((continuar != "1") && (continuar != "2")) {
        continuar = prompt("Se equivocó de comando.\nSi desea continuar añadiendo productos presione 1, en caso contrario 2.");
    };
    return continuar;
};

function calcularCostoParcial(productoSeleccionado, cantidadSeleccionada) {
    switch (productoSeleccionado) {
        case "1":
            return PRECIO1 * cantidadSeleccionada;
        case "2":
            return PRECIO2 * cantidadSeleccionada;
        case "2":
            return PRECIO3 * cantidadSeleccionada;
    }
};

function plasmarOperacionParcialEnConsola(productoSeleccionado, cantidadSeleccionada, costoParcial) {
    console.log("Producto " + productoSeleccionado + " x " + cantidadSeleccionada + " = " + costoParcial);
};

function validarCantidad(cantidadSeleccionada) {
    if (isNaN(Number(cantidadSeleccionada)) || (cantidadSeleccionada % 1 != 0)) {
        return validezCantidad = false;
    } else {
        return validezCantidad = true;
    };
};

function seleccionarCantidad() {
    let cantidadSeleccionada = prompt("¿Cuantas unidades desea? Solo se aceptan número enteros:");
    let validezCantidad = validarCantidad(cantidadSeleccionada);
    while (validezCantidad === false) {
        cantidadSeleccionada = prompt("No introdujo un número entero. Vuela a introducir cuantas unidades desea:");
        validezCantidad = validarCantidad(cantidadSeleccionada);
    };
    return cantidadSeleccionada;
};

function listarProductos() {
    let listaProductos = "";
    for (let i = 0; i < productos.length; i += 1) {
        if (i == productos.length) {
            listaProductos += `${productos[i].id} // ${productos[i].nombre} - $${productos[i].precio}.`
        } else {
            listaProductos += `${productos[i].id} // ${productos[i].nombre} - $${productos[i].precio}.\n`;
        }
    };
    return listaProductos;
};

function validarProductoSeleccionado(productoSeleccionado) {
    for (let producto of productos) {
        if (producto.id == productoSeleccionado ) {
            return true;
        };
    };
    return false;
};

function seleccionarProducto() {
    let productoSeleccionado = prompt(
        `SELECCIONE UN PRODUCTO
Tipee el número que le corresponda al item según esta lista:
${listarProductos()}`
    );
    while (!(validarProductoSeleccionado(productoSeleccionado))) {
        productoSeleccionado = prompt(
            `SELECCIONE UN PRODUCTO VÁLIDO!! Se equivocó de comando.
Tipee el número que le corresponda al item según esta lista:
${listarProductos()}`
        );
    };
    return productoSeleccionado;
};

function realizarPedido() {
    do {
        let productoSeleccionado = seleccionarProducto();
        let cantidadSeleccionada = seleccionarCantidad();
        let costoParcial = calcularCostoParcial(productoSeleccionado, cantidadSeleccionada);
        plasmarOperacionParcialEnConsola(productoSeleccionado, cantidadSeleccionada, costoParcial);
        total += costoParcial;
        continuar = continuarOTerminar(total);
    } while (continuar == "1");
    console.log("TOTAL A PAGAR: " + total);
};

realizarPedido();
