import { z } from "zod";

export const querySchema = z.object({
  page: z.coerce
    .number()
    .int("La página debe ser un entero")
    .min(1, "La página debe ser mayor a 0"),

  limit: z.coerce
    .number()
    .int("El límite debe ser un entero")
    .min(1, "El límite debe ser mayor a 0")
    .max(20, "El límite no puede ser mayor a 20"),
});
