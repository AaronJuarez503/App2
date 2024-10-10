

  const sumaFunctionDeclaration = {
    name: "sumar",
    parameters: {
        type: "OBJECT",
        description: "Suma dos números.",
        properties: {
          num1: {
            type: "NUMBER",
            description: "Primer número a sumar.",
          },
          num2: {
            type: "NUMBER",
            description: "Segundo número a sumar.",
          },
        },
        required: ["num1", "num2"],
      },
  };
  
  const buscarMarcaDeclaracion = {
    name: "buscar_marca",
    parameters: {
        type: "OBJECT",
        description: "Busca una marca por nombre y obtiene su información de contacto.",
        properties: {
            nombreMarca: {type: "STRING",description: "Nombre de la marca a buscar."}},
            required: ["nombreMarca"]
    }
};

  


  module.exports={
    sumar:sumaFunctionDeclaration,
    buscar_marca:buscarMarcaDeclaracion

  }