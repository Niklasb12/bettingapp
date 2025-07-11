import React from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#fff" />
      <Slot />
    </>
  );
}
