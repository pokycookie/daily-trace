import { FormDate, FormInput, FormSelect, IFormSelectOption } from '@/components/ui/form'
import db from '@/db'
import { Button } from '@mui/material'
import { Stack, TextField } from '@mui/material'
import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

interface IForm {
  title: string
  date: Date
  tags: IFormSelectOption<number>[]
}

export default function CreateTraceForm() {
  const tags = useLiveQuery(() => db.tags.toArray(), [])

  const tagOptions = useMemo<IFormSelectOption<number>[]>(() => {
    if (!tags) return []
    return tags.map((tag) => ({ value: tag.id, label: tag.name }))
  }, [tags])

  const formMethod = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      date: dayjs().toDate(),
      tags: [],
    },
  })
  const { control, handleSubmit, reset } = formMethod

  const submitHandler = async (form: IForm) => {
    try {
      await db.transaction('rw', [db.traces, db.traceTags, db.tags], async () => {
        const traceId = await db.traces.add({ title: form.title, date: form.date, content: '' })

        for (const tag of form.tags) {
          if (!tag.isNew && tag.value) {
            db.traceTags.add({ traceId, tagId: tag.value })
            continue
          }
          // 새로운 태그 추가
          const tagId = await db.tags.add({ name: tag.label })
          db.traceTags.add({ traceId, tagId })
        }
      })
      reset()
    } catch (error) {
      console.error('트랜잭션 실패')
      console.error(error)
    }
  }

  const preventSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return
    const inputValue = (e.target as HTMLInputElement).value
    if (inputValue.trim() !== '') e.preventDefault()
  }

  return (
    <Box width={1} maxWidth={400} p={2} border={1} borderRadius={1} borderColor="divider">
      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        <Stack spacing={1.5}>
          <Box>
            <FormInput
              name="title"
              control={control}
              fullWidth
              label="오늘 한 일"
              rows={4}
              size="small"
              rules={{
                required: true,
                validate: {
                  trim: (value) => (typeof value === 'string' ? value.trim() !== '' : true),
                },
              }}
            />
          </Box>

          <Box>
            <FormDate
              name="date"
              control={control}
              label="날짜 선택"
              defaultValue={dayjs()}
              sx={{ width: '100%' }}
            />
          </Box>

          <Box>
            <FormSelect
              name="tags"
              control={control}
              multiple
              options={tagOptions}
              renderInput={(params) => (
                <TextField {...params} label="태그" placeholder="태그를 입력하세요" />
              )}
              size="small"
              onKeyDown={preventSubmit}
            />
          </Box>

          <Button variant="contained" fullWidth type="submit">
            저장하기
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
