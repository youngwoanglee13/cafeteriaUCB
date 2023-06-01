class Cafeteria {
  constructor(){
    this.productos = [];
    this.reservas = [];
  }
  agregarProducto(nombre, descripcion, precio, categoria, stock , reservable) {
    const producto = {
      id: Math.floor(Math.random() * 100000),
      nombre,
      descripcion,
      precio,
      categoria,
      stock,
      reservable,
    };
    this.productos.push(producto);
    return producto;
  }

  editarProducto(id, new_nombre, new_descripcion, new_precio, new_categoria, new_stock){
    const index = this.productos.findIndex(producto => producto.id === id);
    if (index !== -1){
      this.productos[index].nombre = new_nombre;
      this.productos[index].descripcion = new_descripcion;
      this.productos[index].precio = new_precio;
      this.productos[index].categoria = new_categoria;
      this.productos[index].stock = this.productos[index].stock + parseInt(new_stock);
      this.productos[index].reservable = this.productos[index].reservable + parseInt(new_stock);
    }else{
      return "No existe el producto"
    }
  }

  eliminarProducto(idProducto) {
    const productoIndex = this.productos.findIndex((p) => p.id === idProducto);
    if (productoIndex === -1) {
      return "Producto no encontrado";
    }
    this.productos.splice(productoIndex, 1);
    return "Producto eliminado: " + idProducto;
  }
  cargarProductos() {
    this.productos = [
      {
        id: 1,
        nombre: "Café moka",
        descripcion: "cafe con chocolate",
        precio: 10,
        categoria: "cafe",
        stock: 1,
        reservable: 1,
      },
      {
        id: 2,
        nombre: "Café americano",
        descripcion: "cafe con agua",
        precio: 10,
        categoria: "cafe",
        stock: 3,
        reservable: 3,
      },
      {
        id: 3,
        nombre: "Café con leche",
        descripcion: "cafe con leche",
        precio: 10,
        categoria: "cafe",
        stock: 5,
        reservable: 5,
      },
      {
        id: 4,
        nombre: "Lomito",
        descripcion: "carne con arroz y papas",
        precio: 14,
        categoria: "almuerzo",
        stock: 7,
        reservable: 7,
      },
      {
        id: 5,
        nombre: "Pique Macho",
        descripcion: "carne con papas,tomate, salchicha y huevos",
        precio: 15,
        categoria: "almuerzo",
        stock: 9,
        reservable: 9,
      },
    ];
  }
  hacerReserva(idProducto, cantidad, detalle, horaEntrega) {
    const producto = this.productos.find((p) => p.id === idProducto);
    if (!producto) {
      return ["Producto no encontrado"];
    }
    if (producto.reservable < cantidad) {
      return ["No hay suficiente STOCK disponible"];
    }
    producto.reservable -= cantidad;//
    const reserva = {
      id: Math.floor(Math.random() * 100000),
      idProducto,
      producto: producto.nombre,
      cantidad,
      detalle,
      horaEntrega
    };
    this.reservas.push(reserva);
    return ["Reserva creada", reserva.id, reserva.cantidad + ' x ' + reserva.producto +" : "+ detalle];
  }
  editarReserva(idReserva, new_cantidad, new_detalle) {
    const reserva = this.reservas.find((r) => r.id === idReserva);
     if (!reserva) {
       return "Reserva no encontrada";
     }

  const producto = this.productos.find((p) => p.id === reserva.idProducto);
  if (!producto) {
    return "Producto asociado a la reserva no encontrado";
  }
  if (producto.reservable + reserva.cantidad < new_cantidad) {
    return "No hay suficiente STOCK disponible para la nueva cantidad";
  }
  producto.reservable += reserva.cantidad;
  producto.reservable -= new_cantidad;
  reserva.cantidad = new_cantidad;
  reserva.detalle = new_detalle;
  return "Reserva editada: " + reserva.cantidad + " x " + producto.nombre + " : " + new_detalle;
}
  getReservas() {
    return this.reservas;
  }
  aumentarStock(idProducto, cantidad) {
    const producto = this.productos.find((p) => p.id === idProducto);
    producto.stock += cantidad;
    producto.reservable += cantidad;
    return true;
  }
  getProductos(categoria) {
    if (categoria=="todas") {
      return this.productos;
    }
    return this.productos.filter((p) => p.categoria === categoria); 
  }
  getCategorias() {
    const categorias = [];
    categorias.push("todas");
    this.productos.forEach((p) => {
      if (!categorias.includes(p.categoria)) {
        categorias.push(p.categoria);
      }
    });
    return categorias;  
  }
  confirmarReserva(idReserva) {
    const reserva = this.reservas.find((r) => r.id === idReserva);
    if (reserva) {
      const indexProducto = this.productos.findIndex((p) => p.id === reserva.idProducto);
      this.productos[indexProducto].stock -= reserva.cantidad;
      this.reservas = this.reservas.filter(reserva => reserva.id !== idReserva);
    }
  }
  cancelarReserva(idReserva) {
    const reserva = this.reservas.find((r) => r.id === idReserva);
    const indexProducto = this.productos.findIndex((p) => p.id === reserva.idProducto);
    this.productos[indexProducto].reservable += reserva.cantidad;
    this.reservas = this.reservas.filter(reserva => reserva.id !== idReserva);
    return "Reserva cancelada";
  }
}
export default Cafeteria;
