export default {
    path: '/warhen',
    name: 'warhen',
    component: () => {
        return import("@/views/Warhen/Warhen.vue")
    },
    children: [
        {
            path: '/profile-warhen',
            name: 'profile-warhen',
            component: () => {
                return import('@/views/profile/profile.vue')
            }
        },
        {
            path: '/prodact',
            name: 'prodact',
            component: () => {
                return import('@/views/Global/prodact.vue')
            }
        },
        {
            path: '/single/:id',
            name: 'single',
            meta: {
                child: 'single__product'
            },
            component: () => {
                return import('@/views/Global/singleProdact.vue')
            }
        },
        {
            path: '/suppliers',
            name: 'suppliers',
            component: () => {
                return import('@/views/Global/suppliers.vue')
            }
        },
        {
            path: '/arrived-warhen',
            name: 'arrived-warhen',
            component: () => {
                return import('@/views/Global/arrived.vue')
            }
        },
        {
            path: '/delivered-warhen',
            name: 'delivered-warhen',
            component: () => {
                return import('@/views/Global/delivered.vue')
            }
        },
        {
            path: '/returned-warhen',
            name: 'returned-warhen',
            component: () => {
                return import('@/views/Global/returned.vue')
            }
        },
        {
            path: '/arrived-warhen',
            name: 'arrived-warhen',
            component: () => {
                return import('@/views/Global/arrived.vue')
            }
        },
        {
            path: '/groups-brends',
            name: 'groups-brends',
            meta:{
                child: 'single__product'
            },
            component: () => {
                return import('@/views/Global/groups-brends.vue')
            },
        },
        {
            path: '/input-invoice/:id',
            name: 'input-invoice',
            meta:{
                child: 'single__arrived'
            },
            component: () => {
                return import('@/views/Global/input-invoice-item.vue')
            },
        },
    ]
}