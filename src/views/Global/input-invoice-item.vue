<template>
    <section class="product__lists">
        <div class="banner">
            <div class="banner__div">
                <span>{{ address }}</span>
                <span>{{ total_sum }}</span>
            </div>
            <button @click="addProducts" class="addProduct">add product</button>
        </div>
        <addProductInvoice ref="open__productAdd">
        </addProductInvoice>
        <section class="product__lists-table">
            <appTable :body="product__data" :headers="headers">
                <template #body_title="{ item }">
                    <span>{{ item.product.title }}</span>
                </template>
                <template #body_code="{ item }">
                    <span>{{ item.product.code }}</span>
                </template>
                <template #body_action="{ item }">
                    <span class="mx-1"><i class="fa-solid fa-pen-to-square"></i></span>
                    <span class="mx-1"><i class="fa-solid fa-trash-can"></i></span>
                </template>
            </appTable>
            <div>
                <div v-if="statusData === 'new'" class="btns">
                    <button @click="() => router.push('/arrived-warhen')">save</button>
                    <button @click="confirm">confirm</button>
                    <button @click="deleted">delete</button>
                </div>
                <div v-else class="text-start">
                    <button @click="() => router.push('/arrived-warhen')" class="btn btn-info text-white"><i
                            class="fa-solid fa-arrow-left mx-1"></i>back</button>
                </div>
                <div class="pagination">
                    <VPagination v-model="params.page" :pages="params.last_page" :range-size="2" active-color="#EAF5FF"
                        @update:model-value="getProduct" />
                </div>
            </div>
        </section>
    </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import appTable from '@/components/ui/app-table.vue';
import http from '@/plugins/axios';
import VPagination from '@hennge/vue3-pagination'
import addProductInvoice from '../../components/pages/addProductInvoice.vue'
import Notification from '@/plugins/Notification';
const product__data = ref([])
const router = useRouter()
const id = location.href.split('/')
const address = ref()
const total_sum = ref()
const statusData = ref('')
const open__productAdd = ref()
const headers = ref([
    { title: '№', value: 'index' },
    { title: 'Product', value: 'title' },
    { title: 'Code', value: 'code' },
    { title: 'Price', value: 'price' },
    { title: 'Quantity', value: 'quantity' },
    { title: 'Invoice', value: 'invoice' },
    { title: 'Action', value: 'action' },
])
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
async function getInviceValue() {
    try {
        await http.get(`/api/warehouse/input-invoice/${id[4]}`).then(res => {
            address.value = res.data.supplier.title
            total_sum.value = res.data.total_sum
            statusData.value = res.data.status
        })
    } catch (err) {
        console.log(err)
    }
}
async function getTableData() {
    try {
        await http.get(`/api/warehouse/input-invoice-item/`, {
            params: {
                invoice: id[4],
                per_page: params.value.per_page,
                page: params.value.page
            }
        }).then(res => {
            if (res.status === 200) {
                product__data.value = res.data.results
                product__data.value.forEach((item, index) => {
                    item.index = params.value.page * params.value.per_page - (params.value.per_page - 1) + index
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}

async function deleted() {
    try {
        await http.delete(`/api/warehouse/input-invoice/${id[4]}/`).then(res => {
            if (res.status === 204) {
                router.push('/arrived-warhen')
                Notification({ text: 'delete !!!' }, { type: 'danger' })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

async function confirm() {
    await http.post(`/api/warehouse/input-invoice/${id[4]}/confirm/`).then(res => {
        if (res.status === 200) {
            router.push('/arrived-warhen')
            Notification({ text: 'Confirm' }, { type: 'warning' })
        }
    })
}

const addProducts = () => {
    open__productAdd.value.openModalAddInvoice()
}

onMounted(() => {
    getInviceValue()
    getTableData()
})

</script>

<style lang="scss" scoped>
.product__lists-table {
    overflow-x: scroll;
    text-align: center;
}

.banner {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px;

    .banner__div {
        display: flex;
        gap: 20px;

        span {
            display: flex;
            padding: 5px 15px;
            border: 3px solid rgba(180, 223, 233, .4);
            color: #435ebe;
            border-radius: 5px;
            font-size: 18px;
            letter-spacing: 0.7px;
        }
    }

    .addProduct {
        background-color: #435ebe;
        color: #fff;
        height: 40px;
        padding: 0 15px;
        border-radius: 5px;
        border: none;
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

.btns {
    display: flex;
    justify-content: start;
    margin: 10px 30px;

    button {
        border: none;
        padding: 5px 10px;
        margin: 0px 5px;
        border-radius: 5px;
        color: #fff;
    }

    button:nth-child(1) {
        background-color: #57caeb;
    }

    button:nth-child(2) {
        background-color: #435ebe;
    }

    button:nth-child(3) {
        background-color: #ff7976;
    }
}
</style>