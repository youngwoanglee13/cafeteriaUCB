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
actualizarMenu("todas");

function actualizarMenu(categoria) {
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
  actualizarReservas();
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

function actualizarReservas(){
  reservasList.innerHTML = "";
  for (const reserva of cafeteria.getReservas()) {
    const li = document.createElement("li");
    li.textContent = reserva.cantidad + " x " +reserva.producto + " :" + reserva.detalle;
    const confirmar = document.createElement("button"); 
    confirmar.textContent = "Confirmar"; confirmar.id = reserva.id; confirmar.className = "admincafe"; confirmar.style.display = "none";
    confirmar.addEventListener("click", function() { confirmarReserva(parseInt(confirmar.id));});
    li.appendChild(confirmar);
    reservasList.appendChild(li);
  }
}

function confirmarReserva(id){
  cafeteria.confirmarReserva(id);
  actualizarMenu("todas");
  cambiarPermisos("admincafe","block");
}

categoriaSeleccionada.addEventListener("change", function() {
  actualizarMenu(this.value);
});

Reservarform.addEventListener("submit", (event) => {
  event.preventDefault();  
  const resultado = cafeteria.hacerReserva(parseInt(idProducto.value), cantidad.valueAsNumber, reservaDetalle.value);
  alert(resultado[0]);
  actualizarReservas();
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

// Función para llenar los selectores con los productos
let productos = cafeteria.getProductos("todas");

function llenarSelectores() {
  var selectEdit = document.getElementById("select-edit");
  var selectDelete = document.getElementById("select-delete");

  // Limpiar selectores
  selectEdit.innerHTML = "";
  selectDelete.innerHTML = "";

  // Llenar selectores con opciones de productos
  productos.forEach(function(producto) {
      var option = document.createElement("option");
      option.value = producto.id;
      option.text = producto.nombre;

      selectEdit.appendChild(option.cloneNode(true));
      selectDelete.appendChild(option);
  });
}

// Función para editar un producto seleccionado
window.editarProductoHtml = function() {
  var selectEdit = document.getElementById("select-edit");
  var productId = parseInt(selectEdit.value);

  // Buscar el producto seleccionado en la lista
  var producto = productos.find(function(item) {
      return item.id === productId;
  });

  if (producto) {
      // Mostrar un formulario de edición con los datos del producto
      var nuevoNombre = prompt("Ingrese el nuevo nombre del producto:", producto.nombre);
      var nuevoDescripcion = prompt("Ingrese la nueva descripcion del producto:", producto.descripcion);
      var nuevoPrecio = parseInt(prompt("Ingrese el nuevo precio del producto:", producto.precio));
      var nuevoCategoria = prompt("Ingrese la nueva categoria del producto:", producto.categoria);

      if (nuevoNombre && !isNaN(nuevoPrecio)) {
          // Actualizar los datos del producto
          // producto.nombre = nuevoNombre;
          // producto.precio = nuevoPrecio;
          cafeteria.editarProducto(productId, nuevoNombre, nuevoDescripcion, nuevoPrecio, nuevoCategoria)
          // producto = cafeteria.editarProducto(productId, nuevoNombre, nuevoDescripcion, nuevoPrecio, nuevoCategoria)
          alert("El producto se ha editado correctamente.");
          llenarSelectores();
      } else {
          alert("Los datos ingresados no son válidos.");
      }
  } else {
      alert("No se ha seleccionado ningún producto para editar.");
  }
  actualizarMenu("todas");
}

// Función para eliminar un producto seleccionado
window.eliminarProductoHtml = function() {
  var selectDelete = document.getElementById("select-delete");
  var productId = parseInt(selectDelete.value);

  // Buscar el producto seleccionado en la lista
  var productoIndex = productos.findIndex(function(item) {
      return item.id === productId;
  });

  respuesta = cafeteria.eliminarProducto(productId);
  if (productoIndex !== -1) {
      // Eliminar el producto de la lista
      // productos.splice(productoIndex, 1);
      alert(respuesta);
      llenarSelectores();
  } else {
      alert("No se ha seleccionado ningún producto para eliminar.");
  }
  actualizarMenu("todas");
}

// Llenar los selectores al cargar la página
llenarSelectores();