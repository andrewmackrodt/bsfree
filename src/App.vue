<script setup lang="ts">
import Message from 'primevue/message'
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import PageHeader from '@components/PageHeader.vue'
import { useFlashStore } from '@stores/flash'
import { useThemeManager } from '@utils/theme'

const flashStore = useFlashStore()
const flash = computed(() => flashStore.current)

useThemeManager()
</script>

<template>
  <PageHeader />
  <div v-if="flash" class="container-lg mt-5">
    <Message :severity="flash.severity" :closable="false">
      {{ flash.message }}
    </Message>
  </div>
  <RouterView class="container-lg py-3" />
</template>
