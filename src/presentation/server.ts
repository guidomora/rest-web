import express from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path: string;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly public_path: string;

    constructor(options: Options) {
        const { port, public_path } = options;
        this.port = port;
        this.public_path = public_path;
    }

    async start() {
        // Middleware funciones que se ejecutan en todo momento que pase por una ruta

        // public folder
        this.app.use(express.static(this.public_path));

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
        })

        
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}