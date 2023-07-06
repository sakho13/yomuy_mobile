import { StyleSheet } from "react-native"

export const novelCellStyle = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderLeftWidth: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },

  info: {
    paddingHorizontal: 4,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
  },

  details: {
    paddingHorizontal: 8,
  },
})
