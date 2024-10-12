var Modulo1 = (function($) {
    function saludar(nombre) {
        return 'Hola, ' + nombre + '!';
    }
    var clas;
    function generarpedido(item) {

         

        switch (item.estados) {
            case 'En_espera':
                clas='eos-icons--hourglass '
                break;
                case 'activado':
                clas='line-md--clipboard-twotone-to-clipboard-check-twotone-transition'
                break;
                case 'en_proceso':
                clas='eos-icons--bubble-loading'
                break;
            default:
                break;
        }
        


        var html =`
        <div class="container">
        <img src="${item.marca_imagen}" id="deliveryLogo" data-imagen="${item.marca_imagen}"" data-marca="${item.marca_id}" data-fecha ="${item.fecha_hora_pedido}" class="logo" id="deliveryLogo">
       

        <div class="status" id="status"> ${item.estados}  </div>
                        <span class="${clas}"></span>
                
        <div class="total" id="total" </>Total: $${item.total_pedido}</div>
    </div>

        `
     
        $('#container').append(html);
    }

    
   


    
    
    return {
        generarpedido:generarpedido,
      
    };

})(jQuery);