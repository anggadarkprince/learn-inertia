import {Head, router} from '@inertiajs/react';
import Main from '@/Layouts/Main.jsx';
import {formatDate} from 'date-fns';
import Button from '../../Components/Button.jsx';
import {route} from 'ziggy-js';
import noAvatar from '../../../img/no-avatar.png';

export default function Show({user}) {
  return (
    <Main>
      <Head title={user.name} />
      <div className="space-y-3">
        <div className="rounded bg-white dark:bg-gray-900 p-5">
          <h1 className="text-lg font-medium mb-3">View User</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-base mb-3">
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="font-medium">Name</div>
                <div className="col-span-3">{user.name}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="font-medium">Username</div>
                <div className="col-span-3">{user.username}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="font-medium">Avatar</div>
                <div className="col-span-3">
                  <img
                    src={user.avatar ? user.avatar_url : noAvatar}
                    className="w-20 h-20 rounded object-cover"
                    alt="Avatar"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="font-medium">Email</div>
                <div className="col-span-3">{user.email}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="font-medium">Created At</div>
                <div className="col-span-3">{formatDate(user.created_at, 'dd MMM y HH:mm')}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="font-medium">Updated At</div>
                <div className="col-span-3">
                  {user?.updated_at ? formatDate(user?.updated_at, 'dd MMM y HH:mm') : '-'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between rounded bg-white dark:bg-gray-900 p-5">
          <Button onClick={() => window.history.back()} disabled={window.history.length <= 1} color="light">
            ← Back
          </Button>
          <Button onClick={() => router.visit(route('users.edit', {user}))} color="warning">
            Edit User
          </Button>
        </div>
      </div>
    </Main>
  );
}
