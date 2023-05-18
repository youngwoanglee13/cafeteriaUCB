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
        nombre: "Lomito",
        descripcion: "carne con arroz y papas",
        precio: 14,
        categoria: "almuerzo",
        cantidad: 7,
      },
      {
        id: 5,
        nombre: "Pique Macho",
        descripcion: "carne con papas,tomate, salchicha y huevos",
        precio: 15,
        categoria: "almuerzo",
        cantidad: 9,
      },
    ];
  }
  hacerReserva(idProducto, cantidad, detalle) {
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
    if(producto.cantidad==0)this.eliminarProducto(idProducto);
    const reserva = {
      id: this.reservas.length + 1,
      idProducto,
      cantidad,
      detalle,
    };
    this.reservas.push(reserva);
    console.log("Reserva creada:", reserva);
    return "Reserva creada:" + reserva.cantidad + ' x ' + producto.nombre +" : "+ detalle;
  }
  eliminarProducto(idProducto) {
    const productoIndex = this.productos.findIndex((p) => p.id === idProducto);
    if (productoIndex === -1) {
      return "Producto no encontrado";
    }
    this.productos.splice(productoIndex, 1);
    return "Producto eliminado: " + idProducto;
  }

  getReservas() {
    return this.reservas;
  }
  getProductosPorCategoria(categoria) {
    if (categoria=="todas") {
      return this.productos;
    }
    return this.productos.filter((p) => p.categoria === categoria); 
  }
  getCategorias() {
    const categorias = [];
    this.productos.forEach((p) => {
      if (!categorias.includes(p.categoria)) {
        categorias.push(p.categoria);
      }
    });
    return categorias;  
  }
}
export default Cafeteria;
