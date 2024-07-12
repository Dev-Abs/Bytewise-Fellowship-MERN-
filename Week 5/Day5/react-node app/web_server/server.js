const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const path = require('path');

const PORT = process.env.PORT || 3500;
const dataFilePath = path.join(__dirname, 'data', 'data.json');

const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return { tasks: [] };
  }
};

const writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing JSON file:', error);
  }
};

const handleCors = (res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  };
  

// Utility function to parse JSON request body
const parseRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(JSON.parse(body));
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

const server = http.createServer(async (req, res) => {
  handleCors(res);
  
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
}

  if (pathname === '/tasks' && method === 'GET') {
    handleCors(res);
    const data = await readJsonFile(dataFilePath);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data.tasks));
  } else if (pathname.match(/\/tasks\/\d+/) && method === 'GET') {
    handleCors(res);
    const id = parseInt(pathname.split('/')[2], 10);
    const data = await readJsonFile(dataFilePath);
    const task = data.tasks.find(task => task.id === id);
    if (task) {
        handleCors(res);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(task));
    } else {
        handleCors(res);
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Task not found' }));
    }
  } else if (pathname === '/tasks' && method === 'POST') {
    handleCors(res);
    const newTask = await parseRequestBody(req);
    const data = await readJsonFile(dataFilePath);
    newTask.id = data.tasks.length ? data.tasks[data.tasks.length - 1].id + 1 : 1;
    data.tasks.push(newTask);
    await writeJsonFile(dataFilePath, data);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newTask));
  } else if (pathname.match(/\/tasks\/\d+/) && method === 'DELETE') {
    handleCors(res);
    const id = parseInt(pathname.split('/')[2], 10);
    const data = await readJsonFile(dataFilePath);
    data.tasks = data.tasks.filter(task => task.id !== id);
    await writeJsonFile(dataFilePath, data);
    res.writeHead(204);
    res.end();
  } else if (pathname.match(/\/tasks\/\d+/) && method === 'PUT') {
    handleCors(res);
    const id = parseInt(pathname.split('/')[2], 10);
    const updatedTask = await parseRequestBody(req);
    const data = await readJsonFile(dataFilePath);
    const index = data.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        handleCors(res);
      data.tasks[index] = { ...data.tasks[index], ...updatedTask };
      await writeJsonFile(dataFilePath, data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data.tasks[index]));
    } else {
        handleCors(res);
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Task not found' }));
    }
  } else {
    handleCors(res);
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
