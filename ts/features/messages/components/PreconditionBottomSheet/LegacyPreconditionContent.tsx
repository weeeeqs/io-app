import * as React from "react";
import { View } from "react-native";
import Placeholder from "rn-placeholder";
import { VSpacer } from "@pagopa/io-app-design-system";
import customVariables from "../../../../theme/variables";
import { MessageMarkdown } from "../MessageDetail/MessageMarkdown";

type LegacyProps = {
  markdown: string;
  onLoadEnd: () => void;
};

export const LegacyPreconditionContent = ({
  markdown,
  onLoadEnd
}: LegacyProps) => {
  const [loaded, setLoaded] = React.useState(false);

  const handleOnLoadEnd = () => {
    setLoaded(true);
    onLoadEnd();
  };

  return (
    <>
      {!loaded && <LegacyPreconditionContentSkeleton />}
      <View
        style={{
          display: loaded ? "flex" : "none",
          marginTop: customVariables.spacerWidth
        }}
      >
        <MessageMarkdown onLoadEnd={handleOnLoadEnd}>
          {markdown}
        </MessageMarkdown>
      </View>
    </>
  );
};

export const LegacyPreconditionContentSkeleton = () => (
  <View style={{ marginTop: customVariables.spacerWidth }} accessible={false}>
    {Array.from({ length: 4 }).map((_, i) => (
      <View key={i}>
        <Placeholder.Box
          width={"100%"}
          animate={"fade"}
          height={21}
          radius={4}
        />
        <VSpacer size={8} />
        <Placeholder.Box
          width={"100%"}
          animate={"fade"}
          height={21}
          radius={4}
        />
        <VSpacer size={8} />
        <Placeholder.Box
          width={"90%"}
          animate={"fade"}
          height={21}
          radius={4}
        />
        <VSpacer size={8} />
      </View>
    ))}
  </View>
);
