var Modulo1 = (function($) {
    function saludar(nombre) {
        return 'Hola, ' + nombre + '!';
    }

    function generarpedido(item) {
        


        var html =`
        <div class="container">
        <img src="${item.marca_imagen}" id="deliveryLogo" data-imagen="${item.marca_imagen}"" data-marca="${item.marca_id}" data-fecha ="${item.fecha_hora_pedido}" class="logo" id="deliveryLogo">
       

        <div class="status" id="status"> ${item.estados} </div>
        <img style=" height:180px;  width :40%" src="${item.estados ==='En_espera'?'/images/reloj.gif':'/stylesheets/Delivery Animation.gif'}"  id="truck">
        <div class="total" id="total" </>Total: $0.00</div>
    </div>

        `
     
        $('#container').append(html);
    }

    
   


    
    
    return {
        generarpedido:generarpedido,
      
    };

})(jQuery);