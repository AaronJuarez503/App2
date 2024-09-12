$(function() {

    function mandar() {
        let list = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log('lista')
console.log(list)



const carritoModificado = list.map(({ imagen, nombre, mmarca, ...resto }) => resto);
     console.log('modificado')
    console.log(carritoModificado);
    if (list.length > 0) {
        $.ajax({
    url: '/users/insert',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ items: carritoModificado }),
    success: function(response) {
        // Redirige a la página de confirmación
        alert('tu pedido asido enviado por favor te pedimos estar pendiente de tu estado de pedido')
        // Eliminar la lista del local storage
        localStorage.removeItem("carrito");
     },
    error: function(error) {
        console.error('Error al procesar la compra:', error);
        alert('Hubo un error al procesar tu compra. Por favor, inténtalo de nuevo.');
    }
});
        
    } else {
        alert("El carrito está vacío.");
    }
    
}



   /* $('.btn6').on('click',()=>{
        var r= $('#codigo').val();
                console.log('codigo'+r)

        
        $.ajax({
            url: `/users/validarcodigo?codigo=${r}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                
                console.log('Datos recibidos:', data.data);

                if (data.data) {
                    mandar()
                } else {
                    $('.holi').text('al pareser el codigo que has proporcionado no es valido')
                    
                }



                    },
                    error: function(xhr, status, error) {
                        console.error('Error en la petición AJAX:', error);
                        $('#resultado').html('Error al cargar los datos');
                    }
                });
    })*/

})