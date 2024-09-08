import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList, Text, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { colors } from '../utils/colors';

// Assuming menuItems are defined in a separate file or context
import { menuItems } from './MainScreen' // Adjust the import path as per your file structure

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    // Ensure menuItems is properly defined and is an array before filtering
    if (menuItems && Array.isArray(menuItems)) {
      const filtered = menuItems.filter(item =>
        item.title.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredItems(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("MainScreen")}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search products"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search-outline" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      {/* Bottom navigation bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainScreen")}
        >
          <Ionicons name="home-outline" size={24} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search-outline" size={24} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart", { cartItems: [] })}
        >
          <Ionicons name="cart-outline" size={27} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={27} color={colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 70,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  searchButton: {
    marginLeft: 10,
  },
  list: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
});

export default SearchScreen;
