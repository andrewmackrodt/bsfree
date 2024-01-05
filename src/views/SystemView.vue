<script setup lang="ts">
import Column from 'primevue/column'
import DataTable, { type DataTableFilterMetaData, type DataTableRowSelectEvent } from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import { ref, onBeforeMount, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGames, getSystemName, type GameListItem } from '@utils/db'
import { setRefFromHistory } from '@utils/history'

const $route = useRoute()
const $router = useRouter()
const history = $router.options.history

const props = defineProps({
  id: { type: String, required: true },
  slug: { type: String, required: true },
})

const filters = ref<Record<string, DataTableFilterMetaData>>({
  global: { value: undefined, matchMode: 'contains' },
})

const name = ref('')
const games = ref<GameListItem[] | undefined>()
const qty = computed(() => games.value ? games.value.reduce((sum, system) => sum + system.qty, 0) : 0)

async function load(loadData = true) {
  filters.value.global.value = $router.currentRoute.value.query.search
  if (loadData) {
    await Promise.all([
      setRefFromHistory(history, 'name', name, () => getSystemName(props.id)),
      getGames(props.id).then(res => games.value = res),
    ])
  }
}

onBeforeMount(load)
watch($router.currentRoute, (value, oldValue) => load(value.path !== oldValue.path))

function pushQueryParam(key: string, value: string | undefined) {
  if (value === $router.currentRoute.value.query[key]) {
    return
  }
  const query = Object.assign({}, $route.query)
  if (value) {
    query[key] = value
  } else {
    delete query[key]
  }
  $router.push({ path: $route.fullPath, query })
}

function blurSearch() {
  pushQueryParam('search', filters.value.global.value)
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

function onRowSelect(e: DataTableRowSelectEvent) {
  $router.push({
    name: 'game',
    params: {
      systemId: props.id,
      systemSlug: props.slug,
      id: e.data.uid,
      slug: e.data.name.toLowerCase().replaceAll(/[^a-z0-9 ]/gi, '').replaceAll(/ /g, '-'),
    },
    state: {
      systemName: name.value,
      name: e.data.name,
    },
  })
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
      v-if="games?.length" v-model:filters="filters" :value="games" data-key="id"
      :global-filter-fields="['name', 'version', 'device.name', 'system.name']"
      selection-mode="single" size="small" sort-mode="multiple"
      paginator paginator-position="both" :paginator-template="paginatorTemplate" :page-link-size="8" :rows="50"
      @row-select="onRowSelect"
    >
      <template #header>
        <div class="flex justify-content-end">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Search" @blur="blurSearch" />
          </span>
        </div>
      </template>
      <Column field="name" header="Game" :sortable="true" />
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
