import Cafeteria from "./cafeteria.js";



describe("Cafeteria", () => {

  it("deberia devolver 0 al no tener productos disponibles", () => {
    const cafeteria = new Cafeteria();
    expect(cafeteria.getProductos().length).toEqual(0);
  });
  it("deberia devolver cantidad de productos disponibles", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.getProductos().length).toEqual(5);
  });
  it("al reservar, deberia aumentar el tamaño de la lista reserva", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    cafeteria.hacerReserva(3,5,"");
    expect(cafeteria.getReservas().length).toEqual(1);
  });
  it("al reservar, si el producto no existe devuelve: Producto no encontrado", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.hacerReserva(10,2,"")).toBe('Producto no encontrado');
  });
  it("al reservar, si la cantidad del producto es demaciada: No hay suficiente STOCK disponible", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.hacerReserva(3,22,"")).toBe('No hay suficiente STOCK disponible');
  });
  it("deberia eliminar un producto existente", () => {
  const cafeteria = new Cafeteria();
  cafeteria.cargarProductos();
  cafeteria.eliminarProducto(2);
  expect(cafeteria.getProductos().length).toEqual(4);
  });
  it("deberia devolver 'Producto no encontrado' al intentar eliminar un producto sin cargar productos", () => {
    const cafeteria = new Cafeteria();
    expect(cafeteria.eliminarProducto(1)).toBe("Producto no encontrado");
  });
  it("deberia devolver las categorias de los productos", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.getCategorias().length).toEqual(2);
  });
  it("deberia devolver todos los productos con categoria todas", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.getProductosPorCategoria("todas").length).toEqual(5);
  });
  it("deberia devolver todos los productos con categoria almuerzo", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.getProductosPorCategoria("almuerzo").length).toEqual(2);
  });
  it("al reservar, el detalle reserva se agrega a la reserva", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    cafeteria.hacerReserva(3,5,"detalle nuevo");
    expect(cafeteria.getReservas()[cafeteria.getReservas().length-1].detalle).toEqual("detalle nuevo");
  });


  it("debería agregar un nuevo producto al array de productos", () => {
    const cafeteria = new Cafeteria();
    cafeteria.agregarProducto("Café Latte", "Delicioso café con leche", 3.5, "Bebidas", 10);
    expect(cafeteria.getProductos().length).toEqual(1);
  });


});
