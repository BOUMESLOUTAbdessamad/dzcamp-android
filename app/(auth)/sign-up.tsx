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
import { useSignUp, useAuth } from "@clerk/expo";
import { createSupabaseClerkClient } from "../../utils/supabase";
import { Colors } from "../../constants/colors";

type SignUpStep = "form" | "code";

export default function SignUpScreen() {
  const { signUp, errors } = useSignUp();
  const { isSignedIn, userId, getToken } = useAuth();

  const [step, setStep] = useState<SignUpStep>("form");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const pendingEmailRef = useRef<string | null>(null);

  useEffect(() => {
    if (isSignedIn && userId && pendingEmailRef.current) {
      const supabase = createSupabaseClerkClient(getToken({ template: "supabase" }));
      supabase
        .from("users")
        .upsert(
          { clerk_id: userId, email: pendingEmailRef.current },
          { onConflict: "clerk_id" },
        );
      pendingEmailRef.current = null;
    }
  }, [isSignedIn, userId, getToken]);

  const handlePasswordSubmit = async () => {
    setGeneralError(null);
    setLoading(true);

    try {
      const { error } = await signUp.password({ emailAddress, password });
      if (error) {
        setGeneralError(error.longMessage ?? error.message);
        return;
      }

      const { error: codeError } = await signUp.verifications.sendEmailCode();
      if (codeError) {
        setGeneralError(codeError.longMessage ?? codeError.message);
        return;
      }

      setStep("code");
    } catch {
      setGeneralError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async () => {
    setGeneralError(null);
    setLoading(true);

    try {
      const { error } = await signUp.verifications.verifyEmailCode({ code });
      if (error) {
        setGeneralError(error.longMessage ?? error.message);
        return;
      }

      const { error: finalizeError } = await signUp.finalize();
      if (finalizeError) {
        setGeneralError(finalizeError.longMessage ?? finalizeError.message);
        return;
      }

      pendingEmailRef.current = emailAddress;
    } catch {
      setGeneralError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {step === "form" ? "Sign Up" : "Verify Email"}
      </Text>

      {generalError ? <Text style={styles.error}>{generalError}</Text> : null}

      {step === "form" ? (
        <>
          <View style={styles.field}>
            <TextInput
              style={[
                styles.input,
                errors.fields.emailAddress ? styles.inputError : null,
              ]}
              placeholder="Email"
              placeholderTextColor="#999999"
              value={emailAddress}
              onChangeText={setEmailAddress}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            {errors.fields.emailAddress ? (
              <Text style={styles.fieldError}>
                {errors.fields.emailAddress.message}
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
              autoComplete="new-password"
            />
            {errors.fields.password ? (
              <Text style={styles.fieldError}>
                {errors.fields.password.message}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.button, loading ? styles.buttonDisabled : null]}
            onPress={handlePasswordSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </TouchableOpacity>

          <Link href={"/(auth)/sign-in" as Href} asChild>
            <TouchableOpacity>
              <Text style={styles.link}>
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </Link>

          <View nativeID="clerk-captcha" />
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to{"\n"}
            {emailAddress}
          </Text>

          <View style={styles.field}>
            <TextInput
              style={[
                styles.input,
                errors.fields.code ? styles.inputError : null,
                styles.codeInput,
              ]}
              placeholder="000000"
              placeholderTextColor="#999999"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
              autoComplete="one-time-code"
            />
            {errors.fields.code ? (
              <Text style={styles.fieldError}>
                {errors.fields.code.message}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.button, loading ? styles.buttonDisabled : null]}
            onPress={handleCodeSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Verify</Text>
            )}
          </TouchableOpacity>
        </>
      )}
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
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 20,
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
  codeInput: {
    fontSize: 24,
    textAlign: "center",
    letterSpacing: 8,
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
