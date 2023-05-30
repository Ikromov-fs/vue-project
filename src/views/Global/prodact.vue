<template>
    <section class="product__lists">
        <section class="product__lists-table">
            <div class="praduct__lists-btns">
                <button class="btn1" @click="go_groupBrend">Groups and Brands<i class="bi bi-forward-fill"></i></button>
                <button class="btn2" @click="product__add">add product</button>
            </div>
            <addProduct ref="add__prodact"></addProduct>
            <appTable :body="product__data" :headers="headers">
                <template #body_group="{ item }">
                    <span>{{ item.group.title }}</span>
                </template>
                <template #body_brand="{ item }">
                    <span>{{ item.brand.title }}</span>
                </template>
                <template #body_description="{ item }">
                    <span class="description">{{ item.description }}</span>
                </template>
                <template #body_title="{ item }">
                    <span class="description">{{ item.title }}</span>
                </template>
                <template #body_action="{ item }">
                    <router-link :to="{ name: 'single', params: { id: item.id } }">
                        <span><i class="bi bi-eye-fill"></i></span>
                    </router-link>
                </template>
            </appTable>
        </section>
        <div class="pagination">
            <VPagination v-model="params.page" :pages="params.last_page" :range-size="2" active-color="#EAF5FF"
                @update:model-value="getProduct" />
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import appTable from '@/components/ui/app-table.vue';
import http from '@/plugins/axios';
import VPagination from '@hennge/vue3-pagination'
import addProduct from '@/components/pages/add-product.vue';
const product__data = ref([])
const add__prodact = ref()
const router = useRouter()
const headers = ref([
    { title: '№', value: 'index' },
    { title: 'Name', value: 'title' },
    { title: 'Code', value: 'code' },
    { title: 'Brand', value: 'brand' },
    { title: 'Group', value: 'group' },
    { title: 'Arrival price', value: 'current_arrival_price' },
    { title: 'Selling price', value: 'current_selling_price' },
    { title: 'Description', value: 'description' },
    { title: 'Action', value: 'action' },
])
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
const getProduct = () => {
    http.get('/api/warehouse/product/', {
        params: {
            page: params.value.page,
            per_page: params.value.per_page,
        }
    }).then((res) => {
        if (res.data.results) {
            product__data.value = res.data.results
            product__data.value.forEach((item, index) => {
                item.index = params.value.page * params.value.per_page - (params.value.per_page - 1) + index
            })
            params.value.last_page = Math.ceil(res.data.count / params.value.per_page);
        }
    }).catch((err) => {
        console.log(err)
    })
}
getProduct()

const product__add = () => {
    add__prodact.value.openAddProdact()
}
const go_groupBrend = () => {
    router.push('/groups-brends')
}

</script>
<style lang="scss" scoped>
.product__lists-table {
    overflow-x: scroll;
}

.praduct__lists-btns {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px;

    .btn1,
    .btn2 {
        width: 200px;
        display: flex;
        justify-content: center;
        padding: 4px 10px;
        background-color: #435EBE;
        border: none;
        color: #fff;
        border-radius: 4px;
    }

    .btn1 i {
        font-size: 16px;
        transition: all 0.3s linear;

    }

    .btn1:hover i {
        transform: translateX(8px);
        transition: all 0.3s linear;
        cursor: pointer;

    }


}

.description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #000;
}

.pagination {
    display: flex;
    justify-content: flex-end;
    margin: 10px 30px;
}
</style>