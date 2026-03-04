const express =  require("express");
const app = express();

//const { DatabaseSync } =  require('node:sqlite');
//const database = new DatabaseSync('proyectoMec/src/database/mechanic_db.sqlite');

//const query =  database.prepare('SELECT * FROM Customer');

//console.log(query.all());

app.use(express.static(__dirname + '/html'))

console.log(__dirname);

app.get('/html', (req, res) => {
	res.send('index.html')
})

app.listen(4000, () => {
	console.log("server started");
})
