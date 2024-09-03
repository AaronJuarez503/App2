const {body,validationResult} = require('express-validator');
//const { assign } = require('nodemailer/lib/shared');
const model = require ('../model/index')
const conexion = require ('../config/index')
const controller =require('../controller/index')

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
  user:[
    body('usuario')
    .notEmpty().withMessage('El Usuario es requerido')
    .isLength({min:5}).withMessage('el nombre debe contener almenos 5 caracteres'),
    body('usuario').custom(async value => {            
     const user = await controller.findUser(value);
      if (user) {
        throw new Error('El usuario ya esta en uso');
      }
        return true; // Usuario no existe, lo cual es lo que queremos
}),
    (req,res,next)=>{
      result(req)
      .then(() => {
          next();
      })
      .catch((errors) => {
        console.log(errors); 
        var datos = req.body;
        console.log(datos);
        const errorMessages = {};
        errors.array().forEach(error => {
          if (!errorMessages[error.path]) {
            errorMessages[error.path] = error.msg;
            console.log(errorMessages);
          }
        });
        res.render('usuario',{errors:errorMessages}); 
    });
  }

  ],

    Pregistrarse:[
      body('nom')
          .notEmpty().withMessage('El nombre es requerido')
          .isLength({min:5}).withMessage('el nombre debe contener almenos 5 caracteres'),
          body('apell')
          .notEmpty().withMessage('El apellido es requerido')
          .isLength({min:5}).withMessage('el nombre debe contener almenos 5 caracteres'),
          body('correo')
          .isEmail().withMessage('El email no es valido')
          .notEmpty().withMessage('EL email es requerido'),
      body('correo').custom(async value => {
            const email = await controller.findByEmail(value)
            if (email) {
              throw new Error('el correo ya esta en uso')
            }else{
              return true;
            }
          
          }),
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
          body('username')
          .notEmpty().withMessage('El usuario es requerido'),
          body('password')
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
    var result = await model.findemail(conexion,value);
    if (result) {
      return true;
    } else {

    }
   
    }).withMessage("el correo no existe"),
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
    body('password')
    .notEmpty().withMessage('El campo  no puede estar vacío')
    .isLength({ min:8 }).withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-zA-Z]/).withMessage('La contraseña debe contener al menos una letra')
    .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número'),
    body('Confirmar_contraseña').custom((value, { req }) => {
      return value === req.body.password;
    }).withMessage("La contraseña y la confirmación de contraseña no coinciden"),
    (req, res, next)=>{
      result(req)
      .then(() => {
          next();
      })
      .catch((errors) => {
        console.log(errors);
        const errorMessages = {};
        errors.array().forEach(error => {
          if (!errorMessages[error.path]) {
            errorMessages[error.path] = error.msg;
            console.log(errorMessages);
          }
        });
         res.json({errors:errorMessages});
        }
      );
    }
   ],
   codigoventa:[
    body('code')
    .notEmpty().withMessage('El campo  no puede estar vacío')
    .isLength({min:5}).withMessage('Debe tener 5 caracteres')
    .isLength({max:5}).withMessage(' solo puede  tener 5 caracteres')
    .isNumeric().withMessage('solo debe contener numeros'),
    (req,res,net)=>{
      result(req)
      .then(()=>{
        next();
      })
      .catch((errors)=>{
        console.log(errors);


      })

    }
   ]


}