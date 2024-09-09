var Modulo1 = (function($) {
    function saludar(nombre) {
        var html =`
        <div class="container">
        <div class="logo">
            <img src="/placeholder.svg?height=100&width=100" alt="Logo de la empresa">
        </div>
        <table id="table">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="Imagen"><img src="/placeholder.svg?height=50&width=50" alt="Producto 1" class="product-image"></td>
                    <td data-label="Nombre">Producto 1</td>
                    <td data-label="Cantidad">2</td>
                    <td data-label="Precio">$10.00</td>
                    <td data-label="Subtotal">$20.00</td>
                    <td data-label="Acción"><span class="trash-icon">🗑️</span></td>
                </tr>
            </tbody>
        </table>
        <div class="total-cell">Total: $50.00</div>
    </div>
        `

        return html;
    }
    function saludar2(nombre) {
        console.log("hola2")
        var html =`
      
                <tr>
                    <td data-label="Imagen"><img src="/placeholder.svg?height=50&width=50" alt="Producto 1" class="product-image"></td>
                    <td data-label="Nombre">Producto 1</td>
                    <td data-label="Cantidad">2</td>
                    <td data-label="Precio">$10.00</td>
                    <td data-label="Subtotal">$20.00</td>
                    <td data-label="Acción"><span class="trash-icon">🗑️</span></td>
                </tr>
            
       
        `

        return html;
    }

   
      
    return {
        saludar: saludar,
        saludar2: saludar2
        
        
    };
})(jQuery);