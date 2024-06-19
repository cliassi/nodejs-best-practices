const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');

exports.getUser = async function getUser(id){
  const user = await User.findById(id).select('-password');
    return user;
}
exports.createUser = async function createUser(body) {
  const { error } = validate(body);
  if (error) throw Error(error.details[0].message);

  let user = await User.findOne({ email: body.email });
  if (user) throw Error("User already registered.");

  user = new User(_.pick(body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  return user;
};
