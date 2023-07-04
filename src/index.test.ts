import { expect, test } from 'bun:test'

import { getRuntime } from './index'

test('getRuntime', () => {
  expect(getRuntime).toBeDefined()
})
