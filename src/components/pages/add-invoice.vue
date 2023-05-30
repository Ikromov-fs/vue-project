<template >
    <div>
        <appModal v-model="dialog">
            <div class="text-center">
                <h2>Add input invoice</h2>
                <Form class="col-md-6 mx-auto text-start">
                    <Field name="arrival price" rules="required">
                        <label>Select supplier</label>
                        <select v-model="forms.supplier" class="form-control">
                            <option value="" hidden disabled>Select supplier</option>
                            <option class="form-control" v-for="item in $store?.state?.suppliers" :value="item.id"
                                :key="item.id">{{
                                    item.title }}
                            </option>
                        </select>
                    </Field>
                    <label class="mt-2">Description</label>
                    <Field name="description" rules="required">
                        <input v-model="forms.description" type="text" class="form-control">
                    </Field>
                    <button @click="addInvoice" type="submit" class="addInput">add input invoice</button>
                </Form>
            </div>
        </appModal>
    </div>
</template>
<script setup>
import { Form, Field } from 'vee-validate';
import appModal from '../ui/app-modal.vue';
import Notification from '@/plugins/Notification';
import { ref, onMounted } from 'vue';
import http from '@/plugins/axios';
import store from '@/store';
const dialog = ref(false)
const forms = ref({
    supplier: 0,
    description: "",
})

onMounted(() => {
    store.dispatch('getSuppliers')
});

async function addInvoice() {
    try {
        await http.post('/api/warehouse/input-invoice/', {
            supplier: forms.value.supplier,
            description: forms.value.description
        }).then(res => {
            if (res.status === 201) {
                Notification({ text: "Add invoice !!!" }, { type: "success" })
                setTimeout(() => {
                    location.reload()
                }, 1000);
            }
        })
    } catch (err) {
        console.log(err)
    }
}

const openAddInvoice = () => {
    dialog.value = !dialog.value
}

defineExpose({ openAddInvoice })
</script>
<style lang="scss" scoped>
.addInput {
    width: 100%;
    padding: 5px 0;
    border: none;
    color: #fff;
    margin: 15px 0;
    border-radius: 5px;
    background-color: #435EBE;
}
</style>