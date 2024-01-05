import { ref, onBeforeMount, onUnmounted, watch } from 'vue'

interface ITheme {
  import: () => unknown
  media?: string
}

const themes: Record<string, ITheme> = {
  light: {
    import: () => import('primevue/resources/themes/viva-light/theme.css'),
    media: '(prefers-color-scheme: light)',
  },
  dark: {
    import: () => import('primevue/resources/themes/viva-dark/theme.css'),
    media: 'screen and (prefers-color-scheme: dark)',
  },
}

type Theme = keyof typeof themes

async function changeTheme(name: Theme) {
  // get elements for styles already imported, style[*] in dev and link[*] in prod
  const existing = [...document.querySelectorAll('style[data-vite-dev-id*="/themes/"], link[href*="/themes/"]')]
    .map(el => ({ el, href: [...el.attributes].find(({ value }) => value.includes('/themes/'))?.value }))
    .filter(({ href }) => Boolean(href)) as { el: Element; href: string }[]

  // only apply changes if the style doesn't already exist or has media=disabled
  // the prod build preloads styles to avoid flicker for dark mode users
  let target = existing.find(obj => obj.href.includes(`-${name}`))?.el
  if ((target?.getAttribute('media') ?? 'disabled') !== 'disabled') {
    return
  }

  // wait for the new theme to be imported
  if ( ! target) {
    await themes[name].import()
  }

  // remove media attribute from newly applied style in case it was previously imported
  target = existing.find(obj => obj.href.includes(`-${name}`))?.el
  target?.setAttribute('media', themes[name].media ?? '')

  // disable all other imported styles
  existing.filter(({ el }) => el !== target).forEach(({ el }) => el.setAttribute('media', 'disabled'))
}

export function useThemeManager() {
  const darkModeMatchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  const theme = ref<Theme | ''>('')

  function onDarkModeToggle(e: MediaQueryListEvent) {
    if ( ! e.media.includes(': dark')) {
      return
    }
    theme.value = e.matches ? 'dark' : 'light'
  }

  onBeforeMount(() => {
    darkModeMatchMedia.addEventListener('change', onDarkModeToggle)
    theme.value = darkModeMatchMedia.matches ? 'dark' : 'light'
  })

  onUnmounted(() => {
    darkModeMatchMedia.removeEventListener('change', onDarkModeToggle)
  })

  watch(theme, newTheme => {
    if ( ! newTheme) {
      return
    }
    return changeTheme(newTheme)
  })
}
