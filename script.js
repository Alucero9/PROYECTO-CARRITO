let carrito = JSON.parse(localStorage.getItem("carrito"))||[];
let cervezasJson = [];
let dolarVenta;
let lista

//Evento-Cuando la ventana está cargada
window.onload=()=>{
    lista=document.getElementById("milista");
    document.getElementById("fila_dolar");
    obtenerValorDolar();
    //selector y evento change ordenar
    document.getElementById("miSeleccion").setAttribute("option", "pordefecto");
    document.getElementById("miSeleccion").onchange=()=>ordenar();
    //selector y ecento filtrar
    document.getElementById("Filtrado").setAttribute("option", "pordefecto");
    document.getElementById("Filtrado").onchange=()=>filtrar();
};

function renderizarProductos() {
    //renderizamos los productos 
   
    for (const prod of cervezasJson) {
        lista.innerHTML+=(`<li class="col-sm-3 list-group-item ">
        <h3>ID: ${prod.id}</h3>
        <img src="${prod.foto}" width="250px" height="250px">
        <p>Producto: ${prod.nombre}</p>
        <p>Precio $ ${prod.precio}</p>
        <p>Precio U$ ${(prod.precio/dolarVenta).toFixed(1)}</p>
        <p>Color: ${prod.color}</p>
        <button class="btn btn-success" id='btn${prod.id}'>COMPRAR</button>
    </li>`);
    }
    //EVENTOS
    cervezasJson.forEach(prod=> {
         //Evento para cada boton
         document.getElementById(`btn${prod.id}`).onclick= function() {
            agregarACarrito(prod);
        };
    });
}

function agregarACarrito(productoNuevo) {
    let encontrado = carrito.find(p => p.id == productoNuevo.id);
    console.log(encontrado);
    if (encontrado == undefined) {
        let prodACarrito = {
            ...productoNuevo,
            cantidad:1
        };
        carrito.push(prodACarrito);
        console.log(carrito);
        Swal.fire(
            'Nuevo producto agregado al carro',
            productoNuevo.nombre,
            'success'
        );
        //agregamos una nueva fila a la tabla de carrito
        document.getElementById("tablabody").innerHTML+=(`
            <tr id='fila${prodACarrito.id}'>
            <td> ${prodACarrito.id} </td>
            <td> ${prodACarrito.nombre}</td>
            <td id='${prodACarrito.id}'> ${prodACarrito.cantidad}</td>
            <td> ${prodACarrito.precio}</td>
            <td> <button class='btn btn-light' onclick='eliminar(${prodACarrito.id})'>🗑️</button>`);
    } else {
        //el producto ya existe en el carro
        //pido al carro la posicion del producto 
        let posicion = carrito.findIndex(p => p.id == productoNuevo.id);
        console.log(posicion);
        carrito[posicion].cantidad += 1;
        
        document.getElementById(productoNuevo.id).innerHTML=carrito[posicion].cantidad;
    }
    //siempre debo recalcular el total
    document.getElementById("gastoTotal").innerText=(`Total: $ ${calcularTotal()}`);
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

function calcularTotal() {
    let suma = 0;
    for (const elemento of carrito) {
        suma = suma + (elemento.precio * elemento.cantidad);
    }
    return suma;
}

function eliminar(id){
    let indice=carrito.findIndex(prod => prod.id==id);
    carrito.splice(indice,1);//eliminando del carro
    let fila=document.getElementById(`fila${id}`);
    document.getElementById("tablabody").removeChild(fila);//eliminando de la tabla
    document.getElementById("gastoTotal").innerText=(`Total: $ ${calcularTotal()}`);
    localStorage.setItem("carrito",JSON.stringify(carrito));
    Swal.fire("Producto eliminado del carro!")
}

function ordenar() {
    let seleccion = document.getElementById("miSeleccion").value;
    console.log(seleccion)
    if (seleccion == "menor") {
        cervezasJson.sort(function(a, b) {
            return a.precio - b.precio
        });
    } else if (seleccion == "mayor") {
        cervezasJson.sort(function(a, b) {
            return b.precio - a.precio
        });
    } else if (seleccion == "alfabetico") {
        cervezasJson.sort(function(a, b) {
            return a.nombre.localeCompare(b.nombre);
        });    
    }
    
    lista.innerHTML="";
    renderizarProductos();
}
function filtrar() {
    let filtro = document.getElementById("Filtrado").value;
    if (filtro == "rubia") {
        let rubia = cervezasJson.filter(birra => birra.color == "rubia")
        console.log(rubia)
        cervezasJson=rubia

        ;
    } else if (filtro == "negra") {
        let negra = cervezasJson.filter(birra => birra.color == "negra"
        );
        console.log(negra)
        cervezasJson=negra
    } else if (filtro == "roja") {
        let roja = cervezasJson.filter(birra => birra.color == "roja"
        );
        console.log(roja)
        cervezasJson=roja
    }
    else if (filtro == "borrar filtros") {
       //falta resolver
    }
    
    lista.innerHTML="";
    renderizarProductos();
}

//GETJSON de productos.json
async function obtenerJSON() {
    const URLJSON="productos.json"
    const resp=await fetch(URLJSON)
    const data= await resp.json()
    cervezasJson = data;
    //ya tengo el dolar y los productos, renderizo las cartas
    renderizarProductos();
}


//function para obtener el valor del dolar blue en tiempo real
async function obtenerValorDolar() {
    const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
    const resp=await fetch(URLDOLAR)
    const data=await resp.json()
    document.getElementById("fila_dolar").innerHTML+=(`<p align="center">Dolar compra: $ ${data.compra}  Dolar venta: $ ${data.venta}</p>`);
    dolarVenta = data.venta;
    //ya tengo los datos del dolar, llamo al json
    obtenerJSON();
}
