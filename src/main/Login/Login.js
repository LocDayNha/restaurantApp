import { StyleSheet, Text, View, Pressable, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const Login = () => {

    return (

        <View style={styles.container}>

            <Text style={styles.text}>Phoenix Restaurant</Text>

            <Pressable style={styles.btnLoginfb}>
                <Image style={styles.imageicon} source={require('../../image/facebook.png')}></Image>
                <Text style={[styles.textLogin, { marginTop: 10 }]}>Continue with Facebook</Text>
            </Pressable>
            <Pressable style={styles.btnLogingg}>
                <Image style={[styles.imageicon, { marginLeft: '18%' }]} source={require('../../image/google.png')}></Image>
                <Text style={[styles.textLogin, { marginTop: 10 }]}>Continue with Google</Text>
            </Pressable>
            <Pressable style={styles.btnLoginapple}>
                <Image style={[styles.imageicon, { marginLeft: '20%' }]} source={require('../../image/apple.png')}></Image>
                <Text style={[styles.textLogin, { marginTop: 10 }]}>Continue with Apple</Text>
            </Pressable>

            <View style={styles.view}>
                <Text style={styles.textor}>or</Text>
            </View>

            <Pressable style={styles.btnLogin}>
                <Text style={[styles.textLogin, { marginTop: 10, color: '#FFF' }]}>Sign in with Password</Text>
            </Pressable>

            <View style={[styles.view, { flexDirection: 'row' }]}>
                <Text style={{ fontSize: 15 }}>Don't have an account?</Text>
                <TouchableOpacity>
                    <Text style={styles.textSignup}>Sign up</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        justifiContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    view: {
        justifiContent: 'center',
        alignItems: 'center',
        marginTop: '7%',
    },
    image: {
        width: 150,
        height: 150,
    },
    imageicon: {
        width: 30,
        height: 30,
        marginLeft: '16%',
        marginRight: 15
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 40,
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#000',
        marginTop: '27%',
        marginBottom: '10%'
    },
    btnLogin: {
        height: 50,
        width: '85%',
        backgroundColor: '#000',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        flexDirection: 'row'
    },
    btnLoginfb: {
        height: 50,
        width: '85%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        alignItems: 'center',
        marginTop: '10%',
        flexDirection: 'row'
    },
    btnLogingg: {
        height: 50,
        width: '85%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        alignItems: 'center',
        marginTop: '7%',
        flexDirection: 'row'
    },
    btnLoginapple: {
        height: 50,
        width: '85%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        alignItems: 'center',
        marginTop: '7%',
        flexDirection: 'row'
    },
    textLogin: {
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#000',
        marginBottom: 7,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    textor: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 15,
    },
    textSignup: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
        marginLeft: '5%'
    },
})