import Cafeteria from "./cafeteria.js";

describe("Sumar", () => {

  it("debería agregar un nuevo producto al array de productos", () => {
    const cafeteria = new Cafeteria();
    cafeteria.agregarProducto("Café Latte", "Delicioso café con leche", 3.5, "Bebidas", 10);
    expect(cafeteria.getProductos().length).toEqual(1);
  });

  it("debería asignar un id autoincremental al producto agregado", () => {
    const cafeteria = new Cafeteria();
    cafeteria.agregarProducto("Café Latte", "Delicioso café con leche", 3.5, "Bebidas", 10);
    cafeteria.agregarProducto("Croissant", "Crujiente croissant recién horneado", 2.0, "Panadería", 20);
    const productos = cafeteria.getProductos();
    expect(productos[0].id).toEqual(1);
    expect(productos[1].id).toEqual(2);
  });

  it("deberia devolver 0 al no tener productos disponibles", () => {
    const cafeteria = new Cafeteria();
    expect(cafeteria.getProductos().length).toEqual(0);
  });

  it("deberia devolver 0 al no tener productos disponibles", () => {
    const cafeteria = new Cafeteria();
    expect(cafeteria.getProductos().length).toEqual(0);
  });
  it("deberia devolver cantidad de productos disponibles", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.getProductos().length).toEqual(4);
  });
  it("devolver la recerva del producto y su cantidad", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    cafeteria.hacerReserva(3,5);
    expect(cafeteria.getReservas().length).toEqual(1);
  });
  it("Si el producto no existe devolvera: Producto no encontrado", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.hacerReserva(10,2)).toBe('Producto no encontrado');
  });
  it("Si la cantidad del producto es demaciado: No hay suficiente STOCK disponible", () => {
    const cafeteria = new Cafeteria();
    cafeteria.cargarProductos();
    expect(cafeteria.hacerReserva(3,22)).toBe('No hay suficiente STOCK disponible');
  });
});