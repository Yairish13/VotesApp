import app from "./src/app"
import connectToDB from './mongoDB/mongoProvider';
require('dotenv').config();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const port: number | string = process.env.PORT || 3001;


connectToDB();


io.on("connection", function(socket:any) {
  console.log('new connection')
  socket.on("new-operations", async function(data:any) {
    io.emit("new-remote-operations", data);
  });
});

http.listen(port);
console.log('Server on port: ' + port);
