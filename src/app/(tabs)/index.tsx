import { ProductCard } from "@/_components/product-card";
import { useProducts } from "@/stores/cart-store";
import { colors } from '@/theme/colors';
import { convertToCurrency } from "@/utils/convertCurrency";
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabCart() {
  const { bottom } = useSafeAreaInsets()
  const scrollViewRef = useRef<FlatList>(null)

  const products = useProducts((state) => state.products)
  const addProduct = useProducts((state) => state.addProduct)
  const removeProduct = useProducts((state) => state.removeProduct)
  const toggleProductDone = useProducts((state) => state.toggleProductDone)

  const [productName, setProductName] = useState<string>("")
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [productsWantedAmount, setProductsWantedAmount] = useState(0);
  const [productsAddedAmount, setProductsAddedAmount] = useState(0);

  function handleProductAdd() {
    if (products.some(product => product.name === productName)) {
      return Alert.alert("Produto duplicado", "Já existe um produto na lista com esse nome.")
    }

    addProduct(productName)
    setProductName("")
    Keyboard.dismiss()
  }

  function handleProductRemove(name: string) {
    Alert.alert("Remover", `Remover "${name}" da lista?`, [
      {
        text: "Sim",
        onPress: () => removeProduct(name)
      },
      {
        text: "Não",
        style: 'cancel'
      }
    ])
  }

  function handleProductCheck(name: string) {
    toggleProductDone(name)
  }

  function handleInputFocus(index: number) {
    setTimeout(() => {
      scrollViewRef.current?.scrollToIndex({
        index: index > 1 ? index - 1 : 0,
        animated: true,
      })
    }, 0)
  }

  useEffect(() => {
    setProductsWantedAmount(products
      .reduce((acc, product) => acc + product.price * product.quantity, 0)
    )
    setProductsAddedAmount(products
      .filter(product => product.done)
      .reduce((acc, product) => acc + product.price * product.quantity, 0)
    )
  }, [products])

  return (
    <View style={[{ paddingBottom: bottom + 8 }, styles.container]}>
      <View style={styles.header}>
        {/* <Logo width={112} height={32} /> */}
      </View>

      <View style={styles.form}>
        <TextInput
          style={[
            styles.input,
            isInputFocused && styles.inputFocused
          ]}
          placeholder="Adicione um novo item"
          placeholderTextColor={colors.zinc400}
          value={productName}
          onChangeText={setProductName}
          returnKeyType="send"
          onSubmitEditing={handleProductAdd}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleProductAdd}
        >
          <Feather name="plus" size={24} />
        </TouchableOpacity>
      </View>


      <View style={styles.counters}>
        <View style={styles.conter}>
          <Text style={[styles.counterText, { color: colors.yellow }]}>Lista</Text>
          <Text style={styles.counterValue}>{convertToCurrency(productsWantedAmount)}</Text>
        </View>

        <View style={styles.conter}>
          <Text style={[styles.counterText, { color: colors.blue }]}>Carrinho</Text>
          <Text style={styles.counterValue}>{convertToCurrency(productsAddedAmount)}</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} >
        <FlatList
          ref={scrollViewRef}
          data={products}
          keyExtractor={item => item.name}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => (
            <ProductCard
              product={item}
              onPressCheckbox={() => handleProductCheck(item.name)}
              onPressTrash={() => handleProductRemove(item.name)}
              onInputFocus={() => handleInputFocus(index)}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.listEmptyContainer}>
              <Feather name="clipboard" size={24} color={colors.zinc600} style={styles.listEmptyImage} />
              <Text style={[styles.listEmptyText, { fontWeight: 'bold' }]} >Você ainda não produtos cadastrados</Text>
              <Text style={styles.listEmptyText} >Crie itens e organize seu carrinho de compras</Text>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.zinc900,
  },
  header: {
    width: '100%',
    backgroundColor: colors.zinc950,
    alignItems: 'center',
    paddingVertical: 40,
  },
  form: {
    paddingHorizontal: 24,
    marginTop: -24,
    marginBottom: 36,
    width: '100%',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 54,
    backgroundColor: colors.zinc800,
    color: colors.zinc100,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.zinc700,
    borderRadius: 6,
    padding: 16,
    marginRight: 8,
  },
  inputFocused: {
    borderColor: colors.yellowDark
  },
  button: {
    width: 54,
    height: 54,
    borderRadius: 6,
    backgroundColor: colors.yellow,
    color: colors.zinc950,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counters: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  conter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  counterText: {
    color: colors.zinc200,
    fontSize: 14,
    fontWeight: 'bold',
    paddingRight: 8,
  },
  counterValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.zinc200,
    paddingHorizontal: 8,
  },
  listEmptyContainer: {
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.zinc500,
    paddingVertical: 48,
  },
  listEmptyImage: {
    marginBottom: 16,
  },
  listEmptyText: {
    color: colors.zinc400,
    fontSize: 14,
    textAlign: 'center'
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 80,
  }
});
