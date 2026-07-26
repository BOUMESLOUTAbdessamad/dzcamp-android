import { ScrollView, StyleSheet, Text, Pressable } from 'react-native';
import { Colors } from '../constants/colors';

interface ChipOption {
  label: string;
  value: string;
}

interface Props {
  options: ChipOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function FilterChipRow({ options, selectedValue, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {options.map((opt) => {
        const selected = opt.value === selectedValue;
        return (
          <Pressable
            key={opt.value}
            style={[styles.chip, selected && styles.chipSelected]}
            onPress={() => onSelect(opt.value)}
          >
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    gap: 8,
    paddingVertical: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  labelSelected: {
    color: '#FFFFFF',
  },
});
