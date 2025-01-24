import { redirect } from 'next/navigation';
import { auth } from '../../lib/auth';
import CursosPage from './CursosPage';
import { headers } from 'next/headers';

export default async function Cursos() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return redirect('/');
  }

  const user = session.user;

  return (
    <div>
      <CursosPage
        
      />
    </div>
  );
}
