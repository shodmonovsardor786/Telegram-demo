const express = require('express'); 	
const app = express();
const ejs = require('ejs').renderFile;
const http = require('http'); 			
const server = http.createServer(app);
const io = require('socket.io').listen(server);

const fileUpload = require('express-fileupload')
app.use(fileUpload())

app.use(express.static(__dirname + '../../client'));
app.use(express.json());

app.engine('html', ejs)
app.set('view engine', 'html'); app.set('views', __dirname + '/views');

//---//---//---//--//--//
//---// LOGIN PAGE//---//
//---//---//---//--//--//
const { LoginGetController, LoginPostController } = require('./controllers/loginController');
app.get('/', LoginGetController);
app.post('/', LoginPostController);

//---//---//---//--//--//
//--// CREATE PAGE //--//
//---//---//---//--//--//
const { CreateGetController, CreatePostController } = require('./controllers/createController');
app.get('/create', CreateGetController);
app.post('/create', CreatePostController);

//---//---//---//--//--//
//---// CHAT PAGE //---//
//---//---//---//--//--//
const { ChatGetController, ChatPostController } = require('./controllers/chatController');
app.get('/chat', ChatGetController);
app.post('/chat', ChatPostController);
io.on('connection', socket => {
	socket.on('typing', 	 data => {	socket.broadcast.emit('typing', data)		})
	socket.on('new_message', data => {  socket.broadcast.emit('new_message', data)	})
})

//---//---//---//--//--//
//---// EDIT PAGE //---//
//---//---//---//--//--//
const { EditGetController, EditPostController, EditImgPostController } = require('./controllers/editController');
app.get('/edit', EditGetController);
app.post('/edit', EditPostController);
// app.post('/postfile', EditImgPostController);


server.listen(4000, () => console.log(`server ready with 4000 port`));