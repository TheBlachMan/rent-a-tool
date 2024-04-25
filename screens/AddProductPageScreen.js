import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as BackendApi from '../apis/BackendApi.js';
import LogoBlock from '../components/LogoBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openImagePickerUtil from '../utils/openImagePicker';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Icon,
  NumberInput,
  Picker,
  Pressable,
  RadioButtonGroup,
  RadioButtonRow,
  ScreenContainer,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Modal, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddProductPageScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [authToken, setAuthToken] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('');
  const [categoryOptions, setCategoryOptions] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [isApiSuccess, setIsApiSuccess] = React.useState('');
  const [offerOrWanted, setOfferOrWanted] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [numberInputValue, setNumberInputValue] = React.useState(undefined);
  const [radioButtonGroupValue, setRadioButtonGroupValue] =
    React.useState(undefined);
  const [textInputValue, setTextInputValue] = React.useState('');
  const backendOfferPOST = BackendApi.useOfferPOST();
  const backendWantedPOST = BackendApi.useWantedPOST();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const returnJSON = (await BackendApi.categorysGET(Constants))?.json;
        setCategoryOptions(returnJSON);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
      >
        <LogoBlock />
        <Spacer bottom={8} left={8} right={8} top={16} />
        {/* Title */}
        <Text
          accessible={true}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
              alignSelf: 'center',
              fontFamily: 'Urbanist_700Bold',
              fontSize: [
                { minWidth: Breakpoints.Mobile, value: 25 },
                { minWidth: Breakpoints.Desktop, value: 30 },
              ],
            }),
            dimensions.width
          )}
        >
          {'Beitrag erstellen'}
        </Text>

        <View
          style={StyleSheet.applyWidth(
            {
              marginLeft: [
                { minWidth: Breakpoints.Mobile, value: 8 },
                { minWidth: Breakpoints.Tablet, value: 16 },
                { minWidth: Breakpoints.Laptop, value: 24 },
                { minWidth: Breakpoints.Desktop, value: 32 },
              ],
              marginRight: [
                { minWidth: Breakpoints.Mobile, value: 8 },
                { minWidth: Breakpoints.Tablet, value: 16 },
                { minWidth: Breakpoints.Laptop, value: 24 },
                { minWidth: Breakpoints.Desktop, value: 32 },
              ],
              marginTop: 16,
            },
            dimensions.width
          )}
        >
          {/* Title */}
          <TextInput
            autoCapitalize={'none'}
            autoFocus={false}
            changeTextDelay={500}
            maxLength={20}
            onChangeText={newTitleValue => {
              const textInputValue = newTitleValue;
              try {
                setTitle(newTitleValue);
              } catch (err) {
                console.error(err);
              }
            }}
            placeholder={'Titel...'}
            placeholderTextColor={theme.colors['Medium']}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextInputStyles(theme)['Text Input'],
                {
                  backgroundColor: theme.colors['Light'],
                  borderColor: 'rgba(0, 0, 0, 0)',
                  color: theme.colors['Secondary'],
                  fontFamily: 'Urbanist_500Medium',
                  fontSize: [
                    { minWidth: Breakpoints.Mobile, value: 15 },
                    { minWidth: Breakpoints.Laptop, value: 17 },
                    { minWidth: Breakpoints.Desktop, value: 20 },
                  ],
                  marginBottom: 16,
                  paddingBottom: 10,
                  paddingLeft: 16,
                  paddingTop: 10,
                }
              ),
              dimensions.width
            )}
            value={title}
            webShowOutline={true}
          />
          {/* Category */}
          <Picker
            autoDismissKeyboard={true}
            dropDownBackgroundColor={theme.colors.background}
            dropDownBorderColor={theme.colors.divider}
            dropDownBorderRadius={8}
            dropDownBorderWidth={1}
            dropDownTextColor={theme.colors.strong}
            iconSize={24}
            leftIconMode={'inset'}
            mode={'native'}
            onValueChange={newCategoryValue => {
              try {
                setCategoryId(newCategoryValue);
              } catch (err) {
                console.error(err);
              }
            }}
            options={categoryOptions}
            placeholder={'Kategorie...'}
            placeholderTextColor={theme.colors['Medium']}
            selectedIconColor={theme.colors.strong}
            selectedIconName={'Feather/check'}
            selectedIconSize={20}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Light'],
                borderColor: 'rgba(0, 0, 0, 0)',
                color: theme.colors['Secondary'],
                fontFamily: 'Urbanist_500Medium',
                fontSize: [
                  { minWidth: Breakpoints.Mobile, value: 15 },
                  { minWidth: Breakpoints.Laptop, value: 17 },
                  { minWidth: Breakpoints.Desktop, value: 20 },
                ],
                marginBottom: 16,
                paddingBottom: 6,
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 6,
              },
              dimensions.width
            )}
            type={'solid'}
            value={categoryId}
          />
          {/* Description */}
          <TextInput
            autoCapitalize={'none'}
            changeTextDelay={500}
            maxLength={200}
            multiline={true}
            onChangeText={newDescriptionValue => {
              const textInputValue = newDescriptionValue;
              try {
                setDescription(newDescriptionValue);
              } catch (err) {
                console.error(err);
              }
            }}
            placeholder={'Beschreibung...'}
            placeholderTextColor={theme.colors['Medium']}
            scrollEnabled={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextInputStyles(theme)['Text Input'],
                {
                  backgroundColor: theme.colors['Light'],
                  borderColor: 'rgba(0, 0, 0, 0)',
                  fontFamily: 'Urbanist_500Medium',
                  fontSize: [
                    { minWidth: Breakpoints.Mobile, value: 15 },
                    { minWidth: Breakpoints.Laptop, value: 17 },
                    { minWidth: Breakpoints.Desktop, value: 20 },
                  ],
                  marginBottom: 16,
                  paddingBottom: 60,
                  paddingLeft: 16,
                  paddingTop: 10,
                }
              ),
              dimensions.width
            )}
            value={description}
            webShowOutline={true}
          />
          {/* Price */}
          <NumberInput
            changeTextDelay={500}
            maxLength={6}
            onChangeText={newPriceValue => {
              const numberInputValue = newPriceValue;
              try {
                setPrice(newPriceValue);
              } catch (err) {
                console.error(err);
              }
            }}
            placeholder={'Preis pro Tag...'}
            placeholderTextColor={theme.colors['Medium']}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.NumberInputStyles(theme)['Number Input'],
                {
                  backgroundColor: theme.colors['Light'],
                  borderColor: 'rgba(0, 0, 0, 0)',
                  fontFamily: 'Urbanist_500Medium',
                  fontSize: [
                    { minWidth: Breakpoints.Mobile, value: 15 },
                    { minWidth: Breakpoints.Laptop, value: 17 },
                    { minWidth: Breakpoints.Desktop, value: 20 },
                  ],
                  marginBottom: 16,
                  paddingBottom: 10,
                  paddingLeft: 16,
                  paddingTop: 10,
                }
              ),
              dimensions.width
            )}
            value={price}
            webShowOutline={true}
          />
          {/* OfferOrWanted */}
          <View
            style={StyleSheet.applyWidth(
              {
                marginBottom: 16,
                width: [
                  { minWidth: Breakpoints.Mobile, value: 345 },
                  { minWidth: Breakpoints.Laptop, value: 390 },
                  { minWidth: Breakpoints.Desktop, value: 450 },
                ],
              },
              dimensions.width
            )}
          >
            {/* OfferOrWanted */}
            <RadioButtonGroup
              direction={'vertical'}
              onValueChange={newOfferOrWantedValue => {
                const radioButtonGroupValue = newOfferOrWantedValue;
                try {
                  setOfferOrWanted(newOfferOrWantedValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              value={categoryId}
            >
              {/* Offer */}
              <RadioButtonRow
                color={theme.colors.primary}
                direction={'row-reverse'}
                label={'Angebot - Dieses Tool biete ich an.'}
                style={StyleSheet.applyWidth(
                  {
                    fontFamily: 'Urbanist_500Medium',
                    fontSize: [
                      { minWidth: Breakpoints.Mobile, value: 15 },
                      { minWidth: Breakpoints.Laptop, value: 17 },
                      { minWidth: Breakpoints.Desktop, value: 20 },
                    ],
                  },
                  dimensions.width
                )}
                unselectedColor={theme.colors.primary}
                value={'offer'}
              />
              {/* Wanted */}
              <RadioButtonRow
                color={theme.colors.primary}
                direction={'row-reverse'}
                label={'Gesucht - Dieses Tool suche ich.      '}
                style={StyleSheet.applyWidth(
                  {
                    fontFamily: 'Urbanist_500Medium',
                    fontSize: [
                      { minWidth: Breakpoints.Mobile, value: 15 },
                      { minWidth: Breakpoints.Laptop, value: 17 },
                      { minWidth: Breakpoints.Desktop, value: 20 },
                    ],
                  },
                  dimensions.width
                )}
                unselectedColor={theme.colors.primary}
                value={'wanted'}
              />
            </RadioButtonGroup>
          </View>
          {/* Image Input */}
          <>
            {imageUrl ? null : (
              <Pressable
                onPress={() => {
                  const handler = async () => {
                    try {
                      const base64 = await openImagePickerUtil({
                        mediaTypes: 'Images',
                        allowsEditing: true,
                        quality: 0.2,
                        allowsMultipleSelection: false,
                        permissionErrorMessage:
                          'Sorry, we need notifications permissions to make this work.',
                        showAlertOnPermissionError: true,
                      });

                      setImageUrl(base64);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: theme.colors['Light Inverse'],
                      borderColor: {
                        minWidth: Breakpoints.Desktop,
                        value: theme.colors['Primary'],
                      },
                      borderRadius: 40,
                      borderWidth: { minWidth: Breakpoints.Desktop, value: 1 },
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    name={'MaterialIcons/add-photo-alternate'}
                    size={30}
                    style={StyleSheet.applyWidth(
                      { marginLeft: 24, marginRight: 16 },
                      dimensions.width
                    )}
                  />
                  <Text
                    accessible={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        {
                          fontFamily: 'Urbanist_500Medium',
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 15 },
                            { minWidth: Breakpoints.Laptop, value: 17 },
                            { minWidth: Breakpoints.Desktop, value: 20 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Beitragsbild hinzufügen'}
                  </Text>
                </View>
              </Pressable>
            )}
          </>
          {/* RepickImage */}
          <>
            {!imageUrl ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderColor: theme.colors['Secondary'],
                    flexDirection: 'row',
                    justifyContent: {
                      minWidth: Breakpoints.Tablet,
                      value: 'flex-start',
                    },
                  },
                  dimensions.width
                )}
              >
                {/* repickImage */}
                <Pressable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const base64 = await openImagePickerUtil({
                          mediaTypes: 'Images',
                          allowsEditing: true,
                          quality: 0.2,
                          allowsMultipleSelection: false,
                          permissionErrorMessage:
                            'Sorry, we need notifications permissions to make this work.',
                          showAlertOnPermissionError: true,
                        });

                        setImageUrl(base64);
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    { width: '50%' },
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={{ uri: `${imageUrl}` }}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'],
                        {
                          borderColor: theme.colors['Secondary'],
                          borderRadius: [
                            { minWidth: Breakpoints.Mobile, value: 30 },
                            { minWidth: Breakpoints.Desktop, value: 40 },
                          ],
                          height: [
                            { minWidth: Breakpoints.Mobile, value: 170 },
                            { minWidth: Breakpoints.Tablet, value: 200 },
                            { minWidth: Breakpoints.Desktop, value: 400 },
                          ],
                          width: [
                            { minWidth: Breakpoints.Mobile, value: 170 },
                            { minWidth: Breakpoints.Tablet, value: 200 },
                            { minWidth: Breakpoints.Desktop, value: 400 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  />
                </Pressable>
                {/* repickImage */}
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const base64 = await openImagePickerUtil({
                          mediaTypes: 'Images',
                          allowsEditing: true,
                          quality: 0.2,
                          allowsMultipleSelection: false,
                          permissionErrorMessage:
                            'Sorry, we need notifications permissions to make this work.',
                          showAlertOnPermissionError: true,
                        });

                        setImageUrl(base64);
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'],
                      {
                        backgroundColor: [
                          {
                            minWidth: Breakpoints.Mobile,
                            value: theme.colors['Light Inverse'],
                          },
                          {
                            minWidth: Breakpoints.Desktop,
                            value: theme.colors['Light Inverse'],
                          },
                        ],
                        borderColor: {
                          minWidth: Breakpoints.Desktop,
                          value: theme.colors['Primary'],
                        },
                        borderRadius: 40,
                        borderWidth: {
                          minWidth: Breakpoints.Desktop,
                          value: 1,
                        },
                        color: theme.colors['Medium'],
                        fontFamily: 'Urbanist_300Light',
                        fontSize: [
                          { minWidth: Breakpoints.Mobile, value: 14 },
                          { minWidth: Breakpoints.Desktop, value: 20 },
                        ],
                        height: 16,
                        width: '50%',
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Anderes Bild wählen'}
                />
              </View>
            )}
          </>
          {/* Spacer 2 */}
          <Spacer bottom={16} left={8} right={8} top={16} />
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: theme.colors['Error'],
                fontFamily: 'Urbanist_400Regular',
                fontSize: 15,
              }),
              dimensions.width
            )}
          >
            {errorMsg}
          </Text>
          {/* Submit */}
          <Button
            icon={'AntDesign/pluscircleo'}
            onPress={() => {
              const handler = async () => {
                try {
                  if (offerOrWanted) {
                    if (offerOrWanted.includes('offer')) {
                      const responseOffer = (
                        await backendOfferPOST.mutateAsync({
                          categoryId: categoryId,
                          description: description,
                          imageUrl: imageUrl,
                          price: price,
                          title: title,
                        })
                      )?.json;
                      console.log('Offer response:', responseOffer);
                    } else {
                      const responseWanted = (
                        await backendWantedPOST.mutateAsync({
                          categoryId: categoryId,
                          description: description,
                          imageUrl: imageUrl,
                          price: price,
                          title: title,
                        })
                      )?.json;
                      console.log('Wanted response:', responseWanted);
                    }

                    setIsApiSuccess(true);
                  } else {
                    setErrorMsg(
                      'Bitte wähle zwischen Angebot und Gesucht aus. '
                    );
                  }
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
                borderRadius: 40,
                fontFamily: 'Urbanist_700Bold',
                fontSize: [
                  { minWidth: Breakpoints.Mobile, value: 17 },
                  { minWidth: Breakpoints.Desktop, value: 20 },
                ],
                paddingBottom: { minWidth: Breakpoints.Desktop, value: 10 },
                paddingTop: { minWidth: Breakpoints.Desktop, value: 10 },
              }),
              dimensions.width
            )}
            title={'  Beitrag erstellen'}
          />
        </View>
      </KeyboardAwareScrollView>
      <>
        {!isApiSuccess ? null : (
          <Modal animationType={'fade'} transparent={true}>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors['Surface'],
                    borderColor: theme.colors['Medium'],
                    borderRadius: 30,
                    borderWidth: 5,
                    height: 150,
                    justifyContent: 'space-evenly',
                    width: 330,
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      fontFamily: 'Urbanist_600SemiBold',
                      fontSize: 15,
                    }),
                    dimensions.width
                  )}
                >
                  {'Danke für deinen Beitrag 🎉 '}
                </Text>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/* toHome */}
                  <Button
                    onPress={() => {
                      try {
                        navigation.navigate('BottomTabNavigator', {
                          screen: 'HomePageScreen',
                        });
                        setIsApiSuccess('');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button'],
                        {
                          backgroundColor: theme.colors['Light Inverse'],
                          borderRadius: 40,
                          color: theme.colors['Primary'],
                          width: '40%',
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Startseite'}
                  />
                  {/* toMyItems */}
                  <Button
                    onPress={() => {
                      try {
                        setIsApiSuccess('');
                        navigation.navigate('BottomTabNavigator', {
                          screen: 'MyProductsPageScreen',
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button'],
                        { borderRadius: 40, width: '40%' }
                      ),
                      dimensions.width
                    )}
                    title={'Meine Beiträge'}
                  />
                </View>
              </View>
            </View>
          </Modal>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(AddProductPageScreen);
