var Carrito = (function ($) {
     function actualizarContadorCarrito() {
        let totalItems = list.reduce((sum, item) => sum + item.cantidad, 0);
        $('#contador-carrito').text(totalItems);
        if (totalItems === 0) {
            $('#carrito-icono').css('color', 'black');
        }
    }
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
    function actualizarTotalCarrito() {
        let totalCarrito = list.reduce((sum, item) => sum + item.total, 0);
        $('#total-carrito').text(`Total: $${totalCarrito.toFixed(2)}`);
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
            agregarNuevoProductoAUI(datos);
            
        }
        $('#contador-carrito').css('color', 'red');

    }
    function remover(nombreProducto){
       
        list = list.filter(item => item.nombre !== nombreProducto);
    }
    function cargarCarritoDesdeLocalStorage() {
        list.forEach(producto => {
                agregarNuevoProductoAUI(producto);
            });
            actualizarContadorCarrito();
            actualizarTotalCarrito();
    }
    function actualizarCantidad(id, incremento) {
        let producto = list.find(p => p.id === id);
        if (producto) {
            producto.cantidad += incremento;
            producto.total = producto.precio * producto.cantidad;
            actualizarCantidadEnUI(producto);
            if (producto.cantidad < 1) {
             producto.cantidad = 1; // Asegura que la cantidad no baje de 1
             producto.total = producto.precio * producto.cantidad;
             actualizarCantidadEnUI(producto);
             actualizarTotalCarrito();
            }
            producto.total = producto.cantidad * producto.precio;
            actualizarCantidadEnUI(producto);
            guardarCarritoEnLocalStorage();
            actualizarTotalCarrito();
        }
    }
    function comprar(){
        if (list.length > 0) {
            $.ajax({
        url: '/users/procesar-compra',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ items: list }),
        success: function(response) {
            // Redirige a la página de confirmación
            window.location.href = '/users/confirmacion-compra';
        },
        error: function(error) {
            console.error('Error al procesar la compra:', error);
            alert('Hubo un error al procesar tu compra. Por favor, inténtalo de nuevo.');
        }
    });
            
        } else {
            alert("El carrito está vacío.");
        }
    }
    return{
        add:agregar,
        save:guardarCarritoEnLocalStorage,
        updateCount:actualizarContadorCarrito,
        updateTotal:actualizarTotalCarrito,
        load:cargarCarritoDesdeLocalStorage,
        updateCantidad:actualizarCantidad,
        remove: remover,
        buy:comprar
    }


})(jQuery);