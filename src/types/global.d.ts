declare namespace Http {
    export interface APIErrorResponse {
        code?: string | number;
        message?: string;
    }
}

declare var Http: Http.APIErrorResponse;