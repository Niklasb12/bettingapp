import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "@/app/(drawer)/home";
import ProfileScreen from "@/app/(drawer)/profile";

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
