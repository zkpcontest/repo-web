import React from "react";
import {IContract, IContractMeta} from "../../types";
import {Button, Spinner, Table} from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {shortenString} from "../../utils";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {Toasts} from "../../shortcuts";


interface IContractDetailsProps {
    contract: IContract;
    meta: IContractMeta;
}

const ContractDetails = (props: IContractDetailsProps) => {
    const {contract, meta} = props;

    return (
        <>
            <div className={'text-uppercase fw-light text-secondary mb-1'}>Details</div>
            <Table className={'small mb-0'}>
                <tbody>
                <tr>
                    <td className={'ps-0 text-secondary'}>Address</td>
                    <td className={'fw-light'}>
                        {shortenString(contract.address)}
                        <CopyToClipboard text={contract.address}>
                            <Button
                                variant={'link'}
                                className={'py-0 lh-1 px-1'}
                                onClick={() => Toasts.onCopy()}
                            >
                                <FontAwesomeIcon icon={faCopy} className={'text-secondary'}/>
                            </Button>
                        </CopyToClipboard>
                    </td>
                </tr>
                <tr>
                    <td className={'ps-0 text-secondary'}>Created</td>
                    <td className={'fw-light'}>{new Date(contract.createdAt).toLocaleString()}</td>
                </tr>
                <tr>
                    <td className={'ps-0 text-secondary'}>Ends</td>
                    <td className={'fw-light'}>{new Date(meta.ending).toLocaleString()}</td>
                </tr>
                <tr>
                    <td className={'ps-0 text-secondary'}>Status</td>
                    <td className={'fw-light'}>
                        {!meta.status
                            ? <div className={'text-success'}>Finished</div>
                            : (
                                <div className={'text-warning'}>
                                    <Spinner animation={'border'} size={'sm'} className={'me-2'} variant={'warning'}/>
                                    Ongoing
                                </div>
                            )
                        }
                    </td>
                </tr>
                <tr>
                    <td className={'ps-0 text-secondary'}>Verifying key</td>
                    <td className={'fw-light'}>{shortenString(meta.verifyingKey)}</td>
                </tr>
                <tr>
                    <td className={'ps-0 text-secondary'}>Proof key</td>
                    <td className={'fw-light'}>{shortenString(meta.proofKey)}</td>
                </tr>
                <tr>
                    <td className={'ps-0 text-secondary'}>Private key (hash)</td>
                    <td className={'fw-light'}>{shortenString(meta.privateKey.hash)}</td>
                </tr>
                <tr>
                    <td className={'ps-0 text-secondary'}>Private key (hex)</td>
                    <td className={'fw-light'}>
                        {meta.privateKey.hex
                            ? shortenString(meta.privateKey.hex)
                            : '-'
                        }
                    </td>
                </tr>
                </tbody>
            </Table>
        </>
    );
}

export default ContractDetails
