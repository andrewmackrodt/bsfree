interface IdName {
    id: number
    name: string
}

interface Code {
    id: number
    name: string
    note?: string
    code: string
    author?: IdName
}

interface Section {
    id: number
    name: string
    codes: Code[]
}

interface Game {
    uid: number
    id: number
    name: string
    version?: string
    system: IdName
    device: IdName
    codes: (Code | Section)[]
    qty: number
}
