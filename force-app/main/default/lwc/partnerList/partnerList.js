import { LightningElement, wire } from 'lwc';
import getAllPartners from '@salesforce/apex/AccountController.getAllPartners';

export default class PartnerList extends LightningElement {
    @wire(getAllPartners) partners


};

