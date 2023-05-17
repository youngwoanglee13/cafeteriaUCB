import Cafeteria from "./cafeteria";

//let cafeteria = new Cafeteria();
cafeteria.cargarProductos();

const agregarProductoForm = document.querySelector("#agregarProductoForm");
agregarProductoForm.addEventListener("submit", agregarProductoHandler);

// Controlador de eventos para agregar producto
function agregarProductoHandler(event) {
  event.preventDefault();

  const nombreInput = document.querySelector("#nombre");
  const descripcionInput = document.querySelector("#descripcion");
  const precioInput = document.querySelector("#precio");
  const categoriaInput = document.querySelector("#categoria");
  const cantidadInput = document.querySelector("#cantidad");

  // Llamar a la función agregarProducto de la instancia de Cafeteria
  const cafeteria = new Cafeteria();
  cafeteria.agregarProducto(
    nombreInput.value,
    descripcionInput.value,
    precioInput.value,
    categoriaInput.value,
    cantidadInput.value
  );

const lista = document.querySelector("#menu-cafeteria");
let productos;
actualizarMenu();
//funcion imprimir productos:
const selectProducto = document.getElementById("producto");
const listaproductos = cafeteria.getProductos();
const listaReservas = cafeteria.getReservas();

for (const producto of listaproductos) {
  const option = document.createElement("option");
  option.value = producto.id;
  option.text = producto.nombre;
  selectProducto.appendChild(option);
}

function actualizarMenu() {
  productos = cafeteria.getProductos();
  for (let i = 0; i < productos.length; i++) {
    const li = document.createElement("li");
    li.className = "producto";
    li.id = productos[i].id;
    const nombre = document.createElement("div");
    nombre.textContent = productos[i].nombre;
    const descripcion = document.createElement("div");
    descripcion.textContent = productos[i].descripcion;
    const precio = document.createElement("div");
    precio.textContent = productos[i].precio + " Bs.";
    const cantidad = document.createElement("div");
    cantidad.textContent = productos[i].cantidad + " en stock";
    const categoria = document.createElement("div");
    categoria.textContent = "#" + productos[i].categoria;
    li.appendChild(nombre);
    li.appendChild(descripcion);
    li.appendChild(precio);
    li.appendChild(cantidad);
    li.appendChild(categoria);
    lista.appendChild(li);
  }
}

const form = document.getElementById("reservaForm");
const idProducto = parseInt(form.producto.value);
const cantidad = parseInt(form.cantidad.value);
const reservasList = document.getElementById("reservas");
const li = document.createElement("li");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const resultado = cafeteria.hacerReserva(idProducto, cantidad);
  alert(resultado);
  li.textContent = resultado;
  reservasList.appendChild(li);
  form.reset();
});

// for (const reserva of listaReservas) {
//   li.textContent = `Reserva: ${reserva.cantidad} x ${reserva.idProducto}`;
//   reservasList.appendChild(li);
// }

