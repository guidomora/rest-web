import { Router } from "express";
import { TodosController } from "./controller";

export class TodosRoutes {
    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController();
        router.get('/', todoController.getTodos) //no definimos el path porque ya lo definimos en el app-routes (el middleware)
        router.get('/:id', todoController.getTodoById) // la ruta recibe un argumento que en este caso es el id
        router.post('/', todoController.createTodo) // creamos un todo
        router.put('/:id', todoController.updateTodo) // actualizamos un todo
        router.delete('/:id', todoController.deleteTodo) // borramos un todo
        return router
    }
}