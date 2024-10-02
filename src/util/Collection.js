module.exports = class Collection extends Map {
  constructor(model) {
    super(Array.isArray(model) ? [] : model);
    if (Array.isArray(model)) {
      model.forEach(m => {
        this.set(m.key, m.value);
      })
    }
  }

  clone() {
    return new Collection(this)
  }

  everyKeys(key) {
    //@param {key} Boolean. Same as Array.every() with the keys of Collection
    if (this.size < 1) return;
    return Array.from([...this.keys()]).every(a => a === key)
  }

  everyValues(value) {
    //same as everyKeys
    if (this.size < 1) return;
    return Array.from([...this.values()]).every(a => a === value)
  };
  first() {
    if (this.size < 1) return;
    return [...this.values()][0]
  }
  
  map(callback) {
    if (this.size < 1) return;
    return [...this.values()].map(callback);
  }

};