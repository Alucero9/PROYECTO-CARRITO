let carrito=[];
if(localStorage.getItem("carrito")){
    carrito=JSON.parse(localStorage.getItem("carrito"));
    //cargar los elementos del carro abandonado a la tabla
}
let lista=document.getElementById("milista");

console.log(document.body);
let campoEmpresa=document.getElementById("mesa");
class Cerveza {
  constructor(id, nombre, precio, color, ABV, IBU, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.color = color;
    this.ABV = ABV;
    this.IBU = IBU;
    this.stock = stock;
  }
}
const cervezas = [];
cervezas.push(new Cerveza(1, "KM 24.7", 350, "RUBIA", 4.55, 36.0,true,));
cervezas.push(new Cerveza(2, "VERA IPA", 290, "RUBIA", 5.8, 20.0, true));
cervezas.push(new Cerveza(3, "WEISSE", 320, "RUBIA", 5.8, 20.0, false));
cervezas.push(new Cerveza(4, "AMBER LAGER", 290, "ROJA", 4.5, 14.5, true));
cervezas.push(new Cerveza(5, "BOEMIAN PILSENER", 290, "RUBIA", 5.2, 18.0, true));
cervezas.push(new Cerveza(6, "HOPPY LAGER", 330, "RUBIA", 5.1, 18.0, false));
cervezas.push(new Cerveza(7, "PORTER", 330, "NEGRA", 5.5, 35.0, true ));


renderizarProductos();

function renderizarProductos() {
    for (const producto of cervezas) {
        lista.innerHTML+=`<li class="col-sm-3 list-group-item ">
            <h3> ID: ${producto.id} </h3>
            <img src="./img/${producto.nombre}.jpg"class="card-img-top">
            <h5 class=card-title> Producto: ${producto.nombre}</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Color: ${producto.color}</li>
              <li class="list-group-item">ABV: ${producto.ABV}</li>
              <li class="list-group-item">IBU: ${producto.IBU}</li>
            </ul>
            <p><strong> $ ${producto.precio} </strong></p>
            <button class='btn btn-success' id='btn${producto.id}'>Comprar</button>
        </li>`;
    }
    //eventos boton comprar
    cervezas.forEach(producto =>{
        //evento individual para cada boton
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    })

}
function agregarAlCarrito(producto){
  carrito.push(producto);
  
  alert("Producto: "+producto.nombre+" agregado al carro!");
  document.getElementById("tablabody").innerHTML+=`
      <tr>
          <td>${producto.id}</td>
          <td>${producto.nombre}</td>
          <td>${producto.precio}</td>
          <td><button class='btn btn-close' id='btn2${producto.id}'></button></td>
      </tr>
  `;
  localStorage.setItem("carrito",JSON.stringify(carrito));
}
