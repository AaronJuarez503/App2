var Modulo1 = (function($) {
    function saludar(nombre) {
        return 'Hola, ' + nombre + '!';
    }

    function separarPorMarcaId(datos) {
        const separados = {};
      
        datos.forEach(item => {
          const marcaId = item.marca_id;
          if (!separados[marcaId]) {
            separados[marcaId] = [];
          }
          separados[marcaId].push(item);
        });
      
        return separados;
      }

      function rrr(result) {
        return Object.entries(result).reduce((acc, [marcaId, items]) => {
          const unifiedArray = items.reduce((innerAcc, item) => {
            const existingItem = innerAcc.find(i => i.producto_id === item.producto_id);
            if (existingItem) {
              existingItem.cantidad += item.cantidad;
              existingItem.total += item.total;
            } else {
              innerAcc.push({
                producto_id: item.producto_id,
                imagen: item.producto_imagen,
                nombre: item.producto_nombre,
                cantidad: item.cantidad,
                total: item.total
              });
            }
            return innerAcc;
          }, []);
      
          acc[marcaId] = unifiedArray;
          return acc;
        }, {});
      }
    
    return {
        saludar: saludar,
        separarPorMarcaId: separarPorMarcaId,
        rrr: rrr
        
    };
})(jQuery);