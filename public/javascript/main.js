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

        var html;
    
    function add(item) {


        html=`
        
            <tr>
                <td>
                    <div class="image-name">
                        <div class="image-placeholder"  > <img width="40px" height="40px" src="${item.producto_imagen}" alt=""></div>
                        ${item.producto_nombre}
                    </div>
                </td>
                <td> $${item.producto_precio}</td>
                <td>${item.cantidad}</td>
                <td class="total-row">${item.subtotal_producto}</td>
            </tr>
          `

          $('#table tbody').append(html)
        
    }

       

        let list = [];

       for (let key in separar) {
        console.log(`Clave: ${key}`);
        for (let i = 0; i < separar[key].length; i++) {
          const item = separar[key][i];


          let productoExistente = list.find(prod => prod.producto_nombre === item.producto_nombre);

          if (productoExistente) {
            productoExistente.cantidad++;
           // productoExistente.total = productoExistente.precio * productoExistente.cantidad;
           // actualizarCantidadEnUI(productoExistente);
        } else {
            list.push(item);
            
           // agregarNuevoProductoAUI(datos);
        }

        
    
            
        
         
          
         /* console.log(`- imagen: ${item.producto_imagen}`);
          console.log(`- nombre: ${item.producto_nombre}`);
          console.log(`- cantidad: ${item.cantidad}`);
          console.log(`- precio: ${item.producto_precio}`);
          console.log(`- total: ${item.subtotal_producto}`);
          console.log('---');*/

          

        }
      }
    
      console.log(list)
     // add(list)
      list.forEach(producto => {
        add(producto);
    });
      
      
      
        
    },
    error: function(xhr, status, error) {
        console.error('Error en la petición AJAX:', error);
        $('#resultado').html('Error al cargar los datos');
    }
});
    
})

 /* let productosUnicos = {};

   
      
      if (productosUnicos[item.producto_nombre]) {
        // Si el producto ya existe, actualiza la cantidad y el subtotal
        productosUnicos[item.producto_nombre].cantidad += item.cantidad;
        productosUnicos[item.producto_nombre].subtotal_producto = 
          productosUnicos[item.producto_nombre].cantidad * item.producto_precio;
      } else {
        // Si es un nuevo producto, añádelo al objeto de productos únicos
        productosUnicos[item.producto_nombre] = {...item};
      }

      console.log(productosUnicos)*/