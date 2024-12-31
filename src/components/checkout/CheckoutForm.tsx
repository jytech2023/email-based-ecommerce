import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { CustomerInfoForm } from "./CustomerInfoForm";
import { OrderSummary } from "./OrderSummary";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { sendOrderEmail } from "../../utils/emailjs";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
}

export function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await sendOrderEmail(customerInfo, cart);
      clearCart();
      // Show success message or redirect
    } catch (err) {
      console.error(err);
      setError("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <CustomerInfoForm value={customerInfo} onChange={setCustomerInfo} />
      <PaymentMethodSelector />
      <OrderSummary cart={cart} />

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Place Order"}
      </button>
    </form>
  );
}
