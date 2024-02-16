import { Request, Response } from "express";
import { prisma } from '../../data/postgreSQL/index';

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

    public getTodos = async (req: Request, res: Response) => {

        // POSGRES
        const todos = await prisma.todo.findMany()
        return res.json(todos);
    }






    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id // trae la info de la url
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' }); // si el id no es un numero arroja un error

        // LOCAL
        // const todo = todos.find(todo => todo.id === id); // busca el id en el array
        // (todo) ? res.json(todo) : res.status(404).json({ error: `TODO with id ${id} not found` }) // responde con el id que encontro, sino arroja un error

        // POSGRES
        const todo = await prisma.todo.findUnique({ where: { id } })
        const todoCheck = (todo) ? res.json(todo) : res.status(404).json({ error: `TODO with id ${id} not found` })
        return todoCheck

    }






    public createTodo = async (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' }); // si no hay texto arroja un error

        // LOCAL
        // const newTodo = {
        //     id: todos.length + 1, // no deberia hacerse asi, deberia ser un uuid
        //     text,
        //     completedAt: null
        // }

        // POSGRES
        const newTodo = await prisma.todo.create({
            data: { text }
        })

        todos.push(newTodo) // se pushea
        res.json(newTodo)

    }







    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' }); // si el id no es un numero arroja un error

        // const todo = todos.find(todo => todo.id === id); // busca el id en el array
        const todo = await prisma.todo.findUnique({ where: { id } }) // busca el id en la base de datos
        if (!todo) return res.status(400).json({ error: `Todo with id ${id} not found` });

        const { text, completedAt } = req.body;

        // LOCAL
        // todo.text = text || todo.text; // si no hay texto, se queda con el que ya tenia
        // (completedAt === null) ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt); // si no hay fecha, se queda con la que ya tenia


        // POSGRES
        const updating = await prisma.todo.update({
            where: { id },
            data: {
                text,
                completedAt: (completedAt) ? new Date(completedAt) : null  // si no hay fecha, se queda con la que ya tenia
            }
        })
        res.json(updating)
    }









    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' }); // si el id no es un numero arroja un error

        // LOCAL
        // const todo = todos.find(todo => todo.id === id); // busca el id en el array
        const todo = await prisma.todo.findUnique({ where: { id } }) // busca el id en la base de datos
        if (!todo) return res.status(400).json({ error: `Todo with id ${id} not found` });

        // todos.splice(todos.indexOf(todo), 1) // lo borra


        // POSGRES
        const deleted = await prisma.todo.delete({ where: { id } });
        (deleted) ? res.json(deleted) : res.status(400).json({ error: `Todo with id ${id} not found` });
        res.json({deleted, todo})
    }
}