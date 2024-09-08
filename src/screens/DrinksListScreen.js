import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Searchbar, Button, Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { colors } from '../utils/colors';

const drinksData = [
  {
    id: 'd1',
    name: 'Minute Maid',
    image: require('../assets/minute.jpg'),
    price: 20,
  },
  {
    id: 'd2',
    name: 'Appy Fizz',
    image: require('../assets/appy.jpg'),
    price: 10,
  },
  {
    id: 'd3',
    name: 'Coca Cola',
    image: require('../assets/coke.jpg'),
    price: 20,
  },
  {
    id: 'd4',
    name: 'Pepsi',
    image: require('../assets/pepsi.jpg'),
    price: 20,
  },
];

const DrinksListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, addToCart, removeFromCart } = useCart();

  const onChangeSearch = (query) => setSearchQuery(query);

  const incrementQuantity = (item) => {
    addToCart(item);
  };

  const decrementQuantity = (item) => {
    removeFromCart(item);
  };

  const renderItem = ({ item }) => {
    const cartItem = cart.find((cartItem) => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
        {quantity > 0 ? (
          <View style={styles.quantityContainer}>
            <Button mode="outlined" onPress={() => decrementQuantity(item)}>
              <Ionicons name="remove" size={16} color="black" />
            </Button>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Button mode="outlined" onPress={() => incrementQuantity(item)}>
              <Ionicons name="add" size={16} color="black" />
            </Button>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => incrementQuantity(item)}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // Calculate total items in cart
  const totalItemsInCart = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Function to navigate to cart screen
  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Beverages" titleStyle={styles.appbarTitle} />
        <View>
          <Appbar.Action icon="cart" onPress={navigateToCart} />
          {totalItemsInCart > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItemsInCart}</Text>
            </View>
          )}
        </View>
      </Appbar.Header>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={drinksData.filter((drink) =>
          drink.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appbarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.pure,
  },
  searchBar: {
    margin: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    elevation: 2,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: colors.pure,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartBadge: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DrinksListScreen;
