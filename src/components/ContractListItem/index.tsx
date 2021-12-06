import React, {useEffect, useState} from "react";
import {TonClient} from "@tonclient/core";
import {Account} from "@tonclient/appkit";
import ContractABI from '../../assets/Contract.abi.json';
import {Card, Col, Row} from "react-bootstrap";
import ContractDetails from "./Details";
import ContractBallots from "./Ballots";
import ContractResults from "./Results";
import {IContract, IContractMeta} from "../../types";
import Preloader from "../Preloader";


interface IContractListItemProps {
    client: TonClient;
    contract: IContract;
}

const Index = (props: IContractListItemProps) => {
    const {client, contract} = props;
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [meta, setMeta] = useState<IContractMeta>();

    useEffect(() => {
        const getMeta = async () => {
            setIsFetching(true);
            try {
                const verifyingKey = await account.runLocal('m_vkey', {});
                const proofKey = await account.runLocal('m_pkey', {});
                const privateKeyHash = await account.runLocal('hash_private', {});
                const privateKey = await account.runLocal('private_key', {});
                const status = await account.runLocal('status', {});
                const ending = await account.runLocal('time_limit', {});
                const ballots = await account.runLocal('ballot_numbers_state', {});
                const answers = await account.runLocal('available_choose', {});
                const votes = await account.runLocal('votes', {});

                setMeta({
                    verifyingKey: verifyingKey.decoded?.output.m_vkey,
                    proofKey: proofKey.decoded?.output.m_pkey,
                    privateKey: {
                        hash: privateKeyHash.decoded?.output.hash_private,
                        hex: privateKey.decoded?.output.private_key
                    },
                    ending: +ending.decoded?.output.time_limit * 1000,
                    status: status.decoded?.output.status,
                    ballots: ballots.decoded?.output.ballot_numbers_state,
                    answers: answers.decoded?.output.available_choose,
                    votes: votes.decoded?.output.votes
                });
            } catch (e: any) {
                console.error(e.message);
            } finally {
                setIsFetching(false);
            }
        }

        const account = new Account(
            {abi: ContractABI},
            {client: client as any, address: contract.address}
        );
        getMeta().then();
    }, [client, contract]);

    return (
        <Card className={'mb-5'}>
            <Card.Body>
                {isFetching || !meta
                    ? <Preloader size={'sm'} text={'Loading data...'}/>
                    : (
                        <Row>
                            <Col xs={12} md={4} className={'border-end mb-4 mb-md-0 contract-card-col'}>
                                <ContractDetails contract={contract} meta={meta}/>
                            </Col>
                            <Col xs={12} md={4} className={'border-end mb-4 mb-md-0 contract-card-col'}>
                                <ContractBallots meta={meta}/>
                            </Col>
                            <Col xs={12} md={4} className={'contract-card-col'}>
                                <ContractResults meta={meta}/>
                            </Col>
                        </Row>
                    )
                }
            </Card.Body>
        </Card>
    );
}

export default Index
