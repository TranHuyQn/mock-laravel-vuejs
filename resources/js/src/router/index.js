import {createRouter, createWebHistory} from 'vue-router';
import ListProject from "../screens/main/ListProject";
import ListApi from "../screens/main/ListApi";
import ApiDetail from "../screens/main/ApiDetail";

const routes = [
    {
        path: '/',
        component: ListProject,
        name: 'list-project'
    },
    {
        path: '/:projectSlug',
        component: ListApi,
        name: 'list-api'
    },
    {
        path: '/mock/:mockId',
        component: ApiDetail,
        name: 'api-detail'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
