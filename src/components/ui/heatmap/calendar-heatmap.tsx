import { Box, darken, lighten, Stack, Tooltip, useTheme } from '@mui/material'
import dayjs from 'dayjs'
import { useCallback, useMemo } from 'react'

export interface ICalenderHeatmapData {
  date: Date
  count: number
}

interface ICellData {
  date: Date | null
  count: number
}

interface ICalendarHeatmapProps {
  data: ICalenderHeatmapData[]
  endDate: Date
  color?: string
  thresholds?: number[]
  customFn?: (count: number) => string
}

const defaultThresholds = [1, 2, 3, 4]

export function CalendarHeatmap({
  data,
  endDate,
  color: customColor,
  thresholds = defaultThresholds,
  customFn,
}: ICalendarHeatmapProps) {
  const theme = useTheme()

  const startDate = dayjs(endDate).subtract(1, 'y')

  const heatmapArr = useMemo(() => {
    const tmpArrLength = dayjs(endDate).diff(startDate, 'd') + 1
    const tmpArr: ICellData[] = []
    for (let i = 0; i < tmpArrLength; i++) {
      tmpArr.push({ count: 0, date: startDate.add(i, 'd').toDate() })
    }

    for (const curr of data) {
      const isBefore = dayjs(curr.date).isBefore(startDate, 'd')
      const isAfter = dayjs(curr.date).isAfter(endDate, 'd')
      if (isBefore || isAfter) {
        continue
      }
      const idx = dayjs(curr.date).endOf('d').diff(startDate, 'd')
      tmpArr[idx].count += curr.count
    }
    // 앞쪽 빈 칸
    tmpArr.unshift(
      ...Array.from({ length: startDate.day() }, () => ({ count: 0, date: null } as ICellData))
    )
    // 뒤쪽 빈 칸
    tmpArr.push(
      ...Array.from(
        { length: 6 - dayjs(endDate).day() },
        () => ({ count: 0, date: null } as ICellData)
      )
    )

    const result: ICellData[][] = Array.from({ length: 7 }, () => [])
    tmpArr.forEach((cell, i) => {
      result[i % 7].push(cell)
    })
    return result
  }, [data, endDate, startDate])

  const colorSelector = useCallback(
    (count: number) => {
      if (customFn) {
        return customFn(count)
      }
      const color = lighten(customColor ?? theme.palette.primary.main, 0.5)
      for (let i = 0; i < thresholds.length; i++) {
        const next = i === thresholds.length - 1 || count < thresholds[i + 1]
        if (count >= thresholds[i] && next) {
          return darken(color, i * 0.1)
        }
      }
      return theme.palette.divider
    },
    [customColor, customFn, theme, thresholds]
  )

  return (
    <Stack spacing="2px" p={1}>
      {heatmapArr.map((line, i) => (
        <Stack key={i} direction="row" spacing="2px">
          {line.map((cell, j) =>
            cell.date ? (
              <Tooltip
                key={j}
                title={`${dayjs(cell.date).format('YYYY-MM-DD')}: ${cell.count}개`}
                disableInteractive
              >
                <Box
                  flex={1}
                  borderRadius={1}
                  border={1}
                  borderColor="transparent"
                  bgcolor={colorSelector(cell.count)}
                  sx={{ cursor: 'pointer', aspectRatio: 1, ':hover': { borderColor: 'black' } }}
                />
              </Tooltip>
            ) : (
              <Box key={j} border={1} borderColor="transparent" flex={1} sx={{ aspectRatio: 1 }} />
            )
          )}
        </Stack>
      ))}
    </Stack>
  )
}
