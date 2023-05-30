<template>
    <section class="product__lists">
        <section class="product__lists-table">
            <appTable :body="$store?.state?.suppliers" :headers="headers">
                <template #body_action="{ item }">
                    <span @click="openModalCreate(item)" class="mx-2 action_supplies"><i
                            class="fa-regular fa-pen-to-square"></i></span>
                    <span @click="openModalDeleted(item)" class="mx-2 action_supplies"><i
                            class="fa-regular fa-trash-can"></i></span>
                </template>
            </appTable>
            <suppliers ref="create__dataModal"></suppliers>
            <suppliers ref="deleted__supplier"></suppliers>
            <div class="btn__create">
                <button @click="openModalCreate">Create</button>
            </div>
        </section>
    </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import suppliers from '@/components/pages/suppliers.vue';
import appTable from '@/components/ui/app-table.vue';
import store from '@/store';
const create__dataModal = ref()
const deleted__supplier = ref()
const headers = ref([
    { title: '№', value: 'id' },
    { title: 'Name', value: 'title' },
    { title: 'Address', value: 'address' },
    { title: 'Credit', value: 'credit' },
    { title: 'Action', value: 'action' },
])
const openModalCreate = (item) => {
    create__dataModal.value.cretedSuppliers(item)
}
const openModalDeleted = (item) => {
    deleted__supplier.value.deleSuppliers(item)
}
const param = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
onMounted(() => {
    store.dispatch('getSuppliers', param?.value)
})

</script>
<style lang="scss" scoped>
.product__lists-table {
    overflow-x: scroll;
    text-align: center;

    .btn__create {
        text-align: start;
        margin-left: 10px;

        button {
            padding: 5px 20px;
            border: none;
            background-color: #57caeb;
            ;
            border-radius: 5px;
            color: #fff;
        }
    }
}

.action_supplies {
    cursor: pointer;
}

.praduct__lists-btns {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px;
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