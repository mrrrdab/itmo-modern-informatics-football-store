import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_ROUTER, MODALS } from '@/constants';
import { useGetUserPayloadQuery, useModal } from '@/hooks';

import { Button } from '../shadcn';
import { ModalBase } from '../common';

export const EmailVerificationRequiredModal: React.FC = () => {
  const navigate = useNavigate();
  const { data: userData } = useGetUserPayloadQuery();

  const { closeModal } = useModal();

  const handleModalClose = useCallback(() => {
    closeModal(MODALS.EMAIL_VERIFICATION_REQUIRED);
  }, [closeModal]);

  return (
    <ModalBase
      modalId={MODALS.EMAIL_VERIFICATION_REQUIRED}
      title="Email Verification Required"
      onClose={handleModalClose}
    >
      <div className="flex flex-col gap-4 text-zinc-500 mb-6">
        <p>Your account is not verified. To sign in and start making purchases, you need to verify your email.</p>
        <p>Please verify your account to continue.</p>
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            handleModalClose();
            navigate(APP_ROUTER.EMAIL_VERIFICATION, { state: { email: userData?.email } });
          }}
        >
          Verify Account
        </Button>
      </div>
    </ModalBase>
  );
};
