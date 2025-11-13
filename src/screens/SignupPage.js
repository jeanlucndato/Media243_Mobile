import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();
    const navigation = useNavigation();

    const handleSignup = () => {
        // Le signup est mocké dans AuthContext.js
        signup(name, email, password);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <View style={styles.container}>
                <Text style={styles.logo}>Media243</Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom d'utilisateur"
                        placeholderTextColor="#808080"
                        autoCapitalize="none"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#808080"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        placeholderTextColor="#808080"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>S'inscrire</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.link}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.linkText}>Déjà membre? Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#E50914',
        marginBottom: 50,
    },
    form: {
        width: '100%',
    },
    input: {
        width: '100%',
        backgroundColor: '#333',
        color: '#FFF',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#E50914',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 20,
        alignSelf: 'center',
    },
    linkText: {
        color: '#A0A0A0',
        fontSize: 14,
    }
});

export default SignupPage;