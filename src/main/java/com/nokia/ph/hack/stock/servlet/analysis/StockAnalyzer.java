package com.nokia.ph.hack.stock.servlet.analysis;

import com.ibm.watson.developer_cloud.http.ServiceCall;
import com.ibm.watson.developer_cloud.personality_insights.v3.PersonalityInsights;
import com.ibm.watson.developer_cloud.personality_insights.v3.model.Profile;
import com.nokia.ph.hack.stock.servlet.utils.GeneralUtils;

public class StockAnalyzer
{
    private PersonalityInsights service;

    public StockAnalyzer()
    {
        String apiVersion = "2016-10-20";
        String username = "e0770267-c897-41b5-8af0-3c1bc484ba7e";
        String password = "ygdcP0rC5e2G";
        service = new PersonalityInsights( apiVersion, username, password );
    }

    public String getAnalysis( String type, String symbol )
    {
        if( GeneralUtils.isEmpty( type ) )
        {
            return "Hello, world!";
        }

        String text =
            "A year ago, in assuming the tasks of the Presidency, I said that few generations, in all history, had been granted the role of being the great defender of freedom in its hour of maximum danger. This is our good fortune; and I welcome it now as I did a year ago. For it is the fate of this generation-of you in the Congress and of me as President--to live with a struggle we did not start, in a world we did not make. But the pressures of life are not always distributed by choice. And while no nation has ever faced such a challenge, no nation has ever been so ready to seize the burden and the glory of freedom.";

        ServiceCall<Profile> serviceCall = service.getProfile( text );
        Profile profile = serviceCall.execute();
        return profile.toString();
    }
}
