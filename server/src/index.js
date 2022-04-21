const server = require('./app.js');
const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})