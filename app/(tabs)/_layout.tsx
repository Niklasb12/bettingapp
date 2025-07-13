import { Slot } from "expo-router";
import AuthWrapper from "../../components/AuthWrapper";

export default function Layout() {
  return (
    <AuthWrapper>
      <Slot />
    </AuthWrapper>
  );
}
