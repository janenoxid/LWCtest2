import { LightningElement, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountController.getAllAccounts';

export default class AccountList extends LightningElement {
    @wire(getAllAccounts) accounts


};

