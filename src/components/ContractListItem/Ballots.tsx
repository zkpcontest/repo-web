import React from "react";
import {Button, Nav, Tab, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartPie, faList} from "@fortawesome/free-solid-svg-icons";
import {Doughnut} from 'react-chartjs-2';
import {EBallotStatus, IContractMeta} from "../../types";
import {shortenString} from "../../utils";


interface IContractBallotsProps {
    meta: IContractMeta;
}

const ContractBallots = (props: IContractBallotsProps) => {
    const {meta} = props;
    const data = {
        labels: [
            EBallotStatus[EBallotStatus.NotVoted],
            EBallotStatus[EBallotStatus.Voted],
        ],
        datasets: [
            {
                data: [
                    Object.keys(meta.ballots).filter(value => (
                        [EBallotStatus.NotExist, EBallotStatus.NotVoted].indexOf(+meta.ballots[value]) >= 0
                    )).length,
                    Object.keys(meta.ballots).filter(value => +meta.ballots[value] === EBallotStatus.Voted).length
                ],
                backgroundColor: [
                    '#5bc0de',
                    '#5cb85c'
                ],
                borderWidth: 1,
            },
        ],
        legend: {
            align: 'end'
        }
    }

    return (
        <Tab.Container id={'ballots-tabs'} defaultActiveKey={'chart'}>
            <div className={'d-flex flex-row align-items-center mb-1'}>
                <div className={'text-uppercase fw-light text-secondary flex-grow-1'}>Ballots</div>
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
                    <div id={'ballots-chart'} className={'pt-3'}>
                        <Doughnut
                            data={data}
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
                    </div>
                </Tab.Pane>

                <Tab.Pane eventKey={'list'}>
                    <Table className={'small fw-light'}>
                        <thead>
                        <tr>
                            <th>Ballot</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(meta.ballots).map(key => (
                            <tr key={key}>
                                <td>{shortenString(key)}</td>
                                <td>{EBallotStatus[meta.ballots[key]]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    );
}

export default ContractBallots
