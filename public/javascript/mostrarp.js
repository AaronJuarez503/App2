$(document).ready(function() {
    let list = [];

    // Mostrar/ocultar carrito
    $('#carrito-icono').click(function() {
        $('.float-div').toggle();
    });

    // Cerrar el carrito
    $('.close-btn').click(function() {
        $('.float-div').hide();
    });

    // Agregar producto al carrito
    $('#mio').off('click', '#btn').on('click', '#btn', function() {
    var container = $(this).closest(".container");
    var headingContent = container.find("h3").text();
    var imageUrl = container.find('.imgBx').css("background-image").replace(/url\("?|"?\)$/g, '');
    var precio = container.find("span").text();

    var datos = {
        nombre: headingContent,
        imagen: imageUrl,
        precio: precio,
        cantidad: 1
    };

        let productoExistente = list.find(item => item.nombre === datos.nombre);

        if (productoExistente) {
            productoExistente.cantidad++;
           
            actualizarCantidadEnUI(productoExistente);
        } else {
            list.push(datos);
            agregarNuevoProductoAUI(datos);
        }

        actualizarContadorCarrito();
        $('#carrito-icono').css('color', 'red');
    });

    function actualizarCantidadEnUI(producto) {
        $(`.cart-item[data-nombre="${producto.nombre}"] .item-quantity`).text(`Cantidad: ${producto.cantidad}`);
    }

    function agregarNuevoProductoAUI(producto) {
        var html = `
            <div class="cart-item" data-nombre="${producto.nombre}">
                <div class="item-image" style="background-image: url('${producto.imagen}')"></div>
                <div class="item-info">
                    <div class="item-name">${producto.nombre}</div>
                    <div class="item-price">${producto.precio}</div>
                    <div class="item-quantity">Cantidad: ${producto.cantidad}</div>
                </div>
                <span class="remove-item">×</span>
            </div>
        `;
        $('#cart-items').append(html);
    }

    // Eliminar producto del carrito
    $(document).on('click', '.remove-item', function() {
        var nombreProducto = $(this).closest('.cart-item').data('nombre');
        list = list.filter(item => item.nombre !== nombreProducto);
        $(this).closest('.cart-item').remove();
        actualizarContadorCarrito();
    });

    function actualizarContadorCarrito() {
        let totalItems = list.reduce((sum, item) => sum + item.cantidad, 0);
        $('#contador-carrito').text(totalItems);
        if (totalItems === 0) {
            $('#carrito-icono').css('color', 'black');
        }
    }
});