import { useAuth, useUser } from "@clerk/expo";
import { UserButton } from "@clerk/expo/native";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Text as PaperText } from "react-native-paper";
import EventCard from "../../components/home/EventCard";
import { Colors } from "../../constants/colors";
import { fetchSavedEvents } from "../../lib/api";
import type { Event } from "../../types/database";
import { createSupabaseClerkClient } from "../../utils/supabase";

export default function ProfileTab() {
    const { isSignedIn, getToken } = useAuth({
        treatPendingAsSignedOut: false,
    });
    const { user } = useUser();
    const router = useRouter();
    const [savedEvents, setSavedEvents] = useState<Event[]>([]);

    const loadSavedEvents = useCallback(async () => {
        if (!isSignedIn) return;
        const token = await getToken({ template: "supabase" });
        if (!token) return;
        const client = createSupabaseClerkClient(Promise.resolve(token));
        const events = await fetchSavedEvents(client);
        setSavedEvents(events);
    }, [isSignedIn, getToken]);

    useEffect(() => {
        loadSavedEvents();
    }, [loadSavedEvents]);

    if (!isSignedIn) {
        return (
            <View style={styles.container}>
                <View style={styles.loggedOutContainer}>
                    <View style={styles.avatarPlaceholder}>
                        <PaperText style={styles.avatarPlaceholderText}>
                            ?
                        </PaperText>
                    </View>
                    <PaperText
                        variant="titleMedium"
                        style={styles.loggedOutTitle}
                    >
                        Sign in to view your profile
                    </PaperText>
                    <PaperText
                        variant="bodyMedium"
                        style={styles.loggedOutSubtitle}
                    >
                        Access your events, settings, and account details.
                    </PaperText>
                    <Button
                        mode="contained"
                        buttonColor={Colors.primary}
                        textColor="#FFFFFF"
                        style={styles.signInButton}
                        labelStyle={styles.signInButtonLabel}
                        onPress={() => router.push("/(auth)")}
                    >
                        Sign In
                    </Button>
                </View>
            </View>
        );
    }

    const email = user?.primaryEmailAddress?.emailAddress ?? "No email";
    const name = user?.fullName ?? "New User";
    const joined = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
          })
        : null;

    return (
        <FlatList
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            ListHeaderComponent={
                <>
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarContainer}>
                            <UserButton />
                        </View>
                        <PaperText style={styles.name}>{name}</PaperText>
                        <PaperText style={styles.email}>{email}</PaperText>
                    </View>

                    <View style={styles.infoCard}>
                        <InfoRow label="User ID" value={user?.id ?? "—"} />
                        {joined && (
                            <InfoRow label="Member since" value={joined} />
                        )}
                    </View>

                    <View style={styles.savedSection}>
                        <PaperText
                            variant="titleMedium"
                            style={styles.savedTitle}
                        >
                            Saved Events
                        </PaperText>
                    </View>
                </>
            }
            data={savedEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EventCard event={item} />}
            ListEmptyComponent={
                <View style={styles.emptySaved}>
                    <PaperText style={styles.emptyText}>
                        No saved events yet. Tap the bookmark icon on any event
                        to save it.
                    </PaperText>
                </View>
            }
        />
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.infoRow}>
            <PaperText style={styles.infoLabel}>{label}</PaperText>
            <PaperText style={styles.infoValue} numberOfLines={1}>
                {value}
            </PaperText>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        paddingHorizontal: 0,
        paddingTop: 48,
        paddingBottom: 100,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 24,
        paddingTop: 48,
    },
    avatarSection: {
        alignItems: "center",
        marginBottom: 32,
        paddingHorizontal: 24,
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
        marginHorizontal: 24,
        marginBottom: 32,
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
    savedSection: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    savedTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.text,
    },
    emptySaved: {
        paddingHorizontal: 20,
        paddingVertical: 24,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 14,
        color: Colors.text,
        opacity: 0.5,
        textAlign: "center",
        lineHeight: 20,
    },
    loggedOutContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 80,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#F0F0F0",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    avatarPlaceholderText: {
        fontSize: 32,
        fontWeight: "700",
        color: Colors.text,
        opacity: 0.3,
    },
    loggedOutTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.text,
        marginBottom: 6,
        textAlign: "center",
    },
    loggedOutSubtitle: {
        fontSize: 14,
        color: Colors.text,
        opacity: 0.6,
        marginBottom: 24,
        textAlign: "center",
        paddingHorizontal: 20,
    },
    signInButton: {
        borderRadius: 28,
        paddingVertical: 4,
        paddingHorizontal: 32,
    },
    signInButtonLabel: {
        fontSize: 16,
        fontWeight: "600",
    },
});
