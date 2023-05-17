class Cafeteria {
  productos = [];
  reservas = [];

  getProductos() {
    return this.productos;
  }
  cargarProductos() {
    this.productos = [
      {
        id: 1,
        nombre: "Café moka",
        descripcion: "cafe con chocolate",
        precio: 10,
        categoria: "cafe",
        cantidad: 1,
      },
      {
        id: 2,
        nombre: "Café americano",
        descripcion: "cafe con agua",
        precio: 10,
        categoria: "cafe",
        cantidad: 3,
      },
      {
        id: 3,
        nombre: "Café con leche",
        descripcion: "cafe con leche",
        precio: 10,
        categoria: "cafe",
        cantidad: 5,
      },
      {
        id: 4,
        nombre: "Café capuchino",
        descripcion: "cafe con leche y chocolate",
        precio: 10,
        categoria: "cafe",
        cantidad: 7,
      },
    ];
  }
  hacerReserva(idProducto, cantidad) {
    const producto = this.productos.find((p) => p.id === idProducto);
    if (!producto) {
      console.log("Producto no encontrado");
      return "Producto no encontrado";
    }
    if (producto.cantidad < cantidad) {
      console.log("No hay suficiente STOCK disponible");
      return "No hay suficiente STOCK disponible";
    }
    producto.cantidad -= cantidad;
    const reserva = {
      id: this.reservas.length + 1,
      idProducto,
      cantidad,
    };
    this.reservas.push(reserva);
    console.log("Reserva creada:", reserva);
    return "Reserva creada:" + reserva.cantidad + ' x ' + producto.nombre;
  }
  eliminarProducto(idProducto) {
    const index = this.productos.findIndex((p) => p.id === idProducto);
    if (index === -1) {
      console.log("Producto no encontrado");
      return "Producto no encontrado";
    }
    this.productos.splice(index, 1);
    console.log("Producto eliminado:", idProducto);
    return "Producto eliminado: " + idProducto;
  }

  getReservas() {
    return this.reservas;
  }
}
export default Cafeteria;
