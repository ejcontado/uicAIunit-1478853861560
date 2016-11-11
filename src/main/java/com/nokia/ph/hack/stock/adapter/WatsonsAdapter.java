package com.nokia.ph.hack.stock.adapter;

import com.ibm.watson.developer_cloud.http.ServiceCall;
import com.ibm.watson.developer_cloud.personality_insights.v3.PersonalityInsights;
import com.ibm.watson.developer_cloud.personality_insights.v3.model.Profile;
import com.ibm.watson.developer_cloud.tone_analyzer.v3.ToneAnalyzer;
import com.ibm.watson.developer_cloud.tone_analyzer.v3.model.ToneAnalysis;
import com.ibm.watson.developer_cloud.tone_analyzer.v3.model.ToneOptions;
import com.nokia.ph.hack.stock.credentials.Credentials;

public class WatsonsAdapter
{
    private PersonalityInsights personalityInsightsService;
    private ToneAnalyzer toneAnaylsisService;

    public WatsonsAdapter()
    {
        String apiVersion = "2016-10-20";
        Credentials credentials = new Credentials();
        
        // <<<<<CHANGE ALL BELOW IF YOU ARE NOT THE PERSON
        personalityInsightsService = new PersonalityInsights( apiVersion, credentials.RobbyPersonalityInsights.username, credentials.RobbyPersonalityInsights.password );
        toneAnaylsisService = new ToneAnalyzer( apiVersion, credentials.MikeeToneAnalysis.username, credentials.MikeeToneAnalysis.password );
        
    }

    public Profile getPersonalityInsight( String text )
    {
        ServiceCall<Profile> serviceCall = personalityInsightsService.getProfile( text );
        Profile profile = serviceCall.execute();
        return profile;
    }
    
    public ToneAnalysis getToneAnalysis( String text )
    {
        return toneAnaylsisService.getTone(text, null).execute();
    }
    
}
