const { Schema, model } = require('mongoose');

class OrderModel {
  constructor() {
    const orderSchema = new Schema({
      id: { type: Number, required: true },
      order_code: { type: Number, required: true },
      user_code: { type: Number, required: true },
      total_quantity: { type: Number, required: true },
      product_id: { type: Number, required: true },
    }, { collection: 'orders' });

    this.model = model('Order', orderSchema);
  }

  
}

module.exports = new OrderModel();
