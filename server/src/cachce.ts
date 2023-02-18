import NodeCache from "node-cache"
import Game from "./types/Game"

const gameCache: NodeCache = new NodeCache()

const set = (key: any, val: any): void => {
    gameCache.set(key, val)
}

const get = (key: any): Game | undefined => {
    return gameCache.get( key )
}

export default {set, get}