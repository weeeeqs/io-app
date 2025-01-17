import { GradientScrollView, IOStyles } from "@pagopa/io-app-design-system";
import * as React from "react";
import Animated, { Layout } from "react-native-reanimated";
import { ScrollView } from "react-native";
import I18n from "../../../../i18n";
import { useIONavigation } from "../../../../navigation/params/AppParamsList";
import { useIOSelector } from "../../../../store/hooks";
import { PaymentsBarcodeRoutes } from "../../barcode/navigation/routes";
import { PaymentsHomeEmptyScreenContent } from "../components/PaymentsHomeEmptyScreenContent";
import { PaymentsHomeTransactionsList } from "../components/PaymentsHomeTransactionsList";
import { PaymentsHomeUserMethodsList } from "../components/PaymentsHomeUserMethodsList";
import {
  isPaymentsLatestTransactionsEmptySelector,
  isPaymentsSectionEmptySelector,
  isPaymentsSectionLoadingSelector
} from "../store/selectors";
import { PaymentsAlertStatus } from "../components/PaymentsAlertStatus";

const PaymentsHomeScreen = () => {
  const navigation = useIONavigation();

  const isLoading = useIOSelector(isPaymentsSectionLoadingSelector);
  const isTransactionsEmpty = useIOSelector(
    isPaymentsLatestTransactionsEmptySelector
  );

  const handleOnPayNoticedPress = () => {
    navigation.navigate(PaymentsBarcodeRoutes.PAYMENT_BARCODE_NAVIGATOR, {
      screen: PaymentsBarcodeRoutes.PAYMENT_BARCODE_SCAN
    });
  };

  const AnimatedPaymentsHomeScreenContent = React.useCallback(
    () => (
      <Animated.View style={IOStyles.flex} layout={Layout.duration(200)}>
        <PaymentsHomeScreenContent />
      </Animated.View>
    ),
    []
  );

  if (isTransactionsEmpty) {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          flexGrow: 1
        }}
      >
        <PaymentsAlertStatus />
        <AnimatedPaymentsHomeScreenContent />
      </ScrollView>
    );
  }

  return (
    <GradientScrollView
      primaryActionProps={
        isLoading
          ? undefined
          : {
              accessibilityLabel: I18n.t("features.payments.cta"),
              label: I18n.t("features.payments.cta"),
              onPress: handleOnPayNoticedPress,
              icon: "qrCode",
              iconPosition: "end",
              testID: "PaymentsHomeScreenTestID-cta"
            }
      }
      excludeSafeAreaMargins={true}
    >
      <PaymentsAlertStatus />
      <AnimatedPaymentsHomeScreenContent />
    </GradientScrollView>
  );
};

const PaymentsHomeScreenContent = () => {
  const isLoading = useIOSelector(isPaymentsSectionLoadingSelector);
  const isEmpty = useIOSelector(isPaymentsSectionEmptySelector);

  if (isEmpty) {
    return <PaymentsHomeEmptyScreenContent withPictogram={true} />;
  }

  return (
    <>
      <PaymentsHomeUserMethodsList enforcedLoadingState={isLoading} />
      <PaymentsHomeTransactionsList enforcedLoadingState={isLoading} />
    </>
  );
};

export { PaymentsHomeScreen };
