$(function() {
$('#tiendita').on('submit', function(e) {
    let hasErrors = false;

    // Validar producto
        const tienda = $('#Ntienda').val().trim();

        if (tienda === '') {
        $('#tiendaError').text('El nombre la tienda es requerido');
        hasErrors = true;
        } else if (tienda.length < 3) {
        $('#tiendaError').text('El nombre debe tener al menos 4 caracteres');
        hasErrors = true;
        } else {
        $('#tiendaError').text('');
        }

    // Validar direccion
    const direccion = $('#direccion').val().trim();

        if (direccion === '') {
        $('#direccionError').text('La direccion es requerida');
        hasErrors = true;
        } else {
        $('#direccionError').text('');
        }
    
    // validar numero de telefono
        const numero = $('#numero').val().trim();

        if (numero === '') {
        $('#numeroError').text('El precio es requerido');
        hasErrors = true;
        } else if (!/^\d+(\.\d+)?$/.test(numero)) {
        $('#numeroError').text('Solo debe contener números');
        hasErrors = true;
        } else {
        $('#numeroError').text('');
        }

        

    // Si hay errores, prevenir el envío del formulario
        if (hasErrors) {
            e.preventDefault();
        }
    });

    // Quitar el borde rojo cuando el input obtiene el foco
        $('#Ntienda').on('input', function() {
            $('#tiendaError').empty()
        });
        $('#direccion').on('input', function() {
            $('#direccionError').empty()    
        });
        $('#numero').on('input', function() {
            $('#numeroError').empty()
        });
    // Volver a validar cuando el input pierde el foco
        $('input').on('blur', function() {
            if ($(this).val().trim() === '') {
                    $('#' + this.id + 'Error').text('Este campo es requerido');
                } 
            });
    });