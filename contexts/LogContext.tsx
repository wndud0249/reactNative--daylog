import {createContext, useEffect, useRef, useState} from 'react';
import React from 'react';
import {v4 as uuidv4} from 'uuid';
import logsStorage from '../storages/logsStorage';

interface LogContext {
  logs: any;
  setLogs?: React.Dispatch<React.SetStateAction<any>>;
  onCreate: any;
  onModify: any;
  onRemove: any;
}

const LogContext = createContext<LogContext>({} as LogContext);

export function LogContextProvider({children}: any) {
  const initialLogsRef = useRef(null);
  const [logs, setLogs] = useState<any>([]);

  const onCreate = ({
    title,
    body,
    date,
  }: {
    title: string;
    body: string;
    date: any;
  }) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };

  const onModify = (modified: any) => {
    const nextLogs = logs.map((log: any) =>
      log.id === modified.id ? modified : log,
    );
    setLogs(nextLogs);
  };

  const onRemove = (id: any) => {
    const nextLogs = logs.filter((log: any) => log.id !== id);
    setLogs(nextLogs);
  };

  useEffect(() => {
    (async () => {
      const savedLogs = await logsStorage.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  }, []);

  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return;
    }
    logsStorage.set(logs);
  }, [logs]);

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
