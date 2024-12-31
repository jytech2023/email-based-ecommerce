import React from 'react';

export function PaymentMethodSelector() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Payment Method</h3>
      
      <div className="space-y-2">
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="paymentMethod"
            value="bank"
            defaultChecked
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm">Bank Transfer</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm">Cash on Delivery</span>
        </label>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Bank transfer details will be provided after order confirmation.</p>
      </div>
    </div>
  );
}