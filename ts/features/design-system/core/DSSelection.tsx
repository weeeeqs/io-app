import {
  AnimatedMessageCheckbox,
  CheckboxLabel,
  Divider,
  HSpacer,
  IOColors,
  LabelSmall,
  ListItemCheckbox,
  ListItemRadioWithAmount,
  ListItemSwitch,
  NativeSwitch,
  RadioGroup,
  RadioItem,
  SwitchLabel,
  VSpacer
} from "@pagopa/io-app-design-system";
import * as React from "react";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { H2 } from "../../../components/core/typography/H2";
import { IOStyles } from "../../../components/core/variables/IOStyles";
import { DSComponentViewerBox } from "../components/DSComponentViewerBox";
import { DesignSystemScreen } from "../components/DesignSystemScreen";

export const DSSelection = () => (
  <DesignSystemScreen title={"Selection"}>
    <H2 weight={"Bold"} style={{ marginBottom: 16 }}>
      Checkbox
    </H2>
    {/* CheckboxLabel */}
    {renderCheckboxLabel()}
    {/* ListItemCheckbox */}
    {renderListItemCheckbox()}
    {/* AnimatedMessageCheckbox */}
    <H2 weight={"Bold"} style={{ marginVertical: 16 }}>
      Checkbox (Messages)
    </H2>
    <AnimatedMessageCheckboxShowroom />
    {/* RadioListItem */}
    <H2 weight={"Bold"} style={{ marginVertical: 16 }}>
      Radio
    </H2>
    <RadioListItemsShowroom />

    <H2 weight={"Bold"} style={{ marginVertical: 16 }}>
      Switch
    </H2>
    {/* Native Switch */}
    <NativeSwitchShowroom />
    {/* ListItemSwitch */}
    <ListItemSwitchShowroom />
    {/* SwitchLabel */}
    {renderAnimatedSwitch()}
  </DesignSystemScreen>
);

const renderCheckboxLabel = () => (
  <>
    <DSComponentViewerBox name="CheckboxLabel">
      <CheckboxLabel label="This is a test" />
      <VSpacer size={16} />
      <CheckboxLabel label="This is a test with a very loooong looooooooong loooooooong text" />
    </DSComponentViewerBox>
    <DSComponentViewerBox name="CheckboxLabel (disabled)">
      <CheckboxLabel disabled checked={true} label="This is a test" />
      <VSpacer size={16} />
      <CheckboxLabel disabled label="This is a test" />
    </DSComponentViewerBox>
  </>
);

const renderListItemCheckbox = () => (
  <>
    <DSComponentViewerBox name="ListItemCheckbox">
      <ListItemCheckbox
        value="Usa configurazione rapida"
        accessibilityLabel={""}
      />
      <Divider />
      <ListItemCheckbox
        icon="coggle"
        value="Usa configurazione rapida"
        accessibilityLabel={""}
      />
      <Divider />
      <ListItemCheckbox
        value="Usa configurazione rapida"
        description={
          "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti. Potrai sempre disattivare le comunicazioni che non ti interessano."
        }
        accessibilityLabel={""}
      />
      <Divider />
      <ListItemCheckbox
        value="Questa è un'altra prova ancora più lunga per andare su due righe"
        description={
          "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti. Potrai sempre disattivare le comunicazioni che non ti interessano."
        }
        accessibilityLabel={""}
      />
      <Divider />
      <ListItemCheckbox
        icon="bonus"
        value="Let's try with a loooong loooooong looooooong title + icon"
        description={
          "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti. Potrai sempre disattivare le comunicazioni che non ti interessano."
        }
        accessibilityLabel={""}
      />
      <Divider />
      <ListItemCheckbox
        icon="coggle"
        value="Usa configurazione rapida"
        description={
          "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti."
        }
        accessibilityLabel={""}
      />
    </DSComponentViewerBox>
    <DSComponentViewerBox name="ListItemCheckbox (disabled)">
      <ListItemCheckbox
        disabled
        value="Usa configurazione rapida"
        accessibilityLabel={""}
      />
      <Divider />
      <ListItemCheckbox
        disabled
        icon="coggle"
        value="Usa configurazione rapida"
        description={
          "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti."
        }
        accessibilityLabel={""}
      />
      <Divider />
      <ListItemCheckbox
        disabled
        selected={true}
        icon="coggle"
        value="Usa configurazione rapida"
        accessibilityLabel={""}
      />
    </DSComponentViewerBox>
  </>
);

// RADIO ITEMS

const mockRadioItems = (): ReadonlyArray<RadioItem<string>> => [
  {
    startImage: { icon: "coggle" },
    value: "Let's try with a basic title",
    description:
      "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti. Potrai sempre disattivare le comunicazioni che non ti interessano.",
    id: "example-1"
  },
  {
    value: "Let's try with JSX description",
    description: (
      <LabelSmall color="grey-700" weight="Regular">
        Ti contatteranno solo i servizi che hanno qualcosa di importante da
        dirti.{" "}
        <Text style={{ color: IOColors["grey-700"], fontWeight: "600" }}>
          Potrai sempre disattivare le comunicazioni che non ti interessano.
        </Text>
      </LabelSmall>
    ),
    id: "example-jsx-element"
  },
  {
    startImage: { paymentLogo: "myBank" },
    value: "Payment method item",
    description:
      "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti. Potrai sempre disattivare le comunicazioni che non ti interessano.",
    id: "example-paymentLogo"
  },
  {
    value: "Let's try with a basic title",
    description:
      "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti.",
    id: "example-2"
  },
  {
    value: "Let's try with a very looong loooooong title instead",
    id: "example-3"
  },
  {
    value: "Let's try with a disabled item",
    description:
      "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti.",
    id: "example-disabled",
    disabled: true
  }
];

const mockRadioItemsSkeleton = (): ReadonlyArray<RadioItem<string>> => [
  {
    value: "Skeleton example",
    description:
      "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti.",
    id: "example-loading",
    disabled: true,
    loadingProps: {
      state: true,
      skeletonIcon: false
    }
  },
  {
    value: "Skeleton example",
    description:
      "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti.",
    id: "example-loading-withIcon",
    disabled: true,
    loadingProps: {
      state: true,
      skeletonIcon: true
    }
  },
  {
    value: "Skeleton example",
    description:
      "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti.",
    id: "example-loading-withDescription",
    disabled: true,
    loadingProps: {
      state: true,
      skeletonDescription: true
    }
  },
  {
    value: "Skeleton example",
    description:
      "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti.",
    id: "example-loading-withIcon-withDescription",
    disabled: true,
    loadingProps: {
      state: true,
      skeletonDescription: true,
      skeletonIcon: true
    }
  }
];

const RadioListItemsShowroom = () => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    "example-1"
  );

  return (
    <>
      <DSComponentViewerBox name="RadioListItem">
        <RadioGroup<string>
          type="radioListItem"
          key="check_income"
          items={mockRadioItems()}
          selectedItem={selectedItem}
          onPress={setSelectedItem}
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="RadioListItem, loading states">
        <RadioGroup<string>
          type="radioListItem"
          key="skeleton"
          items={mockRadioItemsSkeleton()}
          selectedItem={selectedItem}
          onPress={setSelectedItem}
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="ListItemRadioWithAmount">
        <ListItemRadioWithAmount
          label="Banca Intesa"
          formattedAmountString={"2,50 €"}
          suggestReason="Perché sei già cliente"
          isSuggested={true}
        />

        <Divider />
        <ListItemRadioWithAmount
          label="Banca un po' costosa"
          formattedAmountString={"4,50 €"}
        />
      </DSComponentViewerBox>
    </>
  );
};

const AnimatedMessageCheckboxShowroom = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <>
      <DSComponentViewerBox name="AnimatedMessageCheckbox">
        <View style={[IOStyles.row, IOStyles.alignCenter]}>
          <AnimatedMessageCheckbox checked={isEnabled} />
          <HSpacer size={24} />
          <NativeSwitch onValueChange={toggleSwitch} value={isEnabled} />
        </View>
      </DSComponentViewerBox>
    </>
  );
};

// SWITCH

const renderAnimatedSwitch = () => (
  <DSComponentViewerBox name="AnimatedSwitch, dismissed in favor of the native one">
    <SwitchLabel label="This is a test" />
    <VSpacer size={16} />
    <SwitchLabel label="This is a test with a very loooong looooooong loooooooong text" />
  </DSComponentViewerBox>
);

const NativeSwitchShowroom = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <DSComponentViewerBox name="NativeSwitch">
      <View style={{ alignSelf: "flex-start" }}>
        <NativeSwitch value={isEnabled} onValueChange={toggleSwitch} />
      </View>
    </DSComponentViewerBox>
  );
};

type ListItemSwitchSampleProps = Pick<
  React.ComponentProps<typeof ListItemSwitch>,
  "label" | "description" | "value" | "icon" | "paymentLogo" | "action"
>;

const ListItemSwitchSample = ({
  value,
  label,
  description,
  icon,
  action,
  paymentLogo
}: ListItemSwitchSampleProps) => {
  const [isEnabled, setIsEnabled] = useState(value);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <>
      {icon ? (
        <ListItemSwitch
          action={action}
          icon={icon}
          label={label}
          description={description}
          value={isEnabled}
          onSwitchValueChange={toggleSwitch}
        />
      ) : paymentLogo ? (
        <ListItemSwitch
          action={action}
          paymentLogo={paymentLogo}
          label={label}
          description={description}
          value={isEnabled}
          onSwitchValueChange={toggleSwitch}
        />
      ) : (
        <ListItemSwitch
          action={action}
          label={label}
          description={description}
          value={isEnabled}
          onSwitchValueChange={toggleSwitch}
        />
      )}
    </>
  );
};

const ListItemSwitchShowroom = () => (
  <>
    <DSComponentViewerBox name="ListItemSwitch">
      <ListItemSwitchSample label="Testo molto breve" value={true} />
      <Divider />
      <ListItemSwitchSample
        label="Testo molto breve"
        description={
          "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti. Potrai sempre disattivare le comunicazioni che non ti interessano."
        }
      />
      <Divider />
      <ListItemSwitchSample
        label="Questa è un'altra prova ancora più lunga per andare su due righe"
        description={
          "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti. Potrai sempre disattivare le comunicazioni che non ti interessano."
        }
      />
      <Divider />
      <ListItemSwitchSample
        icon="bonus"
        label="Let's try with a loooong loooooong title + icon + action"
        description={
          "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti. Potrai sempre disattivare le comunicazioni che non ti interessano."
        }
        action={{
          label: "Action",
          onPress: () => {
            Alert.alert("Action triggered!");
          }
        }}
      />
      <Divider />
      <ListItemSwitchSample
        icon="bonus"
        label="Let's try with a loooong loooooong title + icon"
        description={
          "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti. Potrai sempre disattivare le comunicazioni che non ti interessano."
        }
      />
      <Divider />
      <ListItemSwitchSample
        paymentLogo="mastercard"
        label="5354 **** **** 0000"
      />
      <Divider />
      <ListItemSwitchSample paymentLogo="applePay" label="Apple Pay" />
    </DSComponentViewerBox>
    <DSComponentViewerBox name="ListItemSwitch, loading status">
      <ListItemSwitch
        icon="device"
        label="Label"
        value={false}
        isLoading
        description="Loading list item switch"
      />
      <Divider />
      <ListItemSwitch
        icon="device"
        label="Loong loooooong looooooooong loooong title"
        value={false}
        isLoading
        description="Loading list item switch"
      />
    </DSComponentViewerBox>
    <DSComponentViewerBox name="ListItemSwitch with badge">
      <ListItemSwitch
        icon="device"
        label="Usa l'app IO"
        value={false}
        badge={{
          text: "Attivo",
          variant: "info"
        }}
        description="Inquadra il codice QR mostrato dall’esercente e segui le istruzioni in app per autorizzare la spesa."
      />
      <Divider />
      <ListItemSwitch
        icon="coggle"
        label="Loong loooooong loooooooooong loooong title"
        value={false}
        badge={{
          text: "Attivo",
          variant: "info"
        }}
      />
    </DSComponentViewerBox>
    <DSComponentViewerBox name="ListItemSwitch, disabled">
      <ListItemSwitch disabled label="Testo molto breve" value={true} />
      <Divider />
      <ListItemSwitch
        disabled
        label="Testo molto breve"
        description={
          "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti. Potrai sempre disattivare le comunicazioni che non ti interessano."
        }
      />
      <Divider />
      <ListItemSwitch
        disabled
        icon="bonus"
        label="Let's try with a loooong loooooong title + icon"
        description={
          "Ti contatteranno solo i servizi che hanno qualcosa di importante da dirti. Potrai sempre disattivare le comunicazioni che non ti interessano."
        }
      />
    </DSComponentViewerBox>
  </>
);
