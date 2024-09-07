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


$('#container').off('click', '#btn').on('click', '#btn', function() {
    var imagen= $(this).data('imagen')
    var fecha= $(this).data('fecha')

    console.log(imagen,fecha)

    window.location.href=`/users/detalles?imagen=${imagen}&fecha=${fecha}`

})




})