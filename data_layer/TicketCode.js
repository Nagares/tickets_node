const { Schema, model } = require('mongoose');

class TicketCodeModel {
  constructor() {
    const ticketCodeSchema = new Schema({
      id: { type: Number, required: true },
      ticket_code: { type: Number, required: true },
    }, { collection: 'ticket_codes' });

    this.model = model('TicketCode', ticketCodeSchema);
  }
}

module.exports = new TicketCodeModel();
