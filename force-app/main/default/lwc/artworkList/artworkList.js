import { LightningElement, wire } from 'lwc';
import getAllABArtwork from '@salesforce/apex/ArtworkController.getAllABArtwork';

export default class ArtworkList extends LightningElement {
    @wire(getAllABArtwork) artworks
}