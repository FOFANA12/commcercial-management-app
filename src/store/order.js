import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [
      {
        date: "2024-07-25",
        customer: "John Doe",
        delivery_address: "123 Main St, New York, NY",
        track_number: "TN001",
        status: "Shipped",
      },
      {
        date: "2024-07-26",
        customer: "Jane Smith",
        delivery_address: "456 Oak St, Los Angeles, CA",
        track_number: "TN002",
        status: "Delivered",
      },
      {
        date: "2024-07-27",
        customer: "Alice Martin",
        delivery_address: "789 Pine St, Chicago, IL",
        track_number: "TN003",
        status: "Processing",
      },
    ],
  }),

  actions: {
    addOrder(order) {
      this.orders.push({
        ...order,
        date: new Date().toISOString().slice(0, 10), // Set current date
      });
    },
    updateOrder(updatedOrder) {
      const index = this.orders.findIndex(
        (order) => order.track_number === updatedOrder.track_number
      );
      if (index !== -1) {
        this.orders[index] = updatedOrder;
      }
    },
  },
});
