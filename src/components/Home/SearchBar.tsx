import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
};

const SearchBar = ({ value, onChange, placeholder }: Props) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <TextInput
        style={[
          styles.input,
          { color: theme.text, backgroundColor: theme.surface },
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    width: "85%",
    alignSelf: "center",
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
  },
});

export default SearchBar;
