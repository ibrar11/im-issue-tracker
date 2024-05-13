import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../prisma/client'
import { z } from 'zod'

const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title cannot be more than 255 characters.'),
  description: z
    .string()
    .min(1, 'Description cannot be empty')
})

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const validateIssueSchema = createIssueSchema.safeParse(body)
  if (!validateIssueSchema.success) {
    return NextResponse.json(validateIssueSchema.error.format(), {
      status: 400,
    })
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  })
  return NextResponse.json(newIssue, { status: 201 })
}
