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
let productoSeleccionado;
let cantidadSeleccionada;
let ordenes = [];
let ordenNueva = {};
let costoParcial;
let continuar;

function escribirOrdenes() {
    let i = 1;
    let ordenesEnProsa;
    for (const orden of ordenes) {
        let ordenEnProsa = `
${i}) 
    Producto: ${orden.nombreProducto}
    Unidades: ${orden.unidades}
    Costo Unitario: $${orden.precioUnitario}
    COSTO ORDEN ${i}: ${orden.costo}
    `;
        ordenesEnProsa += ordenEnProsa;
        i += 1;
    };
    return ordenesEnProsa;
};

function calcularCostoParcial() {
    return costoParcial = ordenes.reduce((costoAcumulado, orden) => costoAcumulado + orden.costo, 0);
};

function continuarOTerminar() {
    calcularCostoParcial();
    continuar = prompt(
        `Hasta ahora suma un total parcial de $${costoParcial}.
En la consola puede ver el resumen de su orden.
Si desea continuar añadiendo productos presione 1, en caso contrario 2.`);
    while ((continuar != "1") && (continuar != "2")) {
        continuar = prompt(
            `Se equivocó de comando.
Recuerde que el costo de su orden hasta ahora asciende a $${costoParcial}.
En la consola puede ver el resumen de su orden.
Si desea continuar añadiendo productos presione 1, en caso contrario 2.`);
    };
    return continuar;
};

function ConstructorOrdenes(producto, cantidadSeleccionada) {
    this.idTipoDeProducto = producto.id;
    this.nombreProducto = producto.nombre;
    this.precioUnitario = producto.precio;
    this.unidades = parseInt(cantidadSeleccionada);
    this.costo = producto.precio * parseInt(cantidadSeleccionada);
};

function guardarOrdenes(productoSeleccionado, cantidadSeleccionada) {
    for (let producto of productos) {
        if (producto.id == productoSeleccionado) {
            let ordenNueva = new ConstructorOrdenes(producto, cantidadSeleccionada);
            return ordenNueva;
        };
    };
};

function plasmarOperacionParcialEnConsola() {
    console.log(
        `-----------------------
ORDENES HASTA EL MOMENTO
${escribirOrdenes()}
------------------------
A PAGAR: $${calcularCostoParcial()}
------------------------`);
};

function validarCantidad(cantidadSeleccionada) {
    let validezCantidad;
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

function listarProductos(productos) {
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
        if (producto.id == productoSeleccionado) {
            return true;
        };
    };
    return false;
};

function seleccionarProducto() {
    let productoSeleccionado = prompt(
        `SELECCIONE UN PRODUCTO
Tipee el número que le corresponda al item según esta lista:
${listarProductos(productos)}`
    );
    while (!(validarProductoSeleccionado(productoSeleccionado))) {
        productoSeleccionado = prompt(
            `SELECCIONE UN PRODUCTO VÁLIDO!! Se equivocó de comando.
Tipee el número que le corresponda al item según esta lista:
${listarProductos(productos)}`
        );
    };
    return productoSeleccionado;
};

function filtrarPorPrecio() {
    precioMaximo = prompt("Introduzca el máximo precio que está dispuesto a pagar por producto:");
    let productosFiltrados = productos.filter(producto => producto.precio <= precioMaximo);
    if (productosFiltrados.length != 0) {
        alert(`Los siguientes productos cumplen la restricción impuesta:
${listarProductos(productosFiltrados)}
Tenga esto en cuenta en los próximos pasos.`);
    } else {
        alert("No hay ningun producto que satisfaga sus necesidades. Tengalo en cuenta al realizar su compra.")
    };
};

function realizarPedido() {
    filtrarPorPrecio();
    do {
        productoSeleccionado = seleccionarProducto();
        cantidadSeleccionada = seleccionarCantidad();
        ordenNueva = guardarOrdenes(productoSeleccionado, cantidadSeleccionada);
        ordenes.push(ordenNueva);
        plasmarOperacionParcialEnConsola();
        continuar = continuarOTerminar();
    } while (continuar == "1");
    console.log("TOTAL FINAL: $" + calcularCostoParcial());
};

realizarPedido();
