import { StyleSheet } from "react-native";

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderColor: colors.yellow,
    borderWidth: 1.8,
  },
  checkboxChecked: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderColor: colors.blue,
    backgroundColor: colors.blue,
    color: colors.zinc950,
    alignItems: 'center',
    justifyContent: 'center',
  },
})