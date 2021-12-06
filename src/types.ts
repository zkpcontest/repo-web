export enum EBallotStatus {
    NotExist,
    NotVoted,
    Voted
}

export interface IContract {
    address: string;
    createdAt: number;
}

export interface IContractMeta {
    verifyingKey: string;
    proofKey: string;
    privateKey: {
        hash: string;
        hex?: string;
    };
    status: boolean;
    ending: number;
    ballots: {
        [number: string]: EBallotStatus
    };
    answers: string[];
    votes: string[];
}
