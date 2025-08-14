import { SafeAreaView, StatusBar, Text } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-red-500" >
      <StatusBar barStyle="dark-content"/>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </SafeAreaView>
  );
}
