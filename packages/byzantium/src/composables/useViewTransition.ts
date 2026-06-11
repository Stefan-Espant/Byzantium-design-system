const supported =
  typeof document !== 'undefined' && 'startViewTransition' in document

export function useViewTransition() {
  function startTransition(callback: () => void | Promise<void>) {
    if (!supported) return Promise.resolve(callback())
    return (document as Document & { startViewTransition: (cb: () => void | Promise<void>) => unknown }).startViewTransition(callback)
  }

  return { supported, startTransition }
}
