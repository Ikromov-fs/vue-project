<template >
    <div>
        <appModal v-model="dialog">
            <div class="text-center">
                <h1>Add product</h1>
                <Form class="col-md-6 mx-auto text-start">
                    <Field rules="required" name="Username">
                        <label class="user-img my-2">
                            <span>change image</span>
                            <img :src="forms.image" alt="user-img">
                            <input @change="imgs" class="input-img" type="file">
                        </label>
                    </Field>
                    <div>
                        <label>Product name</label>
                        <Field name="product name" rules="required">
                            <input v-model="forms.title" type="text" class="form-control">
                        </Field>
                    </div>
                    <label>Code</label>
                    <Field name="code" rules="required">
                        <input v-model="forms.code" type="text" class="form-control">
                    </Field>
                    <label>arrival price</label>
                    <Field name="arrival price" rules="required">
                        <input v-model="forms.current_arrival_price" type="text" class="form-control">
                    </Field>
                    <label>Selling price</label>
                    <Field name="selling price" rules="required">
                        <input v-model="forms.current_selling_price" type="text" class="form-control">
                    </Field>
                    <Field name="group" rules="required">
                        <label>Group</label>
                        <select v-model="forms.group" class="form-control">
                            <option value="" hidden disabled>Select product</option>
                            <option class="form-control" v-for="item in $store?.state?.groups" :value="item.id"
                                :key="item.id">
                                {{ item.title }}
                            </option>
                        </select>
                    </Field>
                    <Field name="Brand" rules="required">
                        <label>Brand</label>
                        <select v-model="forms.brand" class="form-control">
                            <option value="" hidden disabled>Select product</option>
                            <option class="form-control" v-for="item in $store?.state?.brands" :value="item.id"
                                :key="item.id">
                                {{ item.title }}
                            </option>
                        </select>
                    </Field>
                    <label>Description</label>
                    <Field name="description" rules="required">
                        <input v-model="forms.description" type="text" class="form-control">
                    </Field>
                    <button @click="addProdacted" type="submit" class="btn btn-info w-100 mt-4 text-white">add product</button>
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
const image = ref('')
const dialog = ref(false)
const imgs = (e) => {
    image.value = e.target.files[0]
}
const forms = ref({
    title: "",
    code: "",
    current_arrival_price: "",
    current_selling_price: "",
    group: 0,
    brand: 0,
    description: "",
    image: ""
})

async function addProdacted() {
    try {
        const data = new FormData()
        data.append('title', forms.value.title)
        data.append('code', forms.value.code)
        data.append('current_arrival_price', forms.value.current_arrival_price,)
        data.append('current_selling_price', forms.value.current_selling_price)
        data.append('group', forms.value.group)
        data.append('brand', forms.value.brand,)
        data.append('description', forms.value.description)
        data.append('image', image.value)
        await http.post('/api/warehouse/product/', data).then(res => {
            if (res.status === 201) {
                Notification({ text: 'add product' }, { type: 'success' })
                setTimeout(() => {
                    location.reload()
                }, 1200);
            }
        })
    } catch (err) {
        console.log(err)
    }
}


const openAddProdact = (item) => {
    dialog.value = !dialog.value
    forms.value = { ...item }
}

onMounted(() => {
    store.dispatch('getGrops')
    store.dispatch('getBrands')
})

defineExpose({ openAddProdact })
</script>
<style lang="scss" scoped>
.error {
    color: red;
}

.input-img {
    display: none;
}

.user-img {
    width: 80px;
    height: 80px;
    background-color: rgba(77, 83, 83, 0.5);
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;

    span {
        display: flex;
        text-align: center;
        margin-top: 10px;
    }

    img {
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
        opacity: 0;
    }
}
</style>