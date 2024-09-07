var Modulo1 = (function($) {
    function saludar(nombre) {
        return 'Hola, ' + nombre + '!';
    }

    function generarpedido(item) {
        var html = `
        <div class="container">
            <h1>Estado de Tu Pedido: ${item.marca_nombre}</h1>
            <div class="order-status">
                <div class="status-card">
                    <h2 id="btn" data-fecha ="${item.fecha_hora_pedido}" data-imagen ="${item.marca_imagen}">ESTADO:</h2><br>
                    <p>${item.estados} || ${item.fecha_hora_pedido}</p>
                    <div class="status-dot confirmed"></div>
    
                </div>
               
                <div class="container2">
                    <div class="truck"></div>
               
               
                </div>
               
                </div>
            </div>
        `;
        $('#container').append(html);
    }


    
    
    return {
        generarpedido: generarpedido 
    };

})(jQuery);