import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Person } from "../../services";
import { imageUrl } from "../../utils/constants";
import { PersonListItem } from "./PersonItem";

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
  const renderItem = useCallback(
    ({ item }: any) => (
      <PersonListItem
        name={item.name}
        uri={item?.profile_path ? `${imageUrl}${item.poster_path}` : null}
      />
    ),
    []
  );

  return (
    <View className="gap-2">
      <Text className="text-black text-2xl font-bold ">Trending People</Text>

      <FlatList
        data={data}
        removeClippedSubviews
        initialNumToRender={50}
        maxToRenderPerBatch={50}
        updateCellsBatchingPeriod={10}
        keyExtractor={(item, index) =>
          `${item.id.toString()}}${item.name}${index}`
        }
        horizontal
        getItemLayout={(data, index) => ({
          length: 350,
          offset: 30 * index,
          index,
        })}
        onEndReached={() => {
          if (!isLoading && data.length > 0) {
            onEndCallback?.();
          }
        }}
        renderItem={renderItem}
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
