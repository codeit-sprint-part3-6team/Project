import styles from './OverlayContainer.module.css';

function OverlayContainer({ children }) {
  return <div className={styles['overlay-container']}>{children}</div>;
}

export default OverlayContainer;
