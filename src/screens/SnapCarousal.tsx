// import React, { Component } from "react";
// import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
// import Carousel from "react-native-snap-carousel-v4";

// const { width: screenWidth } = Dimensions.get("window");

// interface ItemType {
//   title: string;
//   image: string;
// }

// export default class SnapCarousel extends Component {
//   private _carousel: Carousel<ItemType> | null = null;

//   state = {
//     entries: [
//       { title: "Beautiful Nature", image: "https://picsum.photos/800/400?random=1" },
//       { title: "City Lights", image: "https://picsum.photos/800/400?random=2" },
//       { title: "Mountain View", image: "https://picsum.photos/800/400?random=3" },
//       { title: "Ocean Breeze", image: "https://picsum.photos/800/400?random=4" },
//       { title: "Desert Safari", image: "https://picsum.photos/800/400?random=5" },
//     ],
//   };

//   _renderItem = ({ item }: any) => {
//     return (
//       <View style={styles.slide}>
//         <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
//         <View style={styles.overlay}>
//           <Text style={styles.title}>{item.title}</Text>
//         </View>
//       </View>
//     );
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.heading}>Image Carousel</Text>
//         <Carousel
//           // ref={(c) => {
//           //   this._carousel = c;
//           // }}
//           vertical={true}
//           data={this.state.entries}
//           renderItem={this._renderItem}
//           // sliderWidth={screenWidth}
//           // itemWidth={screenWidth * 0.8}
//           layout={"default"} // try "stack" or "tinder"
//           inactiveSlideScale={0.9}
//           inactiveSlideOpacity={0.7}
//           loop={true}
//           autoplay={true}
//           autoplayInterval={2500}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "red",
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 20,
//   },
//   slide: {
//     borderRadius: 15,
//     overflow: "hidden",
//     height: 200,
//     elevation: 5,
//     backgroundColor: "#000",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   overlay: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     padding: 10,
//     backgroundColor: "rgba(0,0,0,0.4)",
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#fff",
//     textAlign: "center",
//   },
// });

import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class SnapCarousal extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

