const mongoose = require('mongoose');
let Tenant;

const tenantSchema = new mongoose.Schema({
  name: { type: String, minLength: 1 },
  age: { type: Number, min: 1, max: 120 },
  email: { type: String },
  phone: { type: Number, minLength: 10 },
  address: { type: String },
  rentPay: { type: Number, min: 1 }
});

// //  statics - model / class method - User.findFemale()
// userSchema.statics.findFemale = function () {
//   //  'this' is the model
//   // return this.find({gender: 'female'});
//   // return User.find({gender: 'female'});
//   return mongoose.model('User').find({gender: 'female'});
// };
//
// //  methods - document / instance method  -   user.greeting()
// userSchema.methods.greeting = function () {
//   console.log(`Hi, I'm ${this.name.first}`);
// };
//
// userSchema.methods.haveBirthday = function (cb = () => {}) {
//   this.age++;
//   return this.save(cb);
// };

Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;

//  /////////////////////////////////////////////////////
// //  MODEL / DOCUMENT METHODS
//
// //  model / class methods //  use ('statics')
// Group.find
// Group.findOne
// Group.remove
//
// Tenant.findFemale();
//
// //  document / instance METHODS //  use ('methods')
// userSchema.methods  //  for
// group.save
//
// user.greeting() //  console.log('Hi, I'm ' + user.name.first)
