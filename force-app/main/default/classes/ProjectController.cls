public with sharing class ProjectController {
    @AuraEnabled(Cacheable=true)
    public static Opportunity[] getAllExhibitionVenues(){
        return [
            SELECT
                Id,
                Name,
                Account.Name,
                Account.Location__c,
                Exhibition__r.Name, 
                StageName,
                StartDate_Formula__c,
                EndDate_Formula__c,
                CloseDate,
                OwnerId
            FROM Opportunity
            WHERE Project_Type__c = 'Exhibition Venue'
            ORDER BY StartDate_Formula__c ASC NULLS LAST
            LIMIT 20 // this is okay to keep for tests, but will need to remove later.
        ];
    } // Don't forget!! You can test out SOQL queries in the Developer Console to more easily make sure they work here.
    
    @AuraEnabled(Cacheable=true)
    public static Opportunity[] getAllExhibitions(){
        return [
            SELECT
                Id,
                Name,
                Account.Name,
                Account.Location__c,
                StageName,
                EndDate_Formula__c,
                StartDate_Formula__c,
                OwnerId
            FROM Opportunity
            WHERE Project_Type__c = 'Exhibition Organizer'
            ORDER BY Name
            LIMIT 20 
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static Opportunity[] getAllNotCanceledVenues(){
        return [
            SELECT
                Id,
                Name,
                Account.Name,
                Account.Location__c,
                Exhibition__r.Name, 
                StageName,
                StartDate_Formula__c,
                EndDate_Formula__c,
                OwnerId
            FROM Opportunity
            WHERE Project_Type__c = 'Exhibition Venue' AND StageName != 'Canceled' AND StageName != 'Ineligible'
            ORDER BY Name
            LIMIT 50 
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static Opportunity[] getAllConfirmedVenues(){
        return [
            SELECT
                Id,
                Name,
                Account.Name,
                Account.Location__c,
                Exhibition__r.Name, 
                StageName,
                StartDate_Formula__c,
                EndDate_Formula__c,
                OwnerId
            FROM Opportunity
            WHERE Project_Type__c = 'Exhibition Venue' AND StageName != 'In Conversation' AND StageName != 'Canceled' AND StageName != 'Ineligible'
            ORDER BY Name
            LIMIT 50 
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static Opportunity[] getEarliestVenueDate(){
        return [
            SELECT 
                Id, 
                StartDate_Formula__c
            FROM Opportunity
            WHERE Project_Type__c = 'Exhibition Venue' AND StartDate_Formula__c != null
            ORDER BY StartDate_Formula__c
            LIMIT 1
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static Opportunity[] getLastestVenueDate(){
        return [
            SELECT 
                Id, 
                EndDate_Formula__c
            FROM Opportunity
            WHERE Project_Type__c = 'Exhibition Venue' AND EndDate_Formula__c != null
            ORDER BY EndDate_Formula__c DESC
            LIMIT 1
        ];
    }

}


// public with sharing class BearController {
    // @AuraEnabled(Cacheable=true)
    // public static Bear__c[] getAllBears() {
    //     return [
    //         SELECT
    //             Id,
    //             Name,
    //             Age__c,
    //             Sex__c,
    //             Height__c,
    //             Weight__c,
    //             Location__Latitude__s,
    //             Location__Longitude__s,
    //             Supervisor__r.Name
    //         FROM Bear__c
    //         ORDER BY Name
    //         LIMIT 50
    //     ];
    // }

//     @AuraEnabled(Cacheable=true)
//     public static Bear__c[] searchBears(String searchTerm) {
//         // Return all bears when no search term
//         searchTerm = searchTerm.trim();
//         if (searchTerm == '') {
//             return getAllBears();
//         }
//         // Prepare query paramters
//         searchTerm = '%' + searchTerm + '%';
//         // Execute search query
//         return [
//             SELECT
//                 Id,
//                 Name,
//                 Age__c,
//                 Sex__c,
//                 Height__c,
//                 Weight__c,
//                 Location__Latitude__s,
//                 Location__Longitude__s,
//                 Supervisor__r.Name
//             FROM Bear__c
//             WHERE Name LIKE :searchTerm
//             ORDER BY Name
//             LIMIT 50
//         ];
//     }
// }
    