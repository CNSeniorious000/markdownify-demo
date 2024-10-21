export function cacheSingleton<T extends () => any>(fn: T): T {
  const UNSET = {};
  let result: any = UNSET;

  return (() => {
    if (result !== UNSET)
      return result;

    result = fn();
    return result;
  }) as T;
}

export function lru<T extends (...args: any[]) => any>(fn: T, maxSize = 5): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<Parameters<T>[0], ReturnType<T>>();

  return function (...args: Parameters<T>) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    const result = fn(...args);
    cache.set(key, result);

    if (result instanceof Promise) {
      result.then((res) => cache.has(res) && cache.set(key, res));
    }

    return result;
  };
}
