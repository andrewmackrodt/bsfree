<script setup lang="ts">
import Column from 'primevue/column'
import DataTable, { type DataTableRowSelectEvent } from 'primevue/datatable'
import { computed, ref, onBeforeMount } from 'vue'
import { type RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
import { getSystems, type SystemListItem } from '@utils/db'
import { toSlug } from '@utils/route'

const $router = useRouter()

interface SystemListItemWithRoute extends SystemListItem {
  slug: string
  route: RouteLocationNormalizedLoaded
}

const systems = ref<SystemListItemWithRoute[] | undefined>()
const qty = computed(() => systems.value ? systems.value.reduce((sum, system) => sum + system.qty, 0) : 0)

onBeforeMount(async () => {
  systems.value = (await getSystems()).map(system => {
    const slug = toSlug(system.name)
    return { ...system, slug, route: $router.resolve({
      name: 'system', params: {
        id: system.id,
        slug: toSlug(system.name),
      },
    }) }
  })
})

function navigateToSystem(system: SystemListItemWithRoute) {
  return $router.push({ ...system.route, state: { name: system.name } })
}

function onRowSelect(e: DataTableRowSelectEvent) {
  return navigateToSystem(e.data)
}

function onClickSystem(e: MouseEvent, data: SystemListItemWithRoute) {
  e.preventDefault()
  return navigateToSystem(data)
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
      <Column header="System" class="col-10">
        <template #body="slotProps">
          <router-link v-slot="{ href }" :to="slotProps.data.route" custom>
            <a class="row-link" :href="href" @click="(e: MouseEvent) => onClickSystem(e, slotProps.data)">{{ slotProps.data.name }}</a>
          </router-link>
        </template>
      </Column>
      <Column header="Codes" class="col-2 text-right">
        <template #body="slotProps">
          {{ slotProps.data.qty.toLocaleString() }}
        </template>
      </Column>
    </DataTable>
  </main>
</template>
