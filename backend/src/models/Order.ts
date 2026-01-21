import { Schema, model, models } from "mongoose";

type OrderItem = {
  productId: string;
  title: string;
  unitPrice: number;
  quantity: number;
  image?: string;
};

type OrderCustomer = {
  name?: string;
  email?: string;
  phone: string;
};

type PickupInfo = {
  type: "pickup";
  addressLabel: string;
  addressLine: string;
};

type DeliveryInfo = {
  type: "delivery";
  addressLabel: string;
  addressLine: string;
};

type OrderFulfillment = PickupInfo | DeliveryInfo;

type OrderSchedule = {
  date?: string; // "2026-01-22"
  timeWindow?: string; // "14:00 - 14:30"
};

const OrderSchema = new Schema(
  {
    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        unitPrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String },
      },
    ],

    customer: {
      name: { type: String },
      email: { type: String },
      phone: { type: String, required: true },
    },

    fulfillment: {
      type: { type: String, enum: ["pickup", "delivery"], required: true },
      addressLabel: { type: String, required: true },
      addressLine: { type: String, required: true },
    },

    schedule: {
      date: { type: String },
      timeWindow: { type: String },
    },

    coupon: {
      code: { type: String },
      discount: { type: Number, default: 0 },
    },

    totals: {
      subtotal: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true },
      currency_id: { type: String, default: "BRL" },
    },

    payment: {
      provider: { type: String, default: "mercadopago" },
      preferenceId: { type: String },
      initPoint: { type: String },
      paymentId: { type: String },
      status: { type: String, default: "pending_payment" }, // pending_payment | paid | failed
      paidAt: { type: Date },
    },

    orderStatus: {
      type: String,
      default: "received", // received | preparing | ready | done | canceled
    },
  },
  { timestamps: true }
);

export type OrderDoc = {
  items: OrderItem[];
  customer: OrderCustomer;
  fulfillment: OrderFulfillment;
  schedule?: OrderSchedule;
  coupon?: { code?: string; discount?: number };
  totals: { subtotal: number; discount: number; total: number; currency_id: string };
  payment: {
    provider: string;
    preferenceId?: string;
    initPoint?: string;
    paymentId?: string;
    status: string;
    paidAt?: Date;
  };
  orderStatus: string;
};

export const Order =
  models.Order || model("Order", OrderSchema);
