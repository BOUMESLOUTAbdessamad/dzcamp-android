import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from '../../constants/colors';

interface Props {
  text: string;
}

export default function EventDescription({ text }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.heading}>
        Description
      </Text>
      <Text
        variant="bodyMedium"
        style={styles.body}
        numberOfLines={expanded ? undefined : 2}
      >
        {text}
      </Text>
      <Text
        variant="labelLarge"
        style={styles.toggle}
        onPress={() => setExpanded((prev) => !prev)}
      >
        {expanded ? 'Read less' : 'Read more'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  heading: {
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  body: {
    color: Colors.text,
    lineHeight: 22,
  },
  toggle: {
    color: Colors.primary,
    marginTop: 4,
  },
});
