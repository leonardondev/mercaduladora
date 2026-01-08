import { colors } from "@/theme/colors";
import { useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

type CardValueInputProps = TextInputProps

export function NumericInput({ onBlur, onFocus, ...rest }: CardValueInputProps) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <TextInput
      style={[styles.input, isInputFocused && styles.inputFocused]}
      placeholderTextColor={colors.zinc400}
      keyboardType="numeric"
      returnKeyType="next"
      onFocus={(focusEvent) => {
        setIsInputFocused(true)
        onFocus && onFocus(focusEvent)
      }
      }
      onBlur={(blurEvent) => {
        setIsInputFocused(false)
        onBlur && onBlur(blurEvent)
      }
      }
      {...rest}
    />
  );
}