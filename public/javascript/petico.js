var Modulo1 = (function($) {
    function ajax(marca,fecha) {
        $.ajax({
            url: '/users/pernisos?marca='+marca+'&fecha='+fecha,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log(data)
                 
    function add(item) {


        var html=`
         
             <tr>
                 <td>
                     <div class="image-name">
                         <div class="image-placeholder"  > <img width="40px" height="40px" src="${item.producto_imagen}" alt=""></div>
                         ${item.producto_nombre}
                     </div>
                 </td>
                 <td> $${item.producto_precio}</td>
                 <td>${item.cantidad_total}</td>
                 <td class="total-row">${item.subtotal_total}</td>
             </tr>
           `
 
           $('#table tbody').append(html)
         
     }
                data.forEach(item => {
                    add(item)
                });

                let sumaSubtotales = data.reduce((acumulador, item) => {
                    return acumulador + item.subtotal_total;
                  }, 0);

                  $('.total').text('Total:'+sumaSubtotales)


            },
            error: function(xhr, status, error) {
                console.error('Error en la petición AJAX:', error);
                $('#resultado').html('Error al cargar los datos');
            }
            
        }
    )
    }

    
    return {
        ajax: ajax,
        
        
    };
})(jQuery);