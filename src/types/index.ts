import type { Record } from 'pocketbase'

export interface Post extends Record {
    title: string
    content: string
    thumbnail: string
}
