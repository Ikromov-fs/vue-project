<template>
    <section class="product__lists">
        <section class="product__lists-table">
            <div class="praduct__lists-btns">
                <p></p>
                <button class="btnInvoise" @click="input__add">add input invoice</button>
            </div>
            <appModal v-model="dialog">
                <div class="text-center">
                    <h2>Are you sure you want to deletes ?</h2>
                    <div class="mx-auto">
                        <button class="btn btn-info mx-4 my-2 px-5" @click="dialog = false">cancel</button>
                        <button class="btn btn-danger mx-4 my-2 px-5" @click="invoiceDelete">delete</button>
                    </div>
                </div>
            </appModal>
            <appModal v-model="editArrived">
                <Form>
                    <Field rules="required" :modelValue="form.title" v-slot="{ errors }" name="Username">
                        <input class="form-control my-3 py-3" name="description" type="text" v-model="form.title"
                            id="description">
                        <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                    </Field>
                    <Field rules="required" :modelValue="form.address" v-slot="{ errors }" name="Username">
                        <input class="form-control my-3 py-3" name="description" type="text" v-model="form.address"
                            id="description">
                        <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                    </Field>
                    <Field rules="required" :modelValue="form.phone_number" v-slot="{ errors }" name="Username">
                        <input class="form-control my-3 py-3" name="description" type="text" v-model="form.phone_number"
                            id="description">
                        <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                    </Field>
                    <button @click="invoiceEdits" type="submit" class="editInput">Edit input invoice</button>
                </Form>
            </appModal>
            <addInvoice ref="add__invoice"></addInvoice>
            <addProduct ref="add__prodact"></addProduct>
            <appTable :body="delivered__data" :headers="headers">
                <template #body_action="{ item }">
                    <span @click="editIncovice(item)"><i class="mx-2 deleted-invoice  fa-solid fa-pen-to-square"></i></span>
                    <span @click="deleteInovice(item)"><i class="mx-2 deleted-invoice fa-solid fa-trash-can"></i></span>
                </template>
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
    { title: 'Name', value: 'title' },
    { title: 'Address', value: 'address' },
    { title: 'Phone', value: 'phone_number' },
    { title: 'Action', value: 'action' },
])
const form = ref({
    title: '',
    address: '',
    phone_number: '',
})
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
const getProduct = () => {
    http.get('/api/sales/client/', {
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
        await http.delete(`/api/sales/client/${id.value}/`).then(res => {
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

async function invoiceEdits(e) {
    e.preventDefault();
    try {
        await http.put(`/api/sales/client/${id2.value}/`, {
            title: form.value.title,
            address: form.value.address,
            phone_number: form.value.phone_number,
        }).then(res => {
            Notification({ text: "Edit  !!!" }, { type: "success" })
            setTimeout(() => {
                location.reload()
            }, 2000);
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