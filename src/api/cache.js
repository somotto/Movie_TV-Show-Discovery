class ApiCache {
  constructor(maxSize = 100, ttl = 5 * 60 * 1000) {
    // 5 minutes TTL
    this.cache = new Map()
    this.maxSize = maxSize
    this.ttl = ttl
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  set(key, data) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, {
      data,
      expiry: Date.now() + this.ttl,
    })
  }

  clear() {
    this.cache.clear()
  }
}

export const apiCache = new ApiCache()
