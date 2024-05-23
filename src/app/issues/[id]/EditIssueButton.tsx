import { Issue } from '@prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({ issue }: { issue?: Issue }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link
        href={{
          pathname: `/issues/${issue?.id}/edit`,
          query: { title: issue?.title, description: issue?.description },
        }}
      >
        Edit Issue
      </Link>
    </Button>
  )
}

export default EditIssueButton
