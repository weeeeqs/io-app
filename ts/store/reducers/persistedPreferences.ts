/**
 * A reducer for persisted preferences.
 */
import * as O from "fp-ts/lib/Option";
import * as pot from "@pagopa/ts-commons/lib/pot";
import { Calendar } from "react-native-calendar-events";
import { createSelector } from "reselect";
import { isActionOf } from "typesafe-actions";
import { Locales } from "../../../locales/locales";
import { setMixpanelEnabled } from "../actions/mixpanel";
import {
  continueWithRootOrJailbreak,
  customEmailChannelSetEnabled,
  preferenceFingerprintIsEnabledSaveSuccess,
  preferencesPagoPaTestEnvironmentSetEnabled,
  preferredCalendarRemoveSuccess,
  preferredCalendarSaveSuccess,
  preferredLanguageSaveSuccess,
  serviceAlertDisplayedOnceSuccess,
  preferencesPnTestEnvironmentSetEnabled,
  preferencesIdPayTestSetEnabled,
  preferencesDesignSystemSetEnabled,
  preferencesNewWalletSectionSetEnabled,
  preferencesItWalletTestSetEnabled,
  preferencesNewHomeSectionSetEnabled
} from "../actions/persistedPreferences";
import { Action } from "../actions/types";
import { differentProfileLoggedIn } from "../actions/crossSessions";
import { GlobalState } from "./types";

export type PersistedPreferencesState = Readonly<{
  isFingerprintEnabled?: boolean;
  preferredCalendar?: Calendar;
  preferredLanguage?: Locales;
  wasServiceAlertDisplayedOnce?: boolean;
  isPagoPATestEnabled: boolean;
  // TODO: create transformer for Option objects and use Option instead of pot
  //       https://www.pivotaltracker.com/story/show/170998374
  isCustomEmailChannelEnabled: pot.Pot<boolean, undefined>;
  continueWithRootOrJailbreak?: boolean;
  isMixpanelEnabled: boolean | null;
  isPnTestEnabled: boolean;
  isIdPayTestEnabled?: boolean;
  // 'isDesignSystemEnabled' has been introduced without a migration
  // (PR https://github.com/pagopa/io-app/pull/4427) so there are cases
  // where its value is `undefined` (when the user updates the app without
  // changing the variable value later). Typescript cannot detect this so
  // be sure to handle such case when reading and using this value
  isDesignSystemEnabled: boolean;
  isNewWalletSectionEnabled: boolean;
  isItWalletTestEnabled?: boolean;
  isNewHomeSectionEnabled?: boolean;
}>;

export const initialPreferencesState: PersistedPreferencesState = {
  isFingerprintEnabled: undefined,
  preferredCalendar: undefined,
  preferredLanguage: undefined,
  wasServiceAlertDisplayedOnce: false,
  isPagoPATestEnabled: false,
  isCustomEmailChannelEnabled: pot.none,
  continueWithRootOrJailbreak: false,
  isMixpanelEnabled: null,
  isPnTestEnabled: false,
  isIdPayTestEnabled: false,
  isDesignSystemEnabled: false,
  isNewWalletSectionEnabled: false,
  isItWalletTestEnabled: false,
  isNewHomeSectionEnabled: false
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function preferencesReducer(
  state: PersistedPreferencesState = initialPreferencesState,
  action: Action
): PersistedPreferencesState {
  if (isActionOf(preferenceFingerprintIsEnabledSaveSuccess, action)) {
    return {
      ...state,
      isFingerprintEnabled: action.payload.isFingerprintEnabled
    };
  }
  if (isActionOf(preferredCalendarSaveSuccess, action)) {
    return {
      ...state,
      preferredCalendar: action.payload.preferredCalendar
    };
  }
  if (isActionOf(preferredCalendarRemoveSuccess, action)) {
    return {
      ...state,
      preferredCalendar: initialPreferencesState.preferredCalendar
    };
  }
  if (isActionOf(preferredLanguageSaveSuccess, action)) {
    return {
      ...state,
      preferredLanguage: action.payload.preferredLanguage
    };
  }
  if (isActionOf(serviceAlertDisplayedOnceSuccess, action)) {
    return {
      ...state,
      wasServiceAlertDisplayedOnce: action.payload.wasServiceAlertDisplayedOnce
    };
  }
  if (isActionOf(preferencesPagoPaTestEnvironmentSetEnabled, action)) {
    return {
      ...state,
      isPagoPATestEnabled: action.payload.isPagoPATestEnabled
    };
  }

  if (isActionOf(customEmailChannelSetEnabled, action)) {
    return {
      ...state,
      isCustomEmailChannelEnabled: pot.some(action.payload)
    };
  }

  if (isActionOf(continueWithRootOrJailbreak, action)) {
    return {
      ...state,
      continueWithRootOrJailbreak: action.payload
    };
  }

  if (isActionOf(setMixpanelEnabled, action)) {
    return {
      ...state,
      isMixpanelEnabled: action.payload
    };
  }

  if (isActionOf(preferencesPnTestEnvironmentSetEnabled, action)) {
    return {
      ...state,
      isPnTestEnabled: action.payload.isPnTestEnabled
    };
  }

  if (isActionOf(preferencesDesignSystemSetEnabled, action)) {
    return {
      ...state,
      isDesignSystemEnabled: action.payload.isDesignSystemEnabled
    };
  }

  // when the current user is different from the previous logged one
  // reset the mixpanel opt-in preference
  if (isActionOf(differentProfileLoggedIn, action)) {
    return {
      ...state,
      isMixpanelEnabled: null,
      isFingerprintEnabled: undefined
    };
  }

  if (isActionOf(preferencesIdPayTestSetEnabled, action)) {
    return {
      ...state,
      isIdPayTestEnabled: action.payload.isIdPayTestEnabled
    };
  }

  if (isActionOf(preferencesNewWalletSectionSetEnabled, action)) {
    return {
      ...state,
      isNewWalletSectionEnabled: action.payload.isNewWalletSectionEnabled
    };
  }

  if (isActionOf(preferencesItWalletTestSetEnabled, action)) {
    return {
      ...state,
      isItWalletTestEnabled: action.payload.isItWalletTestEnabled
    };
  }

  if (isActionOf(preferencesNewHomeSectionSetEnabled, action)) {
    return {
      ...state,
      isNewHomeSectionEnabled: action.payload.isNewHomeSectionEnabled
    };
  }

  return state;
}

// Selectors
export const isPagoPATestEnabledSelector = (state: GlobalState) =>
  state.persistedPreferences.isPagoPATestEnabled;

export const wasServiceAlertDisplayedOnceSelector = (state: GlobalState) =>
  state.persistedPreferences.wasServiceAlertDisplayedOnce;

export const isCustomEmailChannelEnabledSelector = (state: GlobalState) =>
  state.persistedPreferences.isCustomEmailChannelEnabled;

export const preferredCalendarSelector = (state: GlobalState) =>
  state.persistedPreferences.preferredCalendar;

export const isFingerprintEnabledSelector = (state: GlobalState) =>
  state.persistedPreferences.isFingerprintEnabled;

export const persistedPreferencesSelector = (state: GlobalState) =>
  state.persistedPreferences;

export const continueWithRootOrJailbreakSelector = (state: GlobalState) =>
  state.persistedPreferences.continueWithRootOrJailbreak;

export const isMixpanelEnabled = (state: GlobalState): boolean | null =>
  state.persistedPreferences.isMixpanelEnabled;

export const isPnTestEnabledSelector = (state: GlobalState) =>
  state.persistedPreferences.isPnTestEnabled;

export const isIdPayTestEnabledSelector = (state: GlobalState) =>
  !!state.persistedPreferences?.isIdPayTestEnabled;

// 'isDesignSystemEnabled' has been introduced without a migration
// (PR https://github.com/pagopa/io-app/pull/4427) so there are cases
// where its value is `undefined` (when the user updates the app without
// changing the variable value later). Typescript cannot detect this so
// we must make sure that the signature's return type is respected
export const isDesignSystemEnabledSelector = (state: GlobalState) =>
  state.persistedPreferences.isDesignSystemEnabled ?? false;

export const isNewWalletSectionLocallyEnabledSelector = (state: GlobalState) =>
  state.persistedPreferences?.isNewWalletSectionEnabled ?? false;

export const isItWalletTestEnabledSelector = (state: GlobalState) =>
  !!state.persistedPreferences?.isItWalletTestEnabled;

export const isNewHomeSectionEnabledSelector = (state: GlobalState) =>
  state.persistedPreferences?.isNewHomeSectionEnabled ?? false;

// returns the preferred language as an Option from the persisted store
export const preferredLanguageSelector = createSelector<
  GlobalState,
  PersistedPreferencesState,
  O.Option<Locales>
>(persistedPreferencesSelector, pps => O.fromNullable(pps.preferredLanguage));
