<script setup lang="ts">
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import type { PropType } from 'vue'
import { type Code, type Author } from '@utils/db'

export interface CodesGroup {
  id: number
  name?: string
  codes: Code[]
}

defineProps({
  group: { type: Object as PropType<CodesGroup>, required: true },
})

function codeNameColStyle(name: string): Record<string, string> {
  const style: Record<string, string> = {}
  if (name.match(/\(M\)|\[M\]|must be/i)) {
    style.fontWeight = 'bold'
  }
  return style
}

const badWordList = new RegExp(atob([
  'Y29ja3N1Y2tpbmdwaWVjZW9mc2hpdA==',
].join('|')), 'ig')

function sanitizeAuthors(author?: Author): string | undefined {
  return author?.name.replaceAll(/ *[&,;] */g, ',')
    .replaceAll(/(\w)@[^ ,]*/g, '$1')
    .replaceAll(badWordList, '')
    .split(',').map(str => str.trim()).filter(Boolean)
    .sort().join('; ')
}
</script>

<template>
  <DataTable :value="group.codes" data-key="id" size="small" class="text-sm" style="white-space: pre-line">
    <template v-if="group.name" #header>
      <h3 class="mb-1">
        {{ group.name }}
      </h3>
    </template>
    <Column header="Description" class="col-3">
      <template #body="slotProps">
        <span :style="codeNameColStyle(slotProps.data.name)">{{ slotProps.data.name }}</span>
      </template>
    </Column>
    <Column field="note" header="Notes" class="col-4 text-xs text-justify" />
    <Column field="code" header="Code" class="col-2" style="font-family: monospace" />
    <Column header="Author" class="col-3">
      <template #body="slotProps">
        {{ sanitizeAuthors(slotProps.data.author) }}
      </template>
    </Column>
  </DataTable>
</template>
