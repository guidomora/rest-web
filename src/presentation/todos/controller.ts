import { Request, Response } from "express";

const todos = [
    {
        id: 1,
        text: "buy eggs",
        completedAt: new Date()
    },
    {
        id: 2,
        text: "buy milk",
        completedAt: null
    },
    {
        id: 3,
        text: "buy bread",
        completedAt: new Date()
    },
]

export class TodosController {
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id // trae la info de la url
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' }); // si el id no es un numero arroja un error

        const todo = todos.find(todo => todo.id === id); // busca el id en el array
        (todo) ? res.json(todo) : res.status(404).json({ error: `TODO with id ${id} not found` }) // responde con el id que encontro, sino arroja un error   
    }

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' }); // si no hay texto arroja un error
        const newTodo = {
            id: todos.length + 1, // no deberia hacerse asi, deberia ser un uuid
            text,
            completedAt: null
        }
        todos.push(newTodo) // se pushea
        res.json(newTodo)
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' }); // si el id no es un numero arroja un error

        const todo = todos.find(todo => todo.id === id); // busca el id en el array
        if (!todo) return res.status(400).json({ error: `Todo with id ${id} not found` });

        const { text, completedAt } = req.body;
        
        todo.text = text || todo.text; // si no hay texto, se queda con el que ya tenia
        (completedAt === null) ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt); // si no hay fecha, se queda con la que ya tenia
        res.json(todo)
    }

    public deleteTodo = (req:Request, res:Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' }); // si el id no es un numero arroja un error

        const todo = todos.find(todo => todo.id === id); // busca el id en el array
        if (!todo) return res.status(400).json({ error: `Todo with id ${id} not found` });

        todos.splice(todos.indexOf(todo), 1) // lo borra
        
        res.json(todo)
    }
}