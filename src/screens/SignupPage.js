import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { useAuth } from '../contexts/AuthContext';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { signup } = useAuth();
    const navigation = useNavigation();

    const validatePassword = () => {
        if (password.length < 6) {
            return 'Le mot de passe doit contenir au moins 6 caractères';
        }
        if (password !== confirmPassword) {
            return 'Les mots de passe ne correspondent pas';
        }
        return null;
    };

    const handleSignup = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        const passwordError = validatePassword();
        if (passwordError) {
            Alert.alert('Erreur', passwordError);
            return;
        }

        setLoading(true);
        const result = await signup(name, email, password);
        setLoading(false);

        if (!result.success) {
            Alert.alert('Erreur', result.error || 'Une erreur est survenue');
        }
    };

    const getPasswordStrength = () => {
        if (!password) return null;
        if (password.length < 6) return { label: 'Faible', color: colors.error };
        if (password.length < 10) return { label: 'Moyen', color: colors.warning };
        return { label: 'Fort', color: colors.success };
    };

    const passwordStrength = getPasswordStrength();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Header */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.logo}>Media<Text style={styles.logoAccent}>243</Text></Text>
                        <Text style={styles.subtitle}>Créez votre compte</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        {/* Name Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nom complet"
                                placeholderTextColor={colors.textTertiary}
                                autoCapitalize="words"
                                value={name}
                                onChangeText={setName}
                                selectionColor={colors.primary}
                            />
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor={colors.textTertiary}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                selectionColor={colors.primary}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Mot de passe"
                                placeholderTextColor={colors.textTertiary}
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                selectionColor={colors.primary}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                <Icon
                                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={20}
                                    color={colors.textTertiary}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Password Strength Indicator */}
                        {passwordStrength && (
                            <View style={styles.strengthContainer}>
                                <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                                    Force: {passwordStrength.label}
                                </Text>
                            </View>
                        )}

                        {/* Confirm Password Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmer le mot de passe"
                                placeholderTextColor={colors.textTertiary}
                                secureTextEntry={!showPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                selectionColor={colors.primary}
                            />
                        </View>

                        {/* Signup Button */}
                        <Button
                            variant="primary"
                            title="S'inscrire"
                            onPress={handleSignup}
                            loading={loading}
                            style={styles.signupButton}
                        />

                        {/* Login Link */}
                        <TouchableOpacity
                            style={styles.linkContainer}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.linkText}>
                                Déjà inscrit? <Text style={styles.linkAccent}>Se connecter</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing['2xl'],
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: spacing['3xl'],
    },
    logo: {
        ...typography.styles.h1,
        fontSize: typography.fontSize['4xl'],
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.black,
    },
    logoAccent: {
        color: colors.primary,
    },
    subtitle: {
        ...typography.styles.bodyLarge,
        color: colors.textSecondary,
        marginTop: spacing.sm,
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333', // Netflix dark grey input
        borderRadius: 4,
        paddingHorizontal: spacing.base,
        marginBottom: spacing.base,
        borderWidth: 0,
        minHeight: 50,
    },
    // inputIcon removed
    eyeIcon: {
        padding: spacing.xs,
    },
    input: {
        flex: 1,
        color: colors.textPrimary,
        ...typography.styles.body,
        paddingVertical: spacing.base,
    },
    strengthContainer: {
        marginBottom: spacing.base,
        paddingHorizontal: spacing.xs,
    },
    strengthText: {
        ...typography.styles.bodySmall,
        fontWeight: typography.fontWeight.semibold,
    },
    signupButton: {
        marginTop: spacing.lg,
        marginBottom: spacing.xl,
    },
    linkContainer: {
        alignSelf: 'center',
    },
    linkText: {
        ...typography.styles.body,
        color: colors.textSecondary,
    },
    linkAccent: {
        color: colors.primary,
        fontWeight: typography.fontWeight.bold,
    },
});

export default SignupPage;