import { StyleSheet, Text, View } from "react-native";
import { UserButton } from "@clerk/expo/native";
import { useUser } from "@clerk/expo";
import { Colors } from "../../constants/colors";

export default function ProfileTab() {
  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress ?? "No email";
  const name = user?.fullName ?? "New User";
  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          <UserButton />
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.infoCard}>
        <InfoRow label="User ID" value={user?.id ?? "—"} />
        {joined && <InfoRow label="Member since" value={joined} />}
      </View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#E8F5E9",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.6,
  },
  infoCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
    opacity: 0.5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
    maxWidth: "60%",
    textAlign: "right",
  },
});
