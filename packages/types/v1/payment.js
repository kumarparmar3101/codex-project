/**
 * Versioned contract definitions for Payment service.
 */

const PaymentContractsV1 = {
  version: "v1",
  createIntentRequest: {
    type: "object",
    required: ["bookingReference", "amount", "currency"],
    properties: {
      bookingReference: { type: "string" },
      amount: { type: "number" },
      currency: { type: "string" }
    }
  },
  paymentIntentResponse: {
    type: "object",
    required: ["intentId", "status", "clientSecret"],
    properties: {
      intentId: { type: "string" },
      status: { enum: ["created", "pending_confirmation", "confirmed", "failed", "canceled"] },
      clientSecret: { type: "string" }
    }
  },
  webhookEventRequest: {
    type: "object",
    required: ["eventType"],
    properties: {
      eventType: {
        enum: ["intent.requires_confirmation", "intent.succeeded", "intent.failed", "intent.canceled"]
      }
    }
  }
};

module.exports = { PaymentContractsV1 };
