$(function() {

    $.ajax({
        url: '/users/vertiendas', // Reemplaza con la URL de tu API
        method: 'GET',
        success: function(data) {
        console.log(data)

        // Manipular el src de la imagen con jQuery
        $('#tiendaImagen').attr('src', data.imagen);
        
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
        $('#editForm').submit(function(e) {
            e.preventDefault();
            
            var form = this;
            var formData = new FormData(form);
            console.log(formData);
            
            $.ajax({
                url: '/users/actualizar',
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                       window.location.href="/users/viewtwo"
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Error:', textStatus, errorThrown);
                    alert('Error de conexión al actualizar la información de la tienda');
                }
            });
        });
    
    
})