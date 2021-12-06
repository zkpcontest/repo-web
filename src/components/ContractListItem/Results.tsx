import React from "react";
import {Button, Nav, Tab, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartPie, faList} from "@fortawesome/free-solid-svg-icons";
import {Doughnut} from "react-chartjs-2";
import {hex2pem, shortenString} from "../../utils";
import {IContractMeta} from "../../types";
import randomColor from "randomcolor";

// @ts-ignore
import CryptoBrowserify from 'crypto-browserify';


interface IContractResultsProps {
    meta: IContractMeta;
}

const ContractResults = (props: IContractResultsProps) => {
    const {meta} = props;
    let rsaSecretKey: string | undefined;
    if (meta.privateKey.hex) rsaSecretKey = hex2pem('PRIVATE KEY', meta.privateKey.hex, 'RSA');

    const answers: string[] = meta.answers.map(answer => {
        return Buffer.from(answer, 'hex').toString('utf8');
    });
    const votes: { encrypted: string; decrypted: string | undefined }[] = meta.votes.map(vote => {
        let decrypted;

        if (rsaSecretKey) {
            try {
                decrypted = CryptoBrowserify.privateDecrypt(
                    {
                        key: rsaSecretKey,
                        padding: 1  // RSA_PKCS1_PADDING
                    },
                    Buffer.from(vote, 'hex')
                )
                decrypted = Buffer.from(decrypted).toString('hex').slice(6, -6);
                decrypted = Buffer.from(decrypted, 'hex').toString();
            } catch {}
        }

        return {encrypted: vote, decrypted};
    });

    const getResults = () => {
        const results: {[key: string]: any} = {};
        if (!votes.every(vote => vote.decrypted)) return [];

        votes.forEach(vote => {
            vote.decrypted?.split('|').forEach(answer => {
                if (answers.indexOf(answer) >= 0) results[answer] = (results[answer] ?? 0) + 1;
            });
        });

        return answers.map(answer => results[answer]);
    }

    return (
        <Tab.Container id={'results-tabs'} defaultActiveKey={'chart'}>
            <div className={'d-flex flex-row align-items-center mb-1'}>
                <div className={'text-uppercase fw-light text-secondary flex-grow-1'}>Results</div>
                <Nav variant={'pills'}>
                    <Nav.Item>
                        <Nav.Link
                            eventKey={'chart'}
                            as={Button}
                            size={'sm'}
                            className={'nav-link-button'}
                        >
                            <FontAwesomeIcon icon={faChartPie}/>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey={'list'}
                            as={Button}
                            size={'sm'}
                            className={'nav-link-button'}
                        >
                            <FontAwesomeIcon icon={faList}/>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            <Tab.Content>
                <Tab.Pane eventKey={'chart'}>
                    <div id={'results-chart'} className={'pt-3'}>
                        {votes.length && votes.every(vote => vote.decrypted)
                            ? (
                                <Doughnut
                                    data={{
                                        labels: answers,
                                        datasets: [
                                            {
                                                data: getResults(),
                                                backgroundColor: randomColor({seed: '0x0000', count: answers.length}),
                                                borderWidth: 1,
                                            },
                                        ]
                                    }}
                                    options={{
                                        responsive: true,
                                        aspectRatio: 1.4,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                                align: 'center'
                                            }
                                        }
                                    }}
                                />
                            )
                            : (
                                <h3 className={'text-center my-5 fw-lighter text-secondary'}>No votes yet</h3>
                            )
                        }
                    </div>
                </Tab.Pane>

                <Tab.Pane eventKey={'list'}>
                    <Table className={'small fw-light'}>
                        <thead>
                        <tr>
                            <th>Vote</th>
                            <th>Decrypted</th>
                        </tr>
                        </thead>
                        <tbody>
                        {votes.length
                            ? votes.map((vote, index) => (
                                <tr key={index}>
                                    <td>{shortenString(vote.encrypted)}</td>
                                    <td>{vote.decrypted ?? '-'}</td>
                                </tr>
                            ))
                            : (
                                <tr>
                                    <td colSpan={2}>No votes yet</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    );
}

export default ContractResults
