<template >
    <section class="warehouse">
        <div class="warehouse__sidebar">
            <Sidebar :isShow="isShow" :isShowItem="isShowItem" :sidebarGlobal="sidebarGlobal" />
        </div>
        <div class="warehouse__main1">
            <div class="warehouse-navbar">
                <Navbar />
            </div>
            <router-view></router-view>
        </div>
    </section>
</template>
<script setup>
import Sidebar from '../../components/layout/saidbar.vue'
import Navbar from '../../components/layout/navbar.vue'
import { onMounted } from 'vue';
import store from '@/store'
import { ref } from 'vue';
const isShow = ref(false)
const isShowItem = () => {
    isShow.value = !isShow.value
}
const sidebarGlobal = ref([
    { path: '/dashboard', name: 'Dashboard', child: '', icon: 'fa-solid fa-chart-column' },
    { path: '/dashboard-demo', name: 'Dashboard demo', child: '', icon: 'fa-solid fa-chart-column' },
    { path: '/prodact_director', name: 'Prodact', child: 'single__product', icon: 'fa-solid fa-list' },
    { path: '/arrived-director', name: 'Arrived', child: '', icon: 'fa-solid fa-building-circle-check' },
    { path: '/delivered-director', name: 'Delivered', child: '', icon: 'fa-solid fa-building-circle-arrow-right' },
    { path: '/returned-director', name: 'Returned', child: '', icon: 'fa-solid fa-coins' },
    { path: '/suppliers-director', name: 'Suppliers', child: '', icon: 'fa-solid fa-truck-field' },
    { path: '/clients-director', name: 'Clients', child: '', icon: 'fa-solid fa-coins' },
    { path: '/income-director', name: 'Income', child: '', icon: 'fa-solid fa-coins' },
    { path: '/expence-director', name: 'Expence', child: '', icon: 'fa-solid fa-coins' },
])

onMounted(() => {
    store.dispatch('getMe')
})
</script>
<style lang="scss" scoped>
$bg-color: #F2F7FF;

.warehouse {
    width: 100%;
    height: 100vh;
    display: flex;

    %warehouse__global {
        height: 100%;
        background-color: $bg-color;
        transition: all 0.4s linear;
    }

    .warehouse__main1 {
        width: calc(100% - 300px);
        @extend %warehouse__global
    }

    .warehouse__main {
        width: calc(100% - 53px);
        @extend %warehouse__global
    }

    .warehouse__sidebar1 {
        width: 62px;
        transition: all 0.4s linear;
    }

    .warehouse__sidebar {
        width: 300px;
    }

    .warehouse-navbar {
        width: 100%;
        position: sticky;
        top: 0;
    }

    @media screen and (max-width: 1024px) {
        %warehouse__global2 {
            height: 100%;
            background-color: $bg-color;
            transition: all 0.4s linear;
        }

        .warehouse__sidebar {
            width: 62px !important;
        }

        .warehouse__main1 {
            width: calc(100% - 53px) !important;
            @extend %warehouse__global2
        }
    }
}
</style>