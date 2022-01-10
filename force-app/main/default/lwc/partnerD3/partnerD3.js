import { LightningElement, wire } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/D3'
import getAllPartners from '@salesforce/apex/AccountController.getAllPartners';

export default class PartnerD3 extends LightningElement {
    @wire(getAllPartners) partners

    svgWidth = 800;
    svgHeight = 500;
    d3Initialized = false;


};

