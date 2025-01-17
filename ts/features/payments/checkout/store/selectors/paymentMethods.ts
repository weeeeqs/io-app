import _ from "lodash";
import * as pot from "@pagopa/ts-commons/lib/pot";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import { createSelector } from "reselect";
import { PaymentMethodsResponse } from "../../../../../../definitions/pagopa/ecommerce/PaymentMethodsResponse";
import { getLatestUsedWallet, isValidPaymentMethod } from "../../utils";
import { Wallets } from "../../../../../../definitions/pagopa/ecommerce/Wallets";
import { WalletApplicationStatusEnum } from "../../../../../../definitions/pagopa/ecommerce/WalletApplicationStatus";
import { WalletApplicationNameEnum } from "../../../../../../definitions/pagopa/ecommerce/WalletApplicationName";
import { UIWalletInfoDetails } from "../../../common/types/UIWalletInfoDetails";
import { isPaymentMethodExpired } from "../../../common/utils";
import { selectPaymentsCheckoutState, walletPaymentDetailsSelector } from ".";

export const walletPaymentUserWalletsSelector = createSelector(
  selectPaymentsCheckoutState,
  state => pot.map(state.userWallets, _ => _.wallets ?? [])
);

export const walletPaymentEnabledUserWalletsSelector = createSelector(
  walletPaymentUserWalletsSelector,
  userWalletsPot =>
    pot.map(userWalletsPot, userWallets =>
      userWallets.filter(wallet => {
        const walletDetails = wallet.details as UIWalletInfoDetails;
        return (
          !isPaymentMethodExpired(walletDetails) &&
          wallet.applications.find(
            app =>
              app.name === WalletApplicationNameEnum.PAGOPA &&
              app.status === WalletApplicationStatusEnum.ENABLED
          )
        );
      })
    )
);

// Get from the enabled userwallets the wallet with the attribute lastUpdated more recent
export const walletPaymentUserWalletLastUpdatedSelector = createSelector(
  walletPaymentEnabledUserWalletsSelector,
  userWalletsPot =>
    pipe(userWalletsPot, pot.toOption, O.chain(getLatestUsedWallet))
);

export const walletPaymentAllMethodsSelector = createSelector(
  selectPaymentsCheckoutState,
  state =>
    pot.map(
      state.allPaymentMethods,
      ({ paymentMethods }) => paymentMethods?.filter(isValidPaymentMethod) ?? []
    )
);

export const walletPaymentMethodByIdSelector = createSelector(
  walletPaymentAllMethodsSelector,
  methodsPot => (id: string) =>
    pipe(
      methodsPot,
      pot.toOption,
      O.chainNullableK(methods => methods.find(_ => _.id === id))
    )
);

export const walletPaymentUserWalletByIdSelector = createSelector(
  walletPaymentUserWalletsSelector,
  methodsPot => (id: string) =>
    pipe(
      methodsPot,
      pot.toOption,
      O.chainNullableK(methods => methods.find(_ => _.walletId === id))
    )
);

export const walletPaymentSelectedWalletOptionSelector = createSelector(
  selectPaymentsCheckoutState,
  state => state.selectedWallet
);

export const walletPaymentSelectedPaymentMethodOptionSelector = createSelector(
  selectPaymentsCheckoutState,
  state => state.selectedPaymentMethod
);

export const walletPaymentSelectedPaymentMethodIdOptionSelector =
  createSelector(
    walletPaymentSelectedWalletOptionSelector,
    walletPaymentSelectedPaymentMethodOptionSelector,
    (selectedWalletOption, selectedPaymentMethodOption) =>
      pipe(
        selectedWalletOption,
        O.map(({ paymentMethodId }) => paymentMethodId),
        O.alt(() =>
          pipe(
            selectedPaymentMethodOption,
            O.map(({ id }) => id)
          )
        )
      )
  );

export const walletPaymentSelectedWalletIdOptionSelector = createSelector(
  walletPaymentSelectedWalletOptionSelector,
  selectedWalletOption =>
    pipe(
      selectedWalletOption,
      O.map(({ walletId }) => walletId)
    )
);

export const walletPaymentSelectedPaymentMethodManagementOptionSelector =
  createSelector(
    walletPaymentSelectedPaymentMethodOptionSelector,
    selectedPaymentMethodOption =>
      pipe(
        selectedPaymentMethodOption,
        O.map(({ methodManagement }) => methodManagement)
      )
  );

export const notHasValidPaymentMethodsSelector = createSelector(
  walletPaymentAllMethodsSelector,
  walletPaymentEnabledUserWalletsSelector,
  walletPaymentDetailsSelector,
  (allMethodsPot, userWalletsPot, paymentDetailsPot) => {
    const allMethods = pipe(
      allMethodsPot,
      pot.toOption,
      O.getOrElse(() => [] as PaymentMethodsResponse["paymentMethods"])
    );
    const userWallets = pipe(
      userWalletsPot,
      pot.toOption,
      O.getOrElse(() => [] as Wallets["wallets"])
    );

    return (
      pot.isSome(allMethodsPot) &&
      _.isEmpty(allMethods) &&
      pot.isSome(userWalletsPot) &&
      _.isEmpty(userWallets) &&
      pot.isSome(paymentDetailsPot)
    );
  }
);
