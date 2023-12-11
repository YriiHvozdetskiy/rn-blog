import {NavigationContainer} from "@react-navigation/native";
import {ReactNode, useState} from "react";
import {SafeAreaView} from "react-native";
import {Provider} from "react-redux";
import axios from "axios";

import {persistor, store} from "@/store/redux/store";

interface Props {
   children: ReactNode
}

export default function Providers({children}: Props) {
   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

   // перевірка чи є токен в сторі
   const onBeforeLift = () => {
      const userToken = store.getState().user.token;

      axios.defaults.headers.common.Authorization = userToken ? `Bearer ${userToken}` : '';

      setIsUserLoggedIn(userToken);
   }

   return (
      <SafeAreaView style={{backgroundColor: '#fff', height: '100%', flex: 1}}>
         <Provider store={store}>
            <PersistGate
               loading={null} // loading screen while persistor loading
               persistor={persistor}
               onBeforeLift={onBeforeLift}
            >
               <NavigationContainer>
                  {children}
               </NavigationContainer>
            </PersistGate>
         </Provider>
      </SafeAreaView>
   );
};