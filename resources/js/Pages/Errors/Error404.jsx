import {Head, usePage} from '@inertiajs/react';
import Main from '@/Layouts/Main.jsx';
import Button from '../../Components/Button.jsx';
import {route} from 'ziggy-js';
import {Fragment} from 'react';

export default function Error404({message}) {
  const {auth} = usePage().props;
  let Wrapper = Fragment;
  if (auth?.user) {
    Wrapper = Main;
  }
  return (
    <Wrapper>
      <Head title="Page not found" />
      <div className="flex flex-col items-center justify-center py-5 min-h-[calc(100vh-110px)] bg-gray-100 dark:bg-gray-900 rounded">
        <h1 className="text-5xl font-bold text-rose-500">404</h1>
        <div className="text-center mb-3">
          <p className="text-lg text-gray-700 dark:text-gray-500">Oops! The page you are looking for does not exist.</p>
          <p className="text-sm text-gray-400 dark:text-gray-600">{message}</p>
        </div>
        <Button href={route('dashboard')}>← Go Home</Button>
      </div>
    </Wrapper>
  );
}
