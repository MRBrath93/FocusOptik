import { createRouter, createWebHistory } from 'vue-router';
import ProductAllGlassesOverview from '@/views/ProductAllGlassesOverview.vue';
import ProductDetails from '@/views/ProductDetails.vue';
import ProductMenOverview from '@/views/ProductMenOverview.vue';
import ProductWomenOverview from '@/views/ProductWomenOverview.vue';
import ProductChildOverview from '@/views/ProductChildOverview.vue';
import InspirationsSite from '@/views/InspirationsSite.vue';
import ProductFormOverview from '@/views/ProductFormOverview.vue';
import ProductFlexGroupOverview from '@/views/ProductFlexGroupOverview.vue';

const routes = [
  {
    path: '/index.html',
    name: 'ProductOverview',
    component: ProductAllGlassesOverview, // Oversigtsside
  },
  {
    path: '/herrebriller.html',
    name: 'ProductMenOverview',
    component: ProductMenOverview, // Oversigtsside
  },
  {
    path: '/damebriller.html',
    name: 'ProductWomenOverview',
    component: ProductWomenOverview, // Oversigtsside
  },
  {
    path: '/boernebriller.html',
    name: 'ProductChildOverview',
    component: ProductChildOverview, // Oversigtsside
  },
  {
    path: '/inspiration.html',
    name: 'MyInspirationsite',
    component: InspirationsSite,
  },
  {
    path: '/ProductFormOverview/:initialSelectedGlassForm',
    name: 'ProductFormOverview',
    component: ProductFormOverview,
    props: true,  // Dette gør, at ruteparametre bliver sendt som props til komponenten
  },
  {
    path: '/ProductFocusFlexOverview/:initialSelectedFocusFlexGroup',
    name: 'ProductFocusFlexOverview',
    component: ProductFlexGroupOverview,
    props: true,  // Dette gør, at ruteparametre bliver sendt som props til komponenten
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