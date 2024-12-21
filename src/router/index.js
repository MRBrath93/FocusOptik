import { createRouter, createWebHistory } from 'vue-router';
import ProductOverview from '@/views/ProductOverview.vue';
import ProductDetails from '@/views/ProductDetails.vue';

const routes = [
  {
    path: '/index.html',
    name: 'ProductOverview',
    component: ProductOverview, // Oversigtsside
  },
  {
    path: '/product/:id', // Dynamisk rute for produktside
    name: 'ProductDetails',
    component: ProductDetails,
    props: true, // Tillader passing af route-parametre som props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;