'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import { useForm, Controller } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema } from '@/app/api/validationSchemas'
import { z } from 'zod'
import { ErrorMessage, Spinner } from '@/app/components'

type IssueFormData = z.infer<typeof issueSchema>

type IssueFormProps = {
  id?: string
}

const IssueForm = ({ id }: IssueFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const queryParams = useSearchParams()

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      if (queryParams.get('title')) {
        await axios.patch(`/api/issues/${id}`, data)
      } else {
        await axios.post('/api/issues', data)
      }
      setIsSubmitting(false)
      router.push('/issues')
    } catch (error: any) {
      setIsSubmitting(false)
      setError('An unexpected error occured.')
    }
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={queryParams?.get('title') as string}
          placeholder="Title"
          {...register('title')}
        />
        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={queryParams?.get('description') as string}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors?.description?.message}</ErrorMessage>
        <Button className="!cursor-pointer">
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
