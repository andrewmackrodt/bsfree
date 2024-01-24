<script setup lang="ts">
import Column from 'primevue/column'
import DataTable, { type DataTableFilterMetaData, type DataTableRowSelectEvent } from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import { ref, onBeforeMount, watch, computed } from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { getGames, getSystemName, type GameListItem } from '@utils/db'
import { setRefFromHistory } from '@utils/history'
import { toSlug } from '@utils/route'

const $route = useRoute()
const $router = useRouter()
const history = $router.options.history

interface GameListItemWithRoute extends GameListItem {
  slug: string
  route: RouteLocationNormalizedLoaded
}

const props = defineProps({
  id: { type: String, required: true },
  slug: { type: String, required: true },
})

const filters = ref<Record<string, DataTableFilterMetaData>>({
  global: { value: undefined, matchMode: 'contains' },
})

const ROW_SIZE = 50

const name = ref('')
const games = ref<GameListItem[] | undefined>()
const qty = computed(() => games.value ? games.value.reduce((sum, system) => sum + system.qty, 0) : 0)
const offset = ref(0)
const page = computed(() => (offset.value / ROW_SIZE) + 1)

async function load(loadData = true) {
  filters.value.global.value = $router.currentRoute.value.query.search

  if (typeof $router.currentRoute.value.query.page === 'string') {
    const page = parseInt($router.currentRoute.value.query.page)
    offset.value = (page - 1) * ROW_SIZE
  }

  if (loadData) {
    await Promise.all([
      setRefFromHistory(history, 'name', name, () => getSystemName(props.id)),
      getGames(props.id).then(res => games.value = res?.map(game => {
        const slug = toSlug(game.name)
        return { ...game, slug, route: $router.resolve({
            name: 'game', params: {
              systemId: props.id,
              systemSlug: props.slug,
              id: game.uid,
              slug: toSlug(game.name),
            },
          }) }
      })),
    ])
  }

  addPaginationLinks()
}

onBeforeMount(load)
watch($router.currentRoute, (value, oldValue) => load(value.path !== oldValue.path))

function pushQueryParams(params: Record<string, string | undefined>) {
  let isChanged = false
  const query = Object.assign({}, $route.query)
  for (const [key, value] of Object.entries(params)) {
    if (value === $router.currentRoute.value.query[key]) {
      continue
    }
    isChanged = true
    if (value) {
      query[key] = value
    } else {
      delete query[key]
    }
  }
  if (isChanged) {
    return $router.push({ path: $route.fullPath, query })
  }
}

function updateQueryParams() {
  pushQueryParams({
    search: filters.value.global.value,
    page: page.value.toString(),
  })
}

function navigateToGame(game: GameListItemWithRoute) {
  return $router.push({ ...game.route, state: { systemName: name.value, name: game.name } })
}

function onClickGame(e: MouseEvent, data: GameListItemWithRoute) {
  e.preventDefault()
  return navigateToGame(data)
}

const paginatorTemplate = [
  'FirstPageLink',
  'PrevPageLink',
  'PageLinks',
  'NextPageLink',
  'LastPageLink',
  'JumpToPageDropdown',
  'CurrentPageReport',
].join(' ')

function addPaginationLinks() {
  const createLink = (el: Element, page: string | number | null, isText = true) => {
    let a = el.querySelector('a')
    if (a) {
      if (page) {
        a.setAttribute('href', `#${$route.path}?page=${page}`)
      } else {
        el.innerHTML = a.innerHTML
      }
    } else {
      if ( ! page) {
        return
      }
      a = document.createElement('a')
      a.classList.add('page-link')
      if (isText) {
        a.classList.add('w-full')
      }
      a.setAttribute('href', `#${$route.path}?page=${page}`)
      a.innerHTML = el.innerHTML
      el.innerHTML = a.outerHTML
    }
  }

  const first = document.querySelector('.p-paginator button.p-paginator-first')
  const prev = document.querySelector('.p-paginator button.p-paginator-prev')
  const next = document.querySelector('.p-paginator button.p-paginator-next')
  const last = document.querySelector('.p-paginator button.p-paginator-last')
  const maxPage = Math.ceil((games.value?.length ?? 0) / ROW_SIZE)

  if (first) {
    createLink(first, 1, false)
  }

  if (prev) {
    const prevPage = page.value > 1 ? page.value - 1 : null
    createLink(prev, prevPage, false)
  }

  if (next) {
    const nextPage = page.value < maxPage ? page.value + 1 : null
    createLink(next, nextPage, false)
  }

  if (last) {
    createLink(last, maxPage, false)
  }

  document.querySelectorAll('.p-paginator-pages button').forEach(el => createLink(el, el.textContent!))
}

function onRowSelect(e: DataTableRowSelectEvent) {
  return navigateToGame(e.data)
}
</script>

<template>
  <main>
    <h1 v-if="name">
      {{ name }}
    </h1>
    <p>
      {{ games ? `${qty.toLocaleString()} codes` : 'Loading' }}
    </p>
    <DataTable
      v-if="games?.length"
      v-model:filters="filters"
      v-model:first="offset"
      :always-show-paginator="false"
      :global-filter-fields="['name', 'version', 'device.name', 'system.name']"
      :page-link-size="8"
      :paginator-template="paginatorTemplate"
      :rows="ROW_SIZE"
      :value="games"
      data-key="id"
      paginator
      paginator-position="both"
      selection-mode="single"
      size="small"
      sort-mode="multiple"
      @page="updateQueryParams"
      @row-select="onRowSelect"
    >
      <template #header>
        <div class="flex justify-content-end">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Search" @blur="updateQueryParams" @input="() => offset = 0" />
          </span>
        </div>
      </template>
      <Column field="name" header="Game" :sortable="true">
        <template #body="slotProps">
          <router-link v-slot="{ href }" :to="slotProps.data.route" custom>
            <a class="row-link" :href="href" @click="(e: MouseEvent) => onClickGame(e, slotProps.data)">{{ slotProps.data.name }}</a>
          </router-link>
        </template>
      </Column>
      <Column field="version" header="Version" :sortable="true" />
      <Column field="device.name" header="Device" :sortable="true" />
      <Column field="system.name" header="System" :sortable="true" />
      <Column header="Codes" class="col-1 text-right">
        <template #body="slotProps">
          {{ slotProps.data.qty.toLocaleString() }}
        </template>
      </Column>
    </DataTable>
  </main>
</template>
