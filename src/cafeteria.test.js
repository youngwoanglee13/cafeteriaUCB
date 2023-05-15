import Cafeteria from "./cafeteria.js";

describe("Sumar", () => {
  it("deberia devolver 0 al no tener productos disponibles", () => {
    const cafeteria = new Cafeteria();
    expect(cafeteria.getProductos().length).toEqual(0);
  });

});
