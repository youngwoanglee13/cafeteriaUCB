import Cafeteria from "./cafeteria";
let cafeteria = new Cafeteria();
cafeteria.cargarProductos();

const lista = document.querySelector("#menu-cafeteria");
let productos; actualizarMenu();
//funcion imprimir productos:

function actualizarMenu(){
  productos = cafeteria.getProductos();
  for (let i = 0; i < productos.length; i++) {
    const li = document.createElement("li"); li.className = 'producto'; li.id = productos[i].id;
    const nombre = document.createElement('div'); nombre.textContent = productos[i].nombre;
    const descripcion = document.createElement('div'); descripcion.textContent = productos[i].descripcion;
    const precio = document.createElement('div'); precio.textContent = productos[i].precio + " Bs.";
    const cantidad = document.createElement('div'); cantidad.textContent = productos[i].cantidad + " en stock";
    const categoria = document.createElement('div'); categoria.textContent ="#"+productos[i].categoria;
    li.appendChild(nombre); li.appendChild(descripcion); li.appendChild(precio); li.appendChild(cantidad); li.appendChild(categoria);
    lista.appendChild(li);
  }
}



