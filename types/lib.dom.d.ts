import _preact from './preact'

declare global {
    const preact: typeof _preact
    const React: typeof _preact
}
