<script setup lang="ts">
import Menubar from 'primevue/menubar'
import type { MenuItem } from 'primevue/menuitem'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteRecord } from '@/router'
import type { ScrollListener } from '@/utils/scroll'
import { addScrollListener, removeScrollListener } from '@/utils/scroll'

const $el = ref<HTMLElement | null>(null)
const $route = useRoute()
const $router = useRouter()

const props = defineProps({
  hideOnScroll: Boolean,
})

function createScrollListener(el: HTMLElement): ScrollListener {
  let offset = 0

  return ({ scrollY }, { scrollY: lastScrollY }) => {
    // ignore initial scroll
    if (lastScrollY === -1) {
      return
    }

    if (scrollY > lastScrollY) {
      // scroll down
      if (offset >= el.scrollHeight) {
        return
      }
      offset = Math.min(el.scrollHeight, offset + (scrollY - lastScrollY))
    } else {
      // scroll up
      if (offset <= 0) {
        return
      }
      offset = Math.max(0, offset + (scrollY - lastScrollY))
    }

    el.style.opacity = (1 - (offset * (1 / el.scrollHeight))).toString()
    el.style.top = `-${offset}px`
  }
}

let scrollListener: ScrollListener | null = null

onMounted(() => {
  if (props.hideOnScroll) {
    scrollListener = createScrollListener($el.value!)
    addScrollListener(scrollListener)
  }
})

onBeforeUnmount(() => {
  if (scrollListener) {
    removeScrollListener(scrollListener)
  }
})

interface NavbarMenuItem extends MenuItem {
  selected: boolean
}

function toTitleCase(text: string): string {
  return text.split(/[_-]/)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}

const menu = computed((): NavbarMenuItem[] => {
  const routes = ($router.options.routes as RouteRecord[]).filter(route => route.meta?.showInNav)
  const currentPath = $route.path

  return routes.map(route => ({
    label: route.meta?.title || toTitleCase(route.name),
    selected: route.path === currentPath,
    target: route.path,
  }))
})
</script>

<template>
  <header ref="$el" class="bg-dark sticky py-2" style="top: 0">
    <Menubar :model="menu" class="container-lg h-3rem bg-transparent border-none border-noround">
      <template #start>
        <router-link to="/" class="hidden lg:block" :style="{ 'height': '60px' }">
          <img alt="logo" src="@assets/logo.png" class="h-full">
        </router-link>
      </template>
      <template #item="{ label, item, item: { target } }">
        <router-link v-if="target" :to="target" :class="item.selected ? 'selected' : ''">
          {{ label }}
        </router-link>
      </template>
    </Menubar>
  </header>
</template>

<style scoped>
header {
  z-index: 1000;
}

:deep(.p-menubar-mobile-active ul.p-menubar-root-list) {
  background-color: var(--surface-900);
}

@media screen and (prefers-color-scheme: dark) {
  :deep(.p-menubar-mobile-active ul.p-menubar-root-list) {
    background-color: var(--surface-overlay);
  }
}

:deep(.p-menuitem-content) {
  background-color: transparent !important;
}

:deep(.p-menubar-mobile-active .p-menuitem-content) {
  padding-bottom: 0.25rem;
  padding-left: 0.25rem;
  padding-top: 0.25rem;
}

:deep(a) {
  color: var(--text-color-secondary) !important;
  text-decoration: none !important;

  @media (min-width: 992px) {
    padding-right: 1rem;
  }

  &:hover, &.selected {
    color: var(--surface-hover) !important;
  }
}

:deep(.p-inputtext) {
  padding: 0.25rem 0.75rem !important;
}
</style>
