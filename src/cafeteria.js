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
          
          categoria: "cafe",
          
        },
        {
          id: 2,
          nombre: "Café americano",
          descripcion: "cafe con agua",
          
          categoria: "cafe",
          
        },
        {
          id: 3,
          nombre: "Café con leche",
          descripcion: "cafe con leche",
          
          categoria: "cafe",
          
        },
        {
          id: 4,
          nombre: "Café capuchino",
          descripcion: "cafe con leche y chocolate",
          
          categoria: "cafe",
          
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
  
    getReservas() {
      return this.reservas;
    }
  }
  export default Cafeteria;