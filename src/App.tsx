import React, {useEffect, useState} from 'react';
import './assets/styles.scss';
import {Container, Navbar} from "react-bootstrap";
import {useTonClient} from "./hooks/tonclient";
import {SortDirection} from "@tonclient/core";
import ContractListItem from "./components/ContractListItem";
import {IContract} from "./types";
import {ToastContainer} from "react-toastify";
import Preloader from "./components/Preloader";


function App() {
    const client = useTonClient({
        network: {
            endpoints: process.env.REACT_APP_NETWORK?.split(';')
        }
    });
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [contracts, setContracts] = useState<IContract[]>();

    useEffect(() => {
        const getContractsList = async () => {
            setIsFetching(true);
            try {
                const contracts = await client?.net.query_collection({
                    collection: 'messages',
                    filter: {
                        code_hash: {eq: process.env.REACT_APP_CONTRACT_CODE}
                    },
                    order: [
                        {path: 'created_at', direction: SortDirection.DESC}
                    ],
                    result: 'dst created_at'
                });
                setContracts(contracts?.result.map(item => ({
                    address: item.dst,
                    createdAt: +item.created_at * 1000
                })));
            } catch (e: any) {
                console.error(e.message)
            } finally {
                setIsFetching(false);
            }
        }

        getContractsList().then();
    }, [client]);


    if (!client) return <Preloader className={'vh-100 justify-content-center'} text={'App is loading...'}/>;
    return (
        <>
            <Navbar variant={'light'} bg={'light'}>
                <Container fluid={'md'}>
                    <Navbar.Brand>DevEx Browser</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid={'md'} className={'py-4'}>
                {isFetching
                    ? <Preloader className={'justify-content-center'} text={'Loading contracts...'}/>
                    : contracts?.map((item, index) => (
                        <ContractListItem key={index} contract={item} client={client}/>
                    ))
                }
            </Container>
            <ToastContainer theme={'light'}/>
        </>
    );
}

export default App;
