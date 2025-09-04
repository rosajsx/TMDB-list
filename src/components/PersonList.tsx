import { Image } from "expo-image";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Person } from "../services";
import { imageUrl } from "../utils/constants";

interface PeopleListProps {
  data: Person[];
  isLoading: boolean;
  onEndCallback: () => Promise<void>;
}

export const PeopleList = ({
  data,
  isLoading,
  onEndCallback,
}: PeopleListProps) => {
  return (
    <View className="gap-2">
      <Text className="text-black text-2xl font-bold ">Trending People</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        onEndReached={() => {
          if (!isLoading && data.length > 0) {
            onEndCallback?.();
          }
        }}
        renderItem={({ item }) => {
          const uri = item?.profile_path
            ? `${imageUrl}${item.profile_path}`
            : null;

          return (
            <View className="gap-4 max-h-[350px] max-w-[200px] h-[350px] w-[200px] rounded-xl">
              <Image
                source={uri}
                placeholder={{ blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" }}
                contentFit="cover"
                transition={1000}
                style={{ width: 200, height: 300, borderRadius: 12 }}
              />
              <Text className="text-black font-bold text-center  ">
                {item.name}
              </Text>
            </View>
          );
        }}
        contentContainerClassName="gap-2"
        ListEmptyComponent={
          <View>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text className=" text-xl text-black font-bold">
                Nothing found
              </Text>
            )}
          </View>
        }
      />
    </View>
  );
};
