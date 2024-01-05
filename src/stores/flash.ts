import { defineStore } from 'pinia'
import { ref } from 'vue'

type Severity = 'success' | 'info' | 'warn' | 'error'

interface Message {
  message: string
  severity: Severity
}

type Foo = Message | undefined

export const useFlashStore = defineStore('flash', () => {
  const current = ref<Foo>()
  const next = ref<Foo>()

  function setFlash(message: string, severity: Severity = 'info') {
    next.value = { message, severity }
  }

  function popFlash() {
    const flash = current.value
    current.value = next.value
    next.value = undefined
    return flash
  }

  return { current, setFlash, popFlash }
})
