import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as BackendApi from '../apis/BackendApi.js';
import LogoBlock from '../components/LogoBlock';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Pressable, ScreenContainer, Spacer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const HomePageScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={true}
    >
      {/* View 2 */}
      <View>
        <LogoBlock />
        <Spacer bottom={8} left={8} right={8} top={32} />
        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: 'flex-start',
              alignItems: 'center',
              marginLeft: 16,
              marginRight: 16,
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                fontFamily: 'Urbanist_600SemiBold',
                fontSize: [
                  { minWidth: Breakpoints.Mobile, value: 30 },
                  { minWidth: Breakpoints.Laptop, value: 32 },
                  { minWidth: Breakpoints.Desktop, value: 40 },
                ],
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'Tools, die du gebrauchen könntest...'}
          </Text>
        </View>
        {/* Spacer 2 */}
        <Spacer bottom={8} left={8} right={8} top={16} />
        {/* Offers */}
        <BackendApi.FetchOffersGET>
          {({ loading, error, data, refetchOffers }) => {
            const offersData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {/* Angebote */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignSelf: 'center',
                      marginBottom: 16,
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
                          fontFamily: 'Urbanist_700Bold',
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 28 },
                            { minWidth: Breakpoints.Laptop, value: 40 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Angebote'}
                  </Text>
                </View>
                {/* FlashList - SD */}
                <>
                  {dimensions.width >= Breakpoints.Laptop ? null : (
                    <FlashList
                      data={offersData}
                      estimatedItemSize={50}
                      horizontal={true}
                      inverted={false}
                      keyExtractor={(flashListSDData, index) =>
                        flashListSDData?.id ??
                        flashListSDData?.uuid ??
                        index.toString()
                      }
                      listKey={'IsEeS9mU'}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const flashListSDData = item;
                        return (
                          <Pressable
                            onPress={() => {
                              try {
                                navigation.navigate('ProductDetailPageScreen', {
                                  offerId: flashListSDData?.id,
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
                                  backgroundColor: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'rgba(0, 0, 0, 0)',
                                  },
                                  flexDirection: 'column',
                                  marginLeft: [
                                    { minWidth: Breakpoints.Mobile, value: 8 },
                                    { minWidth: Breakpoints.Tablet, value: 14 },
                                    { minWidth: Breakpoints.Laptop, value: 14 },
                                  ],
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 110,
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 130,
                                    },
                                    {
                                      minWidth: Breakpoints.Laptop,
                                      value: 160,
                                    },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 180,
                                    },
                                  ],
                                },
                                dimensions.width
                              )}
                            >
                              <Image
                                resizeMode={'cover'}
                                source={{ uri: `${flashListSDData?.image}` }}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ImageStyles(theme)['Image'],
                                    {
                                      borderRadius: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 30,
                                        },
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 35,
                                        },
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 40,
                                        },
                                      ],
                                      height: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 110,
                                        },
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 130,
                                        },
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 160,
                                        },
                                      ],
                                      width: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 110,
                                        },
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 130,
                                        },
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 160,
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                              />
                              {/* Details */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { marginLeft: 6, marginRight: 4 },
                                  dimensions.width
                                )}
                              >
                                {/* Title */}
                                <Text
                                  accessible={true}
                                  ellipsizeMode={'middle'}
                                  numberOfLines={1}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      {
                                        fontFamily: 'Urbanist_700Bold',
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 16,
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 17,
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 20,
                                          },
                                        ],
                                        textAlign: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 'center',
                                        },
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                  textBreakStrategy={'highQuality'}
                                >
                                  {flashListSDData?.title}
                                </Text>

                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: 'row',
                                      justifyContent: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'center',
                                      },
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
                                          fontFamily: 'Urbanist_700Bold',
                                          fontSize: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value: 20,
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value: 22,
                                            },
                                          ],
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {flashListSDData?.price}
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
                                              value: 16,
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value: 18,
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
                              </View>
                            </View>
                          </Pressable>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={false}
                    />
                  )}
                </>
                <View>
                  {/* FlashList - MD */}
                  <>
                    {!(dimensions.width >= Breakpoints.Laptop) ? null : (
                      <FlashList
                        data={offersData}
                        estimatedItemSize={50}
                        horizontal={false}
                        inverted={false}
                        keyExtractor={(flashListMDData, index) =>
                          flashListMDData?.id ??
                          flashListMDData?.uuid ??
                          index.toString()
                        }
                        listKey={'B1oDuUL7'}
                        numColumns={6}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item, index }) => {
                          const flashListMDData = item;
                          return (
                            <Pressable
                              onPress={() => {
                                try {
                                  navigation.navigate(
                                    'ProductDetailPageScreen',
                                    { offerId: flashListMDData?.id }
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              {/* Card */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'center',
                                    },
                                    backgroundColor: {
                                      minWidth: Breakpoints.Laptop,
                                      value: theme.colors['Divider'],
                                    },
                                    borderRadius: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 20,
                                    },
                                    flexDirection: 'column',
                                    marginBottom: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 16,
                                    },
                                    marginLeft: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 8,
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: 14,
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: 8,
                                      },
                                    ],
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 110,
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: 130,
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: 150,
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: 210,
                                      },
                                    ],
                                  },
                                  dimensions.width
                                )}
                              >
                                <Image
                                  resizeMode={'cover'}
                                  source={{ uri: `${flashListMDData?.image}` }}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.ImageStyles(theme)['Image'],
                                      {
                                        borderRadius: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 30,
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 35,
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 30,
                                          },
                                          {
                                            minWidth: Breakpoints.Desktop,
                                            value: 40,
                                          },
                                        ],
                                        height: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 110,
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 130,
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 130,
                                          },
                                          {
                                            minWidth: Breakpoints.Desktop,
                                            value: 200,
                                          },
                                        ],
                                        marginTop: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 8,
                                        },
                                        width: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 110,
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 130,
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 130,
                                          },
                                          {
                                            minWidth: Breakpoints.Desktop,
                                            value: 200,
                                          },
                                        ],
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                />
                                {/* Details 2 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'center',
                                      },
                                      marginLeft: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 6,
                                        },
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 8,
                                        },
                                      ],
                                      marginRight: 4,
                                      paddingLeft: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 4,
                                      },
                                      paddingRight: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 4,
                                      },
                                      width: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 145,
                                      },
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Title */}
                                  <Text
                                    accessible={true}
                                    ellipsizeMode={'tail'}
                                    numberOfLines={2}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text'],
                                        {
                                          fontFamily: 'Urbanist_700Bold',
                                          fontSize: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value: 16,
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value: 18,
                                            },
                                            {
                                              minWidth: Breakpoints.Desktop,
                                              value: 22,
                                            },
                                          ],
                                          textAlign: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 'center',
                                          },
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    textBreakStrategy={'simple'}
                                  >
                                    {flashListMDData?.title}
                                  </Text>

                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        flexDirection: 'row',
                                        marginBottom: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 4,
                                        },
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Price */}
                                    <Text
                                      accessible={true}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ],
                                          {
                                            color: theme.colors['Primary'],
                                            fontFamily: 'Urbanist_700Bold',
                                            fontSize: [
                                              {
                                                minWidth: Breakpoints.Mobile,
                                                value: 20,
                                              },
                                              {
                                                minWidth: Breakpoints.Laptop,
                                                value: 20,
                                              },
                                              {
                                                minWidth: Breakpoints.Desktop,
                                                value: 22,
                                              },
                                            ],
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {flashListMDData?.price}
                                      {'€'}
                                    </Text>
                                    {/* / Tag */}
                                    <Text
                                      accessible={true}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ],
                                          {
                                            color: theme.colors['Secondary'],
                                            fontFamily: 'Urbanist_400Regular',
                                            fontSize: [
                                              {
                                                minWidth: Breakpoints.Mobile,
                                                value: 16,
                                              },
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
                                      {' / Tag'}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </Pressable>
                          );
                        }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                      />
                    )}
                  </>
                </View>
              </>
            );
          }}
        </BackendApi.FetchOffersGET>
        {/* Spacer 3 */}
        <Spacer bottom={16} left={8} right={8} top={16} />
        {/* Wanted */}
        <BackendApi.FetchWantedsGET>
          {({ loading, error, data, refetchWanteds }) => {
            const wantedData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {/* Gesucht */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignSelf: 'center',
                      marginBottom: 16,
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
                          fontFamily: 'Urbanist_700Bold',
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 28 },
                            { minWidth: Breakpoints.Laptop, value: 40 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Gesucht'}
                  </Text>
                </View>
                {/* FlashList - SD */}
                <>
                  {dimensions.width >= Breakpoints.Laptop ? null : (
                    <FlashList
                      data={wantedData}
                      estimatedItemSize={50}
                      horizontal={true}
                      keyExtractor={(flashListSDData, index) =>
                        flashListSDData?.id ??
                        flashListSDData?.uuid ??
                        index.toString()
                      }
                      listKey={'Jf2TiT9H'}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const flashListSDData = item;
                        return (
                          <Pressable
                            onPress={() => {
                              try {
                                navigation.navigate('ProductDetailPageScreen', {
                                  offerId: flashListSDData?.id,
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
                                  flexDirection: 'column',
                                  marginLeft: [
                                    { minWidth: Breakpoints.Mobile, value: 8 },
                                    { minWidth: Breakpoints.Laptop, value: 14 },
                                  ],
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 110,
                                    },
                                    {
                                      minWidth: Breakpoints.Laptop,
                                      value: 160,
                                    },
                                  ],
                                },
                                dimensions.width
                              )}
                            >
                              <Image
                                resizeMode={'cover'}
                                source={{ uri: `${flashListSDData?.image}` }}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ImageStyles(theme)['Image'],
                                    {
                                      borderRadius: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 30,
                                        },
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 40,
                                        },
                                      ],
                                      height: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 110,
                                        },
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 160,
                                        },
                                      ],
                                      width: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 110,
                                        },
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 160,
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                              />
                              {/* Details */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { marginLeft: 6, marginRight: 4 },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  ellipsizeMode={'middle'}
                                  numberOfLines={1}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      {
                                        fontFamily: 'Urbanist_700Bold',
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 16,
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 22,
                                          },
                                        ],
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                  textBreakStrategy={'highQuality'}
                                >
                                  {flashListSDData?.title}
                                </Text>

                                <View
                                  style={StyleSheet.applyWidth(
                                    { flexDirection: 'row' },
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
                                          fontFamily: 'Urbanist_700Bold',
                                          fontSize: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value: 20,
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value: 22,
                                            },
                                          ],
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {flashListSDData?.price}
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
                                              value: 16,
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value: 18,
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
                              </View>
                            </View>
                          </Pressable>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={false}
                    />
                  )}
                </>
                <View>
                  {/* FlashList - MD */}
                  <>
                    {!(dimensions.width >= Breakpoints.Laptop) ? null : (
                      <FlashList
                        data={wantedData}
                        estimatedItemSize={50}
                        horizontal={false}
                        keyExtractor={(flashListMDData, index) =>
                          flashListMDData?.id ??
                          flashListMDData?.uuid ??
                          index.toString()
                        }
                        listKey={'J45Ltcik'}
                        numColumns={6}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item, index }) => {
                          const flashListMDData = item;
                          return (
                            <Pressable
                              onPress={() => {
                                try {
                                  navigation.navigate(
                                    'ProductDetailPageScreen',
                                    { offerId: flashListMDData?.id }
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              {/* Card */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'center',
                                    },
                                    backgroundColor: {
                                      minWidth: Breakpoints.Laptop,
                                      value: theme.colors['Divider'],
                                    },
                                    borderRadius: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 20,
                                    },
                                    flexDirection: 'column',
                                    marginBottom: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 16,
                                    },
                                    marginLeft: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 8,
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: 14,
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: 8,
                                      },
                                    ],
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 110,
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: 130,
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: 150,
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: 210,
                                      },
                                    ],
                                  },
                                  dimensions.width
                                )}
                              >
                                <Image
                                  resizeMode={'cover'}
                                  source={{ uri: `${flashListMDData?.image}` }}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.ImageStyles(theme)['Image'],
                                      {
                                        borderRadius: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 30,
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 35,
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 30,
                                          },
                                          {
                                            minWidth: Breakpoints.Desktop,
                                            value: 40,
                                          },
                                        ],
                                        height: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 110,
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 130,
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 130,
                                          },
                                          {
                                            minWidth: Breakpoints.Desktop,
                                            value: 200,
                                          },
                                        ],
                                        marginTop: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 8,
                                        },
                                        width: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 110,
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 130,
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 130,
                                          },
                                          {
                                            minWidth: Breakpoints.Desktop,
                                            value: 200,
                                          },
                                        ],
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                />
                                {/* Details 2 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'center',
                                      },
                                      marginLeft: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 6,
                                        },
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 8,
                                        },
                                      ],
                                      marginRight: 4,
                                      paddingLeft: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 4,
                                      },
                                      paddingRight: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 4,
                                      },
                                      width: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 145,
                                      },
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Title */}
                                  <Text
                                    accessible={true}
                                    ellipsizeMode={'tail'}
                                    numberOfLines={2}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text'],
                                        {
                                          fontFamily: 'Urbanist_700Bold',
                                          fontSize: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value: 16,
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value: 18,
                                            },
                                            {
                                              minWidth: Breakpoints.Desktop,
                                              value: 22,
                                            },
                                          ],
                                          textAlign: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 'center',
                                          },
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    textBreakStrategy={'simple'}
                                  >
                                    {flashListMDData?.title}
                                  </Text>

                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        flexDirection: 'row',
                                        marginBottom: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 4,
                                        },
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Price */}
                                    <Text
                                      accessible={true}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ],
                                          {
                                            color: theme.colors['Primary'],
                                            fontFamily: 'Urbanist_700Bold',
                                            fontSize: [
                                              {
                                                minWidth: Breakpoints.Mobile,
                                                value: 20,
                                              },
                                              {
                                                minWidth: Breakpoints.Laptop,
                                                value: 20,
                                              },
                                              {
                                                minWidth: Breakpoints.Desktop,
                                                value: 22,
                                              },
                                            ],
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {flashListMDData?.price}
                                      {'€'}
                                    </Text>
                                    {/* / Tag */}
                                    <Text
                                      accessible={true}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ],
                                          {
                                            color: theme.colors['Secondary'],
                                            fontFamily: 'Urbanist_400Regular',
                                            fontSize: [
                                              {
                                                minWidth: Breakpoints.Mobile,
                                                value: 16,
                                              },
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
                                      {' / Tag'}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </Pressable>
                          );
                        }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                      />
                    )}
                  </>
                </View>
              </>
            );
          }}
        </BackendApi.FetchWantedsGET>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(HomePageScreen);
