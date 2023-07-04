const runtimes = {
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

  return 'node'
}

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
 * Retrieve the version used in the current runtime.
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
export function runtimeSwitch<T>(obj: Partial<Record<Runtime, T>>): T | undefined {
  const runtime = getRuntime()

  return obj[runtime]
}

/**
 * Dynamic import based on switch data, see runtimeSwitch.
 */
export async function runtimeImport(imports: Partial<Record<Runtime, string>>): Promise<any | undefined> {
  const runtime = getRuntime()

  if (!imports[runtime]) {
    return undefined
  }

  return import((imports as Record<Runtime, string>)[runtime])
}
