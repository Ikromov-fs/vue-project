<template>
    <section class="single__wropper">
        <div class="single__img">
            <img :src="data?.image" class="rounded-3" alt="image smartfon">
        </div>
        <appModal v-model="dialog">
            <div class="text-center">
                <h2>Are you sure you want to deletes ?</h2>
                <div class="mx-auto">
                    <button @click="dialog = false" class="btn btn-info mx-4 my-2 px-5">cancel</button>
                    <button @click="endDelete" class="btn btn-danger mx-4 my-2 px-5">delete</button>
                </div>
            </div>
        </appModal>
        <editProduct ref="openEditProduct">
        </editProduct>
        <div class="single__text">
            <ul>
                <li>{{ data?.title }}</li>
                <li><span>Group:</span>{{ data?.group?.title }}</li>
                <li><span>Price:</span>{{ data?.current_arrival_price }}</li>
                <li><span>Selling:</span>{{ data?.current_selling_price }}</li>
                <li><span>Code:</span>{{ data?.code }}</li>
                <li><span>Description:</span>{{ data?.description }}</li>
                <li class="btn"><button @click="edited(data)" class="edit">edit</button> <button @click="deleted"
                        class="delete">delete</button>
                </li>
            </ul>
        </div>
    </section>
</template>
<script setup>
import http from '@/plugins/axios';
import appModal from '@/components/ui/app-modal.vue';
import editProduct from '../../components/pages/edit-product.vue'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const dialog = ref(false)
const data = ref([])
const router = useRouter()
const openEditProduct = ref()
const id = window.location.href.split("/")
const getSingle = () => {
    http.get(`/api/warehouse/product/${id[4]}/`).then((res) => {
        data.value = res?.data
    }).catch(err => {
        console.log(err)
    })
}
onMounted(() => {
    getSingle()
})
const edited = (data) => {
    openEditProduct.value.openEditModalProduct(data)
}

async function endDelete() {
    try {
        await http.delete(`api/warehouse/product/${id[4]}/`).then(res => {
            location.reload()
            setTimeout(() => {
                router.push('/prodact')
            }, 1000);
        })
    } catch (err) {
        console.log(err)
    }
}

const deleted = () => {
    dialog.value = !dialog.value
}
</script>

<style lang="scss" scoped>
.single__wropper {
    margin: 50px 10px;
    padding: 20px 30px;
    display: flex;
    border-radius: 8px;

    .single__img {
        max-width: 450px;

        img {
            width: 100%;
        }
    }

    .single__text {
        ul {
            li:nth-child(1) {
                font-size: 25px;
                margin: 10px 0;
                padding: 10px 0;
                color: #333;
            }

            li span {
                color: blue;
                margin: 15px 0px;
            }

            li {
                color: #565454;
                margin: 5px 0;
            }

            .btn {
                display: flex;

                button {
                    width: 100%;
                    padding: 4px 0;
                    margin: 0 5px;
                    border-radius: 5px;
                    outline: none;
                    border: none;
                }

                .edit {
                    background-color: #0e84ec;
                    color: #fff;
                }

                .delete {
                    color: #fff;
                    background-color: #ae4343;
                }
            }
        }
    }
}
</style>