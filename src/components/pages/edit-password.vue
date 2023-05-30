<template >
    <div>
        <appModal v-model="dialog">
            <div class="text-center">
                <h1>Edit password</h1>
                <Form class="col-md-6 mx-auto text-start">
                    <label>old password</label>
                    <Field name="lastname" v-slot="{ errors }" rules="required">
                        <input v-model="forms.old_password" type="text" class="form-control">
                        <p class="error" v-if="errors && errors.length">{{ errors[0] }}</p>
                    </Field>
                    <label>New password</label>
                    <Field name="lastname" v-slot="{ errors }" rules="required">
                        <input v-model="forms.new_password" type="text" class="form-control">
                    </Field>
                    <label>Confirm new password</label>
                    <Field name="lastname" v-slot="{ errors }" rules="required">
                        <input v-model="forms.new_password_confirm" type="text" class="form-control">
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
const dialog = ref(false)
const forms = ref({
    old_password: '',
    new_password: '',
    new_password_confirm: ''
})
const editProflie = () => {
    http.post('/api/user/change-password/', {
        old_password: forms.value.old_password,
        new_password: forms.value.new_password,
        new_password_confirm: forms.value.new_password_confirm,
    }).then((res) => {
        if (res.status === 200) {
            Notification({ text: "change password !!!" }, { type: "success" })
            setTimeout(() => {
                location.reload()
            }, 800);
        }
        else {
            Notification({ text: " Error no change password !!!" }, { type: "danger" })
        }
    })
}
const openEditModalPassword = () => {
    dialog.value = !dialog.value

}

defineExpose({ openEditModalPassword })
</script>
<style lang="scss" scoped>
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
