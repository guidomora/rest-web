import { Router } from "express";
import { TodosRoutes } from "./todos/routes";

// rutas de la app
// Middleware funciones que se ejecutan en todo momento que pase por una ruta

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/todos', TodosRoutes.routes)
        return router
    }
}