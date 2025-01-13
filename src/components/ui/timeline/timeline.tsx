import { IGroupedData, ITimelineData, ITimelineProps } from '@/components/ui/timeline/type'
import { Box, Divider, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useMemo } from 'react'

export function Timeline<T extends ITimelineData>({
  data,
  sort = 'desc',
  render,
}: ITimelineProps<T>) {
  const groupedData = useMemo<IGroupedData<T>[]>(() => {
    if (data.length === 0) return []

    const sorted = data.sort((o1, o2) => {
      const flag = dayjs(o1.date).isBefore(dayjs(o2.date))
      if (sort === 'desc' || sort === 'latest') return flag ? 1 : -1
      else return flag ? -1 : 1
    })

    const grouped: IGroupedData<T>[] = []
    let prevGroup: IGroupedData<T> = {
      date: sorted[0].date,
      data: [],
    }
    sorted.forEach((curr) => {
      if (!dayjs(curr.date).isSame(prevGroup.date, 'date')) {
        grouped.push(prevGroup)
        prevGroup = { date: curr.date, data: [] }
      }
      prevGroup.data.push(curr)
    })
    grouped.push(prevGroup)

    return grouped
  }, [data, sort])

  return (
    <Stack width={1}>
      {groupedData.map((curr, i) => {
        return (
          <Stack direction="row" width={1} key={curr.date.getTime()}>
            {/* Left */}
            <Stack
              key={i}
              justifyContent="flex-start"
              borderRight={3}
              borderColor="divider"
              position="relative"
              p={3}
            >
              <Stack justifyContent="center">
                <Typography variant="caption">{dayjs(curr.date).format('MM.DD')}</Typography>
                <Box
                  border={2}
                  borderRadius={100}
                  borderColor="divider"
                  position="absolute"
                  right={0}
                  bgcolor="white"
                  p={1}
                  sx={{ transform: 'translateX(calc(50% + 1px))' }}
                />
              </Stack>
            </Stack>

            {/* Right */}
            <Stack
              borderTop={1}
              borderColor="divider"
              width={1}
              divider={<Divider sx={{ borderStyle: 'dashed' }} />}
            >
              {curr.data.map((curr, i) => {
                return (
                  <Box key={i} p={3} sx={{ ':hover': { bgcolor: 'divider' } }}>
                    {render(curr)}
                  </Box>
                )
              })}
            </Stack>
          </Stack>
        )
      })}
    </Stack>
  )
}
