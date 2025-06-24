import { Avatar } from '@/components/avatar'

export function UserAvatar({ user }) {
  return (
    <>
      
      <Avatar src={user.avatarUrl} initials={user.initials} className="size-8 bg-purple-500 text-white" />
     
    </>
  )
}