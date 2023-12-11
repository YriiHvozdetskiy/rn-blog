import Login from "@/screens/Login";
import Home from "@/screens/Home";
import Registration from "@/screens/Registration";

export const navList = [
   {
      name: 'Login', //TODO name має співпадати з name в Home/mock
      component: Login,
      options: {
         headerShown: true, //TODO коли тут false а в animationEnabled true НЕМА помилки onAnimatedValueUpdate
         animationEnabled: true //TODO коли true - можем на айфоні повернутися "жестом" з боку екрана
      },
   },
   {
      name: 'Registration', // name має співпадати з name в Home/mock
      component: Registration,
      options: {
         headerShown: true, //TODO коли тут false а в animationEnabled true НЕМА помилки onAnimatedValueUpdate
         animationEnabled: true //TODO коли true - можем на айфоні повернутися "жестом" з боку екрана
      },
   },
   {
      name: 'Home', // name має співпадати з name в Home/mock
      component: Home,
      options: {
         // title: "Home screen",
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