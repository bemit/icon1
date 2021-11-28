export async function asyncForEach<K>(array: K[], callback: (item: K, index: number, array: K[]) => any): Promise<any> {
    for(let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

export async function asyncMap<K>(array: K[], callback: (item: K, index: number, array: K[]) => any, ignoreEmpty?: boolean): Promise<any> {
    const arr: any[] = []
    for(let index = 0; index < array.length; index++) {
        const data = await callback(array[index], index, array)
        if(!ignoreEmpty || typeof data !== 'undefined') {
            arr.push(data)
        }
    }
    return arr
}

export async function asyncObjectMap<K extends { [key: string]: any }>(obj: K, callback: (item: K[keyof K], key: string) => any, ignoreEmpty?: boolean): Promise<any> {
    const objDist = {}
    const keys = Object.keys(obj)
    for(let index = 0; index < keys.length; index++) {
        const data = await callback(obj[keys[index]], keys[index])
        if(!ignoreEmpty || typeof data !== 'undefined') {
            // @ts-ignore
            objDist[keys[index]] = data
        }
    }
    return objDist
}

