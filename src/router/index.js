import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'customers',
    component: () => import("@/views/customer/Customer.vue"),
  },
  {
    path: '/products',
    name: 'products',
    component: () => import("@/views/product/Product.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("@/views/order/List.vue"),
  },
  {
    path: "/orders/create",
    name: "orders-create",
    component: () => import("@/views/order/Create.vue"),
  },
  {
    path: "/orders/edit/:id",
    name: "orders-edit",
    component: () => import("@/views/order/Edit.vue"),
  },
  {
    path: "/orders/show/:id",
    name: "orders-show",
    component: () => import("@/views/order/Show.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
