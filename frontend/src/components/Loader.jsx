import React from 'react'

const Loader = ({color=`border-blue-200 `}) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`h-6 w-6 animate-spin rounded-full border-2 border-solid border-t-transparent ${color}`}></div>
    </div>
  )
}

export default Loader
