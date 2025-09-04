import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Movie } from "../services";
import { imageUrl } from "../utils/constants";
import { MovieListItem } from "./MovieListItem";

interface MovieListProps {
  data: Movie[];
  title: string;
  isLoading: boolean;
  onEndCallback: () => Promise<void>;
}

export const MovieList = ({
  data,
  title,
  isLoading,
  onEndCallback,
}: MovieListProps) => {
  const renderItem = useCallback(
    ({ item }: any) => (
      <MovieListItem
        uri={item?.poster_path ? `${imageUrl}${item.poster_path}` : null}
        title={item.title}
      />
    ),
    []
  );

  return (
    <View className="gap-2">
      <Text className="text-black text-2xl font-bold ">{title}</Text>

      <FlatList
        initialNumToRender={50}
        maxToRenderPerBatch={50}
        updateCellsBatchingPeriod={10}
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
        data={data}
        keyExtractor={(item, index) =>
          `${item.id.toString()}}${item.title}${index}`
        }
        horizontal
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
