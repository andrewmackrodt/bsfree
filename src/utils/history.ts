import type { Ref } from 'vue'
import { type RouterHistory } from 'vue-router'

export async function setRefFromHistory(history: RouterHistory, key: string, ref: Ref<string>, cb: () => Promise<string | undefined>) {
  if (history.state[key]) {
    ref.value = history.state[key] as string
  } else {
    const value = await cb()
    if (value) {
      ref.value = value
      const historyState = history.state
      historyState[key] = value
      history.replace(history.location, historyState)
    }
  }
}
