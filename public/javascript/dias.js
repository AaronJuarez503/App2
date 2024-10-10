$(function ($) {
 console.log('pagina cargada...')

 $.ajax({
    url: '/users/dias',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        console.log(data)

     $('#table').append();
        var html=`
        <table id="table" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="width: 50%; padding: 10px;">
                <div class="notes-container">
                    <div class="note" style="--rotate: -3deg;">
                        <div class="logo-circle">
                            <img src="/stylesheets/image-removebg-preview-_1_.ico" alt="50, 50" class="logo">
                        </div>
      

                        <div class="note-header">Coca-cola Company</div>
                        <p>Se le comunica a nuestros clientes que los pedidos estaran abiertos
                            los dias:
                        </p>
                        <p>L M M J V S D</p>

                        <div>
                           <a href="marca"> <button class="btn btn-accept">Ir a Comprar</button></a>
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
                            <button class="btn btn-accept">Ir a Comprar</button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
        `
 
    },
    error: function(xhr, status, error) {
        console.error('Error en la petición AJAX:', error);
        $('#resultado').html('Error al cargar los datos');
    }
    
}
)
    
})

