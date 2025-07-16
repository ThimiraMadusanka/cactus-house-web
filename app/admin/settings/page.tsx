import AssistentForm from '@/components/shared/AssistentForm'
import ProfileForm from '@/components/shared/ProfileForm'
import React from 'react'

const Settings = () => {
  return (
    <>
      <div className="bg-white rounded-md mb-5">
        <div className="p-5">
          <h1 className="font-extrabold page_title">Profile Info</h1>
          <ProfileForm />
        </div>
      </div>
      <div className="bg-white rounded-md">
        <div className="p-5">
          <h1 className="font-extrabold page_title">Assistent Info</h1>
          <AssistentForm />
        </div>
      </div>
    </>
  )
}

export default Settings