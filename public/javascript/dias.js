$(function ($) {
 console.log('pagina cargada...')


 $.ajax({
    url: '/users/dias',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        console.log(data)

        data.forEach(function(item) {
            var html=`
            <tr>
                <td style="width: 50%; padding: 10px;">
                    <div class="notes-container">
                        <div class="note" style="--rotate: -3deg;">
                            <div class="logo-circle">
                                <img src="${item.imagen}" class="logo">
                            </div>
          
    
                            <div class="note-header">${item.nombre} Company</div>
                            <p>Se le comunica a nuestros clientes que los pedidos estaran abiertos
                                los dias:
                            </p>
                            <p> <strong > ${item.lunes ==='true' ? 'L' : ''} </strong> <strong > ${item.martes ==='true' ? 'M' : ''} </strong> <strong > ${item.miercoles ==='true' ? 'X' : ''} </strong> <strong > ${item.jueves ==='true' ? 'J' : ''} </strong> <strong > ${item.viernes ==='true' ? 'V' : ''} </strong> <strong > ${item.sabado ==='true' ? 'S' : ''} </strong> </p>
    
                            <div>
                               <a > <button data-id=${item.id}  class="btn btn-accept">Ir a Comprar</button></a>
                            </div>
                        </div>
                    </div>
                </td>
                <td style="width: 50%; padding: 10px;">
                    <div class="notes-container">
                        <div class="note" style="--rotate: 2deg;">
                            <div class="logo-circle">
                                <img src="/stylesheets/image-removebg-preview-_1_.ico" alt="50, 50" class="logo">
                            </div>
                            <div class="note-header">DIANA</div>
                            <p>Se le comunica a nuestros clientes que los pedidos estaran abiertos
                                los dias:</p>
                            <p>L M M J V S D</p>
                            <div>
                                <button data-id=${item.id} class="btn btn-accept">Ir a Comprar</button>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            `

            $('#table').append(html);
        })

    
       
 
    },
    error: function(xhr, status, error) {
        console.error('Error en la petición AJAX:', error);
        $('#resultado').html('Error al cargar los datos');
    }
    
}
)

$('#table').off('click', '.btn').on('click', '.btn', function() {
    console.log('Boton presionado')
    var id = $(this).data('id')
    console.log(id)
    // Aquí puedes hacer las acciones deseadas cuando se presione el botón
    // Por ejemplo, redireccionar a otra página con el id del producto
      if (id) {
        window.location.href=`/users/pedirproductos?productoId=${id}`
      }else{
        alert('en mantenimiento... 😅')
      }
})
    
})

