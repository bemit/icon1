export const fileImport = async(path: string): Promise<any> => {
    const isWin = process.platform === 'win32'
    return await import((isWin && path.slice(1, 3) === ':\\' ? 'file://' : '') + path)
}
