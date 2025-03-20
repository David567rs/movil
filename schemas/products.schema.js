import { z } from 'zod';

export const productSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es requerido",
  }),
  descripcion: z.string({
    required_error: "La descripción es requerida",
  }),
  categoria: z.string({
    required_error: "La categoría es requerida",
  }),
  marca: z.string({
    required_error: "La marca es requerida",
  }),
  precio: z.number({
    required_error: "El precio es requerido",
  }),
  stock: z.number({
    required_error: "El stock es requerido",
  }),
  modelo: z.string({
    required_error: "El modelo es requerido",
  }),
  estado: z.string({
    required_error: "El estado es requerido",
  }),
  imagenes: z.object({
    img1: z.string({
      required_error: "La imagen 1 es requerida",
    }),
    img2: z.string({
      required_error: "La imagen 2 es requerida",
    }),
    img3: z.string({
      required_error: "La imagen 3 es requerida",
    }),
    img4: z.string({
      required_error: "La imagen 4 es requerida",
    }),
  }),
  codigo: z.string({
    required_error: "El código es requerido",
  }),
  dimensiones: z.object({
    ancho: z.number({
      required_error: "El ancho es requerido",
    }),
    alto: z.number({
      required_error: "El alto es requerido",
    }),
    peso: z.number({
      required_error: "El peso es requerido",
    }),
  }),
  date: z.date().optional(),
});
