import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/ContainerManager/ContainerManager.vue'),
  },
  {
    name: 'torrent-manager',
    path: '/torrent-manager/:containerName',
    component: () => import('@/views/TorrentManager/TorrentManager.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router