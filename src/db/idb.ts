import Dexie, { EntityTable } from 'dexie'

export interface ITrace {
  id: number
  title: string
  content: string
  date: Date
}

export interface ITraceAttribute {
  id: number
  traceId: number
  type: string
  name: string
}

export interface ITraceTag {
  id: number
  traceId: number
  tagId: number
}

export interface ITag {
  id: number
  name: string
}

export const db = new Dexie('trace') as Dexie & {
  traces: EntityTable<ITrace, 'id'>
  traceAttributes: EntityTable<ITraceAttribute, 'id'>
  traceTags: EntityTable<ITraceTag, 'id'>
  tags: EntityTable<ITag, 'id'>
}

db.version(1).stores({
  traces: '++id, date',
  traceAttributes: '++id',
  traceTags: '++id',
  tags: '++id, name',
})
