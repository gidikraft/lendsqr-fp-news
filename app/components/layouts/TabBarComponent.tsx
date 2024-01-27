/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import {
  NavigationProp,
  NavigationState,
  NavigatorScreenParams,
} from "@react-navigation/native";

import Home from "../assets/svgs/tabs/home.svg";
import Home_ from "../assets/svgs/tabs/home.svg";

import More from "../assets/svgs/tabs/user.svg";
import More_ from "../assets/svgs/tabs/user.svg";
import { palette } from "@/theme/";
import Text from "../Text";
// import { RootTabParamList, RootTabScreenProps } from "@/navigation/types";
import { wp, hp, fp } from "@/theme/layout";

interface MyTabBarprops {
  state: NavigationState;
  navigation: NavigationProp;
  descriptors: NavigatorScreenParams  ;
}

const MyTabBar: React.FC<MyTabBarprops> = ({
  state,
  descriptors,
  navigation,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const imagesObj = {
    home: {
      inActive: <Home_ height={hp(19)} width={wp(19)} />,
      isActive: <Home height={hp(19)} width={wp(19)} />,
    },
    more: {
      inActive: <More_ height={hp(19)} width={wp(19)} />,
      isActive: <More height={fp(19)} width={fp(19)} />,
    },
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental &&
              UIManager.setLayoutAnimationEnabledExperimental(true);
          }
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <SingleTab
            label={label}
            images={imagesObj[label.toLowerCase()]}
            isFocused={isFocused}
            onPress={onPress}
            key={`TABS_${index}`}
          />
        );
      })}
    </View>
  );
};
const SingleTab = (props: any) => {
  const { images, label, isFocused, onPress, onLongPress } = props;
  const { singleTabContainer, singleTabContainerOne } = styles;
  return (
    <Pressable
      onPress={onPress}
      style={
        isFocused
          ? singleTabContainer
          : [
              singleTabContainerOne,
              {
                justifyContent:
                  label.toLowerCase() === "more" ? "flex-end" : "flex-start",
              },
            ]
      }
      onLongPress={onLongPress}>
      {isFocused ? images.isActive : images.inActive}
      <Text variant='bold16' color="blue" ml={isFocused ? "ssm" : "xxs"} >
        {isFocused ? label : ""}
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    height: hp(70),
    borderRadius: hp(60),
    width: "50%",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    position: "absolute",
    bottom: hp(10),
    paddingHorizontal: wp(20),
    opacity: 0.9,
  },
  singleTabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: hp(46),
    backgroundColor: palette.white,
    borderRadius: hp(40),
    width: "67%",
    paddingHorizontal: wp(11),
  },
  singleTabContainerOne: {
    flexDirection: "row",
    alignItems: "center",
    height: hp(46),
    borderRadius: hp(40),
    width: "33%",
  },
  labelTextStyle: {},
});
export default MyTabBar;
