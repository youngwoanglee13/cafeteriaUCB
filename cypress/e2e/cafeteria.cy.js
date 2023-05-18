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
  it("Cuando un producto llega a Stock 0 se elimina del menu", () => {
    cy.visit("/");
    cy.get('select#producto').select('Café moka');
    cy.get('input#cantidad').type('1');
    cy.get('button[type="submit"]').click();
    cy.get('ul#menu-cafeteria').should('not.contain', 'Café moka');
  });
});
