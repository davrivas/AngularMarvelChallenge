import {Md5} from 'ts-md5/dist/md5';

export class ChallengeService {
    public static publicKey: string = 'f1def8f826359cbe621637efac4cf74c';
    private static privateKey: string = '7fc3dd9c612f602117833595018a48d4b0183d32';
    public static maxResultsPerPage: number = 10;

    public static getHash(): string {
        return Md5.hashStr('1' + this.privateKey + this.publicKey).toString();
    }
}
