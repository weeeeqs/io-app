import {
  ButtonLink,
  ButtonOutline,
  ButtonSolid,
  HSpacer,
  IOColors,
  IconButton,
  IconButtonContained,
  IconButtonSolid,
  ListItemSwitch,
  VSpacer,
  useIOExperimentalDesign,
  useIOTheme
} from "@pagopa/io-app-design-system";
import * as React from "react";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { H2 } from "../../../components/core/typography/H2";
import { IOStyles } from "../../../components/core/variables/IOStyles";
import { DSComponentViewerBox } from "../components/DSComponentViewerBox";
import { DesignSystemScreen } from "../components/DesignSystemScreen";

const styles = StyleSheet.create({
  primaryBlockLegacy: {
    backgroundColor: IOColors.blue,
    padding: 16,
    borderRadius: 8
  },
  primaryBlock: {
    backgroundColor: IOColors["blueIO-500"],
    padding: 16,
    borderRadius: 16
  }
});

const onButtonPress = () => {
  Alert.alert("Alert", "Action triggered");
};

export const DSButtons = () => {
  const { isExperimental } = useIOExperimentalDesign();
  const theme = useIOTheme();

  return (
    <DesignSystemScreen title={"Buttons"}>
      <H2
        color={theme["textHeading-default"]}
        weight={"Semibold"}
        style={{ marginBottom: 16 }}
      >
        ButtonSolid
      </H2>
      {renderButtonSolid(isExperimental)}

      <VSpacer size={48} />

      <H2
        color={theme["textHeading-default"]}
        weight={"Semibold"}
        style={{ marginBottom: 16 }}
      >
        ButtonOutline
      </H2>
      {renderButtonOutline(isExperimental)}

      <VSpacer size={48} />

      <H2
        color={theme["textHeading-default"]}
        weight={"Semibold"}
        style={{ marginBottom: 16 }}
      >
        ButtonLink
      </H2>
      {renderButtonLink(isExperimental)}

      <VSpacer size={48} />

      <H2
        color={theme["textHeading-default"]}
        weight={"Semibold"}
        style={{ marginBottom: 16 }}
      >
        IconButton
      </H2>
      {renderIconButton(isExperimental)}

      <VSpacer size={48} />

      <H2
        color={theme["textHeading-default"]}
        weight={"Semibold"}
        style={{ marginBottom: 16 }}
      >
        IconButtonSolid
      </H2>
      {renderIconButtonSolid(isExperimental)}

      <VSpacer size={48} />

      <H2
        color={theme["textHeading-default"]}
        weight={"Semibold"}
        style={{ marginBottom: 16 }}
      >
        IconButtonContained (Icebox)
      </H2>
      {renderIconButtonContained(isExperimental)}
    </DesignSystemScreen>
  );
};

const renderButtonSolid = (isExperimental: boolean) => (
  <>
    <DSComponentViewerBox name="ButtonSolid · Primary Variant (using Pressable API)">
      <ButtonSolid
        accessibilityLabel="Tap to trigger test alert"
        label={"Primary button"}
        onPress={onButtonPress}
      />

      <VSpacer size={16} />

      <ButtonSolid
        accessibilityLabel="Tap to trigger test alert"
        label={"Primary button"}
        icon="qrCode"
        onPress={onButtonPress}
      />

      <VSpacer size={16} />

      <ButtonSolid
        accessibilityLabel="Tap to trigger test alert"
        label={"Primary button"}
        icon="qrCode"
        iconPosition="end"
        onPress={onButtonPress}
      />

      <VSpacer size={16} />

      <View style={{ alignSelf: "center" }}>
        <ButtonSolid
          accessibilityLabel="Tap to trigger test alert"
          label={"Primary button (centered)"}
          onPress={onButtonPress}
        />
      </View>
    </DSComponentViewerBox>
    <DSComponentViewerBox name="ButtonSolid · Primary, Full width">
      <ButtonSolid
        fullWidth
        accessibilityLabel="Tap to trigger test alert"
        label={"Primary button (full width)"}
        onPress={onButtonPress}
      />
    </DSComponentViewerBox>

    <DSComponentViewerBox name="ButtonSolid · Primary · Full width, loading state">
      <LoadingSolidButtonExample />
    </DSComponentViewerBox>

    <DSComponentViewerBox name="ButtonSolid · Primary, disabled">
      <View>
        <ButtonSolid
          disabled
          accessibilityLabel="Tap to trigger test alert"
          label={"Primary button (disabled)"}
          onPress={onButtonPress}
        />

        <VSpacer size={16} />

        <ButtonSolid
          disabled
          accessibilityLabel="Tap to trigger test alert"
          label={"Primary button (disabled)"}
          icon="qrCode"
          onPress={onButtonPress}
        />
      </View>
    </DSComponentViewerBox>

    <DSComponentViewerBox name="ButtonSolid · Danger variant">
      <View>
        <ButtonSolid
          color="danger"
          label={"Danger button"}
          onPress={onButtonPress}
          accessibilityLabel="Tap to trigger test alert"
        />

        <VSpacer size={16} />

        <ButtonSolid
          color="danger"
          accessibilityLabel="Tap to trigger test alert"
          label={"Danger button"}
          icon="trashcan"
          onPress={onButtonPress}
        />

        <VSpacer size={16} />

        <ButtonSolid
          color="danger"
          accessibilityLabel="Tap to trigger test alert"
          label={"Danger button"}
          icon="trashcan"
          iconPosition="end"
          onPress={onButtonPress}
        />
      </View>
    </DSComponentViewerBox>
    <DSComponentViewerBox name="ButtonSolid · Danger, full width">
      <View>
        <ButtonSolid
          fullWidth
          color="danger"
          accessibilityLabel="Tap to trigger test alert"
          label={"Danger button (full width)"}
          onPress={onButtonPress}
        />
      </View>
    </DSComponentViewerBox>

    <DSComponentViewerBox name="ButtonSolid · Danger, disabled">
      <View>
        <ButtonSolid
          color="danger"
          disabled
          accessibilityLabel="Tap to trigger test alert"
          label={"Danger button (disabled)"}
          onPress={onButtonPress}
        />

        <VSpacer size={16} />

        <ButtonSolid
          color="danger"
          disabled
          accessibilityLabel="Tap to trigger test alert"
          label={"Danger button (disabled)"}
          icon="trashcan"
          onPress={onButtonPress}
        />
      </View>

      <VSpacer size={16} />
      <View>
        <ButtonSolid
          color="danger"
          disabled
          fullWidth
          accessibilityLabel="Tap to trigger test alert"
          label={"Danger Button (full width, disabled)"}
          onPress={onButtonPress}
        />
      </View>
    </DSComponentViewerBox>

    <View
      style={isExperimental ? styles.primaryBlock : styles.primaryBlockLegacy}
    >
      <DSComponentViewerBox
        name="ButtonSolid · Contrast variant"
        colorMode="dark"
      >
        <View>
          <ButtonSolid
            color="contrast"
            label={"Contrast button"}
            onPress={onButtonPress}
            accessibilityLabel="Tap to trigger test alert"
          />

          <VSpacer size={16} />

          <ButtonSolid
            color="contrast"
            label={"Contrast button"}
            icon="add"
            onPress={onButtonPress}
            accessibilityLabel="Tap to trigger test alert"
          />

          <VSpacer size={16} />

          <ButtonSolid
            color="contrast"
            label={"Contrast button"}
            icon="add"
            iconPosition="end"
            onPress={onButtonPress}
            accessibilityLabel="Tap to trigger test alert"
          />
        </View>
      </DSComponentViewerBox>

      <DSComponentViewerBox
        name="ButtonSolid · Contrast, full width"
        colorMode="dark"
      >
        <ButtonSolid
          fullWidth
          color="contrast"
          label={"Contrast button"}
          onPress={onButtonPress}
          accessibilityLabel="Tap to trigger test alert"
        />
      </DSComponentViewerBox>

      <DSComponentViewerBox
        name="ButtonSolid · Contrast, full width, loading state"
        colorMode="dark"
      >
        <View>
          <ButtonSolid
            fullWidth
            loading
            color="contrast"
            label={"Contrast button"}
            onPress={onButtonPress}
            accessibilityLabel="Tap to trigger test alert"
          />
        </View>
      </DSComponentViewerBox>

      <DSComponentViewerBox
        name="ButtonSolid · Contrast, disabled"
        colorMode="dark"
        last
      >
        <View>
          <ButtonSolid
            disabled
            color="contrast"
            label={"Contrast button (disabled)"}
            onPress={onButtonPress}
            accessibilityLabel="Tap to trigger test alert"
          />

          <VSpacer size={16} />

          <ButtonSolid
            disabled
            color="contrast"
            label={"Contrast button (disabled)"}
            icon="add"
            onPress={onButtonPress}
            accessibilityLabel="Tap to trigger test alert"
          />
        </View>

        <VSpacer size={16} />

        <View>
          <ButtonSolid
            fullWidth
            disabled
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            label={"Contrast button (full width, disabled)"}
            onPress={onButtonPress}
          />
        </View>
      </DSComponentViewerBox>
    </View>
  </>
);

const renderButtonOutline = (isExperimental: boolean) => (
  <>
    <DSComponentViewerBox name="ButtonOutline · Primary variant (using Pressable API)">
      <ButtonOutline
        accessibilityLabel="Tap to trigger test alert"
        label={"Primary button"}
        onPress={onButtonPress}
      />

      <VSpacer size={16} />

      <ButtonOutline
        accessibilityLabel="Tap to trigger test alert"
        label={"Primary button"}
        icon="arrowLeft"
        onPress={onButtonPress}
      />

      <VSpacer size={16} />

      <ButtonOutline
        accessibilityLabel="Tap to trigger test alert"
        label={"Primary button"}
        icon="arrowRight"
        iconPosition="end"
        onPress={onButtonPress}
      />

      <VSpacer size={16} />

      <View style={{ alignSelf: "center" }}>
        <ButtonOutline
          accessibilityLabel="Tap to trigger test alert"
          label={"Primary button (centered)"}
          onPress={onButtonPress}
        />
      </View>
    </DSComponentViewerBox>
    <DSComponentViewerBox name="ButtonOutline · Primary, full width">
      <View>
        <ButtonOutline
          fullWidth
          accessibilityLabel="Tap to trigger test alert"
          label={"Primary button (full width)"}
          onPress={onButtonPress}
        />
      </View>
    </DSComponentViewerBox>
    <DSComponentViewerBox name="ButtonOutline · Primary, disabled">
      <View>
        <ButtonOutline
          disabled
          accessibilityLabel="Tap to trigger test alert"
          label={"Primary button (disabled)"}
          onPress={onButtonPress}
        />

        <VSpacer size={16} />

        <ButtonOutline
          disabled
          accessibilityLabel="Tap to trigger test alert"
          label={"Primary button (disabled)"}
          icon="arrowRight"
          iconPosition="end"
          onPress={onButtonPress}
        />
      </View>
    </DSComponentViewerBox>

    {!isExperimental && (
      <>
        <DSComponentViewerBox name="ButtonOutline · Danger variant">
          <View>
            <ButtonOutline
              color="danger"
              label={"Danger button"}
              onPress={onButtonPress}
              accessibilityLabel="Tap to trigger test alert"
            />

            <VSpacer size={16} />

            <ButtonOutline
              color="danger"
              label={"Danger button"}
              icon="trashcan"
              accessibilityLabel="Tap to trigger test alert"
              onPress={onButtonPress}
            />

            <VSpacer size={16} />

            <ButtonOutline
              color="danger"
              label={"Danger button"}
              icon="trashcan"
              iconPosition="end"
              accessibilityLabel="Tap to trigger test alert"
              onPress={onButtonPress}
            />
          </View>
        </DSComponentViewerBox>
        <DSComponentViewerBox name="ButtonOutline · Danger, full width">
          <View>
            <ButtonOutline
              fullWidth
              color="danger"
              accessibilityLabel="Tap to trigger test alert"
              label={"Danger button (full width)"}
              onPress={() => {
                alert("Action triggered");
              }}
            />
          </View>
        </DSComponentViewerBox>

        <DSComponentViewerBox name="ButtonOutline · Danger, disabled">
          <View>
            <ButtonOutline
              color="danger"
              disabled
              accessibilityLabel="Tap to trigger test alert"
              label={"Danger button (disabled)"}
              onPress={() => {
                alert("Action triggered");
              }}
            />
          </View>
          <VSpacer size={16} />
          <View>
            <ButtonOutline
              color="danger"
              disabled
              fullWidth
              accessibilityLabel="Tap to trigger test alert"
              label={"Danger Button (full width, disabled)"}
              onPress={() => {
                alert("Action triggered");
              }}
            />
          </View>
        </DSComponentViewerBox>
      </>
    )}

    <View
      style={isExperimental ? styles.primaryBlock : styles.primaryBlockLegacy}
    >
      <DSComponentViewerBox
        name="ButtonOutline · Contrast variant"
        colorMode="dark"
      >
        <View>
          <ButtonOutline
            color="contrast"
            label={"Contrast button"}
            onPress={onButtonPress}
            accessibilityLabel="Tap to trigger test alert"
          />

          <VSpacer size={16} />

          <ButtonOutline
            color="contrast"
            label={"Contrast button"}
            icon="arrowLeft"
            onPress={onButtonPress}
            accessibilityLabel="Tap to trigger test alert"
          />

          <VSpacer size={16} />

          <ButtonOutline
            color="contrast"
            label={"Contrast button"}
            icon="arrowRight"
            iconPosition="end"
            onPress={onButtonPress}
            accessibilityLabel="Tap to trigger test alert"
          />
        </View>
      </DSComponentViewerBox>

      <DSComponentViewerBox
        name="ButtonOutline · Contrast, full width"
        colorMode="dark"
      >
        <View>
          <ButtonOutline
            fullWidth
            color="contrast"
            label={"Contrast button"}
            onPress={onButtonPress}
            accessibilityLabel="Tap to trigger test alert"
          />
        </View>
      </DSComponentViewerBox>

      <DSComponentViewerBox
        name="ButtonOutline · Contrast, disabled"
        colorMode="dark"
        last
      >
        <View>
          <ButtonOutline
            disabled
            color="contrast"
            label={"Contrast button (disabled)"}
            onPress={onButtonPress}
            accessibilityLabel="Tap to trigger test alert"
          />

          <VSpacer size={16} />

          <ButtonOutline
            disabled
            color="contrast"
            label={"Contrast button (disabled)"}
            icon="arrowRight"
            iconPosition="end"
            onPress={onButtonPress}
            accessibilityLabel="Tap to trigger test alert"
          />
        </View>
      </DSComponentViewerBox>
    </View>
  </>
);

const renderButtonLink = (isExperimental: boolean) => (
  <>
    <DSComponentViewerBox name="ButtonLink · Primary variant (using Pressable API)">
      <ButtonLink
        accessibilityLabel="Tap to trigger test alert"
        label={"Primary button"}
        onPress={onButtonPress}
      />

      <VSpacer size={16} />

      <ButtonLink
        accessibilityLabel="Tap to trigger test alert"
        label={"Primary button"}
        icon="starEmpty"
        onPress={onButtonPress}
      />

      <VSpacer size={16} />

      <ButtonLink
        accessibilityLabel="Tap to trigger test alert"
        label={"Primary button"}
        icon="starEmpty"
        iconPosition="end"
        onPress={onButtonPress}
      />

      <VSpacer size={16} />

      <View style={{ alignSelf: "center" }}>
        <ButtonLink
          accessibilityLabel="Tap to trigger test alert"
          label={"Primary button (centered)"}
          onPress={onButtonPress}
        />
      </View>
    </DSComponentViewerBox>
    <DSComponentViewerBox name="ButtonLink · Primary, disabled">
      <View>
        <ButtonLink
          disabled
          accessibilityLabel="Tap to trigger test alert"
          label={"Primary button (disabled)"}
          onPress={onButtonPress}
        />

        <VSpacer size={16} />

        <ButtonLink
          disabled
          accessibilityLabel="Tap to trigger test alert"
          label={"Primary button (disabled)"}
          icon="starEmpty"
          iconPosition="end"
          onPress={onButtonPress}
        />
      </View>
    </DSComponentViewerBox>

    <View
      style={isExperimental ? styles.primaryBlock : styles.primaryBlockLegacy}
    >
      <DSComponentViewerBox
        name="ButtonLink · Contrast variant"
        colorMode="dark"
      >
        <View>
          <ButtonLink
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            label={"Primary button"}
            onPress={onButtonPress}
          />

          <VSpacer size={16} />

          <ButtonLink
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            label={"Primary button"}
            icon="starEmpty"
            onPress={onButtonPress}
          />

          <VSpacer size={16} />

          <ButtonLink
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            label={"Primary button"}
            icon="starEmpty"
            iconPosition="end"
            onPress={onButtonPress}
          />

          <VSpacer size={16} />

          <View style={{ alignSelf: "center" }}>
            <ButtonLink
              color="contrast"
              accessibilityLabel="Tap to trigger test alert"
              label={"Primary button (centered)"}
              onPress={onButtonPress}
            />
          </View>
        </View>
      </DSComponentViewerBox>

      <DSComponentViewerBox
        name="ButtonLink · Contrast, disabled"
        colorMode="dark"
        last
      >
        <View>
          <ButtonLink
            disabled
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            label={"Primary button (disabled)"}
            onPress={onButtonPress}
          />

          <VSpacer size={16} />

          <ButtonLink
            disabled
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            label={"Primary button (disabled)"}
            icon="starEmpty"
            iconPosition="end"
            onPress={onButtonPress}
          />
        </View>
      </DSComponentViewerBox>
    </View>
  </>
);

const renderIconButton = (isExperimental: boolean) => (
  <>
    <DSComponentViewerBox name="IconButton · Primary variant">
      <View style={IOStyles.row}>
        <IconButton
          accessibilityLabel="Tap to trigger test alert"
          icon="search"
          onPress={onButtonPress}
        />

        <HSpacer size={16} />

        <IconButton
          accessibilityLabel="Tap to trigger test alert"
          icon="help"
          onPress={onButtonPress}
        />

        <HSpacer size={16} />

        <IconButton
          accessibilityLabel="Tap to trigger test alert"
          icon="help"
          disabled
          onPress={onButtonPress}
        />
      </View>
    </DSComponentViewerBox>
    <DSComponentViewerBox name="IconButton · Neutral variant">
      <View style={IOStyles.row}>
        <IconButton
          color="neutral"
          accessibilityLabel="Tap to trigger test alert"
          icon="search"
          onPress={onButtonPress}
        />

        <HSpacer size={16} />

        <IconButton
          color="neutral"
          accessibilityLabel="Tap to trigger test alert"
          icon="help"
          onPress={onButtonPress}
        />

        <HSpacer size={16} />

        <IconButton
          color="neutral"
          accessibilityLabel="Tap to trigger test alert"
          icon="help"
          disabled
          onPress={onButtonPress}
        />
      </View>
    </DSComponentViewerBox>
    <View
      style={isExperimental ? styles.primaryBlock : styles.primaryBlockLegacy}
    >
      <DSComponentViewerBox
        name="IconButton · Contrast variant"
        colorMode="dark"
        last
      >
        <View style={IOStyles.row}>
          <IconButton
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            icon="search"
            onPress={onButtonPress}
          />

          <HSpacer size={16} />

          <IconButton
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            icon="help"
            onPress={onButtonPress}
          />

          <HSpacer size={16} />

          <IconButton
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            icon="help"
            disabled
            onPress={onButtonPress}
          />
        </View>
      </DSComponentViewerBox>
    </View>
  </>
);

const renderIconButtonSolid = (isExperimental: boolean) => (
  <>
    <DSComponentViewerBox name="IconButtonSolid · Primary variant, large">
      <View style={IOStyles.row}>
        <IconButtonSolid
          color="primary"
          accessibilityLabel="Tap to trigger test alert"
          icon="arrowBottom"
          onPress={() => {
            alert("Action triggered");
          }}
        />

        <HSpacer size={16} />

        <IconButtonSolid
          color="primary"
          accessibilityLabel="Tap to trigger test alert"
          icon="arrowBottom"
          disabled
          onPress={() => {
            alert("Action triggered");
          }}
        />
      </View>
    </DSComponentViewerBox>
    <View
      style={isExperimental ? styles.primaryBlock : styles.primaryBlockLegacy}
    >
      <DSComponentViewerBox
        name="IconButtonSolid · Contrast variant, large"
        colorMode="dark"
        last
      >
        <View style={IOStyles.row}>
          <IconButtonSolid
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            icon="arrowBottom"
            onPress={onButtonPress}
          />

          <HSpacer size={16} />

          <IconButtonSolid
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            icon="arrowBottom"
            disabled
            onPress={onButtonPress}
          />
        </View>
      </DSComponentViewerBox>
    </View>
  </>
);

const renderIconButtonContained = (isExperimental: boolean) => (
  <>
    <DSComponentViewerBox name="IconButtonContained · Primary variant">
      <View style={IOStyles.row}>
        <IconButtonContained
          accessibilityLabel="Tap to trigger test alert"
          icon="help"
          onPress={() => {
            alert("Action triggered");
          }}
        />

        <IconButtonContained
          accessibilityLabel="Tap to trigger test alert"
          icon="help"
          disabled
          onPress={() => {
            alert("Action triggered");
          }}
        />
      </View>
    </DSComponentViewerBox>
    <DSComponentViewerBox name="IconButtonContained · Neutral variant">
      <View style={IOStyles.row}>
        <IconButtonContained
          color="neutral"
          accessibilityLabel="Tap to trigger test alert"
          icon="help"
          onPress={() => {
            alert("Action triggered");
          }}
        />

        <IconButtonContained
          color="neutral"
          accessibilityLabel="Tap to trigger test alert"
          icon="help"
          disabled
          onPress={() => {
            alert("Action triggered");
          }}
        />
      </View>
    </DSComponentViewerBox>
    <View
      style={isExperimental ? styles.primaryBlock : styles.primaryBlockLegacy}
    >
      <DSComponentViewerBox
        name="IconButtonContained · Contrast variant"
        colorMode="dark"
        last
      >
        <View style={IOStyles.row}>
          <IconButtonContained
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            icon="help"
            onPress={onButtonPress}
          />

          <IconButtonContained
            color="contrast"
            accessibilityLabel="Tap to trigger test alert"
            icon="help"
            disabled
            onPress={onButtonPress}
          />
        </View>
      </DSComponentViewerBox>
    </View>
  </>
);

const LoadingSolidButtonExample = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View>
      <ButtonSolid
        fullWidth
        loading={isEnabled}
        accessibilityLabel="Tap to trigger test alert"
        label={"Primary button"}
        onPress={() => setIsEnabled(true)}
      />
      <ListItemSwitch
        label="Enable loading state"
        onSwitchValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};
