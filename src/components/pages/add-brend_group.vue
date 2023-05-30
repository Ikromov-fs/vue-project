<template >
    <div>
        <appModal v-model="dialog">
            <div class="text-center">
                <h1 v-if="indexD">Add Group</h1>
                <h1 v-else>Add Brand</h1>
                <Form class="col-md-6 mx-auto text-start">
                    <div v-if="indexD">
                        <label>Group Name</label>
                        <Field name="group name" :modelValue="forms.title" rules="required" v-slot="{ errors }">
                            <input v-model="forms.title" type="text" class="form-control">
                            <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                        </Field>
                    </div>
                    <div v-else>
                        <label>Brand Name</label>
                        <Field name="brand name" :modelValue="forms.title" rules="required" v-slot="{ errors }">
                            <input v-model="forms.title" type="text" class="form-control">
                            <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                        </Field>
                    </div>
                    <button v-if="indexD" @click="creates" type="submit" class="btn btn-info w-100 mt-4">add group</button>
                    <button v-else class="btn btn-info w-100 mt-4" type="submit" @click="creates">add brand</button>
                </Form>
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
const itemD = ref(null)
const indexD = ref(null)
const forms = ref({
    title: '',
})

const addBrandGroup = (item, index) => {
    dialog.value = !dialog.value
    itemD.value = item
    indexD.value = index
}

async function creates(e) {
    e.preventDefault()
    try {
        if (indexD.value) {
            await http.post('/api/warehouse/group/', {
                title: forms.value.title
            }).then(res => {
                if (res.status === 201) {
                    Notification({ text: 'create group !' }, { type: 'success' })
                    setTimeout(() => {
                        location.reload()
                    }, 1200);
                }
            })
        } else {
            await http.post('/api/warehouse/brand/', {
                title: forms.value.title
            }).then(res => {
                if (res.status === 201) {
                    Notification({ text: 'create brand !' }, { type: 'success' })
                    setTimeout(() => {
                        location.reload()
                    }, 1200);
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}


defineExpose({ addBrandGroup })

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