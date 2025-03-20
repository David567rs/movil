import { z } from 'zod';

//registro
export const registerSchema = z.object({
  name: z.object({
    nombres: z.string({
      required_error: "El nombre es requerido",
    }).trim()
  }),
  username: z.string({
    required_error: "El username es requerido",
  }).min(3, {
    message: "El username debe tener al menos 3 caracteres",
  }).trim(),
  email: z.string({
    required_error: "El email es requerido",
  }).email({
    message: "El email es inválido",
  }).trim(),
  pregunta: z.string({
    required_error: "La pregunta es requerida",
  }),
  respuesta: z.string({
    required_error: "La respuesta es requerida",
  }).trim(),
  contra: z.string({
    required_error: "La contraseña es requerida",
  }).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: "La contraseña debe tener mínimo 8 caracteres, incluir al menos una mayúscula, una minúscula, un número y un carácter especial"
    }
  )
})


// actualizacion
export const actualizarSchema = z.object({
  name: z.object({
    nombres: z.string({
      required_error: "El nombre es requerido",
    }).trim(),
    apellidopaterno: z.string({
      required_error: "El apellido paterno es requerido",
    }).trim(),
    apellidomaterno: z.string({
      required_error: "El apellido materno es requerido",
    }).trim(),
  }),
  telefono: z.string({
    required_error: "El teléfono es requerido",
  }).regex(/^\d+$/, { message: "El teléfono debe contener solo números" }),
  direccion: z.string({
    required_error: "La dirección es requerida",
  }).trim(),
  ciudad: z.string({
    required_error: "La ciudad es requerida",
  }).trim(),
  username: z.string({
    required_error: "El username es requerido",
  }).min(3, {
    message: "El username debe tener al menos 3 caracteres",
  }).trim(),
  email: z.string({
    required_error: "El email es requerido",
  }).email({
    message: "El email es inválido",
  }).trim(),
  pregunta: z.string({
    required_error: "La pregunta es requerida",
  }),
  respuesta: z.string({
    required_error: "La respuesta es requerida",
  }).trim(),
  contra: z.string({
    required_error: "La contraseña es requerida",
  }).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: "La contraseña debe tener mínimo 8 caracteres, incluir al menos una mayúscula, una minúscula, un número y un carácter especial"
    }
  )
});

// Login
export const loginSchema = z.object({
  email: z.string({
    required_error: "El email es requerido",
  }).email({
    message: "El email es inválido",
  }).trim(),
  contra: z.string({
    required_error: "La contraseña es requerida",
  })
});
