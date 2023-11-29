import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "https://phrmadataapi.azurewebsites.net/Intranet";
const emailEndpoint = "SendEmail";

const useValidation = () => {
  const [result, setResult] = useState<[] | null>(null);
  const [isLoaded, setIsloaded] = useState<boolean>(false);

  const sendEmail = (text: string) => {
    const body = text;
    console.log(text, body);
    axios
      .post(
        `https://prod-74.eastus.logic.azure.com:443/workflows/02f6adb637a6416b86667de9eeb5c4af/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=npqBVwdfQgYwRlYBN1B3GcjvFcCq-DNuD7rqfWVkOJU`,
        JSON.stringify(body),
        { headers: { "content-type": "application/json" } }
      )
      .then((response) => {
        setResult(response.data);
      });
  };

  return {
    sendEmail,
  };
};

export default useValidation;
