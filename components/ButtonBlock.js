import React from 'react';
import * as BackendApi from '../apis/BackendApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, withTheme } from '@draftbit/ui';

const ButtonBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Button
      onPress={() => {
        const handler = async () => {
          try {
            const returnJSON = (
              await BackendApi.loginPOST(Constants, {
                email: email,
                password: password,
              })
            )?.json;
            const token = returnJSON?.authToken;
            console.log(token);
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
          fontSize: 15,
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
  );
};

export default withTheme(ButtonBlock);
