import { db } from "@cuurly/db";

type ProfilePageProps = {
  searchParams: Promise<{
    username?: string;
  }>;
};

const ProfilePage = async ({ searchParams }: ProfilePageProps) => {
  const { username } = await searchParams;

  if (!username) return null;

  const user = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profile: {
        select: {
          bio: true,
          website: true,
        },
      },
    },
  });

  if (!user) return null;

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <h2 className="text-lg">{user.username}</h2>
      </div>
    </div>
  );
};

export default ProfilePage;
