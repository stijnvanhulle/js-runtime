export const runtimes = {
  bun: globalThis.Bun,
  deno: globalThis.Deno,
  node: undefined,
  //for testing
  jest: globalThis.jest,
} as const

export type Runtime = keyof typeof runtimes

/**
 * Return the current runtime.
 */
export function get(): Runtime {
  if (runtimes.bun) {
    return 'bun'
  }
  if (runtimes.deno) {
    return 'deno'
  }

  if (runtimes.jest) {
    return 'jest'
  }

  return 'node'
}

export function isBun(): boolean {
  return get() === 'bun'
}

export function isDeno(): boolean {
  return get() === 'deno'
}

export function isNode(): boolean {
  return get() === 'node'
}

export function isJest(): boolean {
  return get() === 'jest'
}

/**
 * Retrieve the version used in the current runtime.
 */
export function getVersion(): string {
  const runtime = get()

  switch (runtime) {
    case 'bun':
      return globalThis.Bun.version
    case 'deno':
      return globalThis.Deno.version.deno
    case 'node':
      return globalThis.process.version.substring(1)
    default:
      throw new Error(`No runtime version found for ${runtime}`)
  }
}
/**
 * Switch based on the current runtime.
 */
export function switcher<TOutput>(obj: Partial<Record<Runtime, TOutput>>): TOutput | undefined
export function switcher<TOutput, TFallback extends string = Runtime>(
  obj: Partial<Record<Runtime, TOutput>> & Record<TFallback, TOutput>,
  fallback: TFallback
): TOutput
export function switcher<TOutput>(obj: Partial<Record<Runtime, TOutput>>, fallback?: Runtime): TOutput | undefined {
  const runtime = get()

  return obj[fallback ?? runtime]
}

/**
 * Dynamic import based on switch data, see runtimeSwitch.
 */

export function importer<TOutput>(imports: Partial<Record<Runtime, string>>): Promise<TOutput | undefined>
export function importer<TOutput, TFallback extends string = Runtime>(
  imports: Partial<Record<Runtime, string>> & Record<TFallback, string>,
  fallback: TFallback
): Promise<TOutput>
export async function importer<TOutput>(imports: Partial<Record<Runtime, string>>, fallback?: Runtime): Promise<TOutput | undefined> {
  const runtime = get()

  return import((imports as Record<Runtime, string>)[fallback ?? runtime])
}
