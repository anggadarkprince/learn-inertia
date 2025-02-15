import {Head, Link, useForm, usePage} from '@inertiajs/react';
import {route} from 'ziggy-js';
import Auth from '@/Layouts/Auth.jsx';
import FormError from '@/Components/ErrorText.jsx';
import Alert from '@/Components/Alert.jsx';
import Button from '@/Components/Button.jsx';
import Input from '@/Components/Input.jsx';
import {z} from 'zod';

const schema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .regex(/^[a-zA-Z0-9_.\-]+$/, 'Username can only contain letters, numbers, period, dash and underscores'),
    email: z.string().email('Invalid email format').max(100, 'Email must be less than 100 characters'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must be less than 40 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    password_confirmation: z.string(),
    agreement: z.preprocess(
      (val) => Number(val),
      z.number().refine((val) => val === 1, {
        message: 'You must agree to continue',
      })
    ),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'], // Error message will be attached to password_confirmation field
  });

export default function Register() {
  const {flash} = usePage().props;
  const {data, setData, post, processing, errors, setError, reset} = useForm({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    agreement: '',
  });
  const currentMessage = flash.message || errors.message;

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setData(key, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (result.success) {
      post(route('auth.register'), {
        onSuccess: () => reset(),
      });
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
    <Auth>
      <Head>
        <title>Register</title>
        <meta name="description" content="Create new account" />
      </Head>
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Register</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Create new account</p>
      </div>

      {!processing && currentMessage && (
        <Alert color={flash.status || errors.status} dismissible={true} key={`${currentMessage}-${Date.now()}`}>
          {currentMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          type="text"
          label="Name"
          placeholder="Your full name"
          name="name"
          value={data.name}
          onChange={handleChange}
          disabled={processing}
          error={errors.name}
        />

        <Input
          type="text"
          label="Username"
          placeholder="Username"
          name="username"
          value={data.username}
          onChange={handleChange}
          disabled={processing}
          error={errors.username}
        />

        <Input
          type="email"
          label="Email"
          placeholder="Email address"
          name="email"
          value={data.email}
          onChange={handleChange}
          disabled={processing}
          error={errors.email}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Create new password"
          name="password"
          value={data.password}
          onChange={handleChange}
          disabled={processing}
          error={errors.password}
        />

        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm new password"
          name="password_confirmation"
          value={data.password_confirmation}
          onChange={handleChange}
          disabled={processing}
          error={errors.password_confirmation}
        />

        <div>
          <div className="flex items-center">
            <input
              type="checkbox"
              value={1}
              onChange={(e) => setData('agreement', e.target.checked)}
              name="agreement"
              id="agreement"
              disabled={processing}
            />
            <label htmlFor="agreement" className="text-sm text-gray-700 dark:text-gray-400 ms-2">
              I agree with terms & conditions
            </label>
          </div>
          {errors.agreement && <FormError>{errors.agreement}</FormError>}
        </div>

        <div className="mt-3">
          <Button type="submit" block disabled={processing}>
            Create account
          </Button>
        </div>
      </form>

      <p className="mt-3 text-center">
        <Link
          href={route('auth.login')}
          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
        >
          Already have an account? Login
        </Link>
      </p>
    </Auth>
  );
}
