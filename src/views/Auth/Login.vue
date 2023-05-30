<template>
    <div class="wropper">
        <appModal v-model="dialog" :width="'50%'">
            <div class="Login__roles col-md-6 mx-auto">
                <h2 class="text-center my-4">Select your roles</h2>
                <select class="form-control" v-model="roles.selected_role">
                    <option value="" hidden disabled>Select your role</option>
                    <option class="form-control" v-for="item in roles.role" :value="item" :key="item.id">{{ item }}</option>
                </select>
                <button class="btn btn-primary mt-2" @click="saveRoule">save</button>
            </div>
        </appModal>
        <div class="wropper__div">
            <div class="wropper__div__card col-md-6 p-5 rounded-3">
                <h3 class="text-center">System entrance</h3>
                <Form class="col-md-6 mx-auto" @submit="Login">
                    <label for="login">Username</label>
                    <Field rules="required" :modelValue="form.username" v-slot="{ errors }" name="Username">
                        <input class="form-control my-2" name="username" type="text" placeholder="Username"
                            v-model="form.username" id="login">
                        <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                    </Field>
                    <label for="password">Password</label>
                    <Field rules="required" :modelValue="form.password" v-slot="{ errors }" name="Password">
                        <div class="Login_form-input">
                            <input class="form-control my-3" v-model="form.password" id="password"
                                :type="ShowPassword ? 'text' : 'password'" placeholder="password">
                            <img src="../../assets/eye.svg" width="26" height="26" @click="ChangePassword"
                                :class="ShowPassword ? 'Login__hide' : 'Login__show'" alt="eye">
                            <img src="../../assets/eye-hide.svg" width="26" height="26" @click="ChangePassword"
                                :class="ShowPassword ? 'Login__show' : 'Login__hide'" alt="eye">
                        </div>
                        <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                    </Field>
                    <button type="submit" class="form-control btn btn-primary text-white">Enter</button>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
import appModal from '@/components/ui/app-modal.vue';
import { Field, Form } from 'vee-validate';
import { ref } from 'vue';
import http from '../../plugins/axios'
import Notification from '@/plugins/Notification';
import { useRouter } from 'vue-router';
const roles = ref({
    role: [],
    selected_role: ''
})
const form = ref({
    username: '',
    password: ''
})
const router = useRouter()
const dialog = ref(false)
const ShowPassword = ref(false)
const ChangePassword = () => {
    ShowPassword.value = !ShowPassword.value
}
const Login = () => {
    http.post('/api/user/token/', {
        username: form.value.username,
        password: form.value.password,
    }).then(res => {
        console.log(res);
    }).catch(err => {
        if (err.response.status === 400) {
            if (err.response.data.keys) {
                Notification({ text: "Select your role !!!" }, { type: "success" })
                dialog.value = true
            }
        } else {
            Notification({ text: "Error !!!" }, { type: "danger" })
        }
        roles.value.role = err.response.data.roles
    })
}
const saveRoule = () => {
    http.post('/api/user/token/', {
        username: form.value.username,
        password: form.value.password,
        current_role: roles.value.selected_role
    }).then((res) => {
        console.log(res)
        if (res.data.access) {
            sessionStorage.setItem('token', res.data.access)
            sessionStorage.setItem('role', res.data.current_role)
            if (res.data.current_role === 'director') {
                router.push({ name: 'dashboard' })
            } else if (res.data.current_role === "warehouseman") {
                router.push({ name: "prodact" })
            } else if (res.data.current_role === "salesman") {
                router.push({ name: "clients" })
            } else if (res.data.current_role === "financier") {
                router.push({ name: "expence" })
            }
            dialog.value = false
        }
    }).catch(err => {
        console.log(err)
    })
}
</script>

<style lang="scss" scoped>
.wropper {
    background-color: #f3f7f9;
}

.wropper__div {
    position: relative;
    min-height: 100vh;

    &__card {
        background-color: #fff;
        box-shadow: 10px 10px 30px rgb(98, 94, 94, 0.5);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);


    }
}

.Login_form-input {
    position: relative;

    img {
        position: absolute;
        right: 10px;
        top: 5px;
    }
}

.login__input-error {
    color: red;
}

.Login__hide {
    display: none;
    cursor: pointer;
}

.Login__show {
    display: block;
    cursor: pointer;
}
</style>