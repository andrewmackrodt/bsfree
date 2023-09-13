import { createDbWorker } from '../libs/sql.js-httpvfs/0.8.12/index.js'
import type { WorkerHttpvfs} from '../libs/sql.js-httpvfs/0.8.12'
import type { BindParams } from '../types/sql.js'

const BASE_URL = window.location.href.replace(/[?&#].*$/, '')
    .replace(/\w+\.\w+\/*$/, '')
    .replace(/\/+$/, '') + '/'

const WORKER_URL = `${BASE_URL}/libs/sql.js-httpvfs/0.8.12/sqlite.worker.js`
const WASM_URL = `${BASE_URL}/libs/sql.js-httpvfs/0.8.12/sql-wasm.wasm`
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
            : 'https://api.onedrive.com/v1.0/shares/u!aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcGVYWWltRHpQaWRnOVZpN0JyeHBNR21sdTZFN3c_ZT04ZGNocnc/root/content'

        _worker = await createDbWorker(
            [{
                from: 'inline',
                config: {
                    serverMode: 'full',
                    requestChunkSize: 4096,
                    url,
                }
            }],
            WORKER_URL,
            WASM_URL,
            MAX_BYTES_TO_READ,
        )
    }
    return _worker
}

export async function exec<T>(sql: string, params?: BindParams): Promise<T[]> {
    const worker = await getWorker()
    const started = Date.now()
    let res: T
    try {
        res = await worker.db.exec(sql, params)
    } finally {
        console.info(`executed statement`, {
            bytesRead: await worker.worker.bytesRead,
            elapsed: Date.now() - started,
            params, sql,
        })
    }
    // @ts-ignore
    worker.worker.bytesRead = 0
    let rows: T[] = []
    if (res.length === 1) {
        rows = res[0].values.map(v => array_combine(res[0].columns, v)) as T[]
    }
    return rows
}
