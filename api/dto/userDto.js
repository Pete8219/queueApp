module.exports = class UserDto {
  _id;
  name;
  login;
  userType;
  phone;
  email;

  constructor(model) {
    this._id = model._id;
    this.name = model.name;
    this.login = model.login;
    this.userType = model.userType;
    this.phone = model.phone;
    this.email = model.login;
  }
};
