import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    width: 96,
    height: 24,
    backgroundColor: colors.zinc700,
    color: colors.zinc100,
    fontSize: 12,
    borderWidth: 1,
    borderColor: colors.zinc700,
    borderRadius: 6,
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  inputFocused: {
    borderColor: colors.yellow,
  }
})




