import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  children: React.ReactNode;
};

const Menu = ({ children }: Props) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => setVisible(true)}
        accessibilityLabel="Abrir menú"
      >
        <MaterialIcons name="more-vert" size={28} color={theme.iconColor} />
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View
            style={[
              styles.menu,
              {
                backgroundColor: theme.surface,
                shadowColor: theme.shadowColor,
              },
            ]}
          >
            {/* Renderiza los children (botones) */}
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child as React.ReactElement<any>, {
                    closeMenu: () => setVisible(false),
                  })
                : child
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    padding: 8,
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menu: {
    marginTop: 50,
    marginRight: 16,
    borderRadius: 10,
    paddingVertical: 8,
    minWidth: 200,
    elevation: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
});

export default Menu;
