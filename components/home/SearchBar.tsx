import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { Colors } from "../../constants/colors";

export default function SearchBar() {
  const navigation = useRouter();

  return (
    <Searchbar
      placeholder="Search events"
      value=""
      editable={false}
      onPress={() => navigation.navigate("/search")}
      style={styles.bar}
      inputStyle={styles.input}
      icon="magnify"
      iconColor={Colors.text}
      traileringIcon="tune-variant"
      traileringIconColor={Colors.primary}
      theme={{ colors: { onSurfaceVariant: "#999" } }}
    />
  );
}

const styles = StyleSheet.create({
  bar: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 0,
    backgroundColor: Colors.background,
    height: 48,
  },
  input: {
    fontSize: 15,
    color: Colors.text,
    minHeight: 48,
  },
});
