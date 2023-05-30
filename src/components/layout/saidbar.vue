<template>
    <section :class="props.isShow ? 'sidebar1' : 'sidebar'">
        <div class="sidebar__img" @click="props.isShowItem">
            <span v-if="props.isShow"><i class=" img-icon fa-solid fa-right-from-bracket"></i></span>
            <span v-else><i class="img-icon fa-solid fa-bars-staggered"></i></span>
        </div>
        <div class="sidebar__items">
            <router-link v-for="item in props.sidebarGlobal" :to="item.path" active-class="sidebar__item1"
                class="sidebar__item" :class="{ sidebar__item1: $route.meta.child === item.child }">
                <span><i :class="item.icon"></i></span>
                <span :class="props.isShow ? '.sidebar__item-title' : ''">{{ item.name }}</span>
            </router-link>
        </div>
    </section>
</template>
<script setup>
const props = defineProps({
    isShow: {
        type: Boolean
    },
    isShowItem: {
        type: Function
    },
    sidebarGlobal: {
        type: Array
    }
})
</script>
<style scoped lang="scss">
$blue-color: #435EBE;
$hover-color: #f0f1f5;
$bg-color: #fff;

.sidebar1 {
    width: 53px;
    height: 100vh;
    position: fixed;
    background-color: $bg-color;
    transition: all 0.3s linear;
    overflow: hidden;
}

.sidebar {
    width: 300px;
    height: 100vh;
    position: fixed;
    background-color: $bg-color;
    transition: all 0.4s linear;
    overflow: hidden;
}

.sidebar__img {
    margin: 15px;

    .img-icon {
        font-size: 30px;
        color: $blue-color;
        cursor: pointer;
    }
}

.sidebar__items {
    width: 100%;
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @mixin sidebar__item($color, $bg_color) {
        color: $color;
        background-color: $bg_color;
    }

    %sidebar__item {
        width: 90%;
        margin: 10px;
        padding: 12px 17px;
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 15px;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;

    }

    .sidebar__item {
        @extend %sidebar__item;
        @include sidebar__item($blue-color, transparent);

        &:hover {
            background-color: $hover-color;
        }
    }

    .sidebar__item1 {
        text-decoration: none;

        @extend %sidebar__item;
        @include sidebar__item(#fff, $blue-color);

        &:hover {
            background-color: $blue-color;
        }
    }
}
</style>