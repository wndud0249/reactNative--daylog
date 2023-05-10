import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Button, StyleSheet, Text, View} from 'react-native';
import LogContext from '../contexts/LogContext';
import CalendarView from '../components/CalendarView';
import {format} from 'date-fns';
import FeedList from '../components/FeedList';

const CalendarScreen = () => {
  const {logs} = useContext(LogContext);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const markedDates = useMemo(
    () =>
      logs.reduce((acc: any, current: any) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = {marked: true};
        return acc;
      }, {}),
    [logs],
  );

  const filteredLogs = logs.filter(
    (log: any) => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate,
  );

  return (
    <FeedList
      logs={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      }
    />
  );
};

export default CalendarScreen;
