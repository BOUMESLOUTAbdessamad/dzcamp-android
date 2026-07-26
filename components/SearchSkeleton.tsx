import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/colors';

function PulseBar({ style }: { style?: object }) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return <Animated.View style={[styles.bar, style, { opacity }]} />;
}

export default function SearchSkeleton() {
  return (
    <View>
      {[0, 1, 2].map((i) => (
        <View key={i} style={styles.card}>
          <PulseBar style={styles.imagePlaceholder} />
          <View style={styles.content}>
            <PulseBar style={styles.titleBar} />
            <PulseBar style={styles.locationBar} />
            <PulseBar style={styles.spotsBar} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: Colors.background,
  },
  imagePlaceholder: {
    height: 160,
    width: '100%',
    backgroundColor: '#E8E8E8',
    borderRadius: 0,
  },
  content: {
    padding: 14,
    gap: 8,
  },
  titleBar: {
    height: 16,
    width: '65%',
    borderRadius: 4,
    backgroundColor: '#E8E8E8',
  },
  locationBar: {
    height: 12,
    width: '45%',
    borderRadius: 4,
    backgroundColor: '#E8E8E8',
  },
  spotsBar: {
    height: 12,
    width: '30%',
    borderRadius: 4,
    backgroundColor: '#E8E8E8',
  },
  bar: {
    borderRadius: 4,
  },
});
