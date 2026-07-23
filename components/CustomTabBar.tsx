import Ionicons from "@expo/vector-icons/Ionicons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import type { Route } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";

type IconName = keyof typeof Ionicons.glyphMap;

const TAB_CONFIG: Record<string, { label: string; icon: IconName }> = {
  index: { label: "Home", icon: "home" },
  gallery: { label: "Gallery", icon: "images" },
  search: { label: "Search", icon: "search" },
  profile: { label: "Profile", icon: "person" },
  settings: { label: "Settings", icon: "settings" },
};

function TabItem({
  route,
  isFocused,
  onPress,
  onLongPress,
}: {
  route: Route<string>;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const config = TAB_CONFIG[route.name] ?? {
    label: route.name,
    icon: "help-circle",
  };
  const iconName = config.icon;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.item}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={config.label}
    >
      <View style={styles.itemInner}>
        {isFocused && <View style={styles.activePill} />}
        <View style={styles.iconWrap}>
          <Ionicons
            name={isFocused ? iconName : (`${iconName}-outline` as IconName)}
            size={22}
            color={isFocused ? Colors.background : Colors.text}
          />
        </View>
        <Text
          style={[
            styles.label,
            { color: isFocused ? Colors.background : Colors.text },
            isFocused && styles.labelActive,
          ]}
        >
          {config.label}
        </Text>
      </View>
    </Pressable>
  );
}

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.outer, { bottom: insets.bottom + 12 }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: route.key });
          };

          return (
            <TabItem
              key={route.key}
              route={route}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: "absolute",
    left: 20,
    right: 20,
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 4,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: Colors.text,
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  itemInner: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 56,
  },
  activePill: {
    position: "absolute",
    backgroundColor: Colors.primary,
    borderRadius: 20,
    width: 56,
    height: 42,
    shadowColor: Colors.primary,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconWrap: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: "500",
    marginTop: 3,
    zIndex: 1,
  },
  labelActive: {
    fontWeight: "700",
  },
});
