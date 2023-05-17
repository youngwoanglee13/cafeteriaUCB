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
});
