import Cafeteria from "./cafeteria";
let cafeteria = new Cafeteria();
cafeteria.cargarProductos();

const lista = document.querySelector("#menu-cafeteria");
let productos=cafeteria.getProductos();

const selectProducto = document.getElementById("producto");
const selectCategoria = document.getElementById("idcategoria");
actualizarMenu();
cargarListaReserva();

function cargarListaReserva(){ 
  selectProducto.innerHTML = "";
  for (const producto of productos) {
    const option = document.createElement("option");
    option.value = producto.id; option.text = producto.nombre; 
    selectProducto.appendChild(option);
  }
}
for (const producto of cafeteria.getCategorias()) {
  const option = document.createElement("option");
  option.text=option.value = producto; selectCategoria.appendChild(option);
} 
selectCategoria.addEventListener("change", function() {
  productos = cafeteria.getProductosPorCategoria(this.value);
  actualizarMenu();
  cargarListaReserva();
});
function actualizarMenu() {
  lista.innerHTML = "";
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
const cantidad = form.cantidad;
const reservasList = document.getElementById("reservas");
const reservaDetalle = document.getElementById("iddetalle");

form.addEventListener("submit", (event) => {
  const idProducto = parseInt(form.producto.value);
  event.preventDefault();
  const resultado = cafeteria.hacerReserva(idProducto, cantidad.valueAsNumber, reservaDetalle.value);
  alert(resultado);
  if(resultado.includes("Reserva creada:")){
    const li = document.createElement("li");
    li.textContent = resultado;
    reservasList.appendChild(li);
    form.reset();
    
  }
});