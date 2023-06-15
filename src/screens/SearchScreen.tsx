import { ScrollView, View, StyleSheet } from "react-native"

const SearchScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView></ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#B46060",
    ...StyleSheet.absoluteFillObject,
  },
})

export default SearchScreen
