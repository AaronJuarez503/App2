$(function () {

    $.ajax({
        url: '/users/pmarcas',
        method: 'GET',
        dataType: 'json',
        success: function(data) {

            console.log(data)

            data.forEach(function(item) {
                Modulo1.generarpedido(item)
               
                
            })

        },
        error: function(xhr, status, error) {
            console.error('Error en la petición AJAX:', error);
            $('#resultado').html('Error al cargar los datos');
        }
    
})


$('#container').off('click', '#deliveryLogo').on('click', '#deliveryLogo', function() {
    var imagen= $(this).data('imagen')
    var marca= $(this).data('marca')    
    var fecha= $(this).data('fecha')
   

   // console.log(imagen,fecha,marca)

    window.location.href=`/users/detalles?imagen=${imagen}&fecha=${fecha}&marca=${marca}`

})




})