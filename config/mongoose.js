//  require the library
const mongoose= require(`mongoose`);

//  connect to the database
// mongoose.connect('mongodb://127.0.0.1/contact_list_db');
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');
// mongoose.connect('mongodb://localhost:27017/contact_list_db');
// mongoose.connect('mongodb://localhost:27017/test');

// mongoose.connect('mongodb://localhost:contact_list_db');
//  aquire to the connection(check if it is successfull)
const db=mongoose.connection;

//  error
db.on('error', console.error.bind(console,'connection error'));

//  up and running this print the message
db.once('open', function(){
    console.log(`Successfully connected to the Database`)
})
