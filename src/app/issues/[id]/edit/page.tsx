import React from 'react'
import IssueForm from '../../_components/IssueForm'

const EditIssuePage = ({ params }: { params: { id: string } }) => {
  return <IssueForm id={params.id} />
}

export default EditIssuePage
