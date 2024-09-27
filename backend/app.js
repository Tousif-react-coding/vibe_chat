const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
// const cors = require('cors')
const app = express();
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require("./routes/chatRoutes");

const ExpressErr = require("./utils/ExpressErr");
const { errorHandler } = require("./middleware/errorMiddleware");
const { allUsers } = require("./controller/user");
const auth = require("./middleware/auth");
dotenv.config();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const cors = require('cors');

const port = process.env.PORT || 5000;
const io = socketIo(server, {
  cors: {
      origin: "http://localhost:3000", // Adjust this based on your frontend port
      methods: ["GET", "POST"],
      credentials: true,
  }
});

app.use(cors());
app.get('/', (req, res) => {
  res.send("Socket.IO server is running.");
});

app.use(express.json());


const URL = process.env.MONGO_URL;
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(URL);
  
}

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use('/api',userRoutes)
app.use('/api/user',auth,allUsers);
// app.use("/api/chat", chatRoutes);

app.post('/api/chat', (req,res)=>{
  res.send("chat msg")
})
app.get('/' , (req , res)=>{
  res.send('Hello World! from the api root')
})

app.get("/api/chat", (req ,res)=>{
  res.send( chats)
})
app.get("/api/chat/:id", (req ,res)=>{
  const singleChat = chats.find((el)=>el._id === req.params.id)
  res.send(singleChat)
})

//Custome Error
app.all("*",(req,res,next)=>{
  next(new ExpressErr(404,"404 Page Not Found!"))
})

app.use(errorHandler);


app.use(express.static('../frontend/build'));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (messageObject) => {
      console.log('Message received from client:', messageObject); // Debugging line
      io.emit('receiveMessage', messageObject);
  });

  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});

// app.listen(port , ()=>{
//   console.log(`Server is listen on port ${port}`)
// })