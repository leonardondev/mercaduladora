import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity, type TouchableOpacityProps, View } from "react-native";

import { styles } from "./styles";

interface CheckboxProps extends TouchableOpacityProps {
  value?: boolean;
}

export function CardCheckbox({ value = false, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7} {...rest}
    >
      {value
        ? <View style={styles.checkboxChecked}><FontAwesome name='check' /></View>
        : <View style={styles.checkbox} />
      }
    </TouchableOpacity>
  );
}