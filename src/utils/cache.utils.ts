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
                const src = 'https://static.ggordy.site/' + cache.key + '.' + cache.mimeType;
                // console.log(src)
                i.src = src;
                i.onload = () => {
                    count++;
                    // console.log('count', count);
                    if (count === cacheList.length) {
                        // console.log('cacheList', cacheList);
                        resolve(count);
                    }
                }
                // i.onerror = (e) => {
                //     console.log('error', e);
                // }
            });
        } catch (error) {
            reject(count);
        }
    });
}