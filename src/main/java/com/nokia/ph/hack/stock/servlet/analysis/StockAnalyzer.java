package com.nokia.ph.hack.stock.servlet.analysis;

import java.util.List;

import com.ibm.watson.developer_cloud.personality_insights.v3.model.Profile;
import com.nokia.ph.hack.stock.adapter.TwitterAdapter;
import com.nokia.ph.hack.stock.adapter.WatsonsAdapter;
import com.nokia.ph.hack.stock.exception.AnalsysisException;

import twitter4j.TwitterException;

public class StockAnalyzer
{
    private WatsonsAdapter watsons;

    private TwitterAdapter twitter;

    public StockAnalyzer()
    {
        watsons = new WatsonsAdapter();
        try
        {
            twitter = new TwitterAdapter();
        }
        catch( TwitterException e )
        {
            throw new AnalsysisException( e );
        }
    }

    public String getAnalysis( String type, String symbol )
    {
        List<String> tweets;
        try
        {
            tweets = twitter.getSymbolPublicTweets( symbol );
        }
        catch( TwitterException e )
        {
            throw new AnalsysisException( e );
        }

        System.out.println( "************** TWEETS **************" );
        System.out.println( tweets );

        String sampleText =
            "A year ago, in assuming the tasks of the Presidency, I said that few generations, in all history, had been granted the role of being the great defender of freedom in its hour of maximum danger. This is our good fortune; and I welcome it now as I did a year ago. For it is the fate of this generation-of you in the Congress and of me as President--to live with a struggle we did not start, in a world we did not make. But the pressures of life are not always distributed by choice. And while no nation has ever faced such a challenge, no nation has ever been so ready to seize the burden and the glory of freedom.";

        /*Profile profile = watsons.getAnalysis( sampleText );
        String analysis = getAnalysisFromProfile( profile );
        System.out.println( "************** WATSONS **************" );
        System.out.println( analysis );*/

        return "Hello";
    }

    private String getAnalysisFromProfile( Profile profile )
    {
        return profile.toString();
    }
}
