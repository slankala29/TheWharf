import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "https://phrmadataapi.azurewebsites.net/Intranet";
const getEndpoint = "GetWharfFAQs";
const emailEndpoint = "SendEmail";
const tempURL =
  "https://prod-91.eastus.logic.azure.com/workflows/bf635d5636e4497198688d5c7573a340/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qUiQoneVAqtOd6CMXsNeOEnp6pcIgHTAyBbczppISnc";

/**
 * Hook to call the APi and either return the list of FAQs or post a new FAQ
 * body is an object {'question': string, 'answer': string}
 * @param callType
 * @param body
 */
const useApi = (callType: string, text?: string) => {
  const [result, setResult] = useState<[] | null>(null);
  const [isLoaded, setIsloaded] = useState<boolean>(false);
  // TODO: When the site goes live this needs to be updated to Natalia's email: nlanteigne@phrma.org
  const body = {
    from: {
      email: "wharf@wharf.com",
      name: "The Wharf",
    },
    to: {
      email: "NLanteigne@phrma.org",
      name: "Natalia Lanteigne",
    },
    subject: "New Wharf Question",
    plainTextContent: text,
  };

  useEffect(() => {
    if (callType === "GET") {
      axios.get(tempURL).then((response) => {
        console.log(response.data.ResultSets.Table1);

        setResult(response.data.ResultSets.Table1);
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (result) {
      setIsloaded(true);
    }
  });

  return {
    result,
    isLoaded,
  };
};

export default useApi;
