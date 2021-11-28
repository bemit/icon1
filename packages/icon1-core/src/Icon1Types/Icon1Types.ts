export interface Icon1Icon {
    title?: string
    data: string
}

export interface Icon1IconDetails {
    id: string
    title: string
    source?: string
    colorDefault?: string
    variants?: string[]
}

export interface Icon1ListBuilt {
    list: Icon1IconDetails[]
    variants?: string[]
    idIndex: { [id: string]: number }
}
