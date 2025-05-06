import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export const UISpinner: React.FC = () => (
  <div className='text-center my-4'>
    <Spinner animation='border' />
  </div>
)
