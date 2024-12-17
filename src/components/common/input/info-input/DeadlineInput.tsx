import { TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ko from 'date-fns/locale/ko';
import { useState } from 'react';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './DeadlineInput.module.css';

// 라이브러리 글로벌 테마 생성
const globalTheme = createTheme({
  typography: {
    fontSize: 24,
    fontFamily: "'Pretendard', sans-serif",
  },
});

// 라이브러리  TextField 스타일링
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#d9d9d9',
    },
    '&:hover fieldset': {
      borderColor: '#d9d9d9',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
  '& .MuiInputBase-root': {
    height: '48px',
    borderRadius: '8px',
    border: 'none',
  },
  '& .MuiSvgIcon-root': {
    position: 'fixed',
    left: '9px',
    color: '#9fa6b2',
  },
  '& .MuiInputBase-input': {
    fontFamily: "'Pretendard', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    color: '#171717',
    padding: '9px 16px 9px 40px',
    '&::placeholder': {
      color: '#9fa6b2',
      fontWeight: 400,
      fontSize: '16px',
      fontFamily: "'Pretendard', sans-serif",
      opacity: '1',
    },
  },

  [theme.breakpoints.down(743)]: {
    // 라이브러리 모바일 환경
    '& .MuiInputBase-input': {
      fontSize: '14px',
    },
    '& .MuiInputBase-input::placeholder': {
      fontSize: '14px',
    },
  },
}));

export default function DeadlineInput(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (newValue: Date | null): void => {
    setSelectedDate(newValue);
  };

  return (
    <ThemeProvider theme={globalTheme}>
      <section className={styles.container}>
        <p className={styles.title}>마감일</p>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
          <DateTimePicker
            value={selectedDate}
            onChange={handleChange}
            slots={{ textField: StyledTextField }}
            slotProps={{
              textField: {
                fullWidth: true,
                placeholder: '날짜를 입력해 주세요',
              },
            }}
          />
        </LocalizationProvider>
      </section>
    </ThemeProvider>
  );
}
