import { config } from '@/config'
import { CustomError } from '@/utils/errorUtils'

const baseUrl = config.baseUrl

// NOTE: 削除
export async function deleteToDoItem(id: string) {
  try {
    const response = await fetch(`${baseUrl}/items/${id}`, {
      method: 'DELETE',
    })
    switch (response.ok) {
      case true:
        return response.json()
      default:
        const message = response.statusText
        const statusCode = response.status
        throw new CustomError(message, statusCode)
    }
  } catch (error: unknown) {
    console.error('toDoItems error', error)
    switch ((error as CustomError).statusCode) {
      case 403:
        return { errorMessage: 'forbidden' }
      default:
        return { errorMessage: 'unexpected error' }
    }
  }
}

export interface AddToDoItemParams {
  title: string
  description: string
}

// NOTE: 追加
export async function addToDoItem(params: AddToDoItemParams) {
  try {
    const response = await fetch(`${baseUrl}/item-add`, {
      method: 'POST',
      body: JSON.stringify(params),
    })
    switch (response.ok) {
      case true:
        return response.json()
      default:
        const message = response.statusText
        const statusCode = response.status
        throw new CustomError(message, statusCode)
    }
  } catch (error: unknown) {
    console.error('toDoItems error', error)
    switch ((error as CustomError).statusCode) {
      case 403:
        return { errorMessage: 'forbidden' }
      default:
        return { errorMessage: 'unexpected error' }
    }
  }
}
