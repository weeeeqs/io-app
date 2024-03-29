import {
  Body,
  ButtonSolid,
  IOVisualCostants,
  Pictogram,
  VSpacer
} from "@pagopa/io-app-design-system";
import React from "react";
import { StyleSheet, View } from "react-native";
import I18n from "../../../i18n";

const WalletEmptyScreenContent = () => {
  const handleAddToWalletButtonPress = () => {
    // TODO SIW-923: navigate to available cards/initiatives list
  };

  return (
    <View style={styles.container} testID="walletEmptyScreenContentTestID">
      <Pictogram name="cardAdd" />
      <VSpacer size={16} />
      <Body color="grey-650" weight="Regular" style={styles.text}>
        {I18n.t("features.wallet.home.emptyMessage")}
      </Body>
      <VSpacer size={24} />
      <ButtonSolid
        label={I18n.t("features.wallet.home.cta")}
        accessibilityLabel={I18n.t("features.wallet.home.cta")}
        onPress={handleAddToWalletButtonPress}
        icon="addSmall"
        iconPosition="end"
        fullWidth={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: IOVisualCostants.appMarginDefault,
    justifyContent: "center",
    alignItems: "center"
  },
  text: { textAlign: "center" }
});

export { WalletEmptyScreenContent };
