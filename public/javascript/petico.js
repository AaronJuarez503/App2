var Modulo1 = (function($) {
    function ajax(marca,fecha) {
        $.ajax({
            url: '/users/pernisos?marca='+marca+'&fecha='+fecha,
            method: 'GET',
            dataType: 'json',
            success: function(data) {

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