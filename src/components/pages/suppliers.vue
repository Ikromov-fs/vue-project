<template >
    <div>
        <appModal v-model="dialog">
            <div class="text-center">
                <h1 v-if="!id">Add Supplier</h1>
                <h1 v-else>Edit Supplier</h1>
                <Form class="col-md-6 mx-auto text-start">
                    <div>
                        <label>Supplier Name</label>
                        <Field name="name" rules="required" v-slot="{ errors }">
                            <input v-model="forms.title" type="text" class="form-control">
                            <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                        </Field>
                    </div>
                    <label>Address</label>
                    <Field name="address" rules="required" v-slot="{ errors }">
                        <input v-model="forms.address" type="text" class="form-control">
                        <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                    </Field>
                    <button v-if="!id" @click="addSupplier" type="submit" class="btn btn-info w-100 mt-4">Add
                        Supplier</button>
                    <button v-else type="submit" @click="editSupplier" class="btn btn-info w-100 mt-4">Edit
                        Supplier</button>
                </Form>
            </div>
        </appModal>
        <appModal v-model="dialog2">
            <div class="text-center">
                <h2>Are you sure you want to deletes ?</h2>
                <div class="mx-auto">
                    <button class="btn btn-info mx-4 my-2 px-5" @click="dialog2 = false">cancel</button>
                    <button class="btn btn-danger mx-4 my-2 px-5" @click="deletedUser">delete</button>
                </div>
            </div>
        </appModal>
    </div>
</template>
<script setup>
import { Form, Field } from 'vee-validate';
import appModal from '../ui/app-modal.vue';
import Notification from '@/plugins/Notification';
import { ref, watch } from 'vue';
import http from '@/plugins/axios';
const id = ref(null)
const dialog = ref(false)
const dialog2 = ref(false)
const forms = ref({
    title: '',
    address: '',
})
const cretedSuppliers = (item) => {
    if (item && item.id) {
        id.value = item.id
        forms.value = { ...item }
    }
    dialog.value = !dialog.value
}
const deleSuppliers = (item) => {
    id.value = item.id
    dialog2.value = !dialog2.value
}

async function addSupplier() {
    try {
        if (forms.value) {
            await http.post('/api/warehouse/supplier/', {
                title: forms.value.title,
                address: forms.value.address,
            }).then(res => {
                if (res.status === 201) {
                    Notification({ text: "Add Suppliers !!!" }, { type: "success" })
                    setTimeout(() => {
                        location.reload()
                        
                    }, 1000);
                }
            })
        }
    } catch (err) {
        Notification({ text: "Error!!!" }, { type: "error" })
        console.log(err)
    }
}
async function editSupplier() {
    try {
        if (forms.value) {
            await http.put(`/api/warehouse/supplier/${id.value}/`, {
                title: forms.value.title,
                address: forms.value.address,
            }).then(res => {
                if (res.status === 200) {
                    Notification({ text: "Edit Supplier !!!" }, { type: "success" })
                    setTimeout(() => {
                        location.reload()
                    }, 1000);
                }
            })
        }
    } catch (err) {
        Notification({ text: "Error!!!" }, { type: "error" })
        console.log(err)
    }
}

async function deletedUser() {
    try {
        await http.delete(`/api/warehouse/supplier/${id.value}/`).then(res => {
            if (res.status === 204) {
                Notification({ text: "Delete User !!!" }, { type: "success" })
                setTimeout(() => {
                    location.reload()
                }, 1000);
            }
        })
    }
    catch (err) {
        Notification({ text: "Error !!!" }, { type: "error" })
        console.log(err)
    }
}

watch(dialog, (item) => {
    if (!item) {
        id.value = null;
        forms.value.title = '';
        forms.value.address = '';
    }
})

defineExpose({ cretedSuppliers, deleSuppliers })
</script>
<style lang="scss" scoped>
.error {
    color: red;
}

.login__input-error {
    color: #c62828;
}

.input-img {
    display: none;
}

.user-img {
    width: 80px;

    img {
        cursor: pointer;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
}
</style>