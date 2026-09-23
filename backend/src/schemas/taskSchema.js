import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "El título es obligatorio")
    .max(100, "El título no puede superar los 100 caracteres"),

  status: z.enum([
    "pendiente",
    "en progreso",
    "en revision",
    "bloqueada",
    "completada",
  ]),

  priority: z.coerce
    .number()
    .int()
    .min(1, "La prioridad mínima es 1")
    .max(5, "La prioridad máxima es 5"),

  assigned_to: z.uuid("El usuario asignado no es válido").nullable(),

  category_id: z.uuid("La categoría no es válida").nullable(),

  content: z.string().trim().max(5000, "La descripción es demasiado larga"),

  notes: z.string().trim().max(5000, "Las notas son demasiado largas"),
});
