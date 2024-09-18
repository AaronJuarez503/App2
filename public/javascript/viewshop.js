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
            
            var nuevosDatos = {
                nombre: $('#nombreInput').val(),
                direccion: $('#direccionInput').val(),
                telefono: $('#telefonoInput').val()
            };
            
            $.ajax({
                url: '/users/actualizartienda', // Asegúrate de que esta ruta exista en tu servidor
                method: 'POST',
                data: nuevosDatos,
                success: function(response) {
                    if(response.success) {
                        $('#nombreTienda').text(nuevosDatos.nombre);
                        $('#direccionTienda').text(nuevosDatos.direccion);
                        $('#telefonoTienda').text(nuevosDatos.telefono);
                        
                        $('#infoTienda').css('display', 'block');
                        $('#editForm').css('display', 'none');
                        
                        alert('Información de la tienda actualizada con éxito');
                    } else {
                        alert('Error al actualizar la información de la tienda');
                    }
                },
                error: function() {
                    alert('Error de conexión al actualizar la información de la tienda');
                }
            });
        });
    });
    
})