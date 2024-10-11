const conexion = require('../../config/index')

async function sumarValores(num1, num2) {
    return num1 + num2;
}


function consult (promt){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT telefono FROM marcas WHERE  nombre = '${promt}'`, function (error, resultado) {
            if (error) {
                throw (error);
            } else if(resultado.length > 0) {
                resolve(resultado);
            }else{
                resolve('no se encontro la marca')
                
            }
        });
    })
}


async function buscarEmpresa(nombreMarca) {
    // Aquí iría la lógica real de búsqueda en tu base de datos
    // Este es solo un ejemplo simulado

    try {
        var resultado = await consult(nombreMarca);
        console.log(resultado);
        
    } catch (error) {
        
    }

    return resultado

 
    
}

async function buscarMarca(nombreMarca) {
    // Aquí iría la lógica real de búsqueda en tu base de datos
    // Este es solo un ejemplo simulado

    try {
        var resultado = await consult(nombreMarca);
        console.log(resultado);
        
    } catch (error) {
        
    }

    return resultado

 
    
}


const functions = {
    sumar: ({ num1, num2 }) => {
      return sumarValores(num1, num2);
    },
    buscar_empresa: async ({ nombreEmpresa }) => {
        return await buscarEmpresa(nombreEmpresa);
    },
    buscar_Marca: async ({ nombreMarca }) => {
        return await buscarMarca(nombreMarca);
    }
};

module.exports={
    functions

}