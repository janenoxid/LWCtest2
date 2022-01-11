import { LightningElement, wire } from 'lwc';
import getAllCurrentArtworkLocations from '@salesforce/apex/ArtworkLocationController.getAllCurrentArtworkLocations';

export default class ArtworkLocationList extends LightningElement {
    @wire(getAllCurrentArtworkLocations) artworkLocations
}