<template>
    <section>
        <appModal v-model="dialog">
            <div class="text-center">
                <h2>Are you sure you want to deletes ?</h2>
                <div class="mx-auto">
                    <button class="btn btn-info mx-4 my-2 px-5" @click="dialog = false">cancel</button>
                    <button class="btn btn-danger mx-4 my-2 px-5" @click="end__Deleted">delete</button>
                </div>
            </div>
        </appModal>
        <addBrend_group ref="open_brand_group"></addBrend_group>
        <button class="back" @click="back"><i class="fa-solid fa-arrow-left"></i>Back</button>
        <section class="product__lists-table">
            <div>
                <h2 @click="groupAdd">Group</h2>
                <appTable :body="$store?.state?.groups" :headers="headers">
                    <template #body_delete="{ item }">
                        <button @click="deleted(item, 1)" class="delete">delete</button>
                    </template>
                </appTable>
                <button class="createGroup" @click="openModal(itemM, 1)">Create</button>
            </div>
            <div>
                <h2>Brend</h2>
                <appTable :body="$store?.state?.brands" :headers="headers">
                    <template #body_delete="{ item }">
                        <button @click="deleted(item)" class="delete">delete</button>
                    </template>
                </appTable>
                <button class="createBrend" @click="openModal(itemM)">Create</button>
            </div>
        </section>
    </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Notification from '@/plugins/Notification';
import { useRouter } from 'vue-router';
import appTable from '@/components/ui/app-table.vue';
import http from '@/plugins/axios';
import appModal from '@/components/ui/app-modal.vue';
import addBrend_group from '@/components/pages/add-brend_group.vue';
import store from '@/store'
const itemM = ref()
const indexM = ref()
const open_brand_group = ref()
const router = useRouter()
const dialog = ref(false)
const headers = ref([
    { title: '№', value: 'index' },
    { title: 'Name', value: 'title' },
    { title: 'Delete', value: 'delete' },
])

const back = () => {
    router.push('/prodact')
}
const deleted = (item, index) => {
    itemM.value = item.id
    indexM.value = index
    dialog.value = !dialog.value
}
const param = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
onMounted(() => {
    store.dispatch('getGrops', param?.value)
    store.dispatch('getBrands', param?.value)
})
async function end__Deleted() {
    try {
        if (indexM.value) {
            return await http.delete(`/api/warehouse/group/${itemM.value}/`).then(res => {
                Notification({ text: "Deleted group !!!" }, { type: "success" })
                setTimeout(() => {
                    location.reload()
                }, 1000);
            })
        } else if (itemM.value) {
            return await http.delete(`/api/warehouse/brand/${itemM.value}/`).then(res => {
                Notification({ text: "Delete brand !!!" }, { type: "success" })
                setTimeout(() => {
                    location.reload()
                }, 1000)
            })
        }
    } catch (err) {
        console.log(err)
    }
}

const openModal = (item, index) => {
    open_brand_group.value.addBrandGroup(item, index)
}

</script>
<style lang="scss" scoped>
.back {
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    gap: 4px;
    margin: 10px 10px;
    align-items: center;
    background-color: #435ebe;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-weight: 500;

    i {
        transition: all 0.3s linear;
    }
}

.back:hover {
    i {
        transform: translateX(-8px);
        transition: all 0.3s linear;
    }
}

.product__lists-table {
    display: flex;
    justify-content: space-between;

    div {
        width: 45%;
        margin-top: 2%;
        text-align: center;
        position: relative;

        .createGroup,
        .createBrend {
            position: absolute;
            left: 10px;
            border: none;
            background-color: #57caeb;
            padding: 4px 10px;
            border-radius: 4px;
            color: #fff;
        }
    }

    .delete {
        padding: 4px 10px;
        border: none;
        border-radius: 4px;
        background-color: rgba(255, 0, 0, 0.5);
        color: #fff;
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