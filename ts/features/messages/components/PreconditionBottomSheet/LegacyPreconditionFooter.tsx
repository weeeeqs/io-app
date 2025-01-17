import * as React from "react";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import * as pot from "@pagopa/ts-commons/lib/pot";
import { FooterWithButtons } from "@pagopa/io-app-design-system";
import { UIMessage } from "../../types";
import { useIOSelector } from "../../../../store/hooks";
import { getPaginatedMessageById } from "../../store/reducers/paginatedById";
import I18n from "../../../../i18n";
import { trackNotificationRejected, trackUxConversion } from "../../analytics";

type LegacyProps = {
  messageId: string;
  onDismiss: () => void;
  navigationAction: (message: UIMessage) => void;
};

const foldMessage = (
  message: pot.Pot<UIMessage, Error>,
  callback: (message: UIMessage) => void
) => pipe(message, pot.toOption, O.map(callback));

export const LegacyPreconditionFooter = ({
  messageId,
  navigationAction,
  onDismiss
}: LegacyProps) => {
  const message = useIOSelector(state =>
    getPaginatedMessageById(state, messageId)
  );

  const handleCancelPress = () => {
    foldMessage(message, (foldedMessage: UIMessage) =>
      trackNotificationRejected(foldedMessage.category.tag)
    );
    onDismiss();
  };

  const handleContinuePress = () => {
    foldMessage(message, (foldedMessage: UIMessage) => {
      trackUxConversion(foldedMessage.category.tag);
      navigationAction(foldedMessage);
    });
    onDismiss();
  };

  return (
    <FooterWithButtons
      type={"TwoButtonsInlineHalf"}
      primary={{
        type: "Outline",
        buttonProps: {
          label: I18n.t("global.buttons.cancel"),
          onPress: handleCancelPress
        }
      }}
      secondary={{
        type: "Solid",
        buttonProps: {
          label: I18n.t("global.buttons.continue"),
          onPress: handleContinuePress
        }
      }}
    />
  );
};
