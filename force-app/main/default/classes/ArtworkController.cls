public with sharing class ArtworkController {
    @AuraEnabled(Cacheable=true)
    public static Artwork__c[] getAllArtwork(){
        return [
            SELECT
                Id,
                Name,
                X2_Years_On_View__c,
                Artist_Full_Name__c,
                Artist_Last_Name__c,
                Artwork_Image_Small__c,
                Current_Location__c,
                Days_on_View2__c,
                Dimensions__c,
                Location__c,
                Artwork_URL__c,
                Owned_by_ArtBridges__c
            FROM Artwork__c
            ORDER BY Artist_Last_Name__c
            LIMIT 20
        ];

    }

    @AuraEnabled(Cacheable=true)
    public static Artwork__c[] getAllABArtwork(){
        return [
            SELECT
                Id,
                Name,
                X2_Years_On_View__c,
                Artist_Full_Name__c,
                Artist_Last_Name__c,
                Artwork_Image_Small__c,
                Current_Location__c,
                Days_on_View2__c,
                Dimensions__c,
                Location__c,
                Owned_by_ArtBridges__c,
                Artwork_URL__c
            FROM Artwork__c
            WHERE Owned_by_ArtBridges__c = true
            ORDER BY Artist_Last_Name__c
            LIMIT 20
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static Artwork__c[] getAllRestrictedABArtwork(){
        return [
            SELECT
                Id,
                Name,
                X2_Years_On_View__c,
                Artist_Full_Name__c,
                Artist_Last_Name__c,
                Artwork_Image_Small__c,
                Current_Location__c,
                Days_on_View2__c,
                Dimensions__c,
                Location__c,
                Owned_by_ArtBridges__c
            FROM Artwork__c
            WHERE Owned_by_ArtBridges__c = true AND X2_Years_On_View__c = false
            ORDER BY Artist_Last_Name__c
            LIMIT 20
        ];
    }


    @AuraEnabled(Cacheable=true)
    public static Artwork__c[] getAllUnrestrictedABArtwork(){
        return [
            SELECT
                Id,
                Name,
                X2_Years_On_View__c,
                Artist_Full_Name__c,
                Artist_Last_Name__c,
                Artwork_Image_Small__c,
                Current_Location__c,
                Days_on_View2__c,
                Dimensions__c,
                Location__c,
                Travel_Restriction_Override__c,
                Owned_by_ArtBridges__c
            FROM Artwork__c
            WHERE Owned_by_ArtBridges__c = true AND (X2_Years_On_View__c = true OR Travel_Restriction_Override__c = true)
            ORDER BY Artist_Last_Name__c
            LIMIT 20
        ];
    }

}
