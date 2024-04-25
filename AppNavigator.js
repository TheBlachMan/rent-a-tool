import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable } from '@draftbit/ui';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './themes/Draftbit.js';
import LinkingConfiguration from './LinkingConfiguration.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import useWindowDimensions from './utils/useWindowDimensions';

import AddProductPageScreen from './screens/AddProductPageScreen';
import ChatBoxPageScreen from './screens/ChatBoxPageScreen';
import ConversationsPageScreen from './screens/ConversationsPageScreen';
import HomePageScreen from './screens/HomePageScreen';
import LoginPageScreen from './screens/LoginPageScreen';
import MyProductsPageScreen from './screens/MyProductsPageScreen';
import ProductDetailPageScreen from './screens/ProductDetailPageScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DefaultAndroidBackIcon({ tintColor }) {
  return (
    <View style={[styles.headerContainer, styles.headerContainerLeft]}>
      <Icon
        name="AntDesign/arrowleft"
        size={24}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </View>
  );
}

function BottomTabNavigator() {
  const tabBarIcons = {
    HomePageScreen: 'Entypo/home',
    ConversationsPageScreen: 'AntDesign/message1',
    AddProductPageScreen: 'AntDesign/pluscircle',
    MyProductsPageScreen: 'AntDesign/tagso',
  };

  return (
    <Tab.Navigator
      initialRouteName="HomePageScreen"
      screenOptions={({ navigation }) => ({
        headerBackImage:
          Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
        headerShown: false,
        tabBarActiveTintColor: theme.colors['Primary'],
        tabBarStyle: { borderTopColor: 'transparent' },
      })}
    >
      <Tab.Screen
        name="HomePageScreen"
        component={HomePageScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Entypo/home"
              size={25}
              color={focused ? color : color}
            />
          ),
          tabBarLabel: '',
          title: 'Home-Page',
        })}
      />
      <Tab.Screen
        name="ConversationsPageScreen"
        component={ConversationsPageScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="AntDesign/message1"
              size={25}
              color={focused ? color : color}
            />
          ),
          tabBarLabel: '',
          title: 'Conversations-Page',
        })}
      />
      <Tab.Screen
        name="AddProductPageScreen"
        component={AddProductPageScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="AntDesign/pluscircle"
              size={25}
              color={focused ? color : color}
            />
          ),
          tabBarLabel: '',
          title: 'Add-Product-Page',
        })}
      />
      <Tab.Screen
        name="MyProductsPageScreen"
        component={MyProductsPageScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="AntDesign/tagso"
              size={25}
              color={focused ? color : color}
            />
          ),
          tabBarLabel: '',
          title: 'My-Products-Page',
        })}
      />
    </Tab.Navigator>
  );
}

export default function RootAppNavigator() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#FFFFFF',
        },
      }}
      linking={LinkingConfiguration}
    >
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerBackImage:
            Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
          headerShown: false,
        })}
      >
        <Stack.Screen
          name="LoginPageScreen"
          component={LoginPageScreen}
          options={({ navigation }) => ({
            title: 'Login-Page',
          })}
        />
        <Stack.Screen
          name="ProductDetailPageScreen"
          component={ProductDetailPageScreen}
          options={({ navigation }) => ({
            title: 'Product-Detail-Page',
          })}
        />
        <Stack.Screen
          name="ChatBoxPageScreen"
          component={ChatBoxPageScreen}
          options={({ navigation }) => ({
            title: 'Chat-Box-Page',
          })}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({ ios: { marginLeft: 8 } }),
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({ ios: { marginRight: 6 } }),
});
