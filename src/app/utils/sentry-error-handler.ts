import { Injectable, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/browser';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
    constructor(private router: Router) { }

    handleError(error) {
        Sentry.captureException(error.originalError || error);
        //Sentry.showReportDialog(error);
        this.router.navigateByUrl('/error');
        console.error(error)
    }
}