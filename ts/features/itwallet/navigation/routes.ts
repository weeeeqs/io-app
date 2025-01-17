export const ITW_ROUTES = {
  MAIN: "ITW_MAIN" as const,
  DISCOVERY: {
    INFO: "ITW_DISCOVERY_INFO"
  } as const,
  IDENTIFICATION: {
    MODE_SELECTION: "ITW_IDENTIFICATION_MODE_SELECTION",
    NFC_INSTRUCTIONS: "ITW_IDENTIFICATION_NFC_INSTRUCTIONS",
    IDP_SELECTION: "ITW_IDENTIFICATION_IDP_SELECTION"
  } as const,
  ISSUANCE: {
    EID_PREVIEW: "ITW_ISSUANCE_EID_PREVIEW",
    EID_RESULT: "ITW_ISSUANCE_EID_RESULT",
    CREDENTIAL_AUTH: "ITW_ISSUANCE_CREDENTIAL_AUTH",
    CREDENTIAL_PREVIEW: "ITW_ISSUANCE_CREDENTIAL_PREVIEW"
  } as const,
  PRESENTATION: {
    EID_DETAIL: "ITW_PRESENTATION_EID_DETAIL"
  } as const,
  PLAYGROUNDS: "ITW_PLAYGROUNDS" as const
};
