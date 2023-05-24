class Cafeteria {
  productos = [];
  reservas = [];

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
  hacerReserva(idProducto, cantidad, detalle) {
    
    const producto = this.productos.find((p) => p.id === idProducto);
    if (!producto) {
      console.log("Producto no encontrado");
      return ["Producto no encontrado"];
    }
    if (producto.reservable < cantidad) {
      console.log("No hay suficiente STOCK disponible");
      return ["No hay suficiente STOCK disponible"];
    }
    producto.reservable -= cantidad;//
    //if(producto.cantidad==0)this.eliminarProducto(idProducto); de momento no es util
    const reserva = {
      id: Math.floor(Math.random() * 100000),
      idProducto,
      producto: producto.nombre,
      cantidad,
      detalle,
    };
    this.reservas.push(reserva);
    console.log("Reserva creada:", reserva);
    return ["Reserva creada", reserva.id, reserva.cantidad + ' x ' + reserva.producto +" : "+ detalle];
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
    }
  }
}
export default Cafeteria;
