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
const selectEdit = document.getElementById("select-edit");
const selectDelete = document.getElementById("select-delete");
const horaInput = document.getElementById('hora-input'); 
actualizarMenu("todas");

cambiarPermisos("admincafe","none");
function actualizarMenu(categoria) {
  let listaProductos = cafeteria.getProductos(categoria);
  lista.innerHTML = "";
  for (let i = 0; i < listaProductos.length; i++) {
    const li = document.createElement("li"); li.className = "producto"; li.id = listaProductos[i].id;
    const nombre = document.createElement("strong"); nombre.textContent = listaProductos[i].nombre;
    const descripcion = document.createElement("div"); descripcion.textContent = listaProductos[i].descripcion;
    const precio = document.createElement("div"); precio.textContent = listaProductos[i].precio + " Bs.";
    const reservable = document.createElement("div"); reservable.textContent = "disponible:" + listaProductos[i].reservable;
    const categoria = document.createElement("div"); categoria.textContent = "#" + listaProductos[i].categoria;
    const stock = document.createElement("div"); stock.className = "admincafe";
    stock.textContent = "en stock  :"+listaProductos[i].stock;
    li.appendChild(nombre); li.appendChild(descripcion); li.appendChild(precio);
    li.appendChild(reservable); li.appendChild(stock); li.appendChild(categoria);
    lista.appendChild(li);
  }
  actualizarCategorias(categoria);
  actualizarComboReservar(categoria);
  actualizarReservas();
  const ahora = new Date();
  const horaActual = new Date(ahora.getTime() + 20 * 60000).toLocaleTimeString('en-US', {hour12: false,hour: '2-digit', minute: '2-digit'});
  horaInput.min = horaActual;horaInput.value = horaActual;
}
function cancelarReserva(id){
  alert(cafeteria.cancelarReserva(id))
  actualizarMenu("todas");
  cambiarPermisos("admincafe","none");
  cambiarPermisos("usuariocafe","block");
}
function actualizarComboReservar(categoria){ 
  productoPorReservar.innerHTML = "";
  selectEdit.innerHTML = "";
  selectDelete.innerHTML = "";
  for (const producto of cafeteria.getProductos(categoria)) {
    const option = document.createElement("option");
    option.value = producto.id; option.text = producto.nombre; 
    productoPorReservar.appendChild(option);
    selectEdit.appendChild(option.cloneNode(true));
    selectDelete.appendChild(option.cloneNode(true));
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
function actualizarReservas(){
  reservasList.innerHTML = "";
  const selectEditReserva = document.getElementById("select-edit-reserva");
  selectEditReserva.innerHTML = "";
  for (const reserva of cafeteria.getReservas()) {
    const li = document.createElement("li");
    li.textContent = reserva.cantidad + " x " +reserva.producto + " - " + reserva.detalle + " - Entrega a las" + reserva.horaEntrega;
    const cancelar = document.createElement("button"); cancelar.textContent = "Cancelar"; cancelar.id = reserva.id; cancelar.className = "usuariocafe";
    cancelar.addEventListener("click", function() { cancelarReserva(parseInt(cancelar.id));});
    const confirmar = document.createElement("button"); 
    confirmar.textContent = "Entregado"; confirmar.id = reserva.id; confirmar.className = "admincafe"; confirmar.style.display = "none";
    confirmar.addEventListener("click", function() { confirmarReserva(parseInt(confirmar.id));});
    li.appendChild(cancelar);
    li.appendChild(confirmar);
    reservasList.appendChild(li);
    const option = document.createElement("option");
    option.value = reserva.id;
    option.text = reserva.cantidad + " x " + reserva.producto;
    selectEditReserva.appendChild(option);
  }
}
function confirmarReserva(id){
  cafeteria.confirmarReserva(id);
  actualizarMenu("todas");
  cambiarPermisos("admincafe","block");
  cambiarPermisos("usuariocafe","none");
}
const editarReservaForm = document.getElementById("editarReservaForm");
editarReservaForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const idReserva = parseInt(document.getElementById("select-edit-reserva").value);
  const nuevaCantidad = parseInt(document.getElementById("nueva-cantidad").value);
  const nuevoDetalle = document.getElementById("nuevo-detalle").value;
  const resultado = cafeteria.editarReserva(idReserva, nuevaCantidad, nuevoDetalle);
  alert(resultado);
  actualizarMenu("todas");
});
categoriaSeleccionada.addEventListener("change", function() {
  actualizarMenu(this.value);
});
Reservarform.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(horaInput.value);
  const resultado = cafeteria.hacerReserva(parseInt(idProducto.value), cantidad.valueAsNumber, reservaDetalle.value, horaInput.value);
  alert(resultado[0]);
  Reservarform.reset();
  actualizarMenu("todas");
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
let productos = cafeteria.getProductos("todas");
window.editarProductoHtml = function() {
  var selectEdit = document.getElementById("select-edit");
  var productId = parseInt(selectEdit.value);
  var producto = productos.find(function(item) {
      return item.id === productId;
  });
  if (producto) {
      var nuevoNombre = prompt("Ingrese el nuevo nombre del producto:", producto.nombre);
      var nuevoDescripcion = prompt("Ingrese la nueva descripcion del producto:", producto.descripcion);
      var nuevoPrecio = parseInt(prompt("Ingrese el nuevo precio del producto:", producto.precio));
      var nuevoCategoria = prompt("Ingrese la nueva categoria del producto:", producto.categoria);
      var aumentarStock = prompt("Ingrese la cantidad de stock que desea aumentar:", 0);
      if (nuevoNombre && !isNaN(nuevoPrecio)) {
          cafeteria.editarProducto(productId, nuevoNombre, nuevoDescripcion, nuevoPrecio, nuevoCategoria, aumentarStock)
          alert("El producto se ha editado correctamente.");
      } else {
          alert("Los datos ingresados no son válidos.");
      }
  } else {
      alert("No se ha seleccionado ningún producto para editar.");
  }
  actualizarMenu("todas");
}
window.eliminarProductoHtml = function() {
  var selectDelete = document.getElementById("select-delete");
  var productId = parseInt(selectDelete.value);
   var productoIndex = productos.findIndex(function(item) {
       return item.id === productId;
   });
  const respuesta = cafeteria.eliminarProducto(productId);
  if (productoIndex !== -1) {
      alert(respuesta);
  } else {
      alert("No se ha seleccionado ningún producto para eliminar.");
  }
  actualizarMenu("todas");
}


