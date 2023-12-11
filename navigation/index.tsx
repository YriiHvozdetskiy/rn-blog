import {createStackNavigator} from "@react-navigation/stack";

import {navList} from "./mock";

const Stack = createStackNavigator();

export default function Navigation() {

   return (
      <Stack.Navigator initialRouteName={'Home'}>{/*вказуєм якийм буде перший екран */}
         {navList.map(screen => {
            return (
               <Stack.Screen
                  key={screen.name}
                  name={screen.name}
                  component={screen.component}
                  options={screen.options}
               />
            )
         })
         }
      </Stack.Navigator>
   );
};