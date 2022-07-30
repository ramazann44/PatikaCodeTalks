import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'

import IconFA5 from 'react-native-vector-icons/FontAwesome5'

import { AuthContext } from '../../navigation/AuthProvider'

const color = '#aaa';

const ResetPasswordScreen = ({ navigation }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const [isSecurePass, setIsSecurePass] = useState(true);
  const { resetPassword } = useContext(AuthContext);

  const resetpasswordValidationSchema = yup.object().shape({

    email: yup
      .string()
      .required('Boş Geçilemez')
      .email('Geçerli bir e-mail adresi giriniz!'),

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
          validationSchema={resetpasswordValidationSchema}
          initialValues={{
            nickname: '',
            email: '',
            password: '',
            passwordConfirm: ''
          }}
          onSubmit={values => resetPassword(values.email)}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,
          }) => (
            <>

              <TextInput
                name="email"
                placeholder="E-mail Adresiniz"
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
              {errors.email && <Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.email}</Text>}

              <View style={{
                width: '100%',
                marginTop: '5%',
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
                  }}>Şifre Sıfırlama Mailini Al</Text>
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
            navigation.navigate("LoginScreen")
          }}>
          <Text style={{
            color: '#FF6F00',
            fontSize: 16,
            fontWeight: 'bold'
          }}>Giriş Yap</Text>
        </TouchableOpacity>

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

export default ResetPasswordScreen