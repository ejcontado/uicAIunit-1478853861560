package com.nokia.ph.hack.stock.servlet.analysis;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.ibm.watson.developer_cloud.tone_analyzer.v3.model.ElementTone;
import com.ibm.watson.developer_cloud.tone_analyzer.v3.model.ToneAnalysis;
import com.ibm.watson.developer_cloud.tone_analyzer.v3.model.ToneCategory;
import com.ibm.watson.developer_cloud.tone_analyzer.v3.model.ToneScore;
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

    @SuppressWarnings( "unchecked" )
    public String getAnalysis( String type, String symbol, String startDate, String endDate )
    {
        System.out.println( "Start" );
        System.out.println( "Getting tweets for symbol: '" + symbol + "', type: '" + type + "',start date: '" +
            startDate + "', end date: '" + endDate + "'." );

        JSONObject retVal = new JSONObject();
        List<String> tweets;
        try
        {
            tweets = twitter.getSymbolPublicTweets( symbol, startDate, endDate );
        }
        catch( TwitterException e )
        {
            e.printStackTrace();
            retVal.put( "code", "nok" );
            retVal.put( "message", e.getMessage() );
            return retVal.toJSONString();
        }

        System.out.println( "Gathered " + tweets.size() + " tweets." );
        if( tweets.size() < 20 )
        {
            retVal.put( "code", "nok" );
            retVal.put( "message", "Too few tweets found" );
            return retVal.toJSONString();
        }

        JSONArray tweetsJSON = new JSONArray();
        tweetsJSON.addAll( tweets );
        retVal.put( "tweets", tweetsJSON );

        Map<String, Double> toneScores = getToneScores( tweets );
        JSONArray toneScoresJSON = new JSONArray();
        for( Entry<String, Double> toneScore : toneScores.entrySet() )
        {
            JSONObject toneScoreJSON = new JSONObject();
            toneScoreJSON.put( "name", toneScore.getKey() );
            toneScoreJSON.put( "score", toneScore.getValue() * 100 );
            toneScoresJSON.add( toneScoreJSON );
        }
        retVal.put( "tones", toneScoresJSON );
        retVal.put( "sentiment", getAnalysis( toneScores ) );

        retVal.put( "code", "ok" );
        retVal.put( "message", "OK" );

        return retVal.toJSONString();
    }

    private String getAnalysis( Map<String, Double> toneScores )
    {
        double joy = toneScores.get( "Joy" );

        if( joy > 0.35 && joy < 0.55 )
        {
            return "Neutral";
        }
        else if( joy >= 0.55 )
        {
            return "Bullish";
        }

        return "Bearish";
    }

    private Map<String, Double> getToneScores( List<String> tweets )
    {
        System.out.println( "Analyzing tweets" );

        Map<String, Double> map = new HashMap<>();
        String tweetsConcatenated = getConcatenatedTweets( tweets );
        ToneAnalysis toneAnalysis = watsons.getToneAnalysis( tweetsConcatenated );
        ElementTone documentTone = toneAnalysis.getDocumentTone();

        List<ToneCategory> toneCategories = documentTone.getTones();
        for( ToneCategory toneCategory : toneCategories )
        {
            if( "emotion_tone".equals( toneCategory.getId() ) )
            {
                List<ToneScore> toneScores = toneCategory.getTones();
                for( ToneScore toneScore : toneScores )
                {
                    map.put( toneScore.getName(), toneScore.getScore() );
                }

                break;
            }
        }
        return map;
    }

    private String getConcatenatedTweets( List<String> tweets )
    {
        StringBuilder sb = new StringBuilder();
        for( String tweet : tweets )
        {
            sb.append( tweet + "\n" );
        }
        return sb.toString();
    }
}
