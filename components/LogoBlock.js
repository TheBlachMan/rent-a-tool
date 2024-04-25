import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, Icon, Pressable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

const LogoBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  return (
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
      <Button
        icon={'SimpleLineIcons/logout'}
        onPress={() => {
          try {
            navigation.navigate('LoginPageScreen');
            setGlobalVariableValue({
              key: 'authToken',
              value: '',
            });
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
            backgroundColor: theme.colors['LightError'],
            borderRadius: 25,
          }),
          dimensions.width
        )}
        title={''}
      />
    </View>
  );
};

export default withTheme(LogoBlock);
