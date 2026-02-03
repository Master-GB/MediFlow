// ✅ Fixed ToastContainer.jsx
import { AnimatePresence } from 'framer-motion';
import Toast from '../components/toasts/toast.jsx'

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
            position={toast.position}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;