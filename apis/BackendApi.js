import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import { handleResponse, isOkStatus } from '../utils/handleRestApiResponse';
import usePrevious from '../utils/usePrevious';
import encodeQueryParam from '../utils/encodeQueryParam';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const categorysGET = (Constants, _args, handlers = {}) =>
  fetch(
    `http://localhost:8080/rent-a-tool/v1/category_names`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(res => handleResponse(res, handlers));

export const useCategorysGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['categories', args],
    () => categorysGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchCategorysGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useCategorysGET(
    {},
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchCategorys: refetch });
};

export const chatroomRequestorGET = (Constants, _args, handlers = {}) =>
  fetch(
    `http://localhost:8080/rent-a-tool/v1/chatroom/requestor`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(res => handleResponse(res, handlers));

export const useChatroomRequestorGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['chatrooms requestors', args],
    () => chatroomRequestorGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchChatroomRequestorGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useChatroomRequestorGET(
    {},
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchChatroomRequestor: refetch });
};

export const loginPOST = (Constants, { email, password }, handlers = {}) =>
  fetch(`http://localhost:8080/rent-a-tool/v1/auth/login`, {
    body: JSON.stringify({ email: email, password: password }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useLoginPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['login', args], () => loginPOST(Constants, args, handlers), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['logins']),
  });
};

export const FetchLoginPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  email,
  password,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useLoginPOST(
    { email, password },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchLogin: refetch });
};

export const meGET = (Constants, _args, handlers = {}) =>
  fetch(`http://localhost:8080/rent-a-tool/v1/user`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['authToken'],
      'Content-Type': 'application/json',
    },
  }).then(res => handleResponse(res, handlers));

export const useMeGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['user', args], () => meGET(Constants, args, handlers), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};

export const FetchMeGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useMeGET({}, { refetchInterval, handlers: { onData, ...handlers } });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchMe: refetch });
};

export const messagePOST = (
  Constants,
  { message, productId, userIdOther },
  handlers = {}
) =>
  fetch(`http://localhost:8080/rent-a-tool/v1/message`, {
    body: JSON.stringify({
      message: message,
      product_id: productId,
      userId_other: userIdOther,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['authToken'],
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useMessagePOST = (initialArgs = {}, { handlers = {} } = {}) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => messagePOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('message', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('message');
        queryClient.invalidateQueries('messages');
      },
    }
  );
};

export const FetchMessagePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  message,
  productId,
  userIdOther,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useMessagePOST(
    { message, productId, userIdOther },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchMessage: refetch });
};

export const offerGET = (Constants, { offerId }, handlers = {}) =>
  fetch(
    `http://localhost:8080/rent-a-tool/v1/offer/${
      typeof offerId === 'string' ? offerId : JSON.stringify(offerId ?? '')
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(res => handleResponse(res, handlers));

export const useOfferGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['offer', args], () => offerGET(Constants, args, handlers), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['offers']),
  });
};

export const FetchOfferGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  offerId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useOfferGET(
    { offerId },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchOffer: refetch });
};

export const offerPOST = (
  Constants,
  { categoryId, description, imageUrl, price, title },
  handlers = {}
) =>
  fetch(`http://localhost:8080/rent-a-tool/v1/offer`, {
    body: JSON.stringify({
      title: title,
      description: description,
      category_id: categoryId,
      price: price,
      image: imageUrl,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['authToken'],
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useOfferPOST = (initialArgs = {}, { handlers = {} } = {}) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => offerPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('offer', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('offer');
        queryClient.invalidateQueries('offers');
      },
    }
  );
};

export const FetchOfferPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  categoryId,
  description,
  imageUrl,
  price,
  title,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useOfferPOST(
    { categoryId, description, imageUrl, price, title },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchOffer: refetch });
};

export const offersGET = (Constants, _args, handlers = {}) =>
  fetch(`http://localhost:8080/rent-a-tool/v1/offer`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['authToken'],
      'Content-Type': 'application/json',
    },
  }).then(res => handleResponse(res, handlers));

export const useOffersGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['offers', args],
    () => offersGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchOffersGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useOffersGET({}, { refetchInterval, handlers: { onData, ...handlers } });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchOffers: refetch });
};

export const wantedGET = (Constants, { wantedId }, handlers = {}) =>
  fetch(
    `http://localhost:8080/rent-a-tool/v1/request/${
      typeof wantedId === 'string' ? wantedId : JSON.stringify(wantedId ?? '')
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(res => handleResponse(res, handlers));

export const useWantedGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['wanted', args],
    () => wantedGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['wanteds']),
    }
  );
};

export const FetchWantedGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  wantedId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useWantedGET(
    { wantedId },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchWanted: refetch });
};

export const wantedPOST = (
  Constants,
  { categoryId, description, imageUrl, price, title },
  handlers = {}
) =>
  fetch(`http://localhost:8080/rent-a-tool/v1/request`, {
    body: JSON.stringify({
      title: title,
      description: description,
      category_id: categoryId,
      price: price,
      image: imageUrl,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['authToken'],
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useWantedPOST = (initialArgs = {}, { handlers = {} } = {}) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => wantedPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('wanted', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('wanted');
        queryClient.invalidateQueries('wanteds');
      },
    }
  );
};

export const FetchWantedPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  categoryId,
  description,
  imageUrl,
  price,
  title,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useWantedPOST(
    { categoryId, description, imageUrl, price, title },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchWanted: refetch });
};

export const wantedsGET = (Constants, _args, handlers = {}) =>
  fetch(`http://localhost:8080/rent-a-tool/v1/request`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['authToken'],
      'Content-Type': 'application/json',
    },
  }).then(res => handleResponse(res, handlers));

export const useWantedsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['wanteds', args],
    () => wantedsGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchWantedsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useWantedsGET({}, { refetchInterval, handlers: { onData, ...handlers } });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchWanteds: refetch });
};

export const chatroomOwnerGET = (Constants, _args, handlers = {}) =>
  fetch(
    `http://localhost:8080/rent-a-tool/v1/chatroom/owner`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(res => handleResponse(res, handlers));

export const useChatroomOwnerGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['chatroom owners', args],
    () => chatroomOwnerGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchChatroomOwnerGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useChatroomOwnerGET(
    {},
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchChatroomOwner: refetch });
};

export const messageChatPOST = (
  Constants,
  { productId, userIdOther },
  handlers = {}
) =>
  fetch(`http://localhost:8080/rent-a-tool/v1/message/chat`, {
    body: JSON.stringify({ user_id_other: userIdOther, product_id: productId }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['authToken'],
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useMessageChatPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['message Chats', args],
    () => messageChatPOST(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchMessageChatPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  productId,
  userIdOther,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useMessageChatPOST(
    { productId, userIdOther },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchMessageChat: refetch });
};

export const myOffersGET = (Constants, _args, handlers = {}) =>
  fetch(
    `http://localhost:8080/rent-a-tool/v1/offer/myOffers`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(res => handleResponse(res, handlers));

export const useMyOffersGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['myOffers', args],
    () => myOffersGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchMyOffersGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useMyOffersGET(
    {},
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchMyOffers: refetch });
};

export const myWantedsGET = (Constants, _args, handlers = {}) =>
  fetch(
    `http://localhost:8080/rent-a-tool/v1/request/myRequests`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(res => handleResponse(res, handlers));

export const useMyWantedsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['myWanteds', args],
    () => myWantedsGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchMyWantedsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useMyWantedsGET(
    {},
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchMyWanteds: refetch });
};
