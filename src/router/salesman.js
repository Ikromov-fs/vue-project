export default {
    path: '/salesman',
    name: 'salesman',
    component: () => {
        return import("@/views/Salesman/Salesman.vue")
    },
    children: [
        {
            path: '/profile-salesman',
            name: 'profile-salesman',
            component: () => {
                return import('@/views/profile/profile.vue')
            }
        },
        {
            path: '/clients',
            name: 'clients',
            component: () => {
                return import('@/views/Salesman/clients.vue')
            }
        },
    ]
}