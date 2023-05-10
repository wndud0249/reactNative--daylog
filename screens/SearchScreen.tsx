import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SearchContext from '../contexts/SearchContext';
import LogContext from '../contexts/LogContext';
import FeedList from '../components/FeedList';
import EmptySearchResult from '../components/EmptySearchResult';

const SearchScreen = () => {
  const {keyword} = useContext(SearchContext);
  const {logs} = useContext(LogContext);
  const filtered =
    keyword === ''
      ? []
      : logs.filter((log: any) =>
          [log.title, log.body].some(text => text.includes(keyword)),
        );
  if (keyword === '') {
    return <EmptySearchResult type="EMPTY_KEYWORD" />;
  }
  if (filtered.length === 0) {
    return <EmptySearchResult type="NOT_FOUND" />;
  }
  return (
    <View style={styles.block}>
      <FeedList logs={filtered} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default SearchScreen;
