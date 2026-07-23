import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Link, type Href } from "expo-router";
import { useSignIn, useAuth } from "@clerk/expo";
import { createSupabaseClerkClient } from "../../utils/supabase";
import { Colors } from "../../constants/colors";

export default function SignInScreen() {
  const { signIn, errors } = useSignIn();
  const { isSignedIn, userId, getToken } = useAuth();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const pendingEmailRef = useRef<string | null>(null);

  useEffect(() => {
    if (isSignedIn && userId && pendingEmailRef.current) {
      const supabase = createSupabaseClerkClient(getToken());
      supabase
        .from("users")
        .upsert(
          { clerk_id: userId, email: pendingEmailRef.current },
          { onConflict: "clerk_id" },
        );
      pendingEmailRef.current = null;
    }
  }, [isSignedIn, userId, getToken]);

  const handleSubmit = async () => {
    setGeneralError(null);
    setLoading(true);

    try {
      const { error } = await signIn.password({ emailAddress, password });
      if (error) {
        setGeneralError(error.longMessage ?? error.message);
        return;
      }

      if (signIn.status === "needs_second_factor") {
        setGeneralError("MFA is not enabled. Please contact support.");
        return;
      }

      if (signIn.status === "complete") {
        const { error: finalizeError } = await signIn.finalize();
        if (finalizeError) {
          setGeneralError(finalizeError.longMessage ?? finalizeError.message);
          return;
        }
        pendingEmailRef.current = emailAddress;
      }
    } catch {
      setGeneralError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {generalError ? <Text style={styles.error}>{generalError}</Text> : null}

      <View style={styles.field}>
        <TextInput
          style={[
            styles.input,
            errors.fields.identifier ? styles.inputError : null,
          ]}
          placeholder="Email"
          placeholderTextColor="#999999"
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        {errors.fields.identifier ? (
          <Text style={styles.fieldError}>
            {errors.fields.identifier.message}
          </Text>
        ) : null}
      </View>

      <View style={styles.field}>
        <TextInput
          style={[
            styles.input,
            errors.fields.password ? styles.inputError : null,
          ]}
          placeholder="Password"
          placeholderTextColor="#999999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />
        {errors.fields.password ? (
          <Text style={styles.fieldError}>
            {errors.fields.password.message}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[styles.button, loading ? styles.buttonDisabled : null]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <Link href={"/(auth)/sign-up" as Href} asChild>
        <TouchableOpacity>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 32,
    textAlign: "center",
  },
  field: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: Colors.text,
  },
  inputError: {
    borderColor: "#E53935",
  },
  fieldError: {
    color: "#E53935",
    fontSize: 13,
    marginTop: 4,
  },
  error: {
    color: "#E53935",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    color: Colors.primary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
});
