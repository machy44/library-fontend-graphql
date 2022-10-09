import { useState } from "react";

export const useNotify = () => {
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const notify = (message: string) => {
    setInfoMessage(message);
    setTimeout(() => {
      setInfoMessage(null);
    }, 10000);
  };

  return [infoMessage, notify] as const;
};
