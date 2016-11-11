package com.nokia.ph.hack.stock.adapter;

import java.util.ArrayList;
import java.util.List;

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

    public List<String> getSymbolPublicTweets( String symbol ) throws TwitterException
    {
        List<String> retVal = new ArrayList<>();
        Query query = new Query();
        query.setCount( 200 );

        //Search query
        query.setQuery( "$GOOG" );

        //One day
        query.setSince( "2016-11-10" );
        query.setUntil( "2016-11-11" );

        //Limit to US
        query.setGeoCode( new GeoLocation( 39.726867, -98.656872 ), 2500, Query.KILOMETERS );

        System.out.println( "Searching using: " + query );

        QueryResult result = twitter.search( query );
        List<Status> tweets = result.getTweets();
        for( Status status : tweets )
        {
            retVal.add( status.getText() );
        }

        System.out.println( "Found " + tweets.size() );

        return retVal;
    }
}
