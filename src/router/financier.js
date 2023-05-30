export default {
    path: '/financier',
    name: 'financier',
    component: () => {
        return import("@/views/Financier/Financier.vue")
    },
    children: [
        {
            path: '/profile-financier',
            name: 'profile-financier',
            component: () => {
                return import('@/views/profile/profile.vue')
            }
        },
        {
            path: '/expence',
            name: 'expence',
            component: () => {
                return import('@/views/Financier/Expence.vue')
            }
        },
        {
            path: '/income',
            name: 'income',
            component: () => {
                return import('@/views/Financier/Income.vue')
            }
        },
    ]
}