import React from "react";
import PageTemplate from "../components/PageTemplate";

const sections = [
  "Delivery Time",
  "Shipping Charges",
  "Order Tracking",
  "Courier Partners",
  "International Shipping",
  "Packing",
  "Delayed Orders",
  "Lost Packages",
  "Delivery FAQs",
];

export default function ShippingDeliveryPolicy() {
  return (
    <PageTemplate
      title="Shipping & Delivery Policy"
      sections={sections}
      lastUpdated="2026-08-02"
    />
  );
}
