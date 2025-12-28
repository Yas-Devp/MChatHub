const app = require('./api/index.js');
const port = 3000;

app.listen(port, ()=>{
	console.log(`Server running on ${port}`);
});