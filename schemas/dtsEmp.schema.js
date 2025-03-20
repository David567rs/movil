import { z } from 'zod';

// Esquema de validación para Empresa
export const empresaSchema = z.object({
    nombre: z.string({
        required_error: "El nombre de la empresa es requerido",
    }).trim(),

    // Misión y Visión
    mision: z.string({
        required_error: "La misión es requerida",
    }).trim(),
    imgMision: z.string({
        required_error: "La imagen de la misión es requerida",
    }).trim(),
    vision: z.string({
        required_error: "La visión es requerida",
    }).trim(),
    imgVision: z.string({
        required_error: "La imagen de la visión es requerida",
    }).trim(),

    // Ubicación
    ubicacion: z.object({
        calle: z.string({ required_error: "La calle es requerida" }).trim(),
        colonia: z.string({ required_error: "La colonia es requerida" }).trim(),
        ciudad: z.string({ required_error: "La ciudad es requerida" }).trim(),
        estado: z.string({ required_error: "El estado es requerido" }).trim(),
        codigoPostal: z.string({ required_error: "El código postal es requerido" }).trim(),
        lat: z.number({ required_error: "La latitud es requerida" }),
        lon: z.number({ required_error: "La longitud es requerida" })
    }),

    // Redes Sociales
    redes: z.object({
        instagram: z.string().trim().optional(),
        facebook: z.string().trim().optional(),
        twitter: z.string().trim().optional()
    }).optional(),

    // Teléfono
    telefono: z.string({
        required_error: "El teléfono es requerido",
    }).trim(),

    // Fecha de Registro
    fechaRegistro: z.date().optional()
});

export const faqSchema = z.object({
    pregunta: z.string({
        required_error: "La pregunta es requerida",
    }).trim(),
    respuesta: z.string({
        required_error: "La respuesta es requerida",
    }).trim()
})

export const teryconSchema = z.object({
    contenido: z.string({
        required_error: "El contenido de los términos y condiciones es requerido",
    }).trim().min(40, "El contenido debe tener al menos 40 caracteres")
});

export const polSchema = z.object({
    contenido: z.string({
        required_error: "El contenido de la política es requerido",
    }).trim().min(40, "El contenido debe tener al menos 40 caracteres")
});