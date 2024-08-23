$(function(){

    var id=$('buton');

    $.ajax({
        url: `/users/pr0ducts${id}`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            
            console.log('Datos recibidos:', data);
         /* function crearDivConImagen(clase, texto, urlImagen) {
            var $div = $('<div>', { class: clase });
            var $img = $('<img>', { src:urlImagen , alt: texto });
            var $p = $('<p>', { text: texto });
            $div.append($img).append($p);
            return $div;
            
        }
        data.forEach(function(item) {
            var $itemDiv = crearDivConImagen('item-con-imagen', item.descripcion, item.imagen);
            $('#contenedor').append($itemDiv);})


            


            for (let index = 0; index < array.length; index++) {
                const element = array[index];

                for (let index = 0; index < array.length; index++) {
                    const element = array[index];
                    
                }
                
            }*/
            
        },

        error: function(xhr, status, error) {
            console.error('Error en la petición AJAX:', error);
            $('#resultado').html('Error al cargar los datos');
        }
    });

})