import prisma from '../../../../../prisma/client'

const getUniqueIssue = async (id: string) => {
  try {
    const checkId = Number.isNaN(Number(id))
    if (checkId) {
      throw new Error('Id is not valid', { cause: 400 })
    }
    const issueId = parseInt(id)
    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
    })
    if (!issue) {
      throw new Error('issue not found', { cause: 404 })
    }
    return issue
  } catch (error) {
    throw error
  }
}

export default getUniqueIssue
