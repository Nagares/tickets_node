const { Schema, model } = require('mongoose');

class TicketModel {
  constructor() {
    const ticketSchema = new Schema({
      id: { type: Number, required: true },
      order_code: { type: Number, required: true },
      user_code: { type: Number, required: true },
      total_quantity: { type: Number, required: true },
      product_id: { type: Number, required: true },
      ticket_code: { type: Number, required: true },
    }, { collection: 'tickets' });

    this.model = model('Ticket', ticketSchema);
  }
}

module.exports = new TicketModel();
