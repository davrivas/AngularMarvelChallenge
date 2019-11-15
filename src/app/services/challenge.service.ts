import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChallengeService {
    public publicKey: string = 'f1def8f826359cbe621637efac4cf74c';
    public md5Hash: string = 'fda0c911fa2baa3c9a36f36433acb8b4';
    public maxResultsPerPage: number = 10;
}
