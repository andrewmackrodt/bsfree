<script setup lang="ts">
import Column from 'primevue/column'
import DataTable, { type DataTableRowSelectEvent } from 'primevue/datatable'
import { computed, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { getSystems, type SystemListItem } from '@utils/db'

const $router = useRouter()

const systems = ref<SystemListItem[] | undefined>()
const qty = computed(() => systems.value ? systems.value.reduce((sum, system) => sum + system.qty, 0) : 0)

onBeforeMount(async () => {
  systems.value = await getSystems()
})

function onRowSelect(e: DataTableRowSelectEvent) {
  $router.push({
    name: 'system',
    params: {
      id: e.data.id,
      slug: e.data.name.toLowerCase().replaceAll(/[^a-z0-9 ]/gi, '').replaceAll(/ /g, '-'),
    },
    state: { name: e.data.name },
  })
}
</script>

<template>
  <main>
    <h1>BSFree Archive</h1>
    <p>
      This is an unofficial archive of cheat codes contained on <a
        href="https://web.archive.org/web/20210225044111/http://bsfree.org/" target="_blank"
      >bsfree.org</a>.
    </p>
    <p>
      {{ systems ? `${qty.toLocaleString()} codes` : 'Loading' }}
    </p>
    <DataTable
      v-if="qty" :value="systems" data-key="uid" selection-mode="single"
      size="small" class="pl-0 sm:col-10 md:col-6 xl:col-5"
      @row-select="onRowSelect"
    >
      <Column field="name" header="System" class="col-10" />
      <Column header="Codes" class="col-2 text-right">
        <template #body="slotProps">
          {{ slotProps.data.qty.toLocaleString() }}
        </template>
      </Column>
    </DataTable>
  </main>
</template>
