import { LightningElement, wire } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3file'
import getAllPartners from '@salesforce/apex/AccountController.getAllPartners';

export default class PartnerD3 extends LightningElement {
    @wire(getAllPartners) partners

    svgWidth = 800;
    svgHeight = 500;
    d3Initialized = false;

    initializeD3() {
        const svg = d3.select(this.template.querySelector('svg.d3'));
        const width = this.svgWidth;
        const height = this.svgHeight;

    }


};

