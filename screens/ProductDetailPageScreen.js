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
  Button,
  Divider,
  KeyboardAvoidingView,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const ProductDetailPageScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <KeyboardAvoidingView behavior={'padding'} enabled={true}>
        <LogoBlock />
        <BackendApi.FetchOfferGET
          handlers={{
            onData: fetchData => {
              try {
                console.log(fetchData, Constants['myUserId']);
              } catch (err) {
                console.error(err);
              }
            },
          }}
          offerId={props.route?.params?.offerId ?? 8}
        >
          {({ loading, error, data, refetchOffer }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {/* Image - SD */}
                <>
                  {dimensions.width >= Breakpoints.Laptop ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          height: [
                            { minWidth: Breakpoints.Mobile, value: 350 },
                            { minWidth: Breakpoints.Laptop, value: 400 },
                          ],
                          marginBottom: 8,
                          marginTop: 24,
                          width: [
                            { minWidth: Breakpoints.Mobile, value: '100%' },
                            { minWidth: Breakpoints.Laptop, value: '100%' },
                          ],
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        resizeMode={'cover'}
                        source={{ uri: `${fetchData?.image}` }}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: '100%', width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
                {/* Image - MD */}
                <>
                  {!(dimensions.width >= Breakpoints.Laptop) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: {
                            minWidth: Breakpoints.Laptop,
                            value: 'center',
                          },
                          marginBottom: 8,
                          marginTop: 24,
                          width: [
                            { minWidth: Breakpoints.Mobile, value: '100%' },
                            { minWidth: Breakpoints.Laptop, value: '100%' },
                          ],
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            height: [
                              { minWidth: Breakpoints.Laptop, value: 450 },
                              { minWidth: Breakpoints.Desktop, value: 550 },
                            ],
                            width: [
                              { minWidth: Breakpoints.Laptop, value: '65%' },
                              { minWidth: Breakpoints.Desktop, value: '60%' },
                            ],
                          },
                          dimensions.width
                        )}
                      >
                        <Image
                          resizeMode={'cover'}
                          source={{ uri: `${fetchData?.image}` }}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ImageStyles(theme)['Image'],
                              { height: '100%', width: '100%' }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    </View>
                  )}
                </>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      marginBottom: { minWidth: Breakpoints.Laptop, value: 24 },
                      marginLeft: [
                        { minWidth: Breakpoints.Mobile, value: 16 },
                        { minWidth: Breakpoints.Laptop, value: 24 },
                      ],
                      marginRight: [
                        { minWidth: Breakpoints.Mobile, value: 16 },
                        { minWidth: Breakpoints.Laptop, value: 24 },
                      ],
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
                          fontFamily: 'Urbanist_700Bold',
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 28 },
                            { minWidth: Breakpoints.Laptop, value: 32 },
                            { minWidth: Breakpoints.Desktop, value: 40 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {fetchData?.title}
                  </Text>
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* name */}
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
                            fontSize: [
                              { minWidth: Breakpoints.Laptop, value: 18 },
                              { minWidth: Breakpoints.Desktop, value: 20 },
                            ],
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?.ownerFirstName} {fetchData?.ownerLastName}
                      {' | '}
                    </Text>
                    {/* date */}
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
                            fontSize: [
                              { minWidth: Breakpoints.Laptop, value: 16 },
                              { minWidth: Breakpoints.Desktop, value: 17 },
                            ],
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'erstellt am '}
                      {transformToDateString(fetchData?.created_at)}
                    </Text>
                  </View>
                  <Divider
                    color={theme.colors.divider}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'],
                        { marginBottom: 16, marginTop: 16 }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* Description - Header */}
                  <Text
                    accessible={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        {
                          fontFamily: 'Urbanist_700Bold',
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 18 },
                            { minWidth: Breakpoints.Laptop, value: 22 },
                            { minWidth: Breakpoints.Desktop, value: 25 },
                          ],
                          marginBottom: 8,
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
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        {
                          fontFamily: 'Urbanist_400Regular',
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 15 },
                            { minWidth: Breakpoints.Laptop, value: 18 },
                            { minWidth: Breakpoints.Desktop, value: 20 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {fetchData?.description}
                  </Text>
                  {/* Divider 2 */}
                  <Divider
                    color={theme.colors.divider}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'],
                        { marginBottom: 16, marginTop: 8 }
                      ),
                      dimensions.width
                    )}
                  />
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'flex-start',
                          alignItems: [
                            { minWidth: Breakpoints.Mobile, value: 'flex-end' },
                            { minWidth: Breakpoints.Desktop, value: 'center' },
                          ],
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          width: '50%',
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
                                { minWidth: Breakpoints.Mobile, value: 25 },
                                { minWidth: Breakpoints.Laptop, value: 28 },
                                { minWidth: Breakpoints.Desktop, value: 32 },
                              ],
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.price}
                        {'€'}
                      </Text>
                      {/* / Tag */}
                      <Text
                        accessible={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'],
                            {
                              fontFamily: 'Urbanist_400Regular',
                              fontSize: [
                                { minWidth: Breakpoints.Mobile, value: 18 },
                                { minWidth: Breakpoints.Laptop, value: 20 },
                                { minWidth: Breakpoints.Desktop, value: 23 },
                              ],
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {' / Tag'}
                      </Text>
                    </View>
                    <>
                      {!(fetchData?.userId !== Constants['myUserId']) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              width: [
                                { minWidth: Breakpoints.Mobile, value: '50%' },
                                { minWidth: Breakpoints.Laptop, value: '50%' },
                              ],
                            },
                            dimensions.width
                          )}
                        >
                          <Button
                            icon={'Entypo/paper-plane'}
                            onPress={() => {
                              try {
                                navigation.navigate('ChatBoxPageScreen', {
                                  productId: fetchData?.id,
                                  userIdOther: fetchData?.userId,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ButtonStyles(theme)['Button'],
                                {
                                  borderRadius: 40,
                                  fontFamily: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'Urbanist_300Light',
                                    },
                                    {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'Urbanist_500Medium',
                                    },
                                  ],
                                  fontSize: [
                                    { minWidth: Breakpoints.Mobile, value: 13 },
                                    { minWidth: Breakpoints.Laptop, value: 18 },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 20,
                                    },
                                  ],
                                }
                              ),
                              dimensions.width
                            )}
                            title={'Nachricht schreiben'}
                          />
                        </View>
                      )}
                    </>
                  </View>
                </View>
              </>
            );
          }}
        </BackendApi.FetchOfferGET>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default withTheme(ProductDetailPageScreen);
