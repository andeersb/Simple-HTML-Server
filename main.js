import net from "net";
import fs from 'fs';
import path from 'path';

const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        const request = data.toString().split('\r\n');
        const requestLine = request[0].split(' '); // Split the request
        const method = requestLine[0]; // GET, POST
        const url = requestLine[1]; // path 
        const httpVersion = requestLine[2]; // HTTP/1.1

        console.log(`Method: ${method}`);
        console.log(`Path: ${url}`);
        console.log(`HTTP version: ${httpVersion}`);

        if (method === 'GET' && (url === '/index.html'|| url === '/')) {
            fs.readFile(path.join('D:\\Internship\\Simple-HTML-Server', 'index.html'), (err, data) => {
                if (err) {
                    const response = 'HTTP/1.1 500 Internal Server Error\r\n\r\n';
                    socket.write(response);
                } else {
                    const response = 'HTTP/1.1 200 OK\r\n Content-Type: text/html\r\n\r\n' + data;
                    socket.write(response);
                }
                socket.end();
            });
        } else {
            const response = ['HTTP/1.1 404 Not Found','',''].join('\r\n');
            socket.write(response);
            socket.end();
        }
    });

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(5500, "localhost",() => {
    console.log("Server is running on http://localhost:5500");  
});