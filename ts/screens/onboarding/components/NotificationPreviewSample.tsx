import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "@pagopa/io-app-design-system";
import { H4 } from "../../../components/core/typography/H4";
import { H5 } from "../../../components/core/typography/H5";
import { IOColors } from "../../../components/core/variables/IOColors";
import customVariables from "../../../theme/variables";
import I18n from "../../../i18n";
import { TranslationKeys } from "../../../../locales/locales";
import {
  IOStyles,
  IOVisualCostants
} from "../../../components/core/variables/IOStyles";
import { HSpacer } from "../../../components/core/spacer/Spacer";
import { IOSpacingScale } from "../../../components/core/variables/IOSpacing";

const styles = StyleSheet.create({
  notification: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: IOColors.white,
    borderWidth: 1,
    borderColor: IOColors.bluegreyLight,
    borderRadius: customVariables.borderRadiusBase,
    minHeight: 72,
    marginVertical: IOSpacingScale[0],
    marginHorizontal: IOVisualCostants.appMarginDefault,
    paddingVertical: IOSpacingScale[2],
    paddingHorizontal: IOSpacingScale[4]
  }
});

type Props = {
  previewEnabled: boolean;
  remindersEnabled: boolean;
};

const computeTitleAndMessageKeys = (
  isPreviewEnabled: boolean,
  areRemindersEnabled: boolean
): Record<"titleKey" | "messageKey", TranslationKeys> => {
  if (isPreviewEnabled && areRemindersEnabled) {
    return {
      titleKey: "onboarding.notifications.preview.reminderOnPreviewOnTitle",
      messageKey: "onboarding.notifications.preview.reminderOnPreviewOnMessage"
    };
  } else if (isPreviewEnabled && !areRemindersEnabled) {
    return {
      titleKey: "onboarding.notifications.preview.reminderOffPreviewOnTitle",
      messageKey: "onboarding.notifications.preview.reminderOffPreviewOnMessage"
    };
  } else if (!isPreviewEnabled && areRemindersEnabled) {
    return {
      titleKey: "onboarding.notifications.preview.reminderOnPreviewOffTitle",
      messageKey: "onboarding.notifications.preview.reminderOnPreviewOffMessage"
    };
  }

  return {
    titleKey: "onboarding.notifications.preview.reminderOffPreviewOffTitle",
    messageKey: "onboarding.notifications.preview.reminderOffPreviewOffMessage"
  };
};

export const NotificationPreviewSample = ({
  previewEnabled,
  remindersEnabled
}: Props) => {
  const { titleKey, messageKey } = computeTitleAndMessageKeys(
    previewEnabled,
    remindersEnabled
  );

  return (
    <View style={styles.notification}>
      <Icon name="productIOAppBlueBg" />
      <HSpacer />
      <View style={IOStyles.flex}>
        <H4 weight="SemiBold" color="bluegreyDark">
          {I18n.t(titleKey)}
        </H4>
        <H5 weight="Regular" color="bluegrey">
          {I18n.t(messageKey)}
        </H5>
      </View>
    </View>
  );
};