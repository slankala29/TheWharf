import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://phrmadataapi.azurewebsites.net/Intranet';
const getEndpoint = 'GetWharfFAQs';
const emailEndpoint = 'SendEmail';

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
            email: 'wharf@wharf.com',
            name: 'The Wharf',
        },
        to: {
            email: 'NLanteigne@phrma.org',
            name: 'Natalia Lanteigne',
        },
        subject: 'New Wharf Question',
        plainTextContent: text,
    };

    useEffect(() => {
        if (callType === 'GET') {
            axios.get(`${baseUrl}/${getEndpoint}`).then((response) => {
                setResult(response.data);
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
