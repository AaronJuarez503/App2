var Carrito = (function ($) {

    class Crro {
        constructor() {
            
            
        }


        guardarCarritoEnLocalStorage() {
            
        }

        agregarAlCarrito(productos) {
           var list = JSON.parse(localStorage.getItem('carrito')) || [];
           console.log(list);

           let productoExistente = list.find(item => item.id === productos.id);

           if (productoExistente) {
               productoExistente.cantidad++;
               productoExistente.total = productoExistente.precio * productoExistente.cantidad;
               
               actualizarCantidadEnUI(productoExistente);
           } else {
               productos.cantidad = 1; // Inicializar cantidad
               productos.total = productos.precio; // Inicializar total
               list.push(productos); // Agregar el nuevo producto a la lista
           }
           console.log(list);
           localStorage.setItem('carrito', JSON.stringify(list)); // Guardar en localStorage
        }





    }

    

    var carro = new Crro();


    return{

        save:carro.guardarCarritoEnLocalStorage,
        add:carro.agregarAlCarrito
    }


})(jQuery);