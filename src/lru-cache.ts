/**
 * A Least Recently Used (LRU) cache with Time-to-Live (TTL) support. Items are kept in the cache until they either
 * reach their TTL or the cache reaches its size and/or item limit. When the limit is exceeded, the cache evicts the
 * item that was least recently accessed (based on the timestamp of access). Items are also automatically evicted if they
 * are expired, as determined by the TTL.
 * An item is considered accessed, and its last accessed timestamp is updated, whenever `has`, `get`, or `set` is called with its key.
 *
 * Implement the LRU cache provider here and use the lru-cache.test.ts to check your implementation.
 * You're encouraged to add additional functions that make working with the cache easier for consumers.
 */

type LRUCacheProviderOptions = {
  ttl: number // Time to live in milliseconds
  itemLimit: number
}
type LRUCacheProvider<T> = {
  has: (key: string) => boolean
  get: (key: string) => T | undefined
  set: (key: string, value: T) => void
}
interface CachItem {
  value: any,
  timeout?: ReturnType<typeof setTimeout>
}
interface Cache {
  [key: string]: CachItem
}


// TODO: Implement LRU cache provider
export function createLRUCacheProvider<T>({
  ttl,
  itemLimit,
}: LRUCacheProviderOptions): LRUCacheProvider<T> {

  let cache: Cache = {}

  let keyOrder: string[] = []

  function setExpires(key: string) {
    clearTimeout(cache[key].timeout)
    cache[key].timeout = setTimeout(() => {
      delete cache[key]
    }, ttl)
  }

  function checkEvict() {
    let length = Object.keys(cache).length
    if (length > itemLimit) {
      let keyToDelete = keyOrder.shift()
      if (typeof keyToDelete == 'string') {
        delete cache[keyToDelete]
      }
    }
  }

  function checkLRU(key: string) {
    let find = keyOrder.findIndex(el => el == key)
    let newOrder = keyOrder.slice(0, find).concat(keyOrder.slice(find + 1))
    newOrder.push(key)
    keyOrder = newOrder
  }

  return {
    has: (key: string) => {
      if (cache[key]) {
        setExpires(key)
        checkLRU(key)
        return true
      }
      return false
    },
    get: (key: string) => {
      if (cache[key]) {
        setExpires(key)
        checkLRU(key)
        return cache[key].value
      }
      return undefined
    },
    set: (key: string, value: T) => {
      let item: CachItem = {
        value: value
      }
      cache[key] = item
      keyOrder.push(key)
      setExpires(key)
      checkEvict()
      checkLRU(key)
    },
  }
}
