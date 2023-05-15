const mongoose = require("mongoose");
const { dbURI } = require("../core/index")
/////////////////////////////////////////////////////////////////////////////////////////////////

// let dbURI = 'mongodb://localhost:27017/abc-database';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////


//  StudentSchema Start

let customerSchema = new mongoose.Schema({
    Techstack: String,
    Link: String,
    Profile: String,
    Datecostumer: String,
    isOn: String,
    isOnboard: String,
   
  });
  const customerModel = mongoose.model("customers", customerSchema);

//  Quiz End


module.exports = {

    customerModel: customerModel,
}