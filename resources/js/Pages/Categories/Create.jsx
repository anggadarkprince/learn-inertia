import {Head, useForm} from '@inertiajs/react';
import {route} from 'ziggy-js';
import {z} from 'zod';
import Main from '@/Layouts/Main.jsx';
import Input from '@/Components/Input.jsx';
import TextArea from '@/Components/TextArea.jsx';
import Button from '@/Components/Button.jsx';
import {validate} from '@/helpers.js';
import {useEffect} from 'react';

const schema = z.object({
  category: z.string().trim().min(1, 'Category is required'),
  description: z.string().max(500, 'Maximum description is 500 characters').optional().nullable().or(z.literal('')),
});

export default function Create() {
  const {data, setData, post, processing, errors, setError, clearErrors} = useForm({
    category: '',
    description: '',
  });

  useEffect(() => {
    validate(schema, data, setError, clearErrors);
  }, [data]);

  function submit(e) {
    e.preventDefault();
    if (validate(schema, data, setError, clearErrors)) {
      post(route('categories.store'));
    }
  }

  return (
    <Main>
      <Head title="Create Category" />
      <div className="rounded bg-white dark:bg-gray-900 p-5">
        <h1 className="text-lg font-medium mb-3">Create New Category</h1>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Input
            type="text"
            label="Category"
            placeholder="Category title"
            name="category"
            value={data.category}
            onChange={(e) => setData('category', e.target.value)}
            disabled={processing}
            error={errors.category}
          />
          <TextArea
            label="Description"
            placeholder="Category description"
            name="description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            disabled={processing}
            error={errors.description}
          />

          <div className="mt-4 text-end">
            <Button type="submit" disabled={processing}>
              Create Category
            </Button>
          </div>
        </form>
      </div>
    </Main>
  );
}
