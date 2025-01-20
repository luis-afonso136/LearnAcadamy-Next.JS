import { redirect } from 'next/navigation';
import { auth } from '../../lib/auth';
import EditProfileForm from './EditProfileForm';
import { headers } from 'next/headers';

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return redirect('/');
  }

  const user = session.user;

  return (
    <div className="mt-10 text-center ml-14 p-4">
      <EditProfileForm
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image ?? undefined, // Converte null para undefined
        }}
      />
    </div>
  );
}
