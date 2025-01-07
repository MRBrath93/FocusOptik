import { createRouter, createWebHashHistory } from 'vue-router';
import ProductAllGlassesOverview from '@/views/ProductAllGlassesOverview.vue';
import ProductDetails from '@/views/ProductDetails.vue';
import ProductMenOverview from '@/views/ProductMenOverview.vue';
import ProductWomenOverview from '@/views/ProductWomenOverview.vue';
import ProductChildOverview from '@/views/ProductChildOverview.vue';
import InspirationsSite from '@/views/InspirationsSite.vue';
import ProductFormOverview from '@/views/ProductFormOverview.vue';
import ProductFlexGroupOverview from '@/views/ProductFlexGroupOverview.vue';
import ProductTypeOverview from '@/views/ProductTypeOverview.vue';
import Forside from '@/views/Forside.vue';

const routes = [
  {
    path: '/index.html',
    name: 'ProductOverview',
    component: ProductAllGlassesOverview,
  },
  {
    path: '/forside.html',
    name: 'Forside',
    component: Forside
  },
  {
    path: '/herrebriller.html',
    name: 'ProductMenOverview',
    component: ProductMenOverview,
  },
  {
    path: '/damebriller.html',
    name: 'ProductWomenOverview',
    component: ProductWomenOverview,
  },
  {
    path: '/boernebriller.html',
    name: 'ProductChildOverview',
    component: ProductChildOverview,
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
    // Dette gør, at ruteparametre bliver sendt som props til komponenten
    props: true,
  },
  {
    path: '/ProductFocusFlexOverview/:initialSelectedFocusFlexGroup',
    name: 'ProductFocusFlexOverview',
    component: ProductFlexGroupOverview,
    props: true,
  },
  {
    path: '/ProductTypeOverview/:initialSelectedGlassType',
    name: 'ProductTypeOverview',
    component: ProductTypeOverview,
    props: true,
  },
  {
    // Dynamisk rute for produktside
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;