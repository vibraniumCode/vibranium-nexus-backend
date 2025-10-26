const bcrypt = require("bcryptjs");

async function hashearContraseña(contraseña) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(contraseña, salt);
  console.log("Contraseña hasheada:", hash);
}

hashearContraseña("nelmaltq"); // Reemplaza con la contraseña real
