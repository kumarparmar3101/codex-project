const { CatalogContractsV1 } = require('./v1/catalog');
const { BookingContractsV1 } = require('./v1/booking');
const { UserContractsV1 } = require('./v1/user');
const { PaymentContractsV1 } = require('./v1/payment');

module.exports = {
  v1: {
    catalog: CatalogContractsV1,
    booking: BookingContractsV1,
    user: UserContractsV1,
    payment: PaymentContractsV1
  }
};
