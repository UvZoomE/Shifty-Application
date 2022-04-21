import server from './app.js';
const PORT = 3001;

server.listen((process.env.PORT || PORT), () => {
  console.log(`Listening on port ${PORT}`)
})