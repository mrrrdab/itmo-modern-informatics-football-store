import { useState } from 'react';

import { useGetUserPayloadQuery } from '@/hooks';
import { Button, ChangeUserInfoForm, ChangeUserPasswordForm, ErrorMessage, Skeleton, UserInfo } from '@/components';

export const ProfilePage = () => {
  const [isEditingMainInfo, setIsEditingMainInfo] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const { data: userData, isLoading: isLoadingUser, isError: isErrorUser } = useGetUserPayloadQuery();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex flex-col gap-2 items-center mb-8">
        <h2 className="text-xl font-bold">Your Profile</h2>
        <p className="font-semibold text-zinc-500 text-center">
          Profile Page. Here you can view and update your personal information.
        </p>
      </div>
      {isLoadingUser ? (
        <Skeleton className="h-64 w-full" />
      ) : isErrorUser || !userData ? (
        <div className="flex justify-center items-center mt-2 lg:mt-10">
          <ErrorMessage size="lg">Server Error</ErrorMessage>
        </div>
      ) : isEditingMainInfo ? (
        <ChangeUserInfoForm
          userCurrentFirstName={userData.firstName}
          userCurrentLastName={userData.lastName}
          userCurrentPhoneNumber={userData.phoneNumber}
          onUserInfoChange={() => setIsEditingMainInfo(false)}
          onCancel={() => setIsEditingMainInfo(false)}
        />
      ) : isEditingPassword ? (
        <ChangeUserPasswordForm
          onUserPasswordChange={() => setIsEditingPassword(false)}
          onCancel={() => setIsEditingPassword(false)}
        />
      ) : (
        <div className="flex flex-col gap-6">
          <UserInfo
            firstName={userData.firstName}
            lastName={userData.lastName}
            email={userData.email}
            phoneNumber={userData.phoneNumber}
            birthDate={userData.birthDate}
          />
          <div className="flex flex-col gap-4 items-center">
            <Button type="button" variant="secondary" className="w-32" onClick={() => setIsEditingMainInfo(true)}>
              Edit Main Info
            </Button>
            <Button type="button" variant="ghost" className="w-32" onClick={() => setIsEditingPassword(true)}>
              Change Password
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
