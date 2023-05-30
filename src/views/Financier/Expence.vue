<template>
    <section class="product__lists">
        <section class="product__lists-table">
            <div class="praduct__lists-btns">
                <p></p>
                <button class="btnInvoise" @click="input__add">add input invoice</button>
            </div>
            <appModal v-model="editArrived">
                <Form>
                    <Field rules="required" :modelValue="form.description" v-slot="{ errors }" name="Username">
                        <input class="form-control my-3 py-4" name="description" type="text" placeholder="Description"
                            v-model="form.description" id="description">
                        <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                    </Field>
                    <button @click="invoiceEdits" type="submit" class="editInput">Edit input invoice</button>
                </Form>
            </appModal>
            <addInvoice ref="add__invoice"></addInvoice>
            <addProduct ref="add__prodact"></addProduct>
            <appTable :body="delivered__data" :headers="headers">
            </appTable>
            <div class="pagination">
                <VPagination v-model="params.page" :pages="params.last_page" :range-size="2" active-color="#EAF5FF"
                    @update:model-value="getProduct" />
            </div>
        </section>
    </section>
</template>
<script setup>
import { ref } from 'vue';
import { Form, Field } from 'vee-validate';
import appTable from '@/components/ui/app-table.vue';
import http from '@/plugins/axios';
import Notification from '@/plugins/Notification';
import VPagination from '@hennge/vue3-pagination'
import addProduct from '@/components/pages/add-product.vue';
import addInvoice from '@/components/pages/add-invoice.vue';
import appModal from '@/components/ui/app-modal.vue';
const delivered__data = ref([])
const add__prodact = ref()
const add__invoice = ref()
const dialog = ref(false)
const editArrived = ref(false)
const id = ref()
const id2 = ref()
const headers = ref([
    { title: '№', value: 'index' },
    { title: 'Invoice', value: 'invoice' },
    { title: 'Returned invoice', value: 'returned_invoice' },
    { title: 'Amount', value: 'amount' },
    { title: 'Description', value: 'description' },
])
const form = ref({
    description: '',
})
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
const getProduct = () => {
    http.get('/api/finance/expense/', {
        params: {
            page: params.value.page,
            per_page: params.value.per_page,
        }
    }).then((res) => {
        if (res.data.results) {
            delivered__data.value = res.data.results
            delivered__data.value.forEach((item, index) => {
                item.index = params.value.page * params.value.per_page - (params.value.per_page - 1) + index
            })
            params.value.last_page = Math.ceil(res.data.count / params.value.per_page);
        }
    }).catch((err) => {
        console.log(err)
    })
}
getProduct()

const input__add = () => {
    add__invoice.value.openAddInvoice()
}

const deleteInovice = (item) => {
    id.value = item.id
    dialog.value = !dialog.value
}

const editIncovice = (item) => {
    editArrived.value = !editArrived.value
    form.value = { ...item }
    id2.value = item.id
}

async function invoiceDelete() {
    try {
        await http.delete(`/api/warehouse/input-invoice/${id.value}/`).then(res => {
            if (res.status === 204) {
                Notification({ text: "Delete invoice  !!!" }, { type: "warning" })
                setTimeout(() => {
                    location.reload()
                }, 1200);
            }
        })
    } catch (err) {
        console.log(err)
        dialog.value = !dialog.value
        Notification({ text: "Cannot delele confirmed invoice !!!" }, { type: "danger" })
    }
}

async function invoiceEdits() {
    try {
        await http.put(`/api/warehouse/input-invoice/${id2.value}/`, {
            description: form.value.description
        }).then(res => {
            Notification({ text: "Edit  !!!" }, { type: "success" })
        })
    } catch (err) {
        console.log(err)
    }
}

</script>
<style lang="scss" scoped>
.product__lists-table {
    overflow-x: scroll;
    text-align: center;
}

.praduct__lists-btns {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px;

    .btnInvoise {
        width: 200px;
        display: flex;
        justify-content: center;
        padding: 4px 10px;
        justify-content: center;
        padding: 4px 10px;
        background-color: #435EBE;
        border: none;
        color: #fff;
        border-radius: 4px;
    }

}

.editInput {
    width: 100%;
    padding: 7px 10px;
    background-color: #435EBE;
    border: none;
    color: #fff;
    border-radius: 4px;
}

.deleted-invoice {
    cursor: pointer;
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