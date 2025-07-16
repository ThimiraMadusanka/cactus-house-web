import ProfileForm from "@/components/shared/ProfileForm"

const Profile = () => {
  return (
    <div className="bg-white rounded-md mb-5">
      <div className="p-5">
        <h1 className="font-extrabold page_title">Profile Info</h1>
        <ProfileForm />
      </div>
    </div>
  )
}

export default Profile
