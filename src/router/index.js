import { createRouter, createWebHistory } from 'vue-router';
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
    path: '/class/MMD-CSD-S23/10414032/MMD1/FOCUS_OPTIK/index.html',
    name: 'ProductOverview',
    component: ProductAllGlassesOverview,
  },
  {
    path: '/class/MMD-CSD-S23/10414032/MMD1/FOCUS_OPTIK/forside.html',
    name: 'Forside',
    component: Forside
  },
  {
    path: '/class/MMD-CSD-S23/10414032/MMD1/FOCUS_OPTIK/herrebriller.html',
    name: 'ProductMenOverview',
    component: ProductMenOverview,
  },
  {
    path: '/class/MMD-CSD-S23/10414032/MMD1/FOCUS_OPTIK/damebriller.html',
    name: 'ProductWomenOverview',
    component: ProductWomenOverview,
  },
  {
    path: '/class/MMD-CSD-S23/10414032/MMD1/FOCUS_OPTIK/boernebriller.html',
    name: 'ProductChildOverview',
    component: ProductChildOverview,
  },
  {
    path: '/class/MMD-CSD-S23/10414032/MMD1/FOCUS_OPTIK/inspiration.html',
    name: 'MyInspirationsite',
    component: InspirationsSite,
  },
  {
    path: '/class/MMD-CSD-S23/10414032/MMD1/FOCUS_OPTIK/ProductFormOverview/:initialSelectedGlassForm',
    name: 'ProductFormOverview',
    component: ProductFormOverview,
    // Dette gør, at ruteparametre bliver sendt som props til komponenten
    props: true,
  },
  {
    path: '/class/MMD-CSD-S23/10414032/MMD1/FOCUS_OPTIK/ProductFocusFlexOverview/:initialSelectedFocusFlexGroup',
    name: 'ProductFocusFlexOverview',
    component: ProductFlexGroupOverview,
    props: true,
  },
  {
    path: '/class/MMD-CSD-S23/10414032/MMD1/FOCUS_OPTIK/ProductTypeOverview/:initialSelectedGlassType',
    name: 'ProductTypeOverview',
    component: ProductTypeOverview,
    props: true,
  },
  {
    // Dynamisk rute for produktside
    path: '/class/MMD-CSD-S23/10414032/MMD1/FOCUS_OPTIK/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;