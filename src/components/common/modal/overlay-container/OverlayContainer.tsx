import styles from './OverlayContainer.module.css';

function OverlayContainer({ children }) {
  return <div className={styles.OverlayContainer}>{children}</div>;
}

export default OverlayContainer;
