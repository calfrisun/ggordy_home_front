export interface Icache {
    key: string;
    mimeType: string;
}

export const cachePlz = (cacheList: Array<Icache>) => {
    let count = 0;
    // console.log('cachePlz', cacheList);
    return new Promise((resolve, reject) => {
        try {
            cacheList.forEach((cache) => {
                // console.log('cache.src', cache.key);
                const i = new Image();
                i.src = 'https://static.ggordy.site/' + cache.key + '.' + cache.mimeType;
                i.onload = () => {
                    count++;
                    // console.log('count', count);
                    if (count === cacheList.length) {
                        // console.log('cacheList', cacheList);
                        resolve(count);
                    }
                }
            });
        } catch (error) {
            reject(count);
        }
    });
}