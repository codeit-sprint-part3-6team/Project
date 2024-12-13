import { TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ko from 'date-fns/locale/ko';
import { useState } from 'react';
import { styled } from '@mui/system';
import styles from './deadline-input.module.css';

// TextField 스타일링
const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    border: 'none',
    color: 'red',
  },
  '& .MuiInputBase-input': {
    fontFamily: "'Pretendard', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    color: '#171717',
    padding: '12px 16px',
  },
});

export default function DeadlineInput() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (newValue) => {
    setSelectedDate(newValue);
  };

  return (
    <section className={styles.container}>
      <p className={styles.title}>마감일</p>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        <DateTimePicker
          value={selectedDate}
          onChange={handleChange}
          slots={{ textField: StyledTextField }} // StyledTextField로 교체
          slotProps={{
            textField: {
              fullWidth: true,
              placeholder: '날짜를 입력해 주세요',
            },
          }}
        />
      </LocalizationProvider>
    </section>
  );
}
