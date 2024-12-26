import styles from './OverlayContainer.module.css';

interface OverlayContainerProps {
  children: React.ReactNode;
  onClose?: () => void;
}

function OverlayContainer({ children, onClose }: OverlayContainerProps) {
  return (
    <div className={styles['overlay-container']} onClick={onClose}>
      {children}
    </div>
  );
}

export default OverlayContainer;
