import {createInertiaApp} from '@inertiajs/react';
import {createRoot} from 'react-dom/client';

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', {eager: true});
    return pages[`./Pages/${name}.jsx`] || pages[`./Pages/Errors/Error404.jsx`];
  },
  title: (title) => (title ? `${title} - Quick Turn` : 'Quick Turn'),
  setup({el, App, props}) {
    createRoot(el).render(<App {...props} />);
  },
});
