const app = require('./app');
const connectWithDb = require('./config/connectWithDb.js');

connectWithDb();

app.listen(process.env.PORT, () => {
	console.log(`Server is running at the port :${process.env.PORT}`);
});