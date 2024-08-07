const {body,validationResult} = require('express-validator');
//const { assign } = require('nodemailer/lib/shared');
const model = require ('../model/index')
const conexion = require ('../config/index')

const result = (req)=>{
  return new Promise((resolve, reject) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          reject(errors);
      } else {
          resolve();
      }
      
  });
}

module.exports={

    Pregistrarse:[
      body('nom')
      .notEmpty().withMessage('El nombre es requerido'),
      body('apell')
      .notEmpty().withMessage('El apellido es requerido'),
      body('user')
      .notEmpty().withMessage('El usuario es requerido'),
      body('correo')
      .isEmail().withMessage('El email no es valido')
      .notEmpty().withMessage('EL email es requerido'),
      body('pass')
      .notEmpty().withMessage('La contraseña es requerida')
      .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres')
      .matches(/[a-zA-Z]/).withMessage('La contraseña debe contener al menos una letra')
      .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número'),
      
      (req,res,next)=>{
        result(req)
        .then(() => {
            next();
        })
        .catch((errors) => {
          console.log(errors); 
          var datos = req.body;
          console.log(datos);
          // Mantener los datos del formular});
          const errorMessages = {};
          errors.array().forEach(error => {
            if (!errorMessages[error.path]) {
              errorMessages[error.path] = error.msg;
              console.log(errorMessages);
            }
          });
          res.render('crear',{errors: errorMessages, valores: datos}); 
      });
     }
   ],

   Piniciar:[
    body('user')
    .notEmpty().withMessage('El usuario es requerido'),
    body('pass')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    (req, res, next)=>{
      result(req)
      .then(() => {
          next();
      })
      .catch((errors) => {
        console.log(errors);
        var datos = req.body;
        console.log(datos);
        // Mantener los datos del formular});
        const errorMessages = {};
        errors.array().forEach(error => {
          if (!errorMessages[error.path]) {
            errorMessages[error.path] = error.msg;
            console.log(errorMessages);
          }
        });
        res.render('inicio', {errors: errorMessages, valores: datos});
    });
   }
   ],

   Precuperar:[
    body('correo')
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('El email no es valido'),
    body('correo').custom( async value =>{
    var result = await model.RecuperarCuenta(conexion,value)
    if (result) {
      return true;
    } else {
      throw new Error('el correo no se encuentra')
    }
    
    }),
    (req, res, next)=>{
      result(req)
      .then(() => {
          next();
      })
      .catch((errors) => {
        console.log(errors);
        var datos = req.body;
        console.log(datos);
        // Mantener los datos del formular});
        const errorMessages = {};
        errors.array().forEach(error => {
          if (!errorMessages[error.path]) {
            errorMessages[error.path] = error.msg;
            console.log(errorMessages);
          }
        });
        res.render('recuperacion', {errors: errorMessages, valores: datos});
    });
   }
   ],

   PnuevaPass:[
    body('pass')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-zA-Z]/).withMessage('La contraseña debe contener al menos una letra')
    .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número'),
    (req, res, next)=>{
      result(req)
      .then(() => {
          next();
      })
      .catch((errors) => {
        console.log(errors);
        var datos = req.body;
        console.log(datos);
        // Mantener los datos del formular});
        const errorMessages = {};
        errors.array().forEach(error => {
          if (!errorMessages[error.path]) {
            errorMessages[error.path] = error.msg;
            console.log(errorMessages);
          }
        });
        res.render('updata_contra', {errors: errorMessages, valores: datos});
    });
   }
   ]

}