import {
  HSpacer,
  IOColors,
  IOPictograms,
  IOPictogramsBleed,
  IOPictogramsLegacy,
  IOPictogramsObject,
  Pictogram,
  PictogramBleed,
  SVGPictogramProps,
  hexToRgba,
  useIOTheme
} from "@pagopa/io-app-design-system";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { H2 } from "../../../components/core/typography/H2";
import {
  DSAssetViewerBox,
  assetItemGutter
} from "../components/DSAssetViewerBox";
import { DSComponentViewerBox } from "../components/DSComponentViewerBox";
import { DesignSystemScreen } from "../components/DesignSystemScreen";

const styles = StyleSheet.create({
  itemsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginLeft: (assetItemGutter / 2) * -1,
    marginRight: (assetItemGutter / 2) * -1,
    marginBottom: 24
  },
  agnosticPictogramWrapper: {
    borderRadius: 8,
    padding: 16,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  agnosticPictogramWrapperBlue: {
    backgroundColor: IOColors["blueIO-500"]
  },
  agnosticPictogramWrapperWhite: {
    backgroundColor: IOColors.white,
    borderColor: hexToRgba(IOColors.black, 0.1),
    borderWidth: 1
  }
});

// Filter the main object, removing already displayed pictograms in the other sets
type PictogramSubsetObject = Record<
  string,
  ({ size }: SVGPictogramProps) => JSX.Element
>;
interface PictogramSetObject {
  [key: string]: ({ size }: SVGPictogramProps) => JSX.Element;
}

const filterPictogramSet = (
  pictogramSubsetObject: PictogramSubsetObject,
  pictogramSetObject: PictogramSetObject
): PictogramSetObject =>
  Object.fromEntries(
    Object.entries(pictogramSetObject).filter(
      ([key]) => !Object.keys(pictogramSubsetObject).includes(key)
    )
  );

const filteredIOPictograms = filterPictogramSet(
  {
    ...IOPictogramsObject,
    ...IOPictogramsLegacy
  },
  IOPictograms
);

export const DSPictograms = () => {
  const theme = useIOTheme();
  return (
    <DesignSystemScreen title={"Pictograms"}>
      <View style={styles.itemsWrapper}>
        {Object.entries(filteredIOPictograms).map(([pictogramItemName]) => (
          <DSAssetViewerBox
            key={pictogramItemName}
            name={pictogramItemName}
            spacing="small"
            type={
              Object.keys(IOPictogramsBleed).includes(pictogramItemName)
                ? "hasBleed"
                : "vector"
            }
            image={
              <Pictogram name={pictogramItemName as IOPictograms} size="100%" />
            }
          />
        ))}
      </View>

      <H2
        color={theme["textHeading-default"]}
        weight={"Semibold"}
        style={{
          marginBottom: 16
        }}
      >
        Bleed Pictograms
      </H2>
      <View style={styles.itemsWrapper}>
        {Object.entries(IOPictogramsBleed).map(([pictogramItemName]) => (
          <DSAssetViewerBox
            type="bleed"
            key={pictogramItemName}
            name={pictogramItemName}
            size="small"
            image={
              <PictogramBleed
                name={pictogramItemName as IOPictogramsBleed}
                size="100%"
              />
            }
          />
        ))}
      </View>

      <H2
        color={theme["textHeading-default"]}
        weight={"Semibold"}
        style={{
          marginBottom: 16
        }}
      >
        Object Pictograms
      </H2>
      <View style={styles.itemsWrapper}>
        {Object.entries(IOPictogramsObject).map(([pictogramItemName]) => (
          <DSAssetViewerBox
            key={pictogramItemName}
            name={pictogramItemName}
            spacing="small"
            size="small"
            image={
              <Pictogram
                name={pictogramItemName as IOPictogramsObject}
                size="100%"
              />
            }
          />
        ))}
      </View>

      <H2
        color={theme["textHeading-default"]}
        weight={"Semibold"}
        style={{
          marginBottom: 16
        }}
      >
        Color mode agnostic
      </H2>
      <DSComponentViewerBox name={`pictogramStyle = "light-content"`}>
        <View
          style={[
            styles.agnosticPictogramWrapper,
            styles.agnosticPictogramWrapperBlue
          ]}
        >
          <Pictogram name="feature" pictogramStyle="light-content" />
          <HSpacer size={24} />
          <Pictogram name="umbrellaNew" pictogramStyle="light-content" />
        </View>
      </DSComponentViewerBox>

      <DSComponentViewerBox name={`pictogramStyle = "dark-content"`}>
        <View
          style={[
            styles.agnosticPictogramWrapper,
            styles.agnosticPictogramWrapperWhite
          ]}
        >
          <Pictogram name="feedback" pictogramStyle="dark-content" />
          <HSpacer size={24} />
          <Pictogram name="charity" pictogramStyle="dark-content" />
        </View>
      </DSComponentViewerBox>
    </DesignSystemScreen>
  );
};
