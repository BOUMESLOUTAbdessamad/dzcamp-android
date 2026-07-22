import { useNavigation } from "@react-navigation/native";
import { Image, Share, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import type { Event } from "../../types/database";

interface Props {
  event: Event;
  saved: boolean;
  onToggleSave: () => void;
}

export default function DetailHeader({ event, saved, onToggleSave }: Props) {
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${event.title} — ${event.location}`,
        url: "https://web.facebook.com/abdou.the.real/",
      });
    } catch {}
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />
      <View style={styles.scrim} />
      <View style={styles.buttonRow}>
        <IconButton
          icon="arrow-left"
          iconColor="#FFFFFF"
          size={22}
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.rightButtons}>
          <IconButton
            icon={saved ? "bookmark" : "bookmark-outline"}
            iconColor="#FFFFFF"
            size={22}
            style={styles.iconButton}
            onPress={onToggleSave}
          />
          <IconButton
            icon="share-variant-outline"
            iconColor="#FFFFFF"
            size={22}
            style={styles.iconButton}
            onPress={handleShare}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 320,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  buttonRow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 4,
  },
  rightButtons: {
    flexDirection: "row",
  },
  iconButton: {
    margin: 0,
  },
});
