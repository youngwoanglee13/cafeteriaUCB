import Cafeteria from "./cafeteria";
let cafeteria = new Cafeteria(); cafeteria.cargarProductos();

const lista = document.querySelector("#menu-cafeteria");//aqui
const reservasList = document.getElementById("reservas");
const productoPorReservar = document.getElementById("productoPorReservar");
const categoriaSeleccionada = document.getElementById("idcategoria");
const agregarProductoForm = document.getElementById("agregarProductoForm");
const Reservarform = document.getElementById("reservaForm");
const botonAdministrador = document.querySelector("#botonAdministrador");
const botonUsuario = document.querySelector("#botonUsuario");
const cantidad = Reservarform.cantidad;
const reservaDetalle = document.getElementById("iddetalle");
const idProducto = Reservarform.producto;
  
actualizarMenu("todas");//aqui

function actualizarMenu(categoria) {//aqui
  let listaProductos = cafeteria.getProductos(categoria);
  lista.innerHTML = "";
  for (let i = 0; i < listaProductos.length; i++) {
    const li = document.createElement("li"); li.className = "producto"; li.id = listaProductos[i].id;
    const nombre = document.createElement("div"); nombre.textContent = listaProductos[i].nombre;
    const descripcion = document.createElement("div"); descripcion.textContent = listaProductos[i].descripcion;
    const precio = document.createElement("div"); precio.textContent = listaProductos[i].precio + " Bs.";
    const reservable = document.createElement("div"); reservable.textContent = "disponible:" + listaProductos[i].reservable;
    const categoria = document.createElement("div"); categoria.textContent = "#" + listaProductos[i].categoria;
    const stock = document.createElement("div"); stock.className = "admincafe";
    stock.style.display = "none"; stock.textContent = "en stock  :"+listaProductos[i].stock;
    li.appendChild(nombre); li.appendChild(descripcion); li.appendChild(precio);
    li.appendChild(reservable); li.appendChild(stock); li.appendChild(categoria);
    lista.appendChild(li);
  }
  actualizarCategorias(categoria);
  actualizarComboReservar(categoria);
}

function actualizarComboReservar(categoria){ 
  productoPorReservar.innerHTML = "";
  for (const producto of cafeteria.getProductos(categoria)) {
    const option = document.createElement("option");
    option.value = producto.id; option.text = producto.nombre; 
    productoPorReservar.appendChild(option);
  }
}

function actualizarCategorias(categoria){
  categoriaSeleccionada.innerHTML = "";
  for (const producto of cafeteria.getCategorias()) {
    const option = document.createElement("option");
    option.text=option.value = producto; categoriaSeleccionada.appendChild(option);
  }
  categoriaSeleccionada.value = categoria; 
}

function cambiarPermisos(tipoDeUsuario,display){
  var elementosUsuario = document.querySelectorAll("."+tipoDeUsuario);
  elementosUsuario.forEach(function(elemento) {
  elemento.style.display = display;
  });
}

categoriaSeleccionada.addEventListener("change", function() {
  actualizarMenu(this.value);
});

Reservarform.addEventListener("submit", (event) => {
  event.preventDefault();  
  const resultado = cafeteria.hacerReserva(parseInt(idProducto.value), cantidad.valueAsNumber, reservaDetalle.value);
  alert(resultado);
  if(resultado.includes("Reserva creada:")){
    const li = document.createElement("li");
    li.textContent = resultado;
    reservasList.appendChild(li);
    Reservarform.reset();
    actualizarMenu("todas");
  }
});

agregarProductoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nombre = agregarProductoForm.nombre.value;
  const descripcion = agregarProductoForm.descripcion.value;
  const precio = parseFloat(agregarProductoForm.precio.value);
  const categoria = agregarProductoForm.categoria.value;
  const stock = parseInt(agregarProductoForm.cantidad.value);
  cafeteria.agregarProducto(nombre, descripcion, precio, categoria, stock, stock);
  actualizarMenu("todas");
});

botonAdministrador.addEventListener("click", function() {
  cambiarPermisos("admincafe","block");
  cambiarPermisos("usuariocafe","none");
});
botonUsuario.addEventListener("click", function() {
  cambiarPermisos("admincafe","none");
  cambiarPermisos("usuariocafe","block");
});

