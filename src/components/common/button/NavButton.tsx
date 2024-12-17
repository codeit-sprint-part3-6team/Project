import styles from './NavButton.module.css';

type NavButtonProps = {
  btnType: 'management' | 'invite';
  buttonName: string;
  onClick: () => void;
};

function NavButton({ btnType, buttonName, onClick }: NavButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[btnType]}`}
      type="button"
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
}

export default NavButton;
