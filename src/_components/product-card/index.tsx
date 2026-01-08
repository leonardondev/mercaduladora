import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Product, useProducts } from '@/stores/cart-store';
import { colors } from "@/theme/colors";
import { convertToNumber } from '@/utils/convertCurrency';
import { styles } from "./styles";

import { CardCheckbox } from "../checkbox";
import { NumericInput } from '../numeric-input';

interface TaskProps {
  product: Product;
  onPressCheckbox: () => void
  onPressTrash: () => void
  onInputFocus: () => void
}

export function ProductCard({ product, onPressCheckbox, onPressTrash, onInputFocus }: TaskProps) {
  const updateProductQuantity = useProducts((state) => state.updateProductQuantity)
  const updateProductPrice = useProducts((state) => state.updateProductPrice)

  const [isChecked, setChecked] = useState(product.done)
  const [productQuantity, setProductQuantity] = useState(product.quantity ? product.quantity.toFixed(0) : '')
  const [productPrice, setProductPrice] = useState(product.price ? product.price.toFixed(2) : '')

  function handlePressCheckbox() {
    setChecked(prevState => !prevState)
    onPressCheckbox()
  }

  useEffect(() => {
    updateProductPrice(product.name, convertToNumber(productPrice))
    updateProductQuantity(product.name, convertToNumber(productQuantity))
  }, [productPrice, productQuantity])

  const productAmount = convertToNumber(productPrice) * convertToNumber(productQuantity)

  return (
    <View style={styles.container}>
      <View style={styles.productHeader}>
        <CardCheckbox value={isChecked} onPress={handlePressCheckbox} />
        <Text style={[styles.productName, isChecked && styles.productNameDone]}>
          {product.name}
        </Text>
        <TouchableOpacity
          style={styles.trashButton}
          activeOpacity={0.7}
          onPress={onPressTrash}
        >
          <Feather name='trash-2' color={colors.zinc500} size={16} />
        </TouchableOpacity>
      </View>
      <View style={styles.productSubheader}>
        <NumericInput
          placeholder="Preço"
          value={productPrice}
          returnKeyType="next"
          onChangeText={setProductPrice}
          onFocus={onInputFocus}
        />
        <Text
          style={[
            styles.productAmount,
            { flex: undefined },
            isChecked && styles.productAmountDone
          ]}
        >×</Text>
        <NumericInput
          placeholder="Quantidade"
          value={productQuantity}
          returnKeyType="next"
          onChangeText={setProductQuantity}
          onFocus={onInputFocus}
        />
        <Text style={[styles.productAmount, isChecked && styles.productAmountDone]}>
          {productAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>

    </View>
  )
}

