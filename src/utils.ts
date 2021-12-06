export const shortenString = (data: string, start: number = 7, end: number = 7, delimiter: string = '...'): string => {
    const left = data.substring(0, start);
    const right = data.substring(data.length - end);
    return `${left}${delimiter}${right}`;
}


export const hex2pem = (label: string, data: string, type = ''): string => {
    const base64encoded = Buffer.from(data, 'hex').toString('base64');
    const base64encodedWrapped = base64encoded.replace(/(.{64})/g, '$1\n');

    label = (type.length > 0 ? type.trim().toUpperCase() + ' ' : '') + label
    return `-----BEGIN ${label}-----\n${base64encodedWrapped}\n-----END ${label}-----`
}
