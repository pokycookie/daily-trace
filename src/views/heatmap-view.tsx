import { CalendarHeatmap, ICalenderHeatmapData } from '@/components/ui/heatmap'
import db from '@/db'
import { Box } from '@mui/material'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'

export default function HeatmapView() {
  const traces = useLiveQuery(() => db.traces.toArray(), [])

  const data = useMemo(() => {
    if (!traces) return []
    return traces.reduce((acc, curr) => {
      acc.push({ date: curr.date, count: 1 }) // count는 이후 중요도에 영향
      return acc
    }, [] as ICalenderHeatmapData[])
  }, [traces])

  return (
    <Box p={4}>
      <CalendarHeatmap data={data} endDate={new Date()} />
    </Box>
  )
}
