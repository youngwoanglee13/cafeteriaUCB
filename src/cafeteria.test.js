import Cafeteria from "./cafeteria.js";

describe("Sumar", () => {
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
    //cafeteria.hacerReserva(3,5);
    expect(cafeteria.hacerReserva(10,2)).toBe('Producto no encontrado');
  });
});
