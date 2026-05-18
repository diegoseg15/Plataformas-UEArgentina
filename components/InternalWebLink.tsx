import React from "react";
import { Pressable, PressableProps } from "react-native";
import { router } from "expo-router";

type InternalWebLinkProps = PressableProps & {
  href: string;
  title: string;
  children: React.ReactNode;
};

export function InternalWebLink({
  href,
  title,
  children,
  ...props
}: InternalWebLinkProps) {
  const openInternalBrowser = () => {
    router.push({
      pathname: "/browser",
      params: {
        url: encodeURIComponent(href),
        title,
      },
    });
  };

  return (
    <Pressable onPress={openInternalBrowser} {...props}>
      {children}
    </Pressable>
  );
}
