import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TermsAndCondition from '../screens/TermsAndCondition';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TermsAndCondition} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}