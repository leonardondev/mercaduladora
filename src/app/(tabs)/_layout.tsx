// import { colors } from '@/theme/colors'
// import AntDesign from '@expo/vector-icons/AntDesign'
// import MaterialIcons from '@expo/vector-icons/MaterialIcons'
// import { Tabs } from 'expo-router'

import { Slot } from 'expo-router'

export default function TabLayout() {
  return <Slot />

  /*return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.yellow,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          backgroundColor: colors.zinc950,
          elevation: 0,
          shadowOpacity: 0,
          borderColor: 'transparent',
          height: 80,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Compras',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resume"
        options={{
          tabBarLabel: 'Resumo',
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="file-done" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  ) */
}
