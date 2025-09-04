import { Image } from "expo-image";
import { memo } from "react";
import { Text, View } from "react-native";

interface MovieListItemProps {
  uri: string | null;
  title: string;
}

const MovieListItem = memo(
  ({ title, uri }: MovieListItemProps) => {
    return (
      <View className="gap-4 max-h-[350px] max-w-[200px] h-[350px] w-[200px] rounded-xl">
        <Image
          source={uri}
          placeholder={{ blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" }}
          contentFit="cover"
          transition={1000}
          style={{ width: 200, height: 300, borderRadius: 12 }}
        />
        <Text className="text-black font-bold text-center  ">{title}</Text>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.title === nextProps.title || prevProps.uri === nextProps.uri
    );
  }
);

MovieListItem.displayName = "MovieListItem";

export { MovieListItem };
