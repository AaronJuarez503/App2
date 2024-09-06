$(function() {


   var r= Modulo1.saludar('Mundo');
   console.log(r);

   $.ajax({
    url: '/users/pruebas',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        
        //console.log('Datos recibidos:', data);

        var separar= Modulo1.separarPorMarcaId(data)

        console.log(separar)

        var unir = Modulo1.rrr(separar)

        console.log(unir)
      
        
    },
    error: function(xhr, status, error) {
        console.error('Error en la petición AJAX:', error);
        $('#resultado').html('Error al cargar los datos');
    }
});
    
})