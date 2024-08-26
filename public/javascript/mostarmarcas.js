$(function(){

    $.ajax({
        url: '/users',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            
            console.log('Datos recibidos:', data);
          /*function crearDivConImagen(clase, texto, urlImagen) {
            var $div = $('<div>', { class: clase });
            var $img = $('<img>', { src:urlImagen , alt: texto });
            var $p = $('<p>', { text: texto });
            
            $div.append($img).append($p);
            return $div;
            
        }*/
            function addItemToContainer(descripcion,imagen,nombre,marca) {
                const $itemHtml = `
                    <div class="item">
                        <div class="image-container">
                            <img id="miImagen" src="${imagen}" data-id=${marca} alt="">
                        </div>
                        <div class="description-container">
                            <h2>${nombre}</h2>
                            <p>${descripcion}</p>
                        </div>
                    </div>
                `;
               
                return $itemHtml
            }

        data.forEach(function(item) {
            var $itemDiv = addItemToContainer( item.descripcion,item.imagen,item.nombre,item.id_marca);
            $('.container').append($itemDiv);})
        

        

           
            
        },
        error: function(xhr, status, error) {
            console.error('Error en la petición AJAX:', error);
            $('#resultado').html('Error al cargar los datos');
        }
    });

    


    $('#dataContainer ').on('click', function(e) {

        const r = $(e.target).attr('data-id');





       
        console.log('ID capturado:',r);
        window.location.href='/productos'


        
    });

})

