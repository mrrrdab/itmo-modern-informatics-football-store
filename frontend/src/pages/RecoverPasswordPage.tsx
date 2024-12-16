/* eslint-disable max-len */
import { RecoverPasswordForm } from '@/components';

export const RecoverPasswordPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-xl font-bold text-center mb-8">Password Recover</h1>
      <div className="flex flex-col gap-2 mb-6 text-center text-sm text-zinc-500 border-2 border-zinc-900 rounded-lg py-3 px-5">
        <p>You will receive an email with a temporary password. You can use it to log in to the system.</p>
        <p>
          We highly recommend that you&nbsp;
          <span className="text-red-500">change your password immediately after logging in</span> for security purposes.
        </p>
      </div>
      <RecoverPasswordForm />
    </div>
  );
};
