import { Label } from '@/components/ui/label'
import { Timeline } from '@/components/ui/timeline'
import db from '@/db'
import { ITag } from '@/db/idb'
import { Box, Stack, Typography } from '@mui/material'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'

export default function TimeLineView() {
  const traces = useLiveQuery(() => db.traces.toArray(), [])
  const traceTags = useLiveQuery(() => db.traceTags.toArray(), [])
  const tags = useLiveQuery(() => db.tags.toArray(), [])

  const data = useMemo(() => {
    if (!traces) return []

    const groupedTags = traceTags?.reduce((acc, curr) => {
      const tag = tags?.find((tag) => tag.id === curr.tagId)
      if (!acc[curr.traceId]) {
        acc[curr.traceId] = []
      }
      if (tag) {
        acc[curr.traceId].push(tag)
      }
      return acc
    }, {} as Record<number, ITag[]>)

    const joinedTraces = traces.map((trace) => ({
      ...trace,
      tags: groupedTags?.[trace.id] || [],
    }))

    return joinedTraces
  }, [traces, traceTags, tags])

  return (
    <Box p={2} width={800}>
      <Timeline
        data={data}
        render={(data) => (
          <Stack spacing={1}>
            <Typography variant="subtitle2">{data.title}</Typography>
            <Stack direction="row" spacing={0.5}>
              {data.tags.map((tag) => (
                <Label key={tag.id} name={tag.name} />
              ))}
            </Stack>
          </Stack>
        )}
      />
    </Box>
  )
}
