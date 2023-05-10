import React, {MutableRefObject, useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface WriteEditorProps {
  title?: any;
  body?: any;
  onChangeTitle?: any;
  onChangeBody?: any;
}

const WriteEditor = ({
  title,
  body,
  onChangeTitle,
  onChangeBody,
}: WriteEditorProps) => {
  const bodyRef = useRef<TextInput | null>(null);
  return (
    <View style={styles.block}>
      <TextInput
        style={styles.titleInput}
        placeholder="제목을 입력하세요"
        returnKeyType="next"
        onChangeText={onChangeTitle}
        value={title}
        onSubmitEditing={() => {
          if (bodyRef.current) {
            bodyRef.current.focus();
          }
        }}
      />
      <TextInput
        style={styles.bodyInput}
        placeholder="당신의 오늘을 기록해보세요"
        multiline
        textAlignVertical="top"
        onChangeText={onChangeBody}
        value={body}
        ref={bodyRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {flex: 1, padding: 16},
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: '#263238',
    fontWeight: 'bold',
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#263238',
  },
});

export default WriteEditor;
