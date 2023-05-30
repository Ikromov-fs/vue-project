<template >
    <div>
        <appModal v-model="dialog">
            <div class="text-center">
                <h1>Edit product</h1>
                <Form class="col-md-6 mx-auto text-start">
                    <Field rules="required" name="Username">
                        <label class="user-img my-2">
                            <img :src="forms.image" alt="user">
                            <input @change="imageValue" class="input-img" type="file">
                        </label>
                    </Field>
                    <div>
                        <label>Product name</label>
                        <Field name="lastname" rules="required">
                            <input v-model="forms.title" type="text" class="form-control">
                        </Field>
                    </div>
                    <label>Product code</label>
                    <Field name="lastname" rules="required">
                        <input placeholder="code" v-model="forms.code" type="text" class="form-control">
                    </Field>
                    <label>Arrival price</label>
                    <Field name="lastname" rules="required">
                        <input v-model="forms.current_arrival_price" type="text" class="form-control">
                    </Field>
                    <label>Selling price</label>
                    <Field name="lastname" rules="required">
                        <input v-model="forms.current_selling_price" type="text" placeholder="Selling price"
                            class="form-control">
                    </Field>
                    <Field name="Phone" rules="required">
                        <label>Group</label>
                        <select v-model="forms.group" class="form-control">
                            <option value="" hidden disabled>Select product</option>
                            <option class="form-control" v-for="item in  $store?.state?.groups" :value="item.id"
                                :key="item.id">
                                {{ item.title }}
                            </option>
                        </select>
                    </Field>
                    <Field name="brand" rules="required">
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
                    <Field name="Phone" rules="required">
                        <input v-model="forms.description" type="text" class="form-control">
                    </Field>
                    <button @click="editProdact" type="submit" class="btn btn-info w-100 mt-4"> edit product </button>
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
const id = location.href.split('/')
const image = ref('')
const imageValue = (e) => {
    image.value = e.target.files[0]
}
const dialog = ref(false)
const forms = ref({
    title: '',
    code: '',
    current_arrival_price: '',
    current_selling_price: '',
    group: 0,
    brand: 0,
    description: '',
    image: ''
})
const openEditModalProduct = (data) => {
    dialog.value = !dialog.value
    forms.value = { ...data }
}
const editProdact = () => {
    const form = new FormData();
    form.append('title', forms.value.title);
    form.append('code', forms.value.code);
    form.append('current_arrival_price', forms.value.current_arrival_price);
    form.append('current_selling_price', forms.value.current_selling_price);
    form.append('group', forms.value.group);
    form.append('brand', forms.value.brand);
    form.append('description', forms.value.description);
    form.append('image', image.value);

    http.put(`api/warehouse/product/${id[4]}/`, form, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }).then((res) => {
        Notification({ text: "change  !!!" }, { type: "success" })
        setTimeout(() => {
            location.reload()
        }, 1200);
    }).catch(err => {
        console.log(err)
        Notification({ text: "error  !!!" }, { type: "danger" })
    })
}

onMounted(() => {
    store.dispatch('getGrops')
    store.dispatch('getBrands')
});

defineExpose({ openEditModalProduct })
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

    img {
        cursor: pointer;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
}
</style>