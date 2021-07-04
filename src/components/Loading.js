import Loader from "react-loader-spinner";

export function Loading() {
  return (
    <Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000}
    />
  );
}