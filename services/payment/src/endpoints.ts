import { API_V1_CONTRACTS, type PaymentConfirmationResponse, type PaymentIntent, type PaymentIntentRequest, type PaymentIntentResponse, type PaymentWebhookEvent } from "../../../packages/types/src/v1";

const intents = new Map<string, PaymentIntent>();

const transitions: Record<PaymentWebhookEvent["eventType"], PaymentIntent["status"]> = {
  "payment.processing": "processing",
  "payment.succeeded": "succeeded",
  "payment.failed": "failed"
};

export const paymentEndpoints = {
  createIntent: {
    method: "POST",
    path: API_V1_CONTRACTS.payment.createIntent,
    handler: (request: PaymentIntentRequest): PaymentIntentResponse => {
      const id = `pi_${Math.random().toString(36).slice(2, 10)}`;
      const intent: PaymentIntent = {
        id,
        userId: request.userId,
        amountCents: request.amountCents,
        currency: request.currency,
        status: "requires_confirmation",
        clientSecret: `${id}_secret_${Math.random().toString(36).slice(2, 10)}`
      };
      intents.set(id, intent);
      return { version: "v1", paymentIntent: intent };
    }
  },
  webhookConfirm: {
    method: "POST",
    path: API_V1_CONTRACTS.payment.webhookConfirm,
    handler: (event: PaymentWebhookEvent): PaymentConfirmationResponse => {
      const intent = intents.get(event.paymentIntentId);
      if (!intent) {
        return { version: "v1", paymentIntentId: event.paymentIntentId, status: "failed" };
      }
      intent.status = transitions[event.eventType];
      intents.set(intent.id, intent);
      return { version: "v1", paymentIntentId: intent.id, status: intent.status };
    }
  }
} as const;

export const paymentStateMachine = transitions;
