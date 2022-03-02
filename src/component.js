/* @flow */

import { getClientID } from '@paypal/sdk-client/src';
import { FUNDING } from '@paypal/sdk-constants';

export const Legal = {

    render(options : {| legalLocale : string, buyerCountry : string, fundingSource : FUNDING |}, container : string) {

        if (!options.legalLocale) {
            throw new Error(`Expected options.legalLocale`);
        }

        if (!options.buyerCountry) {
            throw new Error(`Expected options.buyerCountry`);
        }        

        const el = document.querySelector(container);

        if (!el) {
            throw new Error('Can not find element: ${ container }');
        }

        let legalObj = '';

        switch(options.fundingSource) {
            // For proof of concept, use existing FUNDING scheme from sdk-constants. This would be replaced by PUI after new entry in paypal-sdk-constants
            case paypal.FUNDING.IDEAL: {
                legalObj = {
                    "en_US": "en_US IDEAL LEGAL...",
                    "de_DE": "de_DE IDEAL LEGAL..."
                };
                break;
            }
            default:
                legalObj = {
                    "en_US": 'By clicking on the button, you agree to the <a href="https://www.ratepay.com/legal-payment-terms">terms of payment</a> and <a href="https://www.ratepay.com/legal-payment-dataprivacy">performance of a risk check</a> from the payment partner, Ratepay. You also agree to PayPal’s <a href="https://www.paypal.com/us/webapps/mpp/ua/privacy-full">privacy statement</a>. If your request to purchase Upon invoice is accepted, the purchase price claim will be assigned to Ratepay, and you may only pay Ratepay, not the merchant.',
                    "de_DE": 'Mit Klicken auf den Button akzeptieren Sie die <a href="https://www.ratepay.com/legal-payment-terms">Ratepay Zahlungsbedingungen</a> und erklären sich mit der Durchführung einer <a href="https://www.ratepay.com/legal-payment-dataprivacy">Risikoprüfung durch Ratepay</a>, unseren Partner, einverstanden. Sie akzeptieren auch PayPal’s <a href="https://www.paypal.com/de/webapps/mpp/ua/rechnungskauf-mit-ratepay?locale.x=en_DE">Datenschutzerklärung</a>. Falls Ihre Transaktion erfolgreich per Kauf auf Rechnung abgewickelt werden kann, wird der Kaufpreis an Ratepay abgetreten und Sie dürfen nur an Ratepay überweisen, nicht an den Händler.'
                };
                break;
        }

        // Determine fundingSource; if none passed, default to PUI
        // Determine locale to get base text (without privacy links)
        // If buyer country passed in, use designated privacy links; else use country from locale

        el.innerHTML = '<p>' + legalObj[options.legalLocale] + '</p>';
    }
};