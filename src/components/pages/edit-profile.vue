<template >
    <div>
        <appModal v-model="dialog">
            <div class="text-center">
                <h1>Edit profile</h1>
                <Form @submit="formEdit" class="col-md-6 mx-auto text-start">
                    <Field rules="required" name="Username">
                        <label class="user-img my-2">
                            <img :src="forms.image" alt="user">
                            <input @change="imageValue" class="input-img" type="file">
                        </label>
                    </Field>
                    <div>
                        <label>First name</label>
                        <Field name="lastname" rules="required">
                            <input v-model="forms.first_name" type="text" class="form-control">
                        </Field>
                    </div>
                    <label>Last name</label>
                    <Field name="lastname" rules="required">
                        <input v-model="forms.last_name" type="text" class="form-control">
                    </Field>
                    <label>Email</label>
                    <Field name="lastname" rules="required">
                        <input v-model="forms.email" type="text" class="form-control">
                    </Field>
                    <label>Phone</label>
                    <Field name="Phone" rules="required">
                        <input v-model="forms.phone_number" type="text" class="form-control">
                    </Field>
                    <button @click="editProflie" type="submit" class="btn btn-success w-100 mt-4">edit profile</button>
                </Form>
            </div>
        </appModal>
    </div>
</template>
<script setup>
import { Form, Field } from 'vee-validate';
import appModal from '../ui/app-modal.vue';
import Notification from '@/plugins/Notification';
import { ref } from 'vue';
import http from '@/plugins/axios';
const image = ref('')
const imageValue = (e) => {
    image.value = e.target.files[0]
}
const dialog = ref(false)
const forms = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    image: ''
})
const openEditModal = (item) => {
    dialog.value = !dialog.value
    forms.value = { ...item }
}
const editProflie = () => {
    const form = new FormData();
    form.append('first_name', forms.value.first_name);
    form.append('last_name', forms.value.last_name);
    form.append('email', forms.value.email);
    form.append('phone_number', forms.value.phone_number);
    form.append('image', image.value);

    http.put('/api/user/me/', form, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }).then((res) => {
        console.log(res);
        if (res.status === 200) {
            Notification({ text: "edit profile !!!" }, { type: "success" })
            setTimeout(() => {
                location.reload()
            }, 800);
        }
        else {
            Notification({ text: " Error !!!" }, { type: "danger" })
        }
    })
}

defineExpose({ openEditModal })
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