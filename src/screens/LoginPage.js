import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (!result.success) {
            Alert.alert('Erreur', result.error || 'Une erreur est survenue');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                {/* Logo and Title */}
                <View style={styles.headerContainer}>
                    <Text style={styles.logo}>Media<Text style={styles.logoAccent}>243</Text></Text>
                    <Text style={styles.subtitle}>Votre plateforme de streaming africaine</Text>
                </View>

                {/* Form */}
                <View style={styles.formContainer}>
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

                    {/* Login Button */}
                    <Button
                        variant="primary"
                        title="Se connecter"
                        onPress={handleLogin}
                        loading={loading}
                        style={styles.loginButton}
                    />

                    {/* Signup Link */}
                    <TouchableOpacity
                        style={styles.linkContainer}
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={styles.linkText}>
                            Première fois sur Media243? <Text style={styles.linkAccent}>S'inscrire</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: spacing['4xl'],
    },
    logo: {
        ...typography.styles.h1,
        fontSize: typography.fontSize['5xl'],
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.black,
    },
    logoAccent: {
        color: colors.primary,
    },
    subtitle: {
        ...typography.styles.body,
        color: colors.textSecondary,
        marginTop: spacing.sm,
        textAlign: 'center',
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
        borderWidth: 0, // No border
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
    loginButton: {
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

export default LoginPage;