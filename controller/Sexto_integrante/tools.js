

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
      description: `Busca  la marca por nombre y obtiene su información del contacto,cunado se te pida .`,
      properties: {
          nombreMarca: {type: "STRING",description: "Nombre de la marca a buscar."}},
          required: ["nombreMarca"]
  }
};

const buscarEmpresaDeclaracion = {
  name: "buscar_empresa",
  parameters: {
      type: "OBJECT",
      description: `Busca  la empresa por nombre y obtiene su información del contacto, por ejemplo: 
      si te preguntan el numero de una empresa  les brindaras el numero amablemnte .`,
      properties: {
          nombreEmpresa: {type: "STRING",description: "Nombre de la empresa a buscar."}},
          required: ["nombreEmpresa"]
  }
};

  


  module.exports={
    sumar:sumaFunctionDeclaration,
    buscar_marca:buscarMarcaDeclaracion,
    buscar_Empresa:buscarEmpresaDeclaracion

  }