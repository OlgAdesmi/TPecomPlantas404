

class Plantas {
    constructor(id, tipo, nombreVulgar, nombreCientifico, tamaño, colorFloracion,
        epocaFloracion, Follaje, presentacion, stock, inCart, precio, imagen) {
        this.id = id
        this.tipo = tipo
        this.nombreVulgar = nombreVulgar
        this.nombreCientifico = nombreCientifico
        this.tamaño = tamaño
        this.colorFloracion = colorFloracion
        this.epocaFloracion = epocaFloracion
        this.Follaje = Follaje
        this.presentacion = presentacion
        this.stock = stock
        this.inCart = inCart
        this.precio = precio
        this.imagen = imagen
    }
}

let arrayPlantas = [
    new Plantas(0, "enredadera", "Sen del Campo", "Senna corymbosa", 1, "amarillo", "primavera", "caducifolio",
        "maceta", 10, 0, 800, ["Senna_cor_1.jfif", "Senna_cor2.jfif"]),
    new Plantas(1, "enredadera", "Mariposera", "Austroeupatorium inulifolium", 0.7, "blanco", "primavera", "caducifocio",
        "maceta", 10, 0, 700, ["Austroeupatorium1.jfif", "Austroeupatorium2.jfif"]),
    new Plantas(2, "arbusto", "Cedron del campo", "Aloysia gratissima", 0.9, "blanco", "primavera", "persistente",
        "maceta", 10, 0, 1000, ["Aloysia1.jfif", "Aloysia2.jfif"]),
    new Plantas(3, "arbusto", "Flor de San Juan", "Pyrostegia venusta", 0.5, "naranja", "primavera", "persistente",
        "maceta", 10, 0, 1700, ["Pyrostegia1.jfif", "Pyrostegia2.jfif"]),
    new Plantas(4, "arbol", "Jacaranda", "Jacaranda mimosifolia", 1.5, "violeta", "primavera", "caducifolio",
        "a raiz desnuda", 10, 0, 1200, ["Jacaranda1.jfif", "Jacaranda2.jfif"]),
    new Plantas(5, "arbol", "Azota caballo", "Luehea divaricata", 1.2, "rosado", "primavera", "caducifolio",
        "maceta", 10, 0, 2700, ["Luehea1.jfif", "Luehea2.jfif"]),
    new Plantas(6, "arbol", "Ibirapita", "Peltophorum dubium", 0.7, "amarillo", "verano", "persistente",
        "maceta", 10, 0, 1600, ["Peltophorum1.jfif", "Peltophorum2.jfif"]),
    new Plantas(7, "arbol", "Casuarina", "Casuarina cunninghamiana", 1.2, "no", "no", "persistente",
        "maceta", 10, 0, 700, ["Casuarina1.jfif", "Casuarina2.jfif"]),
    new Plantas(8, "conifera", "Cipres Calvo", "Taxodium distichum", 1, "no", "no", "persistente",
        "maceta", 10, 0, 2000, ["Taxodium1.jfif", "Taxodium2.jfif"]),
    new Plantas(9, "herbacea", "Camará morado", "Lantana megapotamica", 0.4, "violeta", "primavera", "persistente",
        "maceta", 10, 0, 970, ["Lantana1.jpg", "Lantana2.jfif"]),
    new Plantas(10, "herbacea", "Azucenita colorada", "Rhodophiala bifida", 0.3, "rojo", "primavera", "perenne",
        "maceta", 10, 0, 1300, ["Rhodololia1.jfif", "Rhodolia2.jfif"]),
]


const divContenedor = document.querySelector("#contenedor")

if (divContenedor != null){
    for (let i = 0; i < arrayPlantas.length; i++) {
        divContenedor.innerHTML += obtenerCartas(arrayPlantas[i]);
    }
}


function obtenerCartas(planta) {
    let carta = `
        <div class="carta" id="${planta.id}">
        <img draggable="false" src="./Imagenes/imagenes_plantas/${planta.imagen[0]}" alt="Planta" class="carta__imagen">    
        <h2 class="carta__h2">Tipo: ${planta.tipo}</h2>
        <h3>Nombre común: ${planta.nombreVulgar}</h3>
        <h3>Nombre científico: <i>${planta.nombreCientifico}</i></h3>
        <h3>Precio: ${planta.precio}</h3>
        <h4>Stock: ${planta.stock}</h4>

        <button class="carta-boton__detalle" id="btn__detalle__${planta.id}">Ver detalle</button>
        <button class="carta-boton__carrito" id="btn__carrito__${planta.id}">Añadir al carrito</button>
            </div>
        `;

    return carta;
}


//Ver detalle: se abre como modal
let botonDetalle = document.querySelectorAll(".carta-boton__detalle");
botonDetalle.forEach(boton=> {
    boton.onclick = () => {
        let idPlanta = boton.id;
        let id = idPlanta.substr(14, 2); 

        abrirModal(arrayPlantas[id]);
    }
})   

// //Activar el boton Añadir al carrito
// let botonComprar = document.getElementssName(".carta-boton__comprar");
// botonComprar.onclick = () => {
//     
//let carrayCarrito = document.getElementById("carrito");
//     let totalCompra = arrayPlantas.reduce((total, item) => total + Plantas.nombre, '')
//     carrito.textContent = '$' + totalCompra

//     console.log(totalCompra)
// }
let carrito = document.querySelectorAll(".carta-boton__carrito");


for (let i=0; i < carrito.length; i++){
    carrito[i].addEventListener("click", () => {
     cantidadCarrito(arrayPlantas[i]);
     totalCost(arrayPlantas[i]);
    })
 }

 function onLoadCartNumbers() {
    let prodCant = localStorage.getItem("cantidadCarrito");

    if (prodCant){
        document.querySelector(".carrito span").textContent = prodCant;
    }
}

 function cantidadCarrito(planta) {
    console.log("La planta clickeada es", planta)
    let productsCantidad = localStorage.getItem("cantidadCarrito");
    
    productsCantidad = parseInt(productsCantidad);
   
    if (productsCantidad){
        localStorage.setItem("cantidadCarrito", productsCantidad + 1);
        document.querySelector(".carrito span").textContent = productsCantidad + 1;
    }else{
         localStorage.setItem("cantidadCarrito", 1);
         document.querySelector(".carrito span").textContent = 1;
    }

    setItems(planta);
}

//Para poner en el local storage
function setItems(planta){
    //console.log("Inside of setItemsfunction");
    //console.log("My planta is", planta);
    let cartItems = localStorage.getItem("productsInCart");
    //console.log("My cart items are", cartItems);

    cartItems = JSON.parse(cartItems);
    //console.log(typeof cartItems); // cartItems is not a normal JS object (it is JSON)
    // parse -- to pass form JSON to a normal JS object
    //console.log("My cart items are", cartItems);

    if (cartItems != null) {

        if(cartItems[planta.nombreCientifico] == undefined) {
            cartItems = {
                ...cartItems, //3 points are the rest JS operator
                [planta.nombreCientifico]: planta
            }
        }
        cartItems[planta.nombreCientifico].inCart += 1;

        }else{
            planta.inCart = 1;
            cartItems = {
            [planta.nombreCientifico]: planta
            }
        }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//Calculo del costo total
function totalCost(planta){
    //console.log("The product price is", planta.precio);
    let cartCost = localStorage.getItem("totalCost");
    // console.log("My cartCost is", cartCost);
    // console.log(typeof cartCost);

    if(cartCost != null) { 
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + planta.precio)

    }else{
        localStorage.setItem("totalCost", planta.precio);
    }
    
}

//-----to display the carrito page when clicking a basket
function displayCart() {//I want this function to run whenever the page is opened
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    //console.log(cartItems);

    let productContainer = document.querySelector(".plantas");
    let cartCost = localStorage.getItem("totalCost");

    //console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML ="";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="planta">
            <ion-icon name="close-circle"></ion-icon>
            <img src="Imagenes/imagenes_plantas/${item.imagen[1]}">
            <span><i>${item.nombreCientifico}</i></span>
            </div>
            <div class="price">$${item.precio},00</div>
            <div class="quantity">${item.inCart}</div>
            <div class="total">
                    $${item.inCart * item.precio},00
            </div>
            `

        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle>
            Carrito Total
            </h4>
            <h4 class="basketTotal">
            $${cartCost},00
            </h4>
        `
    }

}

onLoadCartNumbers();
displayCart();

//-------Modal a traves del boton "Ver detalle"
let contenedor = document.getElementById('carta');
let modalContenedor = document.getElementById('modal-contenedor');

function abrirModal(Plantas) {
    //console.log(banderaModalAbierto);
    modalContenedor.innerHTML = ''
    let modal = document.createElement('div');
    let id = document.createElement("id");
    let titulo = document.createElement('h2');
    let descripcion = document.createElement('h3');
    titulo.textContent = `Nombre común: ${Plantas.nombreVulgar}`
    modal.className = 'modal-contenido';
    descripcion.textContent = `Id: ${Plantas.id}
                            Tipo: ${Plantas.tipo}
                            Nombre científico: ${Plantas.nombreCientifico}
                            Color de floración: ${Plantas.colorFloracion}
                            Época de floración: ${Plantas.epocaFloracion}
                            Follaje: ${Plantas.Follaje}
                            Presentación: ${Plantas.presentacion}
                            `
    let botonCerrar = document.createElement('button');
    botonCerrar.textContent = 'X'
    botonCerrar.onclick = () => {
        cerrarModal()
    }

    let imagen = document.createElement("img");
    imagen.id = "imagen " + id;
    let index = 0;
    imagen.className = 'imagen';
    imagen.src = `./Imagenes/imagenes_plantas/${Plantas.imagen[index]}`
    modalContenedor.classList.remove('display-none');

    let siguiente = document.createElement('button');
    siguiente.textContent = 'siguiente imagen'
    siguiente.onclick = () => {
        if (index < Plantas.imagen.length) {
            index++;
            if (index == Plantas.imagen.length) {
                index = 0
            }
            imagen.src = `./Imagenes/imagenes_plantas/${Plantas.imagen[index]}`
        }
    }
    let anterior = document.createElement('button');
    anterior.textContent = 'anterior imagen'
    anterior.onclick = () => {
        if (index < Plantas.imagen.length) {
            index--;
            if (index < 0) {
                index = Plantas.imagen.length - 1
            }
            imagen.src = `./Imagenes/imagenes_plantas/${Plantas.imagen[index]}`
        }
    }


//Cerrar modal
function cerrarModal() {
    modalContenedor.classList.add('display-none')
  
}

    modal.append(botonCerrar, titulo, descripcion, imagen, siguiente, anterior);
    modalContenedor.append(modal);
}


