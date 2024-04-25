import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as BackendApi from '../apis/BackendApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Divider,
  Icon,
  Pressable,
  ScreenContainer,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Text, View } from 'react-native';

const LoginPageScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [email, setEmail] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [password, setPassword] = React.useState('');
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      /* 'Conditional Stop' action requires configuration: select Check Value */
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasTopSafeArea={true}>
      {/* Logo */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: [
              { minWidth: Breakpoints.Mobile, value: 8 },
              { minWidth: Breakpoints.Tablet, value: 16 },
            ],
            marginRight: 16,
            marginTop: [
              { minWidth: Breakpoints.Mobile, value: 8 },
              { minWidth: Breakpoints.Tablet, value: 16 },
            ],
          },
          dimensions.width
        )}
      >
        <Pressable
          onPress={() => {
            try {
              navigation.navigate('BottomTabNavigator', {
                screen: 'HomePageScreen',
              });
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Primary'],
                  fontFamily: 'Urbanist_900Black',
                  fontSize: [
                    { minWidth: Breakpoints.Mobile, value: 18 },
                    { minWidth: Breakpoints.Laptop, value: 20 },
                    { minWidth: Breakpoints.Desktop, value: 24 },
                    { minWidth: Breakpoints.Tablet, value: 20 },
                  ],
                }),
                dimensions.width
              )}
            >
              {'RENT A TOOL'}
            </Text>
            <Icon
              color={theme.colors['Medium']}
              name={'Entypo/tools'}
              size={24}
              style={StyleSheet.applyWidth(
                { backgroundColor: 'rgba(0, 0, 0, 0)', marginLeft: 8 },
                dimensions.width
              )}
            />
          </View>
        </Pressable>
      </View>
      <Spacer left={8} right={8} top={100} />
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-start',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            marginLeft: [
              { minWidth: Breakpoints.Mobile, value: 8 },
              { minWidth: Breakpoints.Tablet, value: 24 },
              { minWidth: Breakpoints.Laptop, value: 40 },
            ],
            marginTop: 16,
          },
          dimensions.width
        )}
      >
        {/* Title */}
        <Text
          style={StyleSheet.applyWidth(
            { fontFamily: 'Urbanist_700Bold', fontSize: 36, textAlign: 'auto' },
            dimensions.width
          )}
        >
          {'Logge dich in deinem Konto ein.'}
        </Text>
      </View>
      {/* Login Form */}
      <View
        style={StyleSheet.applyWidth(
          {
            marginTop: 24,
            paddingLeft: 36,
            paddingRight: 36,
            width: { minWidth: Breakpoints.Desktop, value: '70%' },
          },
          dimensions.width
        )}
      >
        {/* Error Message */}
        <Text
          style={StyleSheet.applyWidth(
            {
              color: theme.colors['Error'],
              fontSize: [
                { minWidth: Breakpoints.Mobile, value: 12 },
                { minWidth: Breakpoints.Laptop, value: 20 },
                { minWidth: Breakpoints.Desktop, value: 22 },
              ],
              marginBottom: 16,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {errorMsg}
        </Text>
        {/* Email Input */}
        <TextInput
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          onChangeText={newEmailInputValue => {
            try {
              setEmail(newEmailInputValue);
            } catch (err) {
              console.error(err);
            }
          }}
          placeholder={'Email...'}
          placeholderTextColor={theme.colors['Medium']}
          style={StyleSheet.applyWidth(
            {
              borderBottomWidth: 1,
              borderColor: theme.colors.divider,
              borderLeftWidth: 1,
              borderRadius: 8,
              borderRightWidth: 1,
              borderTopWidth: 1,
              fontFamily: 'Urbanist_400Regular',
              fontSize: { minWidth: Breakpoints.Laptop, value: 18 },
              paddingBottom: 16,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 16,
            },
            dimensions.width
          )}
          textContentType={'emailAddress'}
        />
        <Spacer bottom={12} left={8} right={8} top={12} />
        {/* Password Input */}
        <TextInput
          onChangeText={newPasswordInputValue => {
            try {
              setPassword(newPasswordInputValue);
            } catch (err) {
              console.error(err);
            }
          }}
          placeholder={'Password...'}
          placeholderTextColor={theme.colors['Medium']}
          secureTextEntry={true}
          style={StyleSheet.applyWidth(
            {
              borderBottomWidth: 1,
              borderColor: theme.colors.divider,
              borderLeftWidth: 1,
              borderRadius: 8,
              borderRightWidth: 1,
              borderTopWidth: 1,
              fontFamily: 'System',
              fontSize: { minWidth: Breakpoints.Laptop, value: 18 },
              fontWeight: '400',
              paddingBottom: 16,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 16,
            },
            dimensions.width
          )}
        />
        <Spacer bottom={16} left={8} right={8} top={16} />
        {/* Sign In Button */}
        <Button
          onPress={() => {
            const handler = async () => {
              try {
                const ResponseJson = (
                  await BackendApi.loginPOST(Constants, {
                    email: email,
                    password: password,
                  })
                )?.json;
                const token = ResponseJson?.authToken;
                setGlobalVariableValue({
                  key: 'authToken',
                  value: 'Bearer ' + token,
                });
                const userId = ResponseJson?.userId;
                setGlobalVariableValue({
                  key: 'myUserId',
                  value: userId,
                });
                console.log(token);
                if (token) {
                  navigation.navigate('BottomTabNavigator', {
                    screen: 'HomePageScreen',
                  });
                }
                setErrorMsg(
                  'Die angegebene Email stimmt nicht mit dem Passwort überein. '
                );
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.primary,
              borderRadius: 40,
              fontFamily: 'Urbanist_700Bold',
              fontSize: [
                { minWidth: Breakpoints.Mobile, value: 15 },
                { minWidth: Breakpoints.Desktop, value: 18 },
              ],
              paddingBottom: 16,
              paddingTop: 16,
              textAlign: 'center',
            },
            dimensions.width
          )}
          title={'Login'}
        >
          {'Sign Up'}
        </Button>
        <Spacer bottom={32} left={8} right={8} top={32} />
      </View>
      <Divider
        color={theme.colors['Strong']}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], {
            marginLeft: 16,
            marginRight: 16,
            opacity: 0.5,
          }),
          dimensions.width
        )}
      />
      <Text
        accessible={true}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
            alignSelf: 'center',
            color: theme.colors['Strong'],
            fontFamily: 'Urbanist_600SemiBold',
            fontSize: { minWidth: Breakpoints.Laptop, value: 18 },
            marginLeft: 16,
            marginRight: 16,
            opacity: 0.5,
            textAlign: 'center',
          }),
          dimensions.width
        )}
      >
        {
          'Du hast noch keinen Account? Beantrage einen Account bei den Admins. '
        }
      </Text>

      <View
        style={StyleSheet.applyWidth(
          { marginLeft: 34, marginRight: 34 },
          dimensions.width
        )}
      ></View>
    </ScreenContainer>
  );
};

export default withTheme(LoginPageScreen);
