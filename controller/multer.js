const multer = require('multer');

// Configuración de multer con memoria storage
const storage = multer.memoryStorage();

// Crear instancia de multer con la configuración
const upload = multer({ storage: storage });

// Exportar la instancia de multer
module.exports = upload;