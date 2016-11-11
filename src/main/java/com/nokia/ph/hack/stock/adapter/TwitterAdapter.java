package com.nokia.ph.hack.stock.adapter;

import java.util.ArrayList;
import java.util.List;

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
        Query query = new Query( "$SECB since:2013-10-31 until:2016-11-11" );
        QueryResult result = twitter.search( query );
        for( Status status : result.getTweets() )
        {
            retVal.add( status.getText() );
        }

        return retVal;
    }
}
