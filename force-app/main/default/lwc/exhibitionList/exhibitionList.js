import { LightningElement, wire } from 'lwc';
import getAllExhibitions from '@salesforce/apex/ProjectController.getAllExhibitions';

export default class ExhibitionList extends LightningElement {
    @wire(getAllExhibitions) exhibitions


};

