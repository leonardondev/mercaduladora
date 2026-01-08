import { StyleSheet } from "react-native";

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.zinc800,
    borderColor: colors.zinc700,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    gap: 8,
  },
  productSubheader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
    gap: 8,
  },
  productName: {
    color: colors.zinc100,
    flex: 1,
  },
  productNameDone: {
    color: colors.zinc500,
    textDecorationLine: 'line-through'
  },
  trashButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productAmount: {
    flex: 1,
    textAlign: 'right',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.yellow,
  },
  productAmountDone: {
    color: colors.blue,
  }
})