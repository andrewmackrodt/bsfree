import * as db from '@utils/sqlite'

type WithQuantity<T> = T & {
  qty: number
}

export interface System {
  id: number
  name: string
}

export type SystemListItem = WithQuantity<System>

export async function getSystemName(id: number | string): Promise<string | undefined> {
  const rows = await db.exec<{ name: string }>('select name from systems where id = ?', [id])
  if (rows.length) {
    return rows[0].name
  }
}

export const getSystems = async () => await db.exec<SystemListItem>(`
  select s1.id, min(s1.name) as name, sum(s2.qty) as qty
  from systems s1
  join systems s2 on s2.group_id = s1.id
  where s1.id in (select distinct group_id from systems)
  group by s1.id
  order by name, s1.id
`)

export interface Device {
  id: number
  name: string
}

interface Game {
  uid: number
  id: number
  name: string
  version?: string
  system: System
  device: Device
}

export type GameListItem = WithQuantity<Game>

export async function getGames(systemId: number | string): Promise<GameListItem[] | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = await db.exec<any>(`
    select s.id      as system_id,
           s.name    as system_name,
           g.id      as game_uid,
           g.game_id as game_id,
           g.name    as game_name,
           g.version as game_version,
           g.qty     as game_qty,
           d.id      as device_id,
           d.name    as device_name
    from games g
    join systems s on s.id = g.system_id
    join devices d on d.id = g.device_id
    where g.qty > 0 and g.system_id in (select id from systems where group_id = ?)
    order by g.name, g.version, g.id, s.name, s.name, d.name, d.id
  `, [systemId])

  const devices: Record<string, Device> = {}
  const systems: Record<string, System> = {}
  const games: Record<string, GameListItem> = {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of rows as Record<string, any>[]) {
    // cache device
    if ( ! (row.device_id in devices)) {
      devices[row.device_id] = {
        id: row.device_id,
        name: row.device_name,
      }
    }

    // cache system
    if ( ! (row.system_id in systems)) {
      systems[row.system_id] = {
        id: row.system_id,
        name: row.system_name,
      }
    }

    if ( ! (row.game_uid in games)) {
      const game: GameListItem = games[row.game_uid] = {
        uid: row.game_uid,
        id: row.game_id,
        name: row.game_name,
        system: systems[row.system_id],
        device: devices[row.device_id],
        qty: row.game_qty,
      }

      if (row.game_version !== null) {
        game.version = row.game_version
      }
    }
  }

  return Object.values(games).sort((a, b) => (
    a.name.localeCompare(b.name)
      || a.id - b.id
      || a.device.name.localeCompare(b.device.name)
      || a.device.id - b.device.id
  ))
}

export async function getGameName(id: number | string): Promise<string | undefined> {
  const rows = await db.exec<{ name: string }>('select name from games where id = ?', [id])
  if (rows.length) {
    return rows[0].name
  }
}

export interface Author {
  id: number
  name: string
}

export interface Code {
    id: number
    name: string
    note?: string
    code: string
    author?: Author
}

export interface Section {
    id: number
    name: string
    codes: Code[]
}

export interface CodesList {
  codes: Code[]
  sections: Section[]
}

export async function getCodesList(gameId: number | string): Promise<CodesList> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = await db.exec<any>(`
    select s.id     as section_id,
           s.name   as section_name,
           c.id      as code_id,
           c.name    as code_name,
           c.note    as code_note,
           c.code    as code_code,
           a.id      as author_id,
           a.name    as author_name
    from codes c
    left join sections s on s.id = c.section_id
    left join authors a on a.id = c.author_id
    where c.game_uid = ?
    order by c.id
  `, [gameId])

  const codes: Code[] = []
  const sections: Record<string, Section> = {}
  const authors: Record<string, Author> = {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of rows as Record<string, any>[]) {
    const code: Code = {
        id: row.code_id,
        name: row.code_name,
        code: row.code_code,
    }

    if (row.code_note !== null) {
        code.note = row.code_note
    }

    if (row.author_id) {
        // cache author
        if ( ! (row.author_id in authors)) {
            authors[row.author_id] = {
                id: row.author_id,
                name: row.author_name,
            }
        }
        code.author = authors[row.author_id]
    }

    if (row.section_id) {
        // cache section
        if ( ! (row.section_id in sections)) {
            sections[row.section_id] = {
                id: row.section_id,
                name: row.section_name,
                codes: [],
            }
        }
        sections[row.section_id].codes.push(code)
    } else {
      codes.push(code)
    }
  }

  return { codes, sections: Object.values(sections) }
}
