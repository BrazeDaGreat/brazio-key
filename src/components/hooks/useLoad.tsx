import { useState } from "react";

export default function useLoad() {
  const [loading, setLoading] = useState<Boolean>(false);
  const state = (state: Boolean | undefined = undefined) => {
    if (state === true || state === false) {
      setLoading(state);
      return;
    }
    return loading;
  };
  const jsx = () => {
    return (
      <div className="absolute z-50 w-[100vw] h-[100vh] bg-black bg-opacity-50 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  };

  return { loading: state, jsx };
}
