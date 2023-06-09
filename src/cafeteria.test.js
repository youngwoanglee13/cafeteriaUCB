import Cafeteria from "./cafeteria.js";



describe("Cafeteria", () => {

  it("deberia devolver 0 al no tener productos disponibles", () => {
    const cafeteria = new Cafeteria();
    expect(cafeteria.getProductos("todas").length).toEqual(0);
  });
  it("deberia devolver cantidad de productos disponibles", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.getProductos("todas").length).toEqual(5);
  });
  it("al reservar, deberia aumentar el tamaño de la lista reserva", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    cafeteria.hacerReserva(3,5,"","");
    expect(cafeteria.getReservas().length).toEqual(1);
  });
  it("al reservar, si el producto no existe devuelve: Producto no encontrado", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.hacerReserva(10,2,"","")[0]).toBe('Producto no encontrado');
  });
  it("al reservar, si la cantidad del producto es demaciada: No hay suficiente STOCK disponible", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.hacerReserva(3,22,"","")[0]).toBe('No hay suficiente STOCK disponible');
  });
  it("deberia eliminar un producto existente", () => {
  const cafeteria = new Cafeteria();
  cafeteria.cargarProductos();
  cafeteria.eliminarProducto(2);
  expect(cafeteria.getProductos("todas").length).toEqual(4);
  });
  it("deberia devolver 'Producto no encontrado' al intentar eliminar un producto sin cargar productos", () => {
    const cafeteria = new Cafeteria();
    expect(cafeteria.eliminarProducto(1)).toBe("Producto no encontrado");
  });
  it("deberia devolver las categorias de los productos", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.getCategorias().length).toEqual(3);
  });
  it("deberia devolver todos los productos con categoria todas", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.getProductos("todas").length).toEqual(5);
  });
  it("deberia devolver todos los productos con categoria almuerzo", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.getProductos("almuerzo").length).toEqual(2);
  });
  it("al reservar, el detalle reserva se agrega a la reserva", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    cafeteria.hacerReserva(3,5,"detalle nuevo","");
    expect(cafeteria.getReservas()[cafeteria.getReservas().length-1].detalle).toEqual("detalle nuevo");
  });
  it("debería agregar un nuevo producto a la lista de productos", () => {
    const cafeteria = new Cafeteria();
    cafeteria.agregarProducto("Café Latte", "Delicioso café con leche", 3.5, "Bebidas", 10, 10);
    expect(cafeteria.getProductos("todas").length).toEqual(1);
  });
  it("debería devolver el producto agregado correctamente", () => {
    const cafeteria = new Cafeteria();
    const producto = cafeteria.agregarProducto("Café Latte", "Delicioso café con leche", 3.5, "Bebidas", 10, 10);
    expect(producto.nombre).toEqual("Café Latte");
    expect(producto.descripcion).toEqual("Delicioso café con leche");
    expect(producto.precio).toEqual(3.5);
    expect(producto.categoria).toEqual("Bebidas");
    expect(producto.stock).toEqual(10);
    expect(producto.reservable).toEqual(10);
  });
  it("si no exite la reserva el stock se mantiene", () => {
    const cafeteria = new Cafeteria();
    cafeteria.agregarProducto("Café Latte", "Delicioso café con leche", 3.5, "Bebidas", 1, 1);
    cafeteria.confirmarReserva(123456789);
    expect(cafeteria.getProductos("todas")[0].stock).toEqual(1);
  });
  it("debería bajar el stock al momento de confirmar una reserva", () => {
    const cafeteria = new Cafeteria();
    cafeteria.agregarProducto("Café Latte", "Delicioso café con leche", 3.5, "Bebidas", 1, 1);
    cafeteria.hacerReserva(cafeteria.getProductos("todas")[0].id,1,"sin azucar","");
    cafeteria.confirmarReserva(cafeteria.getReservas()[0].id);
    expect(cafeteria.getProductos("todas")[0].stock).toEqual(0);
  });
  it("Solo se edita los productos existentes", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.editarProducto(100, "Café new", "new cafe", 15, "cafe new")).toBe("No existe el producto");
  });

  it("Editar un producto del menu productos", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    cafeteria.editarProducto(2, "Café super americano new", "new cafe con agua potable", 15, "cafe new");
    expect(cafeteria.getProductos("cafe new")[0].nombre).toBe("Café super americano new");
  });

  it("debería editar una reserva existente", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    cafeteria.hacerReserva(3, 5, "detalle original","");
    const idReserva = cafeteria.getReservas()[0].id;
    const new_cantidad = 2;
    const new_detalle = "detalle actualizado";
    expect(cafeteria.editarReserva(idReserva, new_cantidad, new_detalle)).toBe(
      "Reserva editada: 2 x Café con leche : detalle actualizado"
    );
    expect(cafeteria.getReservas()[0].cantidad).toEqual(new_cantidad);
    expect(cafeteria.getReservas()[0].detalle).toEqual(new_detalle);
  });

  it("debería devolver 'Reserva no encontrada' al intentar editar una reserva inexistente", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    const idReserva = 123456789;
    const new_cantidad = 3;
    const new_detalle = "detalle actualizado";
    expect(cafeteria.editarReserva(idReserva, new_cantidad, new_detalle)).toBe(
      "Reserva no encontrada"
    );
  });
  
  it("debería devolver 'Producto asociado a la reserva no encontrado' al intentar editar una reserva cuyo producto no existe", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    cafeteria.hacerReserva(3, 5, "detalle original","");
    const idReserva = cafeteria.getReservas()[0].id;
    const new_cantidad = 3;
    const new_detalle = "detalle actualizado";
    cafeteria.eliminarProducto(3);
    expect(cafeteria.editarReserva(idReserva, new_cantidad, new_detalle)).toBe(
      "Producto asociado a la reserva no encontrado"
    );
  });
  
  it("debería devolver 'No hay suficiente STOCK disponible para la nueva cantidad' al intentar editar una reserva con una cantidad no disponible", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    cafeteria.hacerReserva(3, 5, "detalle original","");
    const idReserva = cafeteria.getReservas()[0].id;
    const new_cantidad = 10; 
    const new_detalle = "detalle actualizado";
    expect(cafeteria.editarReserva(idReserva, new_cantidad, new_detalle)).toBe(
      "No hay suficiente STOCK disponible para la nueva cantidad"
    );
  });

  it("debería aumentar el stock de un producto existente", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    const producto = cafeteria.getProductos("todas")[0]; // Tomamos el primer producto como ejemplo
    const stockInicial = producto.stock;
    const cantidadAumento = 3;
    cafeteria.aumentarStock(producto.id, cantidadAumento);
    expect(cafeteria.getProductos("todas")[0].stock).toEqual(stockInicial + cantidadAumento);
  });
  it("deberia cancelar una reserva", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    cafeteria.hacerReserva(3,5,"detalle","");
    expect(cafeteria.getReservas().length).toEqual(1);
    cafeteria.cancelarReserva(cafeteria.getReservas()[0].id);
    expect(cafeteria.getReservas().length).toEqual(0);
  });
  it("deberia crear una reserva con hora", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    cafeteria.hacerReserva(3,5,"detalle", "10:00");
    expect(cafeteria.getReservas()[0].hora).not.toEqual(null);
  }); 
  
});
