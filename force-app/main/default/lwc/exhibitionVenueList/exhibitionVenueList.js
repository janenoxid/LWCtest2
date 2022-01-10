import { LightningElement, wire } from 'lwc';
import getAllExhibitionVenues from '@salesforce/apex/ProjectController.getAllExhibitionVenues';

export default class ExhibitionVenueList extends LightningElement {
    @wire(getAllExhibitionVenues) exhibitionVenues


};

