import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'

import IconFA5 from 'react-native-vector-icons/FontAwesome5'

import { AuthContext } from '../../navigation/AuthProvider'

const color = '#aaa';

const LoginScreen = ({ navigation }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const [isSecurePass, setIsSecurePass] = useState(true);
  const { login } = useContext(AuthContext);

  const loginValidationSchema = yup.object().shape({

    email: yup
      .string()
      .required('Boş Geçilemez')
      .email('Geçerli bir e-mail adresi giriniz!'),

    password: yup
      .string()
      .required('Boş Geçilemez')
      .min(6, ({ min }) => 'Şifre en az ' + min + ' karakterden oluşmalıdır'),

  });

  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: "#FF6F00",
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <Text style={{
        fontSize: 24,
        height: '10%',
        color: Colors.white
      }}>CodeTalks</Text>

      <View style={{
        width: '100%',
        padding: '5%'
      }}>

        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            nickname: '',
            email: '',
            password: '',
            passwordConfirm: ''
          }}
          onSubmit={values => login(values.email, values.password, navigation)}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,
          }) => (
            <>

              <TextInput
                name="email"
                placeholder="E-mail Adresi"
                style={{
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.white,
                  marginBottom: '2%'
                }}
                color={Colors.white}
                placeholderTextColor={Colors.white}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && <Text style={{ color: '#f00', fontSize: 14,fontWeight:'bold' }}>{errors.email}</Text>}

              <View style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: Colors.white,
                marginBottom: '2%'
              }}>
                <TextInput
                  name="password"
                  placeholder="Şifre"
                  style={{
                    width: '90%',
                    fontSize: 16
                  }}
                  color={Colors.white}
                  placeholderTextColor={Colors.white}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={isSecurePass}
                />
                <IconFA5 onPress={() => {
                  setIsSecurePass(!isSecurePass)
                }} style={{
                  position: 'absolute',
                  right: 0,
                  top: '30%'
                }}
                  name={isSecurePass ? 'eye-slash' : 'eye'}
                  size={20}
                  color={Colors.white} />
              </View>

              <View>{errors.password && (<Text style={{ color: '#f00', fontSize: 14,fontWeight:'bold' }}>{errors.password}</Text>)}</View>

              <View style={{
                width: '100%',
                marginTop: '2%',
              }}>

                <TouchableOpacity style={{
                  alignItems: 'flex-end',
                }}
                  onPress={() => {
                    navigation.navigate("ResetPasswordScreen");
                  }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 14,
                    fontWeight:'bold'
                  }}>Şifremi Unuttum</Text>
                </TouchableOpacity>

              </View>

              <View style={{
                width: '100%',
                marginTop: '2%',
              }}>

                <TouchableOpacity style={{
                  backgroundColor: isValid ? 'orange' : '#BDBDBD',
                  alignItems: 'center',
                  padding: '2%',
                  borderRadius: 10
                }}
                  disabled={!isValid}
                  onPress={handleSubmit}>
                  <Text style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold'
                  }}>Giriş Yap</Text>
                </TouchableOpacity>

              </View>

            </>
          )}
        </Formik>

        <TouchableOpacity style={{
          backgroundColor: 'white',
          alignItems: 'center',
          padding: '2%',
          borderRadius: 10,
          marginTop: '5%'
        }}
          onPress={() => {
            navigation.navigate("SignUpScreen")
          }}>
          <Text style={{
            color: '#FF6F00',
            fontSize: 16,
            fontWeight: 'bold'
          }}>Kayıt Ol</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

export default LoginScreen