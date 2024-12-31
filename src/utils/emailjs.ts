import emailjs from "@emailjs/browser";
import { Cart } from "../types/cart";
import { formatOrderEmail } from "./formatOrder";

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID as string;
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID as string;
const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;
interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
}

export async function sendOrderEmail(customerInfo: CustomerInfo, cart: Cart) {
  const emailBody = formatOrderEmail(cart.items, cart.total);

  return emailjs.send(
    EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID,
    {
      to_emails: ["order@usproglove.com", "dkwholesale2020@gmail.com"],
      customer_name: customerInfo.name,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      customer_address: customerInfo.address,
      customer_notes: customerInfo.notes || "",
      order_details: emailBody,
      total_amount: cart.total.toFixed(2),
    },
    EMAIL_PUBLIC_KEY
  );
}
