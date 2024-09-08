import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Animated,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { colors } from "../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { useCart } from "../context/CartContext";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const categories = [
  {
    id: "1",
    title: "Breakfast",
    image: require("../assets/breakfast.jpg"),
    description: "South Indian breakfast",
  },
  {
    id: "2",
    title: "Chinese",
    image: require("../assets/chinese.jpg"),
    description: "Chinese dishes",
  },
  {
    id: "3",
    title: "Beverages",
    image: require("../assets/beverages.jpg"),
    description: "Fresh drinks",
  },
  {
    id: "4",
    title: "Short Eats",
    image: require("../assets/snacks.jpg"),
    description: "Snacks",
  },
];

const topPicks = [
  {
    id: "t1",
    title: "Omelette",
    image: require("../assets/omelette.jpg"),
    price: 30,
  },
  {
    id: "t2",
    title: "Samosa",
    image: require("../assets/samosa.jpg"),
    price: 10,
  },
  {
    id: "t3",
    title: "Veg Fry Maggi",
    image: require("../assets/veg-fry-maggi.jpg"),
    price: 50,
  },
  {
    id: "4",
    title: "Vada Pav",
    image: require("../assets/vada-pav.jpg"),
    price: 20,
  },
];

const popularDishes = [
  {
    id: "p1",
    title: "Egg Rice",
    image: require("../assets/dish1.jpg"),
    price: 60,
  },
  {
    id: "p2",
    title: "Masala Dosa",
    image: require("../assets/dish2.jpg"),
    price: 40,
  },
  {
    id: "p3",
    title: "Black Coffee",
    image: require("../assets/dish3.jpg"),
    price: 20,
  },
  {
    id: "p4",
    title: "Lemon Tea",
    image: require("../assets/lemon-tea.jpg"),
    price: 15,
  },
];

export const menuItems = [
  {
    id: "m1",
    title: "Samosa",
    price: 15,
    image: require("../assets/samosa.jpg"),
  },
  {
    id: "m2",
    title: "Egg Puff",
    price: 20,
    image: require("../assets/egg_puff.jpg"),
  },
  {
    id: "m3",
    title: "Veg Puff",
    price: 15,
    image: require("../assets/veg_puff.jpg"),
  },
  {
    id: "m4",
    title: "Veg Fried Maggi",
    price: 45,
    image: require("../assets/veg-fry-maggi.jpg"),
  },
  {
    id: "m5",
    title: "Parotha, Egg Curry",
    price: 60,
    image: require("../assets/par_egg.jpg"),
  },
  {
    id: "m6",
    title: "Mangalore Buns",
    price: 30,
    image: require("../assets/mang_buns.jpg"),
  },
  {
    id: "m7",
    title: "Paneer Chilly",
    price: 70,
    image: require("../assets/pan_chill.jpg"),
  },
  {
    id: "m8",
    title: "Gobi Chilly",
    price: 70,
    image: require("../assets/gob_chill.jpg"),
  },
  {
    id: "m9",
    title: "Paneer Fried Rice",
    price: 60,
    image: require("../assets/pan_rice.jpg"),
  },
  {
    id: "m10",
    title: "Gobi Rice",
    price: 60,
    image: require("../assets/gob_rice.jpg"),
  },
  {
    id: "m12",
    title: "Sandwich",
    price: 60,
    image: require("../assets/sand.jpg"),
  },
  {
    id: "m13",
    title: "Vada Pav",
    price: 25,
    image: require("../assets/vada-pav.jpg"),
  },
  {
    id: "m14",
    title: "Green Lays",
    price: 20,
    image: require("../assets/lays1.jpg"),
  },
  {
    id: "m15",
    title: "Egg Noodles",
    price: 70,
    image: require("../assets/egg_noo.jpg"),
  },
  {
    id: "m16",
    title: "Cheese Omelette",
    price: 40,
    image: require("../assets/omelette.jpg"),
  },
  {
    id: "m17",
    title: "Fruit Bowl",
    price: 35,
    image: require("../assets/fruit.jpg"),
  },
  {
    id: "m18",
    title: "Cup Noodles",
    price: 30,
    image: require("../assets/cup.jpg"),
  },
  {
    id: "m19",
    title: "Banana Cake",
    price: 40,
    image: require("../assets/ban.jpg"),
  },
  {
    id: "m20",
    title: "Doughnut",
    price: 40,
    image: require("../assets/doughnut.jpg"),
  },
];


const MainScreen = ({ navigation }) => {
  const firestore = getFirestore();

  const [foodData, setFoodData] = useState([]);
  const foodDataQry = collection(firestore, "FoodData");

  useEffect(() => {
    const unsubscribe = onSnapshot(foodDataQry, (snapshot) => {
      setFoodData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // Unsubscribe when the component unmounts
  }, []);

  const [location, setLocation] = useState("");
  const { cartItems, addToCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const scrollY = useRef(new Animated.Value(0)).current;

  const { removeFromCart, updateCartItem } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    ToastAndroid.showWithGravityAndOffset(
      `${item.foodName} added to cart`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      150
    );
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item.id]: (prevQuantities[item.id] || 0) + 1,
    }));
  };

  const handleIncrease = (item) => {
    addToCart(item);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item.id]: (prevQuantities[item.id] || 0) + 1,
    }));
  };

  const handleDecrease = (item) => {
    removeFromCart(item);
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[item.id] > 1) {
        newQuantities[item.id] -= 1;
      } else {
        delete newQuantities[item.id];
      }
      return newQuantities;
    });
  };
  
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        if (item.title === "Breakfast") {
          navigation.navigate("BreakfastList", { addToCart });
        } else if (item.title === "Beverages") {
          navigation.navigate("DrinksList", { addToCart });
        } else if (item.title === "Chinese") {
          navigation.navigate("ChineseDishes", { addToCart });
        } else if (item.title === "Short Eats") {
          navigation.navigate("ShortEats", { addToCart });
        }
      }}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <Text style={styles.categoryDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderTopPickItem = ({ item }) => (
    <View style={styles.topPickItem}>
      <Image source={item.image} style={styles.topPickImage} />
      <Text style={styles.topPickTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>₹{item.price}</Text>
      {quantities[item.id] ? (
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecrease(item)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantities[item.id]}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleIncrease(item)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderPopularDishItem = ({ item }) => (
    <View style={styles.popularDishItem}>
      <Image source={item.image} style={styles.popularDishImage} />
      <Text style={styles.popularDishTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>₹{item.price}</Text>
      {quantities[item.id] ? (
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecrease(item)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantities[item.id]}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleIncrease(item)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      )}
    </View>
  );


  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source= {{uri: item.FoodImageUrl}} style={styles.menuItemImage} />
      <View style={styles.menuItemDetails}>
        <Text style={styles.menuItemTitle}>{item.FoodName}</Text>
        <Text style={styles.itemPrice}>₹{item.FoodPrice}</Text>
      </View>
      {quantities[item.id] ? (
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecrease(item)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantities[item.id]}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleIncrease(item)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const translateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={foodData}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <RNPickerSelect
                onValueChange={(value) => setLocation(value)}
                items={[
                  {
                    label: "Vidhyarthi Khaana, Mechanical block",
                    value: "Vidhyarthi Khaana, Mechanical block",
                  },
                  {
                    label: "Vidhyarthi Khaana, Sports Complex",
                    value: "Vidhyarthi Khaana, Sports Complex",
                  },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: "Select a location", value: null }}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Shop by categories</Text>
              <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatList}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Top picks for you</Text>
              <FlatList
                data={topPicks}
                renderItem={renderTopPickItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatList}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Dishes</Text>
              <FlatList
                data={popularDishes}
                renderItem={renderPopularDishItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatList}
              />
            </View>
          </>
        }
      />

      <Animated.View
        style={[
          styles.bottomBar,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MainScreen")}
        >
          <Icon name="home-outline" size={24} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Search")}
        >
          <Icon name="search-outline" size={24} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Cart", { cartItems })}
        >
          <Icon name="cart-outline" size={27} color={colors.black} />
          {cartItems?.length > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
        >
          <Icon name="person-circle-outline" size={27} color={colors.black} />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 50,
    borderColor: colors.gray2,
  },
  cartIcon: {
    paddingRight: 10,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.pure,
    paddingLeft: 16,
    marginBottom: 10,
  },
  flatList: {
    paddingLeft: 16,
  },
  categoryItem: {
    marginRight: 16,
    alignItems: "center",
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  categoryDescription: {
    fontSize: 14,
    color: colors.gray,
  },
  topPickItem: {
    marginRight: 16,
    alignItems: "center",
  },
  topPickImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  topPickTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: colors.pure,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  addButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
  popularDishItem: {
    marginRight: 16,
    alignItems: "center",
  },
  popularDishImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  popularDishTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 10,
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },

  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: colors.pure,
    borderRadius: 15,
    padding: 5,
  },
  quantityButtonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  badgeContainer: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.gray2,
  },
  menuItemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  menuItemList: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 16,
  },
});

export default MainScreen;
