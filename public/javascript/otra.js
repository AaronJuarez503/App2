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
                <img src="${imagen}" data-id=${marca} alt="Marca 1">
            </div>
                `;
               
                return $itemHtml
            }

        data.forEach(function(item) {
            var $itemDiv = addItemToContainer(item.imagen,item.id_marca);
            $('#container').append($itemDiv);})
        

        

           
            
        },
        error: function(xhr, status, error) {
            console.error('Error en la petición AJAX:', error);
            $('#resultado').html('Error al cargar los datos');
        }
    });

    


    $('#container ').on('click', function(e) {

       // const r = $(e.target).attr('data-id');





       
        console.log(e.target);
        //window.location.href='/pedirproductos'


        
    });

})

