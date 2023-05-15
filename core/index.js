const PORT = process.env.PORT || 5001;
const dbURI =
  process.env.dbURI ||
  "mongodb+srv://dbuser:dbuser@cluster0.olgj5g3.mongodb.net/?retryWrites=true&w=majority";

//change dburl put create cluster url

module.exports = {
  PORT: PORT,
  dbURI: dbURI,
};
