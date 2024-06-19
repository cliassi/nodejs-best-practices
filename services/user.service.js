exports.getUser = async function getUser(id){
  const user = await User.findById(id).select('-password');
    return user;
}
exports.createUser = async function createUser(body) {
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  return token;
};
