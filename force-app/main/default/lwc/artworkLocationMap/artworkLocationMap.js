import { LightningElement, wire } from 'lwc';
import getAllCurrentArtworkLocations from '@salesforce/apex/ArtworkLocationController.getAllCurrentArtworkLocations';

export default class ArtworkLocationMap extends LightningElement {
    mapMarkers = [];
    @wire(getAllCurrentArtworkLocations) artworkLocations


    connectedCallback(){
        if(artworkLocations.data){
            console.log(this.artworkLocations.data.records)
        } else {
            console.log(this.artworkLocations.error.message)
        }
        
    }


    // declare the function that gets that map markers. Call it through a separate connectedCallback function?
    // do I need to do a for:each on artworkLocations.data?
    // getMapMarkers(locations){
    //     this.mapMarkers = this.artworkLocations.data.map(artworkLocation =>{
    //         const Latitude = artworkLocation.Account__r.ShippingLatitude;
    //         const Longitude = artworkLocation.Account__r.ShippingLongitude;
    //         const newMarker =  {
    //             location: { Latitude, Longitude},
    //             title: `${artworkLocation.Artwork__r.Name}, ${artworkLocation.Artist_Name__c}`,
    //             description: `${artworkLocation.Account__r.Name}, ${artworkLocation.Account__r.Location__c}}`,
    //             icon: 'utility:image'
    //         }
    //         console.log(newMarker)
    //     })
    // }
    

    // mapMarkers = [
    //     {location: {
    //         Latitude: '40.95361',
    //         Longitude: '-73.895789',
    //     }, 
    //     title: "'Light Atlas' by Cynthia Daignault",
    //     description: `<b>Hudson River Museum</b><br> Yonkers, NY<br><br> On View until 8/2/2022`,
    //     icon: 'standard:brand'
    //     }, 
    //     {location: {
    //         Latitude: '40.95361',
    //         Longitude: '-73.895789',
    //     }, 
    //     title: "'15 Canvas Study of the Grand Canyon' by David Hockney",
    //     description: `<b>Hudson River Museum</b><br> Yonkers, NY<br><br> On View until 8/2/2022`,
    //     icon: 'standard:brand'
    //     }, 
    //     {location: {
    //         Latitude: '27.774668',
    //         Longitude: '-82.631816',
    //     }, 
    //     title: "'Untitled (Subway Station)' by Norman Lewis",
    //     description: `<b>Museum of Fine Arts<br> St. Petersburg</b><br> St. Petersburg, FL <br><br> On View until 6/15/2022`,
    //     icon: 'standard:brand'
    //     }, 
    //     {location: {
    //         Latitude: '29.435893',
    //         Longitude: '-98.482781',
    //     }, 
    //     title: `'Untitled (Black and White Variation on "Pochade")' by Stuart Davis`,
    //     description: `<b>San Antonio Art Museum</b><br> San Antonio, TX <br><br> On View until 1/15/2022`,
    //     icon: 'standard:brand'
    //     }, 
    //     {location: {
    //         Latitude: '40.499538',
    //         Longitude: '-74.446489',
    //     }, 
    //     title: "'Lapsang' by Jack Whitten",
    //     description: `<b>Zimmerli Art Museum</b><br> New Brunswick, NJ <br> <br> On View until 3/31/2022`,
    //     icon: 'standard:brand'
    //     }
    // ]
    
}