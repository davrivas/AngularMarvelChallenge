import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChallengeService {
    private readonly publicKey: string = 'f1def8f826359cbe621637efac4cf74c';
    private readonly md5Hash: string = 'fda0c911fa2baa3c9a36f36433acb8b4';
    public readonly apiKeyHash: string = `ts=1&apikey=${this.publicKey}&hash=${this.md5Hash}`;

    public readonly maxResults: number = 10;

    IsNullOrWhiteSpace(value: string): boolean {
        return value === undefined || value === null || value.trim().length === 0;
    }

    IsNullOrEmpty(value: any[]): boolean {
        return value === null || value === undefined || value.length === 0;
    }
}
