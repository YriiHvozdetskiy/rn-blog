import Home from "../screens/Home";

export const navList = [
   {
      name: 'Home',
      component: Home,
      options: {
         title: "Home screen",
         // headerStyle: {
         //    backgroundColor: "#f4511e",
         // },
         // headerTintColor: "#fff",
         // headerTitleStyle: {
         //    fontWeight: "bold",
         //    fontSize: 20,
         // },
         headerShown: true, //TODO коли тут false а в animationEnabled true НЕМА помилки onAnimatedValueUpdate
         animationEnabled: true //TODO коли true - можем на айфоні повернутися "жестом" з боку екрана
      }
   },
]