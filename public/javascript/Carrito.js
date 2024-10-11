var Carrito = (function ($) {
    function agregarNuevoProductoAUI(producto) {
        var html = `
            <div class="cart-item" data-nombre="${producto.nombre}">
                <div class="item-image" style="background-image: url('${producto.imagen}')"></div>
                <div class="item-info">
                    <div class="item-name">${producto.nombre}</div>
                    <div class="item-price">$${producto.total.toFixed(2)}</div>

                </div>
                 <div class="counter" data-nombre="${producto.nombre}" >
                    <button id="men" data-id="${producto.id}" >&#8722;</button>
                    <input type="text" id="number" value="${producto.cantidad}" readonly>
                    <button id="man" data-id="${producto.id}" >&#43;</button>
                </div>
                <span class="remove-item">×</span>
            </div>
        `;
        $('#cart-items').append(html);
        
    }
    

    function actualizarCantidadEnUI(producto) {
        var $item = $(`.cart-item[data-nombre="${producto.nombre}"]`);
       // $item.find('.item-quantity').text(`Cantidad: ${producto.cantidad}`);
        $item.find('.item-price').text(`$${producto.total.toFixed(2)}`);
        var $item = $(`.counter[data-nombre="${producto.nombre}"]`);
        $item.find('#number').val(`${producto.cantidad}`);
    }



    let list = JSON.parse(localStorage.getItem('carrito')) || [];

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(list));
    }


    function agregar(datos){
        let productoExistente = list.find(item => item.id === datos.id);
        
        if (productoExistente) {
            productoExistente.cantidad++;
            productoExistente.total = productoExistente.precio * productoExistente.cantidad;
            actualizarCantidadEnUI(productoExistente);
            
        } else {
            list.push(datos);
            guardarCarritoEnLocalStorage()
            agregarNuevoProductoAUI(datos);
            
        }
        guardarCarritoEnLocalStorage()


  }

    

    


    return{
        add:agregar

        
    }


})(jQuery);