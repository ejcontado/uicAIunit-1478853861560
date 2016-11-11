package com.nokia.ph.hack.stock.adapter;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.nokia.ph.hack.stock.servlet.utils.GeneralUtils;

import twitter4j.GeoLocation;
import twitter4j.Query;
import twitter4j.QueryResult;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

public class TwitterAdapter
{
    private Twitter twitter;

    public TwitterAdapter() throws TwitterException
    {
        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setDebugEnabled( true ).setOAuthConsumerKey( "n1j4GDnQSr52q42yUSo2SRmnZ" ).setOAuthConsumerSecret(
            "CxzqvBFnmNFqWGHqKdPuiCgT0fHLCGCt9K6JgQ7Q1iGamcrd9D" ).setOAuthAccessToken(
                "1642861602-qXlaGE9LunnUyG9bZfD5T1qB7WSgR5PLOUrjXvk" ).setOAuthAccessTokenSecret(
                    "CA2tpVaehgxI6oS6ATIu5wWouykeBXQjLRHPZ7mZ4SffC" );
        TwitterFactory tf = new TwitterFactory( cb.build() );
        twitter = tf.getInstance();
    }

    public List<String> getSymbolPublicTweets( String symbol, String startDate, String endDate ) throws TwitterException
    {
        List<String> retVal = new ArrayList<>();
        Query query = new Query();

        query.setQuery( "$" + symbol );
        setQueryDate( query, startDate, endDate );
        query.setGeoCode( new GeoLocation( 39.726867, -98.656872 ), 2500, Query.KILOMETERS );

        int lastTweetSize = -1;
        int numberOfTweets = 400;
        long lastID = Long.MAX_VALUE;
        ArrayList<Status> tweets = new ArrayList<Status>();

        while( tweets.size() < numberOfTweets && tweets.size() != lastTweetSize )
        {
            lastTweetSize = tweets.size();

            if( numberOfTweets - tweets.size() > 100 )
            {
                query.setCount( 100 );
            }
            else
            {
                query.setCount( numberOfTweets - tweets.size() );
            }
            try
            {
                QueryResult result = twitter.search( query );
                tweets.addAll( result.getTweets() );

                for( Status t : tweets )
                {
                    if( t.getId() < lastID )
                    {
                        lastID = t.getId();
                    }
                }
            }
            catch( TwitterException te )
            {
                te.printStackTrace();
            }

            query.setMaxId( lastID - 1 );
        }

        for( int i = 0; i < tweets.size(); i++ )
        {
            Status t = ( Status ) tweets.get( i );
            String msg = t.getText();
            retVal.add( msg );
        }

        return retVal;
    }

    private void setQueryDate( Query query, String startDate, String endDate )
    {
        if( GeneralUtils.isEmpty( startDate ) || GeneralUtils.isEmpty( endDate ) )
        {
            SimpleDateFormat sdf = new SimpleDateFormat( "yyyy-MM-dd" );
            Calendar cal = Calendar.getInstance();
            query.setUntil( sdf.format( cal.getTime() ) );

            cal.add( Calendar.DAY_OF_MONTH, -1 );
            query.setSince( sdf.format( cal.getTime() ) );
        }
        else
        {
            query.setUntil( endDate );
            query.setSince( startDate );
        }
    }
}
