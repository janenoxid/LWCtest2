public with sharing class ArtworkLocationController {

    @AuraEnabled(Cacheable=true)
    public static Artwork_Location__c[] getAllArtworkLocations(){
        return [
            SELECT
                Id,
                Name, 
                Account__r.Name, // add to artwork controller?
                Account__r.Location__c,
                Account__r.ShippingLongitude,
                Account__r.ShippingLatitude,
                Artist_Name__c,
                Artwork__r.Name,
                EndDate__c,
                StartDate__c,
                Status__c,
                Time_on_View_Days__c,
                Copy_Time_on_View_Days__c,
                Related_Project__r.Name
            FROM Artwork_Location__c
            ORDER BY StartDate__c
            LIMIT 20
        ];
    }


    @AuraEnabled(Cacheable=true)
    public static Artwork_Location__c[] getAllCurrentArtworkLocations(){
        return [
            SELECT
                Id,
                Name,
                Account__r.Name, 
                Account__r.Location__c,
                Account__r.ShippingLongitude,
                Account__r.ShippingLatitude,
                Artist_Name__c,
                Artwork__r.Name,
                EndDate__c,
                StartDate__c,
                Status__c,
                Time_on_View_Days__c,
                Copy_Time_on_View_Days__c,
                Related_Project__r.Name
            FROM Artwork_Location__c
            WHERE Status__c = 'Currently on View'
            ORDER BY StartDate__c
            LIMIT 20
        ];
    }
}
