$(function() {

    $.ajax({
        url: '/users/vertiendas', // Reemplaza con la URL de tu API
        method: 'GET',
        success: function(data) {
        console.log(data)
        
        var html = `

        <h1 id="nombreTienda">${data.nombre}</h1>
            <p>
                <strong>Dirección:</strong> <span id="direccionTienda">${data.dirreccion}</span><br>
                <strong>Teléfono:</strong> <span id="telefonoTienda">${data.telefono}</span>
            </p>
            <button id="editarBtn">Editar Información</button>
        `

        $('#infoTienda').html(html)

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        }
    });

    $('#infoTienda').off('click', '#editarBtn').on('click', '#editarBtn', function() {
        $('#infoTienda').css({'display':'none'})
        $('#editForm').css({'display':'block'})

       
    
       // console.log(imagen,fecha,marca)
    })
    $(document).ready(function() {
        $('#editForm').submit(function(e) {
            e.preventDefault();
    
            $('#nombreTienda').text($('#nombreInput').val());
            $('#direccionTienda').text($('#direccionInput').val());
            $('#telefonoTienda').text($('#telefonoInput').val());
    
            $('#infoTienda').css('display', 'block');
            $('#editForm').css('display', 'none');
        });
    });
    
})