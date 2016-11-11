package com.nokia.ph.hack.stock.adapter;

import com.ibm.watson.developer_cloud.http.ServiceCall;
import com.ibm.watson.developer_cloud.personality_insights.v3.PersonalityInsights;
import com.ibm.watson.developer_cloud.personality_insights.v3.model.Profile;

public class WatsonsAdapter
{
    private PersonalityInsights service;

    public WatsonsAdapter()
    {
        String apiVersion = "2016-10-20";
        String username = "e0770267-c897-41b5-8af0-3c1bc484ba7e";
        String password = "ygdcP0rC5e2G";
        service = new PersonalityInsights( apiVersion, username, password );
    }

    public Profile getAnalysis( String text )
    {
        ServiceCall<Profile> serviceCall = service.getProfile( text );
        Profile profile = serviceCall.execute();
        return profile;
    }
}
