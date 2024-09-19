import { StyleSheet, Text, View, Image, TextInput, Pressable, CheckBox, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

const Login2 = () => {

    return (
        <View style={{ marginBottom: '5%', marginTop: '5%' }}>

            <View style={styles.view2}>
                <Image style={styles.image} source={require('../image/a.png')}></Image>

                <Text style={styles.text}>Login to Your Account</Text>
            </View>

            <View style={[styles.view2, { marginTop: '5%' }]}>

                <TextInput placeholder='Email' style={styles.inputEmailAndPass}></TextInput>

                <TextInput placeholder='Password' style={styles.inputEmailAndPass} secureTextEntry={true}></TextInput>

            </View>

            <TouchableOpacity style={[styles.view2, { marginTop: '5%' }]}>
                <Text style={[styles.textLogin, { color: '#000' }]}>Forgot the password ?</Text>
            </TouchableOpacity>

            <View style={[styles.view2, { marginTop: '5%' }]}>
                <Pressable style={styles.btnLogin}>
                    <Text style={[styles.textLogin, { marginTop: 10, color: '#FFF' }]}>Sign In</Text>
                </Pressable>
            </View>

            <View style={[styles.view2, { marginTop: '7%' }]}>
                <Text style={styles.textor}>or continue with</Text>
            </View>

            <View style={[styles.view3, { marginTop: '5%' }]}>
                <TouchableOpacity style={styles.touc}>
                    <Image style={styles.imageTouc} source={require('../image/facebook.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touc}>
                    <Image style={styles.imageTouc} source={require('../image/google.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touc}>
                    <Image style={styles.imageTouc} source={require('../image/apple.png')}></Image>
                </TouchableOpacity>
            </View>

            <View style={[styles.view3, { marginTop: '5%' }]}>
                <Text style={{ fontSize: 15 }}>Don't have an account?</Text>
                <TouchableOpacity>
                    <Text style={styles.textSignup}>Sign up</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Login2

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row'
    },
    view2: {

        alignItems: 'center'
    },
    view3: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    image: {
        width: 200,
        height: 200,
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 25,
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#000'
    },
    inputEmailAndPass: {
        width: '90%',
        height: 48,
        backgroundColor: '#EEEEEE',
        borderRadius: 13,
        marginTop: '5%',
        fontFamily: 'Klarna Text',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#000',
        paddingLeft: 20,
        marginLeft: '1%'
    },
    btnLogin: {
        height: 50,
        width: '80%',
        backgroundColor: '#000',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
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
    touc: {
        height: 60,
        width: 80,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 17,
        borderColor: '#DDDDDD',
        marginLeft: '3%',
        marginRight: '3%'
    },
    imageTouc: {
        height: 30,
        width: 30
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