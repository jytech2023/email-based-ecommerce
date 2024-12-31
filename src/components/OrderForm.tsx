import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useCart } from "../context/CartContext";
import { formatOrderEmail } from "../utils/formatOrder";

interface OrderFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function OrderForm({ onSuccess, onError }: OrderFormProps) {
  const { cart, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.items.length === 0) {
      onError("Cart is empty");
      return;
    }

    const emailBody = formatOrderEmail(cart.items, cart.total);

    try {
      await emailjs.send(
        "service_5f6frhe", // Replace with your EmailJS service ID
        "template_i7cv73k", // Replace with your EmailJS template ID
        {
          to_emails: ["order@usproglove.com", "dkwholesale2020@gmail.com"],
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          customer_address: customerInfo.address,
          customer_notes: customerInfo.notes,
          order_details: emailBody,
          total_amount: cart.total.toFixed(2),
        },
        "gxGEn9gL1mq9kUhpe" // Replace with your EmailJS public key
      );

      clearCart();
      onSuccess();
    } catch (error) {
      console.error(error);
      onError("Failed to submit order. Please try again.");
    }
  };

  // Rest of the component remains the same...
}
