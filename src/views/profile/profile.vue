<template >
    <section class="section">
        <div class="section__div mx-4">
            <appModal v-model="dialog">
                <div class="mx-auto">
                    <h2 class="text-center my-4">Select your roles</h2>
                    <select class="form-control" v-model="roles">
                        <option class="form-control" value="" hidden disabled>Select your role</option>
                        <option class="form-control" v-for="item in $store?.state?.me?.roles" :value="item">{{ item }}
                        </option>
                    </select>
                    <button class="btn btn-primary mt-2" @click="saveRole">save</button>
                </div>
            </appModal>
            <div>
                <img :src="$store?.state?.me?.image" alt="user">
            </div>
            <p>
                <span>{{ $store?.state?.me?.first_name }}</span>
                <span>{{ $store?.state?.me?.last_name }}</span>
            </p>
            <button @click="editProfileItem($store?.state?.me)">Edit profile</button>
        </div>
        <editProfile ref="editModal">
        </editProfile>
        <editPassword ref="edit_password"></editPassword>
        <div class="secont__part">
            <p>
                <span>Phone number</span>
                <i class="bi bi-forward-fill"></i>
                <span>{{ $store?.state?.me?.phone_number }}</span>
            </p>
            <p>
                <span>Email</span>
                <i class="bi bi-forward-fill"></i>
                <span>{{ $store?.state?.me?.email }}</span>
            </p>
            <p>
                <span>User name</span>
                <i class="bi bi-forward-fill"></i>
                <span>{{ $store?.state?.me?.username }}</span>
            </p>
            <p>
                <span>Roles</span>
                <i class="bi bi-forward-fill"></i>
                <span v-for="item in $store?.state?.me?.roles" :key="item.id" class="mx-1">{{ item }}</span>
            </p>
            <p>
                <span>Current role</span>
                <i class="bi bi-forward-fill"></i>
                <span>{{ $store?.state?.me?.current_role }}</span>
                <button class="btn btn-info" @click="changeRole">change</button>
            </p>
            <button class="chage btn btn-warning" @click="changePassword">Change password</button>
        </div>
    </section>
</template>
<script setup>
import appModal from '@/components/ui/app-modal.vue';
import editProfile from '@/components/pages/edit-profile.vue';
import editPassword from '@/components/pages/edit-password.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import http from '@/plugins/axios';
const dialog = ref(false)
const roles = ref('')
const router = useRouter()
const editModal = ref()
const edit_password = ref()
const editProfileItem = (item) => {
    editModal.value.openEditModal(item)
}
const changePassword = () => {
    edit_password.value.openEditModalPassword()
}

const saveRole = () => {
    http.post('/api/user/change-role/', {
        role: roles.value,
    }).then((res) => {
        sessionStorage.setItem('role', `${roles.value}`)
        if (res.status === 200) {
            if (roles.value === 'warehouseman') {
                router.push({ name: 'profile-warhen' })
            } else if (roles.value === 'salesman') {
                router.push({ name: 'profile-salesman' })
            } else if (roles.value === 'director') {
                router.push({ name: 'profile-director' })
            } else if (roles.value === 'financier') {
                router.push({ name: 'profile-financier' })
            }
            dialog.value = false
        }
    }).catch(err => {
        console.log(err);
        dialog.value = false
    })
}
const changeRole = () => {
    dialog.value = true
}

</script>
<style lang="scss" scoped>
.section {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 50px 20px;
    padding: 30px 30px;
    background-color: #fff;
    border-radius: 8px;

    .section__div {
        width: 240px;

        div {
            width: 240px;
            height: 240px;
            border-radius: 50%;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }

        p {
            display: flex;
            justify-content: center;
            font-size: 22px;
            font-weight: 500;
            gap: 14px;
            width: 100%;
        }

        button {
            outline: none;
            border-radius: 5px;
            background-color: #435ebe;
            color: #fff;
            border: none;
            padding: 10px 0px;
            width: 100%;
            font-size: 17px;
        }
    }

    .secont__part {
        width: 438px;
        margin-top: 20px;

        .chage {
            width: 100%;
            color: #333;
            font-size: 18px;
        }

        p {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 18px;
            font-weight: 500;

            i {
                font-size: 16px;
                transition: all 0.3s linear;
            }

            i:hover {
                transform: translateX(8px);
                transition: all 0.3s linear;
                cursor: pointer;
                color: #435ebe;
            }
        }
    }
}
</style>