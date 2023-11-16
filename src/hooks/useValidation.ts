import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://phrmadataapi.azurewebsites.net/Intranet';
const emailEndpoint = 'SendEmail';

const useValidation = () => {
    const [result, setResult] = useState<[] | null>(null);
    const [isLoaded, setIsloaded] = useState<boolean>(false);

    const sendEmail = (text: string) => {
        const body = {
            from: {
                email: 'wharf@wharf.com',
                name: 'The Wharf',
            },
            to: {
                email: 'mprime@phrma.org',
                name: 'Michael Prime',
            },
            subject: 'New Wharf Question',
            plainTextContent: text,
        };
        console.log(text, body);
        axios
            .post(
                `https://wharflogicapp.azurewebsites.net:443/api/SendEmail/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0cCO_ICO4itSFLUm_O9WeNptQnC04v7OWZ_v5c4LcOU`,
                JSON.stringify(body),
                { headers: { 'content-type': 'application/json' } }
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
