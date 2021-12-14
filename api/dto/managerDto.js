module.exports = class ManagerDto {
  name;
  cabinet;
  vacationFrom;
  vacationTo;
  substitute;
  online;
  start;
  end;
  _id;

  constructor(model) {
    this.name = model.name;
    this.cabinet = model.cabinet;
    this.vacationFrom = model.vacationFrom;
    this.vacationTo = model.vacationTo;
    this.substitute = model.substitute;
    this.online = model.online;
    this.start = model.start;
    this.end = model.end;
    this._id = model._id;
  }
};
