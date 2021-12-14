module.exports = class UserDto {
  name;
  login;
  userType;
  phone;
  email;

  constructor(model) {
    this.name = model.name;
    this.login = model.login;
    this.userType = model.userType;
    this.phone = model.phone;
    this.email = model.login;
  }
};
