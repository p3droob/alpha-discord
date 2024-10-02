module.exports = class Base {
  constructor(client, id) {
    if (!id) return this.id = client;
    this.client = client;
    this.id = id;
  };
  _clone() {
    return Object.assign(Object.create(this), this);
  };

  _correct(data) {
    return data;
  };

  _update(data) {
    const clone = this._clone();
    this._patch(data);
    return clone;
  }
}
