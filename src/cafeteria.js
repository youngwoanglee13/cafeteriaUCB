

class Cafeteria {
    productos = [];
    getProductos(){
        return this.productos;
    }
    cargarProductos(){
        this.productos = [
            {id: 1, nombre: "Café moka", descripcion: "cafe con chocolate", precio: 10, categoria: "cafe", cantidad: 1},
            {id: 2, nombre: "Café americano", descripcion: "cafe con agua", precio: 10, categoria: "cafe", cantidad: 3},
            {id: 3, nombre: "Café con leche", descripcion: "cafe con leche", precio: 10, categoria: "cafe", cantidad: 5},
            {id: 4, nombre: "Café capuchino", descripcion: "cafe con leche y chocolate", precio: 10, categoria: "cafe", cantidad: 7},
        ]
    }
}
export default Cafeteria;