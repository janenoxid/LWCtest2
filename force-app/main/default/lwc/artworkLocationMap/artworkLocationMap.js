import { LightningElement, wire } from 'lwc';
import getAllCurrentArtworkLocations from '@salesforce/apex/ArtworkLocationController.getAllCurrentArtworkLocations';

export default class ArtworkLocationMap extends LightningElement {
    mapMarkers = [];
    @wire(getAllCurrentArtworkLocations) artworkLocations

    // getMapMarkers(artworkLocations){
    //     this.mapMarkers = artworkLocations.map(artworkLocation =>{
    //         const Latitude = artworkLocation.Account__r.ShippingLatitude;
    //         const Longitude = artworkLocation.Account__r.ShippingLongitude;
    //         return {
    //             location: { Latitude, Longitude},
    //             title: `${artworkLocation.Artwork__r.Name}, ${artworkLocation.Artist_Name__c}`,
    //             description: `${artworkLocation.Account__r.Name}, ${artworkLocation.Account__r.Location__c}}`,
    //             icon: 'utility:image'
    //         }
    //     })
    // }

    mapMarkers = [
        {location: {
            Latitude: '40.95361',
            Longitude: '-73.895789',
        }, 
        title: "'Light Atlas' - Cynthia Daignault",
        description: `<b>Hudson River Museum</b><br> Yonkers, NY.<br><br> On View: 8/12/2020 to 8/2/2022`,
        icon: 'standard:brand'
        }, 
        {location: {
            Latitude: '27.774668',
            Longitude: '-82.631816',
        }, 
        title: "'Untitled (Subway Station)' - Norman Lewis",
        description: `<b>Museum of Fine Arts<br> St. Petersburg</b><br> St. Petersburg, FL <br><br> On View: 1/1/2021 to 6/15/2022`,
        icon: 'standard:brand'
        }, 
        {location: {
            Latitude: '29.435893',
            Longitude: '-98.482781',
        }, 
        title: 'Untitled (Black and White Variation on "Pochade") - Stuart Davis',
        description: `<b>San Antonio Art Museum</b><br> San Antonio, TX <br><br> On View: 1/15/2021 to 1/15/2022`,
        icon: 'standard:brand'
        }, 
        {location: {
            Latitude: '40.499538',
            Longitude: '-74.446489',
        }, 
        title: "Lapsang - Jack Whitten",
        description: `<b>Zimmerli Art Museum</b><br> New Brunswick, NJ <br> <br> On View: 1/5/2021 to 3/31/2022`,
        icon: 'standard:brand'
        }
    ]
    
}