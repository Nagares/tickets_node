const { Schema, model } = require('mongoose');

class UserModel {
  constructor() {
    const userSchema = new Schema({
      id: { type: Number, required: true },
      title: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    }, { collection: 'users' });

    this.model = model('User', userSchema);
  }

}

module.exports = new UserModel();
