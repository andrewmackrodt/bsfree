<script setup lang="ts">
import { ref, onBeforeMount, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import CodesTable, { type CodesGroup } from '@components/CodesTable.vue'
import { getCodesList, getGameName, getSystemName, type CodesList } from '@utils/db'
import { setRefFromHistory } from '@utils/history'

const $router = useRouter()

const props = defineProps({
  systemId: { type: String, required: true },
  systemSlug: { type: String, required: true },
  id: { type: String, required: true },
  slug: { type: String, required: true },
})

const systemName = ref('')
const name = ref('')
const title = computed(() => name.value && systemName.value ? `${name.value} - ${systemName.value}` : undefined)
const codesList = ref<CodesList | undefined>()

const groups = computed((): CodesGroup[] => {
  const res: CodesGroup[] = []
  if (codesList.value?.codes.length) {
    res.push({ id: 0, codes: codesList.value.codes })
  }
  codesList.value?.sections.forEach(section => {
    res.push({
      id: section.id,
      name: section.name,
      codes: section.codes,
    })
  })
  return res
})

const qty = computed(() => codesList.value
  ? (
      codesList.value.codes.length +
      codesList.value.sections.reduce((sum, section) => sum + section.codes.length, 0)
    )
  : 0)

async function loadData() {
  const history = $router.options.history
  await Promise.all([
    setRefFromHistory(history, 'name', name, () => getGameName(props.id)),
    setRefFromHistory(history, 'systemName', systemName, () => getSystemName(props.systemId)),
    getCodesList(props.id).then(res => codesList.value = res),
  ])
}

onBeforeMount(loadData)
watch($router.currentRoute, loadData)
</script>

<template>
  <main>
    <h1 v-if="title" class="mb-0">
      {{ title }}
    </h1>
    <p>
      {{ codesList ? `${qty.toLocaleString()} codes` : 'Loading' }}
    </p>
    <CodesTable v-for="(group) in groups" :key="group.id" :group="group" />
  </main>
</template>
