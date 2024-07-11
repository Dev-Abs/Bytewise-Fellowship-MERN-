const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;
const http = require("http");


const EventEmitter = require("events");
const logEvents = require("./logEvents");
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();
// myEmitter.on('log', logEvents);
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName))   // this is the same as above line;
const PORT = process.env.PORT || 3500;
const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf-8' : null
        );
        const data = contentType === 'application/json'
            ? JSON.parse(rawData)
            : rawData;
        response.writeHead(
            // if 404 then 404, if 301 then 301, if 200 then 200
            // filePath.includes('404') ? 404 : filePath.includes('301') ? 301 :
            filePath.includes('404') ? 404 : 200,
            { 'Content-Type': contentType }
        );
        response.end(
            contentType === 'application/json'
                ? JSON.stringify(data)
                : data
        );
    } catch (error) {
        myEmitter.emit('log', `Server Error: ${error.name}, Error Message ${error.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end(`Server Error`);
    }
}

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  myEmitter.emit('log', `Request URL: ${req.url}, Request Method: ${req.method}`, 'reqLog.txt');


    // if (req.url === '/' || req.url === 'index.html') {
  //     res.statusCode = 200;
  //     res.setHeader('Content-Type', 'text/html');
  //     filePath.join(__dirname, 'views' , 'index.html');
  //     fs.readFile(filePath.join(__dirname, 'views' , 'index.html'), (err, data) => {
  //         res.end(data);
  //     });
  // }

  // switch (req.url) {
  //     case '/':
  //         res.statusCode = 200;
  //         res.setHeader('Content-Type', 'text/html');
  //         fs.readFile(path.join(__dirname, 'views', 'index.html'), (err, data) => {
  //             res.end(data);
  //         });
  //         break;
  //     }
  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".html":
      contentType = "text/html";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

      // what does above code doing?
        // if content type is text/html and req.url is / then it will return index.html
        // if content type is text/html and req.url ends with / then it will return index.html
        // if content type is text/html then it will return req.url

    // doing using if else
    if (contentType === 'text/html' && req.url === '/') {
        filePath = path.join(__dirname, 'views', 'index.html');
    } else if (contentType === 'text/html' && req.url.slice(-1) === '/') {
        filePath = path.join(__dirname, 'views', req.url, 'index.html');
    } else if (contentType === 'text/html') {
        filePath = path.join(__dirname, 'views', req.url);
    } else {
        filePath = path.join(__dirname, req.url);
    }

    // if (!extension && req.url !== '/') {
    //     filePath = path.join(__dirname, 'views', '404.html');
    // }

    // makes .html extension not required in the browser

    if (!extension && req.url !== '/') filePath += '.html';


    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // serve the file
        // console.log('serving file', filePath);
        serveFile(filePath, contentType, res);
    } else {
        // serve 404 or 301 redirect
        // filePath = path.join(__dirname, 'views', '404.html');
        // console.log(path.parse(filePath));

        switch(path.parse(filePath).base) {
            case 'about':
                res.writeHead(301, { 'Location': '/about.html' });
                res.end();
                break;
            case 'contact':
                res.writeHead(301, { 'Location': '/contact.html' });
                res.end();
                break;
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                filePath = path.join(__dirname, 'views', '404.html');
                serveFile(filePath, 'text/html', res);
        }
    }

});

// not ready to launch server yet, becuase it should listen first

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


