const runtimes = {
  bun: globalThis.Bun,
  deno: globalThis.Deno,
  node: undefined,
  //for testing
  jest: globalThis.jest,
} as const

export type Runtime = keyof typeof runtimes

export function isBun(): boolean {
  return getRuntime() === 'bun'
}

export function isDeno(): boolean {
  return getRuntime() === 'deno'
}

export function isNode(): boolean {
  return getRuntime() === 'node'
}

export function isJest(): boolean {
  return getRuntime() === 'jest'
}

/**
 * Return the current runtime.
 */
export function getRuntime(): Runtime {
  if (runtimes.bun) {
    return 'bun'
  }
  if (runtimes.deno) {
    return 'deno'
  }

  if (runtimes.jest) {
    return 'jest'
  }

  return 'bun'
}

/**
 * Retreive the version used in the current runtime.
 */
export function getRuntimeVersion(): string {
  const runtime = getRuntime()

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
export function runtimeSwitch<T>(obj: Record<Runtime, T>): T {
  const runtime = getRuntime()

  return obj[runtime]
}

/**
 * Dynamic import based on switch data, see runtimeSwitch,
 */
export async function runtimeImport(imports: Record<Runtime, string>): Promise<any> {
  const runtime = getRuntime()

  return import(imports[runtime])
}
