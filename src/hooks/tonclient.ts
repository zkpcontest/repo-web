import {ClientConfig, TonClient} from "@tonclient/core";
import {useEffect, useState} from "react";


export const useTonClient = (config: ClientConfig = TonClient.defaultConfig) => {
    const [client, setClient] = useState<TonClient>();
    const configString = JSON.stringify(config);

    useEffect(() => {
        setClient(new TonClient({...TonClient.defaultConfig, ...JSON.parse(configString)}));
    }, [configString]);

    return client;
}
