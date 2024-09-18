import { View, Text, Image } from 'react-native'
import React, {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import AppContext from './AppContext';
import HomeMenu from './HomeMenu';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// const Loginscreen = () => {
//   return(
//     <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
//       <Stack.Screen name='Login' component={Login}/>
//       <Stack.Screen name='Signup' component={Signup}/>
//       <Stack.Screen name='ForgotPass' component={Fogot_password}/>
//     </Stack.Navigator>
//   )
// }

const Home = () => {
  return(
    
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Homepage' component={HomeMenu}/>
      </Stack.Navigator>
  )
}

// const Tabbar = () => {
//   return(
//       <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//           tabBarStyle: {
//             height: 70,
//             position: 'absolute',
//             bottom: 30,
//             left: 10,
//             right: 10,
//             borderRadius: 10
//           }
          
//         }}
//       >
//         <Tab.Screen name='Trang chu' component={Trangchu} options={{
//           tabBarIcon: ({focus}) => (
//             <View style={{alignItems: 'center'}}>
//               <Image source={require('../asset/Shop.png')} />
//             </View>
//           )
//         }}/>
//         <Tab.Screen name='Reward' component={Reward} options={{
//           tabBarIcon: ({focus}) => (
//             <View style={{alignItems: 'center'}}>
//               <Image source={require('../asset/Buy.png')} />
//             </View>
//           )
//         }}/>
//         <Tab.Screen name='History' component={History} options={{
//           tabBarIcon: ({focus}) => (
//             <View style={{alignItems: 'center'}}>
//               <Image source={require('../asset/Menu.png')} />
//             </View>
//           )
//         }}/>
//       </Tab.Navigator> 
//   )
// }

// function Main() {
//   return(
//     <Stack.Navigator 
//         screenOptions={{headerShown: false,}}
//       >
//       <Stack.Screen name='Tabbar' component={Tabbar} />
//       <Stack.Screen name='Mycart' component={Mycart}/>
//       <Stack.Screen name='Detail_order' component={Detail_order}/>
//       <Stack.Screen name='Checkout' component={Checkout}/>
//       <Stack.Screen name='Profile' component={Profile}/>
//     </Stack.Navigator>
//   )
// }
const Appnavigator = () => {
//   const { isLogin} = useContext(AppContext);
  
//   if(!isLogin){
//     return <Loginscreen/> ;
//   }
//   else {
//     return <Main/>
//   }
    return <Home/>
}

export default Appnavigator