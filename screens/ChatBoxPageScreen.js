import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as BackendApi from '../apis/BackendApi.js';
import LogoBlock from '../components/LogoBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Icon,
  Pressable,
  ScreenContainer,
  Spacer,
  TextField,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const ChatBoxPageScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [messages, setMessages] = React.useState({});
  const [ownerFirstName, setOwnerFirstName] = React.useState('');
  const [responseJson, setResponseJson] = React.useState({});
  const [toolTitle, setToolTitle] = React.useState('');
  const [typedMessage, setTypedMessage] = React.useState('');
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const returnMarginOnUserIdRight = (Variables, messageJson) => {
    if (messageJson.user_id === Variables.myUserId) {
      // in case my message
      return 16;
    } else {
      //in case not my message
      return 100;
    }
  };

  const myBackground = (Variables, messageJson) => {
    console.log(Variables.myUserId);
    console.log(messageJson.user_id);
    if (messageJson.user_id === Variables.myUserId) {
      //in case this is my message
      return '#D3FFCD';
    } else {
      //in case this is not my message
      return '#E5E5E5';
    }
  };

  const returnMarginOnUserIdLeft = (Variables, messageJson) => {
    if (messageJson.user_id === Variables.myUserId) {
      // in case this is my message
      return 100;
    } else {
      // in case not my message
      return 16;
    }
  };

  const extractMessage = messageJson => {
    return messageJson.message;

    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };
  const backendMessagePOST = BackendApi.useMessagePOST();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
      >
        <LogoBlock />
        <BackendApi.FetchMessageChatPOST
          handlers={{
            onData: fetchData => {
              try {
                setResponseJson(fetchData);
                const productTitle = fetchData?.[0]._product.title;

                const value5qgmV9y7 = productTitle;
                setToolTitle(value5qgmV9y7);
                const responseJson = value5qgmV9y7;
                const ownerFirstName = fetchData?.[0]._user_owner.firstName;
                setOwnerFirstName(ownerFirstName);
                const messages = fetchData?.[0]._messages_of_chatroom;
                setMessages(messages);
              } catch (err) {
                console.error(err);
              }
            },
          }}
          productId={props.route?.params?.productId ?? 33}
          userIdOther={props.route?.params?.userIdOther ?? 1}
        >
          {({ loading, error, data, refetchMessageChat }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginLeft: 16,
                      marginRight: 16,
                      marginTop: 16,
                    },
                    dimensions.width
                  )}
                >
                  <Pressable
                    onPress={() => {
                      try {
                        navigation.goBack();
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <Icon name={'Ionicons/arrow-back-outline'} size={40} />
                  </Pressable>

                  <Text
                    accessible={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        {
                          fontFamily: 'Urbanist_600SemiBold',
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 22 },
                            { minWidth: Breakpoints.Tablet, value: 24 },
                            { minWidth: Breakpoints.Desktop, value: 30 },
                          ],
                          marginLeft: 16,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {toolTitle}
                  </Text>
                </View>
                <Spacer bottom={16} left={8} right={8} top={16} />
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      marginBottom: 8,
                      marginLeft: [
                        { minWidth: Breakpoints.Mobile, value: 16 },
                        { minWidth: Breakpoints.Tablet, value: 24 },
                      ],
                      marginRight: 16,
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
                            { minWidth: Breakpoints.Mobile, value: 19 },
                            { minWidth: Breakpoints.Tablet, value: 22 },
                            { minWidth: Breakpoints.Desktop, value: 30 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Chat mit '}
                    {ownerFirstName}
                  </Text>
                </View>
                <FlatList
                  contentContainerStyle={StyleSheet.applyWidth(
                    {
                      marginLeft: { minWidth: Breakpoints.Tablet, value: 8 },
                      marginRight: { minWidth: Breakpoints.Tablet, value: 8 },
                    },
                    dimensions.width
                  )}
                  data={messages}
                  keyExtractor={(listData, index) =>
                    listData?.id ?? listData?.uuid ?? index.toString()
                  }
                  keyboardShouldPersistTaps={'never'}
                  listKey={'Cx5LyV2a'}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item, index }) => {
                    const listData = item;
                    return (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-start',
                            backgroundColor: myBackground(Variables, listData),
                            borderColor: 'rgba(0, 0, 0, 0)',
                            borderRadius: 10,
                            borderWidth: 1,
                            marginBottom: 8,
                            marginLeft: returnMarginOnUserIdLeft(
                              Variables,
                              listData
                            ),
                            marginRight: returnMarginOnUserIdRight(
                              Variables,
                              listData
                            ),
                            marginTop: {
                              minWidth: Breakpoints.Tablet,
                              value: 8,
                            },
                            paddingBottom: 8,
                            paddingLeft: 8,
                            paddingRight: 8,
                            paddingTop: 8,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          numberOfLines={500}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'],
                              {
                                alignSelf: 'auto',
                                fontFamily: 'Urbanist_400Regular',
                                fontSize: [
                                  { minWidth: Breakpoints.Mobile, value: 14 },
                                  { minWidth: Breakpoints.Laptop, value: 16 },
                                  { minWidth: Breakpoints.Desktop, value: 20 },
                                ],
                                textAlign: 'auto',
                              }
                            ),
                            dimensions.width
                          )}
                          textBreakStrategy={'highQuality'}
                        >
                          {extractMessage(listData)}
                        </Text>
                      </View>
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                />
              </>
            );
          }}
        </BackendApi.FetchMessageChatPOST>
        {/* Input */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-end',
              backgroundColor: theme.colors['Background'],
              borderBottomWidth: 8,
              borderColor: theme.colors['Background'],
              borderLeftWidth: [
                { minWidth: Breakpoints.Mobile, value: 16 },
                { minWidth: Breakpoints.Tablet, value: 24 },
              ],
              borderRightWidth: [
                { minWidth: Breakpoints.Mobile, value: 16 },
                { minWidth: Breakpoints.Tablet, value: 24 },
              ],
              borderTopWidth: 8,
            },
            dimensions.width
          )}
        >
          <TextField
            autoCapitalize={'none'}
            changeTextDelay={500}
            maxLength={500}
            multiline={true}
            numberOfLines={4}
            onChangeText={newStyledTextAreaValue => {
              const textAreaValue = newStyledTextAreaValue;
              try {
                setTypedMessage(newStyledTextAreaValue);
              } catch (err) {
                console.error(err);
              }
            }}
            placeholder={'Neue Nachricht...'}
            placeholderTextColor={theme.colors['Medium']}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Light'],
                borderColor: 'rgba(0, 0, 0, 0)',
                borderRadius: 10,
                color: theme.colors['Strong'],
                fontFamily: 'Urbanist_400Regular',
                fontSize: [
                  { minWidth: Breakpoints.Mobile, value: 14 },
                  { minWidth: Breakpoints.Laptop, value: 17 },
                  { minWidth: Breakpoints.Desktop, value: 20 },
                ],
                marginBottom: 8,
              },
              dimensions.width
            )}
            type={'solid'}
            value={typedMessage}
            webShowOutline={true}
          />
          {/* send */}
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  setTypedMessage('');
                  const responseJson = (
                    await backendMessagePOST.mutateAsync({
                      message: typedMessage,
                      productId: props.route?.params?.productId ?? 33,
                      userIdOther: props.route?.params?.userIdOther ?? 1,
                    })
                  )?.json;
                  const updatedData = (
                    await BackendApi.messageChatPOST(Constants, {
                      productId: props.route?.params?.productId ?? 33,
                      userIdOther: props.route?.params?.userIdOther ?? 1,
                    })
                  )?.json;
                  const updatedMessages =
                    updatedData?.[0]._messages_of_chatroom;
                  setMessages(updatedMessages);
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
                backgroundColor: theme.colors['Light Inverse'],
                borderRadius: 20,
                color: theme.colors['Primary'],
                fontFamily: [
                  {
                    minWidth: Breakpoints.Mobile,
                    value: 'Urbanist_600SemiBold',
                  },
                  { minWidth: Breakpoints.Laptop, value: 'Urbanist_700Bold' },
                ],
                fontSize: [
                  { minWidth: Breakpoints.Mobile, value: 15 },
                  { minWidth: Breakpoints.Laptop, value: 18 },
                ],
                width: 80,
              }),
              dimensions.width
            )}
            title={'senden'}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(ChatBoxPageScreen);
