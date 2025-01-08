// asc === oldest, desc === latest
type SortType = 'asc' | 'desc' | 'oldest' | 'latest'

export interface ITimelineData {
  date: Date
}

export interface ITimelineProps<T extends ITimelineData> {
  data: T[]
  sort?: SortType
  render: (data: T) => React.ReactNode
}

export interface IGroupedData<T> {
  date: Date
  data: T[]
}
