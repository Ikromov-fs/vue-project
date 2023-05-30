export default {
    path: '/director',
    name: 'director',
    component: () => {
        return import("@/views/Director/Director.vue")
    },
    children: [
        {
            path: '/profile-director',
            name: 'profile-director',
            component: ()=>{
                return import('@/views/profile/profile.vue')
            }
        },
        {
            path: '/prodact_director',
            name: 'prodact_director',
            component: () => {
                return import('@/views/Global/prodact.vue')
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => {
                return import('@/views/Director/dashboard.vue')
            }
        },
        {
            path: '/dashboard-demo',
            name: 'dashboard-demo',
            component: () => {
                return import('@/views/Director/dashboard-demo.vue')
            }
        },
        {
            path: '/expence-director',
            name: 'expence-director',
            component: () => {
                return import('@/views/Financier/Expence.vue')
            }
        },
        {
            path: '/income-director',
            name: 'income-director',
            component: () => {
                return import('@/views/Financier/Income.vue')
            }
        },
        {
            path: '/dashboard-demo',
            name: 'dashboard-demo',
            component: () => {
                return import('@/views/Director/dashboard-demo.vue')
            }
        },
        {
            path: '/arrived-director',
            name: 'arrived-director',
            component: () => {
                return import('@/views/Global/arrived.vue')
            }
        },
        {
            path: '/clients-director',
            name: 'clients-director',
            component: () => {
                return import('@/views/Salesman/clients.vue')
            }
        },
        {
            path: '/returned-director',
            name: 'returned-director',
            component: () => {
                return import('@/views/Global/returned.vue')
            }
        },
        {
            path: '/delivered-director',
            name: 'delivered-director',
            component: () => {
                return import('@/views/Global/delivered.vue')
            }
        },
        {
            path: '/suppliers-director',
            name: 'suppliers-director',
            component: () => {
                return import('@/views/Global/suppliers.vue')
            }
        },
    ]
}