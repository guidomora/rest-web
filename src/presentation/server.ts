import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path: string;
    routes: Router
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, public_path, routes } = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start() {
        // Middleware: funciones que se ejecutan en todo momento que pase por una ruta

        this.app.use(express.json()); // parsear la info del body y transformarla en un objeto json (raw)
        this.app.use(express.urlencoded({ extended: true })); // pero la parsea del formato x-www-form-urlencoded

        // public folder
        this.app.use(express.static(this.public_path));


        // routes
        this.app.use(this.routes)


        // SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
        })


        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}