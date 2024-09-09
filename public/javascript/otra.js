$(function(){

    $.ajax({
        url: '/users',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            
            console.log('Datos recibidos:', data);
          
            function addItemToContainer(imagen,marca) {
                const $itemHtml = `
                <div class="brand">
                <img src="${imagen}" data-id=${marca} data-imagen=${imagen} alt="Marca 1">
            </div>
                `;
                return $itemHtml
            }

        data.forEach(function(item) {
            var $itemDiv = addItemToContainer(item.imagen,item.id);
            $('#container').append($itemDiv);})
        

        

           
            
        },
        error: function(xhr, status, error) {
            console.error('Error en la petición AJAX:', error);
            $('#resultado').html('Error al cargar los datos');
        }
    });

    


    $('#container ').on('click', function(e) {

        console.log(e.target)

        const r = $(e.target).attr('data-id');
        const img = $(e.target).attr('data-imagen');





       
        console.log(r);
        window.location.href=`/users/pedirproductos?productoId=${r}&imagen=${img}`


        
    });

})

