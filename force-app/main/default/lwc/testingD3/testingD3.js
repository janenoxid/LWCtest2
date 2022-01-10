import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3file';

export default class TestingD3 extends LightningElement {
    svgWidth = 400;
    svgHeight = 400;

    renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.d3Initialized = true;

        Promise.all([
            loadScript(this, D3 + '/d3.min.js'),
        ])
            .then(() => {
                console.log("It worked!")
                this.initializeD3();
            })
            .catch(error => {
                console.log("There's an error")
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading D3',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }
 }