require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

let urlSchema = new Schema({
  original_url: { type: String, required: true },
  shorten_url: Number,
});

let urlModel = mongoose.model("urlModel", urlSchema);

const createAndSaveURL = (long_url,short_url,done) => {  
  let url = new urlModel({
    original_url: long_url,
    shorten_url: short_url,
  });
  console.log(url);
  url.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });

  // done(null /*, data*/);
};

// const createManyPeople = (arrayOfPeople, done) => {
//   Person.create(arrayOfPeople, function (err, people) {
//     if (err) return console.log(err);
//     done(null, people);
//   });
// };

// const findPeopleByName = (personName, done) => {
//   const data = { name: personName };

//   Person.find(data, function (err, data) {
//     if (err) return console.error(err);
//     console.log(data);
//     done(null, data);
//   });
// };

const findOneByShortURL= (url, done) => {
  const data = { shorten_url: url };
  urlModel.findOne(data, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findOneByLongURL = (url, done) => {
  const data = {"original_url": url };
  urlModel.findOne(data, function (err, data) {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  });
};

// const findEditThenSave = (personId, done) => {
//   const foodToAdd = "hamburger";
//   const data = { _id: personId };
//   Person.findById(data, function (err, data) {
//     if (err) return console.error(err);
//     data.favoriteFoods.push(foodToAdd);
//     data.save((err, data) => {
//       if (err) return console.error(err);
//       done(null, data);
//     });
//   });
// };

// const findAndUpdate = (personName, done) => {
//   const ageToSet = 20;
//   Person.findOneAndUpdate(
//     { name: personName },
//     { age: ageToSet },
//     { new: true },
//     (err, data) => {
//       if (err) return console.log(err);
//       done(null, data);
//     }
//   );
// };

// const removeById = (personId, done) => {
//   Person.findByIdAndRemove(personId, (err, data) => {
//     if (err) return console.log(err);
//     done(null, data)
//   });
// };

// const removeManyPeople = (done) => {
//   const nameToRemove = "Mary";
//   Person.remove({name: nameToRemove}, (err, response) => {
//     if(err) return console.log(err)
//     done(null, response);
//   })
// };

// const queryChain = (done) => {
//   const foodToSearch = "burrito";
//   const data = {favoriteFoods:[foodToSearch]}
//   const test = Person.find(data);
//   console.log(test);
// };

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.urlModel = urlModel;
exports.createAndSaveURL = createAndSaveURL;
// exports.findPeopleByName = findPeopleByName;
exports.findOneByShortURL = findOneByShortURL;
exports.findOneByLongURL = findOneByLongURL;
// exports.findEditThenSave = findEditThenSave;
// exports.findAndUpdate = findAndUpdate;
// exports.createManyPeople = createManyPeople;
// exports.removeById = removeById;
// exports.removeManyPeople = removeManyPeople;
// exports.queryChain = queryChain;
