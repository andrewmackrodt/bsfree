import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useFlashStore } from '@stores/flash'
import GameView from '@views/GameView.vue'
import HomeView from '@views/HomeView.vue'
import SystemView from '@views/SystemView.vue'

export type RouteRecord = RouteRecordRaw & {
  name: string
  meta?: RouteMeta & {
    showInNav?: boolean
    title?: string
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: HomeView,
      name: 'home',
      path: '/',
      meta: { showInNav: true },
    },
    {
      component: SystemView,
      name: 'system',
      path: '/systems/:id/:slug',
      props: true,
    },
    {
      component: GameView,
      name: 'game',
      path: '/systems/:systemId/:systemSlug/games/:id/:slug',
      props: true,
    },
    {
      component: () => import('../views/NotFoundView.vue'),
      name: 'not-found',
      path: '/:params(.*)*',
    },
  ] as RouteRecord[],
})

let flashStore: ReturnType<typeof useFlashStore>

router.beforeEach((to, from, next) => {
  const meta: RouteRecord['meta'] = to.meta
  if (meta.title) {
    document.title = meta.title
  }
  if ( ! flashStore) {
    flashStore = useFlashStore()
  }
  flashStore.popFlash()
  next()
})

export default router
