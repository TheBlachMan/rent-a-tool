import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as BackendApi from '../apis/BackendApi.js';
import LogoBlock from '../components/LogoBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import transformToDateString from '../global-functions/transformToDateString';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Pressable,
  ScreenContainer,
  TabView,
  TabViewItem,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const ConversationsPageScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const requestSwiperHeight = json => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.
    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
      >
        <LogoBlock />
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', marginBottom: 8, marginTop: 24 },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                fontFamily: 'Urbanist_700Bold',
                fontSize: [
                  { minWidth: Breakpoints.Mobile, value: 22 },
                  { minWidth: Breakpoints.Tablet, value: 24 },
                  { minWidth: Breakpoints.Laptop, value: 28 },
                ],
              }),
              dimensions.width
            )}
          >
            {'Meine Nachrichten'}
          </Text>
        </View>

        <TabView
          activeColor={theme.colors.primary}
          indicatorColor={theme.colors.primary}
          keyboardDismissMode={'auto'}
          pressColor={theme.colors.primary}
          swipeEnabled={true}
          tabBarPosition={'top'}
          tabsBackgroundColor={theme.colors.background}
        >
          {/* myRequests */}
          <TabViewItem
            style={StyleSheet.applyWidth(
              GlobalStyles.TabViewItemStyles(theme)['Tab View Item'],
              dimensions.width
            )}
            title={'Meine Anfragen'}
          >
            {/* Content */}
            <View>
              <BackendApi.FetchChatroomRequestorGET>
                {({ loading, error, data, refetchChatroomRequestor }) => {
                  const fetchData = data?.json;
                  if (loading) {
                    return <ActivityIndicator />;
                  }

                  if (error || data?.status < 200 || data?.status >= 300) {
                    return <ActivityIndicator />;
                  }

                  return (
                    <FlashList
                      data={fetchData}
                      estimatedItemSize={50}
                      keyExtractor={(flashListData, index) =>
                        flashListData?.id ??
                        flashListData?.uuid ??
                        index.toString()
                      }
                      listKey={'2pHLGS0i'}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const flashListData = item;
                        return (
                          <Pressable
                            onPress={() => {
                              try {
                                navigation.navigate('ChatBoxPageScreen', {
                                  productId: flashListData?.productId,
                                  userIdOther: flashListData?.requestorId,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            {/* Card */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  backgroundColor:
                                    theme.colors['Light Inverse'],
                                  borderColor: {
                                    minWidth: Breakpoints.Laptop,
                                    value: theme.colors['Primary'],
                                  },
                                  borderRadius: [
                                    { minWidth: Breakpoints.Mobile, value: 10 },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 15,
                                    },
                                  ],
                                  borderWidth: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 1,
                                  },
                                  flexDirection: 'row',
                                  height: [
                                    { minWidth: Breakpoints.Mobile, value: 90 },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 110,
                                    },
                                    {
                                      minWidth: Breakpoints.Laptop,
                                      value: 115,
                                    },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 130,
                                    },
                                  ],
                                  justifyContent: 'flex-start',
                                  margin: 8,
                                  marginLeft: [
                                    { minWidth: Breakpoints.Tablet, value: 24 },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 32,
                                    },
                                  ],
                                  marginRight: {
                                    minWidth: Breakpoints.Tablet,
                                    value: 24,
                                  },
                                  maxWidth: [
                                    {
                                      minWidth: Breakpoints.Laptop,
                                      value: 600,
                                    },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 750,
                                    },
                                  ],
                                  width: {
                                    minWidth: Breakpoints.Desktop,
                                    value: '50%',
                                  },
                                },
                                dimensions.width
                              )}
                            >
                              <Image
                                resizeMode={'cover'}
                                source={{ uri: `${flashListData?.image}` }}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ImageStyles(theme)['Image'],
                                    {
                                      borderRadius: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 10,
                                        },
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 20,
                                        },
                                      ],
                                      height: 70,
                                      marginLeft: 24,
                                      marginRight: 24,
                                      minHeight: [
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 100,
                                        },
                                        {
                                          minWidth: Breakpoints.Desktop,
                                          value: 115,
                                        },
                                      ],
                                      minWidth: [
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 100,
                                        },
                                        {
                                          minWidth: Breakpoints.Desktop,
                                          value: 115,
                                        },
                                      ],
                                      width: 70,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              />
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    marginRight: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 16,
                                    },
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Title */}
                                <Text
                                  accessible={true}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      {
                                        fontFamily: 'Urbanist_600SemiBold',
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 18,
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 22,
                                          },
                                          {
                                            minWidth: Breakpoints.Desktop,
                                            value: 25,
                                          },
                                        ],
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {flashListData?.title}
                                </Text>
                                {/* Name */}
                                <Text
                                  accessible={true}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      {
                                        fontFamily: 'Urbanist_400Regular',
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 16,
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 18,
                                          },
                                          {
                                            minWidth: Breakpoints.Desktop,
                                            value: 20,
                                          },
                                        ],
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {flashListData?.firstName}{' '}
                                  {flashListData?.lastName}
                                </Text>
                                {/* Date */}
                                <Text
                                  accessible={true}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      {
                                        fontFamily: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 'Urbanist_400Regular',
                                        },
                                        fontSize: {
                                          minWidth: Breakpoints.Desktop,
                                          value: 16,
                                        },
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'Chat seit '}
                                  {transformToDateString(
                                    flashListData?.createdAt
                                  )}
                                </Text>
                              </View>
                            </View>
                          </Pressable>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  );
                }}
              </BackendApi.FetchChatroomRequestorGET>
            </View>
          </TabViewItem>
          {/* myOffers */}
          <TabViewItem
            style={StyleSheet.applyWidth(
              GlobalStyles.TabViewItemStyles(theme)['Tab View Item'],
              dimensions.width
            )}
            title={'Meine Produkte'}
          >
            {/* Content */}
            <View>
              <BackendApi.FetchChatroomOwnerGET>
                {({ loading, error, data, refetchChatroomOwner }) => {
                  const fetchData = data?.json;
                  if (loading) {
                    return <ActivityIndicator />;
                  }

                  if (error || data?.status < 200 || data?.status >= 300) {
                    return <ActivityIndicator />;
                  }

                  return (
                    <FlashList
                      data={fetchData}
                      estimatedItemSize={50}
                      keyExtractor={(flashListData, index) =>
                        flashListData?.id ??
                        flashListData?.uuid ??
                        index.toString()
                      }
                      listKey={'QDOBad7G'}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const flashListData = item;
                        return (
                          <Pressable
                            onPress={() => {
                              try {
                                navigation.navigate('ChatBoxPageScreen', {
                                  productId: flashListData?.productId,
                                  userIdOther: flashListData?.requestorId,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            {/* Card */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  backgroundColor:
                                    theme.colors['Light Inverse'],
                                  borderColor: {
                                    minWidth: Breakpoints.Laptop,
                                    value: theme.colors['Primary'],
                                  },
                                  borderRadius: [
                                    { minWidth: Breakpoints.Mobile, value: 10 },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 15,
                                    },
                                  ],
                                  borderWidth: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 1,
                                  },
                                  flexDirection: 'row',
                                  height: [
                                    { minWidth: Breakpoints.Mobile, value: 90 },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 110,
                                    },
                                    {
                                      minWidth: Breakpoints.Laptop,
                                      value: 115,
                                    },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 130,
                                    },
                                  ],
                                  justifyContent: 'flex-start',
                                  margin: 8,
                                  marginLeft: {
                                    minWidth: Breakpoints.Tablet,
                                    value: 24,
                                  },
                                  marginRight: {
                                    minWidth: Breakpoints.Tablet,
                                    value: 24,
                                  },
                                  maxWidth: [
                                    {
                                      minWidth: Breakpoints.Laptop,
                                      value: 600,
                                    },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 750,
                                    },
                                  ],
                                  width: {
                                    minWidth: Breakpoints.Desktop,
                                    value: '50%',
                                  },
                                },
                                dimensions.width
                              )}
                            >
                              <Image
                                resizeMode={'cover'}
                                source={{ uri: `${flashListData?.image}` }}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ImageStyles(theme)['Image'],
                                    {
                                      borderRadius: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 10,
                                        },
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 20,
                                        },
                                      ],
                                      height: 70,
                                      marginLeft: 24,
                                      marginRight: 24,
                                      minHeight: [
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 100,
                                        },
                                        {
                                          minWidth: Breakpoints.Desktop,
                                          value: 115,
                                        },
                                      ],
                                      minWidth: [
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 100,
                                        },
                                        {
                                          minWidth: Breakpoints.Desktop,
                                          value: 115,
                                        },
                                      ],
                                      width: 70,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              />
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    marginRight: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 16,
                                    },
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Title */}
                                <Text
                                  accessible={true}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      {
                                        fontFamily: 'Urbanist_600SemiBold',
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 18,
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 22,
                                          },
                                          {
                                            minWidth: Breakpoints.Desktop,
                                            value: 25,
                                          },
                                        ],
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {flashListData?.title}
                                </Text>
                                {/* Name */}
                                <Text
                                  accessible={true}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      {
                                        fontFamily: 'Urbanist_400Regular',
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 16,
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 18,
                                          },
                                          {
                                            minWidth: Breakpoints.Desktop,
                                            value: 20,
                                          },
                                        ],
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {flashListData?.firstName}{' '}
                                  {flashListData?.lastName}
                                </Text>
                                {/* Date */}
                                <Text
                                  accessible={true}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      {
                                        fontFamily: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 'Urbanist_400Regular',
                                        },
                                        fontSize: {
                                          minWidth: Breakpoints.Desktop,
                                          value: 16,
                                        },
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'erstellt am '}
                                  {transformToDateString(
                                    flashListData?.createdAt
                                  )}
                                </Text>
                              </View>
                            </View>
                          </Pressable>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  );
                }}
              </BackendApi.FetchChatroomOwnerGET>
            </View>
          </TabViewItem>
        </TabView>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(ConversationsPageScreen);
