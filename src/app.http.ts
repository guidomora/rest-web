import http from 'http';
import fs from 'fs';

// creacion del server 
const server = http.createServer((req, res) => {
    // La solicitud que la persona esta requiriendo
    console.log(req.url);
    // res.write('Hola Mundo');
    // res.end() // termina la respuesta

    if (req.url === '/') { // si la url es igual a / muestra el index
        const htmlFile =fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(htmlFile);
        return
    } 

    if (req.url?.endsWith(".js")) {
        res.writeHead(200, {'Content-Type': 'application/javascript'});
    } else if (req.url?.endsWith(".css")) {
        res.writeHead(200, {'Content-Type': 'text/css'});
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);
});

server.listen((8080),() => {
    console.log('Server is running on port 8080');
});
