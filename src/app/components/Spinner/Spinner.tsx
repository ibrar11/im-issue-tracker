import React from 'react'

type SpinnerProps = {
  styles?: string
  children?: React.ReactNode
}

const Spinner = ({ styles, children }: SpinnerProps) => {
  return (
    <React.Fragment>
      <div
        className={`text-surface inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white ${styles}`}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      {children}
    </React.Fragment>
  )
}

export default Spinner
