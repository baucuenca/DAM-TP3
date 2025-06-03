import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  label: string;
  icon: string;
  onPress: () => void;
  closeMenu?: () => void;
};

const MenuOption = ({ label, icon, onPress, closeMenu }: Props) => {
  const { theme } = useTheme();

  const handlePress = () => {
    if (closeMenu) closeMenu();
    onPress();
  };

  return (
    <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
      <MaterialIcons
        name={icon as any}
        size={22}
        color={theme.iconColor}
        style={styles.menuIcon}
      />
      <Text style={[styles.menuText, { color: theme.textPrimary }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
  },
});

export default MenuOption;
