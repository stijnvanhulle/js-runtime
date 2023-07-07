import { expect, test } from 'bun:test'

import { get } from './runtime'

test('get', () => {
  expect(get).toBeDefined()
})
