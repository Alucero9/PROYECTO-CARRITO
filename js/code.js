class Cerveza {
  constructor(id, nombre, precio, foto, color, ABV, IBU, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.foto = foto;
    this.color = color;
    this.ABV = ABV;
    this.IBU = IBU;
    this.stock = stock;
  }
}

class ElementoCarrito {
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
}

/**
 * Definiciones de constantes
 */
const estandarDolaresAmericanos = Intl.NumberFormat("en-US");

//Arrays donde guardaremos catálogo de productos y elementos en carrito
const productos = [];
const elementosCarrito = [];


const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarritoCompras = document.querySelector("#items");

const contenedorFooterCarrito = document.querySelector("#footer");

/**
 * Ejecución de funciones
 */

cargarProductos();
dibujarCarrito();
dibujarCatalogoProductos();

/**
 * Definiciones de funciones
 */

function cargarProductos() {
  productos.push(
    new Cerveza(
      1,
      "KM 24.7",
      350,
      "./img/KM 24.7.jpg",
      "RUBIA",
      4.55,
      36.0,
      true
    )
  );
  productos.push(
    new Cerveza(
      2,
      "VERA IPA",
      290,
      "./img/VERA IPA.jpg",
      "RUBIA",
      5.8,
      20.0,
      true
    )
  );
  productos.push(
    new Cerveza(3, "WEISSE", 320, "./img/WEISSE.jpg", "RUBIA", 5.8, 20.0, false)
  );
  productos.push(
    new Cerveza(
      4,
      "AMBER LAGER",
      290,
      "./img/AMBER LAGER.jpg",
      "ROJA",
      4.5,
      14.5,
      true
    )
  );
  productos.push(
    new Cerveza(
      5,
      "BOEMIAN PILSENER",
      290,
      "./img/BOEMIAN PILSENER.jpg",
      "RUBIA",
      5.2,
      18.0,
      true
    )
  );
  productos.push(
    new Cerveza(
      6,
      "HOPPY LAGER",
      330,
      "./img/HOPPY LAGER.jpg",
      "RUBIA",
      5.1,
      18.0,
      false
    )
  );
  productos.push(
    new Cerveza(7, "PORTER", 330, "./img/PORTER.jpg", "NEGRA", 5.5, 35.0, true)
  );
}

function dibujarCarrito() {
  let sumaCarrito = 0;
  contenedorCarritoCompras.innerHTML = "";

  elementosCarrito.forEach((birra) => {
    let renglonesCarrito = document.createElement("tr");

    renglonesCarrito.innerHTML = `
                <td>${birra.producto.id}</td>
                <td>${birra.producto.nombre}</td>
                <td><input id="cantidad-producto-${
                  birra.producto.id
                }" type="number" value="${
      birra.cantidad
    }" min="1" max="1000" step="1" style="width: 70px;"/></td>
                <td>$ ${birra.producto.precio}</td>
                <td>$ ${estandarDolaresAmericanos.format(
                  birra.producto.precio * birra.cantidad
                )}</td>
                <td><button class='btn btn-close' id='btnquitar'></button></td>
            `;
            

    contenedorCarritoCompras.append(renglonesCarrito);

    sumaCarrito += birra.cantidad * birra.producto.precio;

    //agregamos evento a carrito
    let cantidadProductos = document.getElementById(
      `cantidad-producto-${birra.producto.id}`
    );

    cantidadProductos.addEventListener("change", (e) => {
      let nuevaCantidad = e.target.value;
      birra.cantidad = nuevaCantidad;
      dibujarCarrito();
    });
    
  });

  //contenedorCarritoCompras.innerHTML = renglonesCarrito;

  if (elementosCarrito.length == 0) {
    contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `;
  } else {
    contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">Total de la compra: $${estandarDolaresAmericanos.format(
              sumaCarrito
            )}</th>
        `;
  }
}

function crearCard(producto) {
  //Botón
  let botonAgregar = document.createElement("button");
  botonAgregar.className = "btn btn-success";
  botonAgregar.innerText = "Agregar";

  //Card body
  let cuerpoCarta = document.createElement("div");
  cuerpoCarta.className = "card-body";
  cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${producto.precio} </p>
    `;
  cuerpoCarta.append(botonAgregar);

  //Imagen
  let imagen = document.createElement("img");
  imagen.src = producto.foto;
  imagen.className = "card-img-top";
  imagen.alt = producto.nombre;

  //Card
  let carta = document.createElement("div");
  carta.className = "card m-2 p-2";
  carta.style = "width: 18rem";
  carta.append(imagen);
  carta.append(cuerpoCarta);

  botonAgregar.onclick = () => {
    let elementoCarrito = new ElementoCarrito(producto, 1);
    elementosCarrito.push(elementoCarrito);
    
    dibujarCarrito();

    swal({
      title: "¡Producto agregado!",
      text: `${producto.nombre} agregado al carrito de compra.`,
      icon: "success",
      buttons: {
        cerrar: {
          text: "Cerrar",
          value: false,
        },
        carrito: {
          text: "Ir a carrito",
          value: true,
        },
      },
    }).then((irACarrito) => {
      if (irACarrito) {
        //swal("Vamos al carrito!");
        const myModal = new bootstrap.Modal(
          document.getElementById("exampleModal"),
          { keyboard: true }
        );
        const modalToggle = document.getElementById("toggleMyModal");
        myModal.show(modalToggle);
      }
    });
  };
  
  return carta;
  
}

function dibujarCatalogoProductos() {
  contenedorProductos.innerHTML = "";

  productos.forEach((producto) => {
    let contenedorCarta = crearCard(producto);
    contenedorProductos.append(contenedorCarta);
  });
}

//boton eliminar producto de carrito
/* const botonquitar =document.getElementById("btnquitar")
    botonquitar.onclick = () => {
    let elementoCarrito = new ElementoCarrito(producto, 1);
    elementosCarrito.delete(elementoCarrito);

    dibujarCarrito();} */