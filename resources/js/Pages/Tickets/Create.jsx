import {Head, router, useForm} from '@inertiajs/react';
import {route} from 'ziggy-js';
import Main from '@/Layouts/Main.jsx';
import Button from '@/Components/Button.jsx';
import Datepicker from '@/Components/Datepicker.jsx';
import {format, isValid, parse, subDays} from 'date-fns';
import Select from '@/Components/Select.jsx';
import TextArea from '@/Components/TextArea.jsx';
import {z} from 'zod';
import {useEffect} from 'react';
import Input from '@/Components/Input.jsx';

const schema = z.object({
  date: z
    .string()
    .trim()
    .min(1, 'Date is required')
    .refine(
      (val) => {
        return isValid(parse(val, 'dd MMMM y', new Date()));
      },
      {
        message: `Invalid date format. Use a valid date string (Eg. ${format(new Date(), 'dd MMMM y')}).`,
      }
    ),
  schedule_id: z.number().int().positive('Schedule is required'),
  name: z.string().trim().max(50, 'Name must be less than 50 characters'),
  phone: z.string().trim().max(20, 'Phone must be less than 20 characters'),
  email: z.string().email().max(50, 'Email must be less than 50 characters').optional().or(z.literal('')),
  description: z.string().max(500, 'Maximum description is 500 characters').optional().nullable().or(z.literal('')),
});

export default function Create({schedules = []}) {
  const {data, setData, post, processing, errors, setError, clearErrors} = useForm({
    date: '',
    schedule_id: 0,
    name: '',
    phone: '',
    email: '',
    description: '',
  });

  useEffect(() => {
    if (data.date) {
      router.get(
        route('tickets.create'),
        {date: data.date},
        {
          replace: true,
          preserveState: true,
        }
      );
    }
  }, [data.date]);

  function submit(e) {
    e.preventDefault();
    const validateData = {
      ...data,
      schedule_id: +data.schedule_id,
    };
    const result = schema.safeParse(validateData);
    if (result.success) {
      clearErrors();
      post(route('tickets.store'));
    } else {
      const validationErrors = result.error.format();
      const parsedErrors = Object.keys(data).reduce((errors, property) => {
        errors[property] = validationErrors[property]?._errors || '';
        return errors;
      }, {});
      setError(parsedErrors);
    }
  }

  return (
    <Main>
      <Head title="Create Schedule" />
      <div className="rounded bg-white dark:bg-gray-900 p-5">
        <h1 className="text-lg font-medium mb-3">Create New Schedule</h1>
        <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <Datepicker
            label="Date"
            placeholder="Select date"
            name="date"
            minDate={subDays(new Date(), 1)}
            value={data.date}
            onChange={(date) => setData('date', date ? format(date, 'dd MMMM yyyy') : '')}
            disabled={processing}
            error={errors.date}
          />
          <Select
            label="Schedules"
            placeholder="Select schedule"
            name="schedule_id"
            value={data.category_id}
            onChange={(e) => setData('schedule_id', e.target.value)}
            disabled={processing}
            error={errors.schedule_id}
          >
            {schedules.map((schedule) => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.category.category} ({schedule.pic.name})
              </option>
            ))}
          </Select>

          <Input
            type="text"
            label="Name"
            placeholder="User full name"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            disabled={processing}
            error={errors.name}
          />

          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              type="text"
              label="Phone"
              placeholder="Phone or mobile contact"
              name="phone"
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
              disabled={processing}
              error={errors.phone}
            />

            <Input
              type="email"
              label="Email"
              placeholder="Email address"
              name="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              disabled={processing}
              error={errors.email}
            />
          </div>

          <TextArea
            label="Description"
            placeholder="Specific request or issue"
            name="description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            disabled={processing}
            error={errors.description}
          />

          <div className="mt-4 text-end">
            <Button type="submit" disabled={processing}>
              Create Ticket
            </Button>
          </div>
        </form>
      </div>
    </Main>
  );
}
