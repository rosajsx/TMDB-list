import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { TVShow } from "../../services";
import { imageUrl } from "../../utils/constants";
import { TvShowListItem } from "./TvShowListItem";

interface TvShowListProps {
  data: TVShow[];
  isLoading: boolean;
  onEndCallback: () => Promise<void>;
}

export const TvShowList = ({
  data,
  isLoading,
  onEndCallback,
}: TvShowListProps) => {
  const renderItem = useCallback(
    ({ item }: any) => (
      <TvShowListItem
        uri={item?.poster_path ? `${imageUrl}${item.poster_path}` : null}
        title={item.title}
      />
    ),
    []
  );

  return (
    <View className="gap-2">
      <Text className="text-black text-2xl font-bold ">Séries</Text>

      <FlatList
        data={data}
        removeClippedSubviews
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={50}
        maxToRenderPerBatch={50}
        updateCellsBatchingPeriod={10}
        getItemLayout={(data, index) => ({
          length: 350,
          offset: 30 * index,
          index,
        })}
        horizontal
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
