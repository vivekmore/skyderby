'use client'

import { createConsumer, type Consumer } from '@rails/actioncable'
import { apiBaseUrl } from './api/client'

let consumer: Consumer | null = null

/**
 * Shared ActionCable consumer pointed at the Rails `/cable` endpoint.
 * Used to subscribe to channels such as `EventUpdatesChannel` for live
 * scoreboards.
 */
export function cableConsumer(): Consumer {
  if (!consumer) {
    const wsUrl = apiBaseUrl().replace(/^http/, 'ws') + '/cable'
    consumer = createConsumer(wsUrl)
  }
  return consumer
}
