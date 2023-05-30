<template >
    <div>
        <appModal v-model="dialog">
            <div class="text-center">
                <h2>Add input invoice</h2>
                <Form class="col-md-6 mx-auto text-start">
                    <Field name="arrival price" rules="required">
                        <label>Select product</label>
                        <select v-model="forms.product" class="form-control">
                            <option value="" hidden disabled>Select product</option>
                            <option class="form-control" v-for="item in data" :value="item.id" :key="item.id">
                                {{ item.title }}
                            </option>
                        </select>
                    </Field>
                    <label class="mt-2">Quantity</label>
                    <Field name="quantity" v-model="forms.quantity" rules="required">
                        <input v-model="forms.quantity" type="text" placeholder="quantity" class="form-control">
                    </Field>
                    <label class="mt-2">Price</label>
                    <Field v-model="forms.price" name="description" rules="required">
                        <input v-model="forms.price" type="text" placeholder="quantity" class="form-control">
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
const datas = ref()
const id = location.href.split('/')
const dialog = ref(false);
const data = ref()
const forms = ref({
    product: 0,
    invoice: 0,
    quantity: '',
    price: ''
});

async function getProdact() {
    try {
        await http.get(`api/warehouse/product/`).then(res => {
            if (res.status === 200) {
                data.value = res.data.results
            }
        })
    } catch (err) {
        console.log(err)
    }
}

async function addInvoice() {
    try {
        await http.post(`/api/warehouse/input-invoice-item/`, {
            product: forms.value.product,
            invoice: id[4],
            quantity: forms.value.quantity,
            price: forms.value.price,
        }).then(res => {
            if (res.status === 201) {
                datas.value = res.data
                Notification({ text: 'add invoice !' }, { type: 'warning' })
                setTimeout(() => {
                    location.reload()
                }, 1200);
            }
        })
    } catch (err) {
        console.log(err)
    }
}

onMounted(() => {
    getProdact()
})
const openModalAddInvoice = () => {
    dialog.value = !dialog.value
}

defineExpose({ openModalAddInvoice })
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