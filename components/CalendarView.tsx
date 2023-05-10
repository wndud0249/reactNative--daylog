import React from 'react';
import {StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarView = ({markedDates, selectedDate, onSelectDate}: any) => {
  // const markedDates = {
  //   '2023-04-17': {
  //     selected: true,
  //   },
  //   '2023-04-18': {
  //     marked: true,
  //   },
  //   '2023-04-19': {
  //     marked: true,
  //   },
  // };
  const markedSelectedDate = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };

  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDate}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009788',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }}
      onDayPress={day => {
        onSelectDate(day.dateString);
      }}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarView;
