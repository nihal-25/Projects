import React from 'react';
import { SafeAreaView, View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { useCart } from '../context/CartContext'; 
import { colors } from '../utils/colors';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cart, removeFromCart, clearCart } = useCart(); 
  const navigation = useNavigation();
  const firestore = getFirestore();
  
  const handlePay = async () => {
    try {
      // Create a new payment record in Firestore
      await addDoc(collection(firestore, 'payments'), {
        cart,
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2),
        timestamp: new Date(),
        status:'paid',
      });
      
      // Clear the cart after successful payment
      clearCart();
      
      // Navigate to the PaymentConfirmationScreen
      navigation.navigate('PaymentConfirmation');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.cartItemTitle}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>₹{(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
      <Button onPress={() => removeFromCart(item)}>Remove</Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Cart" />
      </Appbar.Header>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.cartTotal}>
        <Text style={styles.cartTotalText}>Total:</Text>
        <Text style={styles.cartTotalAmount}>
          ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
        </Text>
      </View>
      <Button
        mode="contained"
        onPress={handlePay}
        style={styles.proceedButton}
        color={colors.green} 
      >
        Proceed to Pay
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cartItemImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 25,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#777',
  },
  cartItemQuantity: {
    fontSize: 16,
    marginLeft: 'auto',
  },
  cartList: {
    paddingBottom: 20,
  },
  cartTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  cartTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartTotalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  proceedButton: {
    margin: 20,
    padding: 10,
    backgroundColor: colors.green,
  },
});

export default CartScreen;
