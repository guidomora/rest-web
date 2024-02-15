import http2 from 'http2';
import fs from 'fs';

// creacion del server 
const server = http2.createSecureServer({ // necesita un key y un certificate
    key:fs.readFileSync('./keys.server.key'),
    cert:fs.readFileSync('./keys.server.crt')
},(req, res) => {
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

    try {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
        res.end(responseContent);
        
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }
});

server.listen((8080),() => {
    console.log('Server is running on port 8080');
});
