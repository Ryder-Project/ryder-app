export const getRyderServerUrl = () => {
  const ryderServerUrl = import.meta.env.VITE_BE_BASE_URL;
  if (!ryderServerUrl) {
    throw new Error(`Could not find the API URL`);
  }
  return ryderServerUrl;
};
