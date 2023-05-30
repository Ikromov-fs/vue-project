import { createRouter, createWebHistory } from 'vue-router'
import director from './director'
import salesman from './salesman'
import warhen from './warhen'
import auth from './auth'
import financier from './financier'
const routes = [
  auth,
  director,
  salesman,
  warhen,
  financier,
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const role = sessionStorage.getItem('role')
  const name = to.name === 'login'
  if (!token && !name) {
    return next({ name: 'login' })
  } else {
    if (token && name) {
      if (role === 'warehouseman') {
        return next({ name: 'prodact' })
      } else if (role === 'financier') {
        return next({ name: 'financier' })
      } else if (role === 'salesman') {
        return next({ name: 'salesman' })
      } else if (role === 'director') {
        return next({ name: 'director' })
      }
    } else {
      next()
    }
  }
})

export default router;
