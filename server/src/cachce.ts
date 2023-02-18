import NodeCache from "node-cache";

const gameCache: NodeCache = new NodeCache()

const set = (key: any, val: any): void => {
    gameCache.set(key, val)
}

const get = (key: any): any => {
    gameCache.get( key )
}
