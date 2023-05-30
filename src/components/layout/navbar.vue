<template>
    <section class="warehouse__navbar">
        <div class="warehouse__navbar-prof">
            <img :src="$store?.state?.me?.image" alt="user" @click="isShow">
            <article :class="isHide ? 'article1' : 'article2'"></article>
            <aside :class="isHide ? 'warehouse__user-show' : 'warehouse__user-hide'">
                <ul>
                    <li @click="Go__Profile">Profile</li>
                    <li @click="Log_Out">Log Out</li>
                </ul>
            </aside>
        </div>
    </section>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
import { ref } from 'vue';
const isHide = ref(false)
const isShow = () => {
    isHide.value = !isHide.value
}
const Log_Out = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')
    location.reload()
}
const Go__Profile = () => {
    const role = sessionStorage.getItem('role')
    if (role === 'director') {
        router.push({ name: 'profile-director' })
    } else if (role === 'financier') {
        router.push({ name: 'profile-financier' })
    } else if (role === 'warehouseman') {
        router.push({ name: 'profile-warhen' })
    } else if (role === 'salesman') {
        router.push({ name: 'profile-salesman' })
    }
    isHide.value = !isHide.value
}
</script>
<style lang="scss" scoped>
$bg-color: #fff;
$blue-color: #435EBE;

.warehouse__navbar {
    position: sticky;
    top: 0;
    width: 100%;
    padding: 8px 20px;
    background-color: $bg-color;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.warehouse__navbar-prof {
    width: 55px;
    height: 55px;
    background-color: $bg-color;
    border-radius: 50%;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        position: relative;
    }

    .article2 {
        display: none;
    }

    .article1 {
        display: block;
        width: 17px;
        height: 17px;
        background-color: #f2f7ff;
        transform: rotate(315deg);
        border-radius: 2px;
        position: absolute;
        top: 90%;
        right: 30px;
    }

    .warehouse__user-hide {
        display: none;
    }

    .warehouse__user-show {
        display: block;
        position: absolute;
        top: 100%;
        right: 20px;
        width: 100px;
        height: 100px;
        border-radius: 5px;

        box-shadow: 2px 2px 2px 2px rgb(224, 223, 223);

        ul {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background-color: $bg-color;
            padding: 0;

            li {
                width: 100%;
                text-align: center;
                padding: 5px;
                font-size: 17px;
                transition: all 0.4s linear;
                letter-spacing: 0.4px;

                &:hover {
                    background-color: $blue-color;
                    color: #fff;
                }
            }
        }
    }
}
</style>