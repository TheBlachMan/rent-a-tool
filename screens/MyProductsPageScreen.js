import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as BackendApi from '../apis/BackendApi.js';
import LogoBlock from '../components/LogoBlock';
import transformToDateString from '../global-functions/transformToDateString';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Pressable, ScreenContainer, withTheme, Button } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const MyProductsPageScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
      >
        <LogoBlock />
        <BackendApi.FetchMeGET>
          {({ loading, error, data, refetchMe }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <View
                style={StyleSheet.applyWidth(
                  {
                    marginBottom: 24,
                    marginLeft: [
                      { minWidth: Breakpoints.Mobile, value: 16 },
                      { minWidth: Breakpoints.Tablet, value: 24 },
                    ],
                    marginRight: [
                      { minWidth: Breakpoints.Mobile, value: 16 },
                      { minWidth: Breakpoints.Tablet, value: 24 },
                    ],
                    marginTop: [
                      { minWidth: Breakpoints.Mobile, value: 16 },
                      { minWidth: Breakpoints.Laptop, value: 24 },
                    ],
                  },
                  dimensions.width
                )}
              >
                {/* name */}
                <Text
                  accessible={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      fontFamily: 'Urbanist_600SemiBold',
                      fontSize: [
                        { minWidth: Breakpoints.Mobile, value: 22 },
                        { minWidth: Breakpoints.Tablet, value: 24 },
                        { minWidth: Breakpoints.Desktop, value: 32 },
                      ],
                    }),
                    dimensions.width
                  )}
                >
                  {fetchData?.firstName} {fetchData?.lastName}
                </Text>
                {/* email */}
                <Text
                  accessible={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      fontFamily: 'Urbanist_400Regular',
                      fontSize: [
                        { minWidth: Breakpoints.Tablet, value: 18 },
                        { minWidth: Breakpoints.Desktop, value: 22 },
                      ],
                    }),
                    dimensions.width
                  )}
                >
                  {fetchData?.email}
                </Text>
              </View>
            );
          }}
        </BackendApi.FetchMeGET>
        {/* myOffers */}
        <View
          style={StyleSheet.applyWidth(
            { margin: { minWidth: Breakpoints.Laptop, value: 8 } },
            dimensions.width
          )}
        >
          {/* Title */}
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                fontFamily: 'Urbanist_700Bold',
                fontSize: [
                  { minWidth: Breakpoints.Mobile, value: 20 },
                  { minWidth: Breakpoints.Tablet, value: 23 },
                  { minWidth: Breakpoints.Desktop, value: 30 },
                ],
                marginLeft: 16,
              }),
              dimensions.width
            )}
          >
            {'Meine Angebote'}
          </Text>
          {/* Offers */}
          <BackendApi.FetchMyOffersGET>
            {({ loading, error, data, refetchMyOffers }) => {
              const offersData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <FlashList
                  data={offersData}
                  estimatedItemSize={50}
                  keyExtractor={(flashListData, index) =>
                    flashListData?.id ?? flashListData?.uuid ?? index.toString()
                  }
                  listKey={'YlpbckUC'}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item, index }) => {
                    const flashListData = item;
                    return (
                      <Pressable
                        onPress={() => {
                          try {
                            navigation.navigate('ProductDetailPageScreen', {
                              offerId: flashListData?.id,
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
                              backgroundColor: theme.colors['Light Inverse'],
                              borderRadius: [
                                { minWidth: Breakpoints.Mobile, value: 10 },
                                { minWidth: Breakpoints.Tablet, value: 20 },
                              ],
                              flexDirection: 'row',
                              height: [
                                { minWidth: Breakpoints.Mobile, value: 90 },
                                { minWidth: Breakpoints.Tablet, value: 110 },
                                { minWidth: Breakpoints.Desktop, value: 130 },
                              ],
                              justifyContent: 'flex-start',
                              margin: [
                                { minWidth: Breakpoints.Mobile, value: 8 },
                                { minWidth: Breakpoints.Tablet, value: 8 },
                              ],
                              marginLeft: {
                                minWidth: Breakpoints.Tablet,
                                value: 16,
                              },
                              marginRight: {
                                minWidth: Breakpoints.Tablet,
                                value: 16,
                              },
                              maxWidth: {
                                minWidth: Breakpoints.Desktop,
                                value: 1200,
                              },
                              minWidth: {
                                minWidth: Breakpoints.Desktop,
                                value: 900,
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
                                    { minWidth: Breakpoints.Mobile, value: 10 },
                                    { minWidth: Breakpoints.Tablet, value: 20 },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 25,
                                    },
                                  ],
                                  height: [
                                    { minWidth: Breakpoints.Mobile, value: 70 },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 90,
                                    },
                                  ],
                                  marginLeft: 24,
                                  marginRight: [
                                    { minWidth: Breakpoints.Mobile, value: 24 },
                                    { minWidth: Breakpoints.Tablet, value: 32 },
                                  ],
                                  minHeight: [
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 100,
                                    },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 120,
                                    },
                                  ],
                                  minWidth: [
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 100,
                                    },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 120,
                                    },
                                  ],
                                  width: [
                                    { minWidth: Breakpoints.Mobile, value: 70 },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 90,
                                    },
                                  ],
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
                                        value: 26,
                                      },
                                    ],
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {flashListData?.title}
                            </Text>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: {
                                    minWidth: Breakpoints.Desktop,
                                    value: 'center',
                                  },
                                  flexDirection: 'row',
                                },
                                dimensions.width
                              )}
                            >
                              {/* Price */}
                              <Text
                                accessible={true}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text'],
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'Urbanist_600SemiBold',
                                      fontSize: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 18,
                                        },
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 20,
                                        },
                                        {
                                          minWidth: Breakpoints.Desktop,
                                          value: 26,
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {flashListData?.price}
                                {'€'}
                              </Text>
                              {/* / Tag */}
                              <Text
                                accessible={true}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text'],
                                    {
                                      color: theme.colors['Secondary'],
                                      fontFamily: 'Urbanist_400Regular',
                                      fontSize: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 14,
                                        },
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 20,
                                        },
                                        {
                                          minWidth: Breakpoints.Desktop,
                                          value: 24,
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {' / Tag'}
                              </Text>
                            </View>
                            {/* Kategorie */}
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
                                      value: 17,
                                    },
                                    marginTop: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 8,
                                    },
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Kategorie: '}
                              {flashListData?.category?.name}
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
                                      value: 17,
                                    },
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Erstellt am '}
                              {transformToDateString(flashListData?.created_at)}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <>
                            {!(
                              dimensions.width >= Breakpoints.Laptop
                            ) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    maxWidth: {
                                      minWidth: Breakpoints.Laptop,
                                      value: '50%',
                                    },
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Description-Title */}
                                <Text
                                  accessible={true}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      {
                                        fontFamily: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 'Urbanist_700Bold',
                                        },
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 16,
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
                                  {'Beschreibung'}
                                </Text>
                                {/* Description */}
                                <Text
                                  accessible={true}
                                  ellipsizeMode={'tail'}
                                  numberOfLines={3}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      {
                                        fontFamily: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 'Urbanist_400Regular',
                                        },
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 15,
                                          },
                                          {
                                            minWidth: Breakpoints.Desktop,
                                            value: 18,
                                          },
                                        ],
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {flashListData?.description}
                                </Text>
                              </View>
                            )}
                          </>
                        </View>
                      </Pressable>
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                />
              );
            }}
          </BackendApi.FetchMyOffersGET>
        </View>
        {/* myWanteds */}
        <View
          style={StyleSheet.applyWidth(
            {
              margin: { minWidth: Breakpoints.Laptop, value: 8 },
              marginTop: 24,
            },
            dimensions.width
          )}
        >
          {/* Title */}
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                fontFamily: 'Urbanist_700Bold',
                fontSize: [
                  { minWidth: Breakpoints.Mobile, value: 20 },
                  { minWidth: Breakpoints.Tablet, value: 23 },
                  { minWidth: Breakpoints.Desktop, value: 30 },
                ],
                marginLeft: 16,
              }),
              dimensions.width
            )}
          >
            {'Meine Gesuchten'}
          </Text>
          {/* Wanteds */}
          <BackendApi.FetchMyWantedsGET>
            {({ loading, error, data, refetchMyWanteds }) => {
              const wantedsData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <FlashList
                  data={wantedsData}
                  estimatedItemSize={50}
                  keyExtractor={(flashListData, index) =>
                    flashListData?.id ?? flashListData?.uuid ?? index.toString()
                  }
                  listKey={'bynRmQJ7'}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item, index }) => {
                    const flashListData = item;
                    return (
                      <Pressable
                        onPress={() => {
                          try {
                            navigation.navigate('ProductDetailPageScreen', {
                              offerId: flashListData?.id,
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
                              backgroundColor: theme.colors['Light Inverse'],
                              borderRadius: [
                                { minWidth: Breakpoints.Mobile, value: 10 },
                                { minWidth: Breakpoints.Tablet, value: 20 },
                              ],
                              flexDirection: 'row',
                              height: [
                                { minWidth: Breakpoints.Mobile, value: 90 },
                                { minWidth: Breakpoints.Tablet, value: 110 },
                                { minWidth: Breakpoints.Desktop, value: 130 },
                              ],
                              justifyContent: 'flex-start',
                              margin: [
                                { minWidth: Breakpoints.Mobile, value: 8 },
                                { minWidth: Breakpoints.Tablet, value: 8 },
                              ],
                              marginLeft: {
                                minWidth: Breakpoints.Tablet,
                                value: 16,
                              },
                              marginRight: {
                                minWidth: Breakpoints.Tablet,
                                value: 16,
                              },
                              maxWidth: {
                                minWidth: Breakpoints.Desktop,
                                value: 1200,
                              },
                              minWidth: {
                                minWidth: Breakpoints.Desktop,
                                value: 900,
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
                                    { minWidth: Breakpoints.Mobile, value: 10 },
                                    { minWidth: Breakpoints.Tablet, value: 20 },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 25,
                                    },
                                  ],
                                  height: [
                                    { minWidth: Breakpoints.Mobile, value: 70 },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 90,
                                    },
                                  ],
                                  marginLeft: 24,
                                  marginRight: [
                                    { minWidth: Breakpoints.Mobile, value: 24 },
                                    { minWidth: Breakpoints.Tablet, value: 32 },
                                  ],
                                  minHeight: [
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 100,
                                    },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 120,
                                    },
                                  ],
                                  minWidth: [
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 100,
                                    },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 120,
                                    },
                                  ],
                                  width: [
                                    { minWidth: Breakpoints.Mobile, value: 70 },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 90,
                                    },
                                  ],
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
                                        value: 26,
                                      },
                                    ],
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {flashListData?.title}
                            </Text>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: {
                                    minWidth: Breakpoints.Desktop,
                                    value: 'center',
                                  },
                                  flexDirection: 'row',
                                },
                                dimensions.width
                              )}
                            >
                              {/* Price */}
                              <Text
                                accessible={true}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text'],
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'Urbanist_600SemiBold',
                                      fontSize: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 18,
                                        },
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 20,
                                        },
                                        {
                                          minWidth: Breakpoints.Desktop,
                                          value: 26,
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {flashListData?.price}
                                {'€'}
                              </Text>
                              {/* / Tag */}
                              <Text
                                accessible={true}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text'],
                                    {
                                      color: theme.colors['Secondary'],
                                      fontFamily: 'Urbanist_400Regular',
                                      fontSize: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 14,
                                        },
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 20,
                                        },
                                        {
                                          minWidth: Breakpoints.Desktop,
                                          value: 24,
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {' / Tag'}
                              </Text>
                            </View>
                            {/* Kategorie */}
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
                                      value: 17,
                                    },
                                    marginTop: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 8,
                                    },
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Kategorie: '}
                              {flashListData?.category?.name}
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
                                      value: 17,
                                    },
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Erstellt am '}
                              {transformToDateString(flashListData?.created_at)}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <>
                            {!(
                              dimensions.width >= Breakpoints.Laptop
                            ) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    maxWidth: {
                                      minWidth: Breakpoints.Laptop,
                                      value: '50%',
                                    },
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Description-Title */}
                                <Text
                                  accessible={true}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      {
                                        fontFamily: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 'Urbanist_700Bold',
                                        },
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 16,
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
                                  {'Beschreibung'}
                                </Text>
                                {/* Description */}
                                <Text
                                  accessible={true}
                                  ellipsizeMode={'tail'}
                                  numberOfLines={3}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      {
                                        fontFamily: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 'Urbanist_400Regular',
                                        },
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 15,
                                          },
                                          {
                                            minWidth: Breakpoints.Desktop,
                                            value: 18,
                                          },
                                        ],
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {flashListData?.description}
                                </Text>
                              </View>
                            )}
                          </>
                        </View>
                      </Pressable>
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                />
              );
            }}
          </BackendApi.FetchMyWantedsGET>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(MyProductsPageScreen);
