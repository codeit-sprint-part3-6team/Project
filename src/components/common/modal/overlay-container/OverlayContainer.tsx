import styles from './OverlayContainer.module.css';

function OverlayContainer({ children, onClose }) {
  return (
    <div className={styles['overlay-container']} onClick={onClose}>
      {children}
    </div>
  );
}

export default OverlayContainer;
