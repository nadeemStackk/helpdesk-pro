import { AnimatePresence, motion } from 'framer-motion';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, title, message, confirmLabel = 'Confirm', onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="modal-box"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{title}</h3>
            <p>{message}</p>
            <div className="modal-actions">
              <button className="modal-btn-cancel" onClick={onCancel}>
                Cancel
              </button>
              <button className="modal-btn-confirm" onClick={onConfirm}>
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;