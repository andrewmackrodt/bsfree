import type { BindParams, QueryExecResult } from 'sql.js'
import { createDbWorker } from 'sql.js-httpvfs'
import type { WorkerHttpvfs } from 'sql.js-httpvfs'

const BASE_URL = window.location.href.replace(/[?&#].*$/, '').replace(/\w+\.\w+\/*$/, '').replace(/\/+$/, '')
const WORKER_URL = new URL('sql.js-httpvfs/dist/sqlite.worker.js', import.meta.url)
const WASM_URL = new URL('sql.js-httpvfs/dist/sql-wasm.wasm', import.meta.url)
const MAX_BYTES_TO_READ = 10 * 1024 * 1024

function array_combine(keys: string[], values: unknown[]) {
  const obj: Record<string, unknown> = {}
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i]
  }
  return obj
}

let _worker: WorkerHttpvfs

async function getWorker(): Promise<WorkerHttpvfs> {
  if ( ! _worker) {
    const url = window.location.href.match(/:\/\/(?:[0-9]+|localhost|[^\/]+\.local)\b/)
      ? `${BASE_URL}/data/bsfree.db`
      : 'https://static.mackrodt.io/files/bsfree.4cfee26.db'

    _worker = await createDbWorker(
      [{
        from: 'inline',
        config: {
          serverMode: 'full',
          requestChunkSize: 4096,
          url,
        },
      }],
      WORKER_URL.toString(),
      WASM_URL.toString(),
      MAX_BYTES_TO_READ,
    )
  }
  return _worker
}

const textDecoder = new TextDecoder()

function decodeText(text: string): string {
  const bytes = new Uint8Array(text.length)
  for (let i = 0; i < text.length; i++){
    bytes[i] = text.charCodeAt(i)
  }
  return textDecoder.decode(bytes)
    .replaceAll(/&#([0-9]+);/g, (_, c) => String.fromCharCode(c))
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', "'")
    .replaceAll(/<br ?\/?>?/gi, '\n')
    .replaceAll(/br ?\/?>/gi, '\n')
    .replaceAll(/\s*<p>/gi, '\n')
    .replaceAll(/\s*<\/p> */gi, '\n')
    .replaceAll(/<[a-z]+ ?\/?> */gi, '')
    .replaceAll(/<\/[a-z]+> */gi, '')
    .trim()
}

const textEncoder = new TextEncoder()

async function sha256(text: string): Promise<string> {
  const buffer = await window.crypto.subtle.digest('SHA-256', textEncoder.encode(text))
  return Array.from(new Uint8Array(buffer), b => b.toString(16).padStart(2, '0')).join('')
}

const cache = new Map<string, unknown>()

export async function exec<T>(sql: string, params?: BindParams): Promise<T[]> {
  const cacheKey = await sha256(JSON.stringify({ sql, params }))
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as T[]
  }
  const worker = await getWorker()
  const started = Date.now()
  let res: QueryExecResult[]
  try {
    res = await worker.db.exec(sql, params)
  } finally {
    console.info('executed statement', {
      bytesRead: await worker.worker.bytesRead,
      elapsed: Date.now() - started,
      params, sql,
    })
  }
  // @ts-expect-error setter on bytesRead is not a promise
  worker.worker.bytesRead = 0
  let rows: T[] = []
  if (res.length === 1) {
    rows = res[0].values.map(values => array_combine(res[0].columns, values.map(value => (
      typeof value === 'string' ? decodeText(value) : value
    )))) as T[]
  }
  cache.set(cacheKey, rows)
  return rows
}
