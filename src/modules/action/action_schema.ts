import { title } from "node:process";
import {optional, z} from "zod";

export const createActionSchema = z.object({
    title : z.string().min(5),
    category : z.enum(["Reciclaje", "Transporte", "Energia", "Agua", "Otro"]),
    description : z.string().optional(),
    //Cantidad o porcentaje de la acción que realizo
    value: z.number().positive()
})