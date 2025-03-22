// hooks/useToast.ts
import { toast as sonnerToast } from 'sonner';
import { Toast } from '../components/toast/Toast';

export function useToast() {
  const toast = (toastData) => {
    return sonnerToast.custom((id) => (
      <Toast
        id={id}
        title={toastData.title}
        description={toastData.description}
        button={toastData.button}
      />
    ));
  };

  return { toast };
}
