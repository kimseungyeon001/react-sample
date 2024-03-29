import { http, HttpResponse, delay } from 'msw'
import { toDoItems } from './mockData'
import { config } from '@/config'

const baseUrl = config.baseUrl

// 一覧
export function buildFetchToDoItems() {
  return http.get(`${baseUrl}/items`, async () => {
    await delay(1000)
    return HttpResponse.json(toDoItems)
  })
}

export function buildFetchToDoItemsError() {
  return http.get(`${baseUrl}/items`, async () => {
    await delay(1000)
    // NOTE: client error
    return HttpResponse.json('not found', { status: 404 })
    // NOTE: server error
    // return HttpResponse.json('bad gateway', { status: 502 })
    // NOTE: network error
    // return HttpResponse.error()
  })
}

// 詳細
export function buildFetchToDoItem() {
  return http.get(`${baseUrl}/items/:id`, async ({ params }) => {
    await delay(1000)
    const toDoItem = toDoItems.find((item) => item.id === params.id)
    return HttpResponse.json(toDoItem)
  })
}

export function buildFetchToDoItemError() {
  return http.get(`${baseUrl}/items/:id`, async () => {
    await delay(1000)
    // NOTE: client error
    return HttpResponse.json('not found', { status: 404 })
    // NOTE: server error
    // return HttpResponse.json('bad gateway', { status: 502 })
    // NOTE: network error
    // return HttpResponse.error()
  })
}

// 削除
export function buildDeleteToDoItem() {
  return http.delete(`${baseUrl}/items/:id`, async ({ params }) => {
    await delay(1000)
    const toDoItem = toDoItems.find((item) => item.id === params.id)
    return HttpResponse.json(toDoItem)
  })
}

export function buildDeleteToDoItemError() {
  return http.delete(`${baseUrl}/items/:id`, async () => {
    await delay(1000)
    // NOTE: client error
    return HttpResponse.json('forbidden', { status: 403 })
    // NOTE: server error
    // return HttpResponse.json('bad gateway', { status: 502 })
    // NOTE: network error
    // return HttpResponse.error()
  })
}

// 追加
export function buildAddToDoItem() {
  return http.post(`${baseUrl}/item-add`, async ({ request }) => {
    await delay(1000)
    const newToDoItem = await request.json()
    return HttpResponse.json(newToDoItem)
  })
}

export function buildAddToDoItemError() {
  return http.post(`${baseUrl}/item-add`, async () => {
    await delay(1000)
    // NOTE: client error
    return HttpResponse.json('forbidden', { status: 403 })
    // NOTE: server error
    // return HttpResponse.json('bad gateway', { status: 502 })
    // NOTE: network error
    // return HttpResponse.error()
  })
}

export const handlers = [
  buildFetchToDoItems(),
  buildFetchToDoItem(),
  buildDeleteToDoItemError(),
  buildAddToDoItem(),
]
