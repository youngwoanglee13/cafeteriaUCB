describe("Cafeteria", () => {
  it("Muestra todos los productos disponibles en el menu", () => {
    cy.visit("/");
    cy.get('#menu-cafeteria').children('li').should('have.length', 5);
  });
  it("Muestra productos con categoria almuerzo", () => {
    cy.visit("/");
    cy.get('select#idcategoria').select('almuerzo');
    cy.get('#menu-cafeteria').children('li').should('have.length', 2);
  });
  it("Hacer una reserva de un producto", () => {
    cy.visit("/");
    cy.get('select#productoPorReservar').select('Lomito');
    cy.get('input#cantidad').type('1');
    cy.get('button[type="submit"]').click();
    cy.get("#reservas li").contains('1 x Lomito :');
  });
  it("Hacer una reserva con detalle", () => {
    cy.visit("/");
    cy.get('select#productoPorReservar').select('Pique Macho');
    cy.get('input#cantidad').type('1');
    cy.get('input#iddetalle').type('sin tomate');
    cy.get('button[type="submit"]').click();
    cy.get("#reservas li").contains('1 x Pique Macho :sin tomate');
   
  });
  it("Agrega un nuevo producto a la lista de productos", () => {
    cy.visit("/");
    cy.get("#botonAdministrador").click();
    cy.get("#nombre").type("Nuevo Producto");
    cy.get("#descripcion").type("Descripción del producto");
    cy.get("#precio").type("10");
    cy.get("#categoria").type("Categoría del producto");
    cy.get("#idCantidad").type("5");
    cy.get("#agregarProductoForm").submit();
    cy.get("#menu-cafeteria").should("contain", "Nuevo Producto");
  });
  it("El stock baja despues de confirmar una reserva", () => {
    cy.visit("/");
    cy.get('select#productoPorReservar').select('Lomito');
    cy.get('input#cantidad').type('1');
    cy.get('input#iddetalle').type('Sin zanahorias');
    cy.get('button[type="submit"]').click();
    cy.get("#botonAdministrador").click();
    cy.get('ul#reservas li button').click();
    cy.get("#menu-cafeteria #4 .admincafe").should("have.text", "en stock  :6");
});
});
