import React from 'react';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
}

interface CustomerInfoFormProps {
  value: CustomerInfo;
  onChange: (info: CustomerInfo) => void;
}

export function CustomerInfoForm({ value, onChange }: CustomerInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value: fieldValue } = e.target;
    onChange({ ...value, [name]: fieldValue });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Customer Information</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={value.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={value.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={value.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Shipping Address
          </label>
          <textarea
            id="address"
            name="address"
            value={value.address}
            onChange={handleChange}
            rows={3}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Order Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={value.notes}
            onChange={handleChange}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}