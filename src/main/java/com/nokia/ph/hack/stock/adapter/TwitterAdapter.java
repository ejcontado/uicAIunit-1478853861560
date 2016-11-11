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

public class TwitterAdapter {
	private Twitter twitter;

	public TwitterAdapter() throws TwitterException {
		ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setDebugEnabled(true)
				.setOAuthConsumerKey("n1j4GDnQSr52q42yUSo2SRmnZ")
				.setOAuthConsumerSecret(
						"CxzqvBFnmNFqWGHqKdPuiCgT0fHLCGCt9K6JgQ7Q1iGamcrd9D")
				.setOAuthAccessToken(
						"1642861602-qXlaGE9LunnUyG9bZfD5T1qB7WSgR5PLOUrjXvk")
				.setOAuthAccessTokenSecret(
						"CA2tpVaehgxI6oS6ATIu5wWouykeBXQjLRHPZ7mZ4SffC");
		TwitterFactory tf = new TwitterFactory(cb.build());
		twitter = tf.getInstance();
	}

	public List<String> getSymbolPublicTweets(String symbol)
			throws TwitterException {
		List<String> retVal = new ArrayList<>();
		Query query = new Query();

		query.setQuery("$GOOG");

		// One day
		query.setSince("2016-11-10");
		query.setUntil("2016-11-11");

		query.setGeoCode(new GeoLocation(39.726867, -98.656872), 2500,
				Query.KILOMETERS);

		int lastTweetSize = -1; 
		int numberOfTweets = 1024;
		long lastID = Long.MAX_VALUE;
		ArrayList<Status> tweets = new ArrayList<Status>();
				
		while (tweets.size() < numberOfTweets && tweets.size() != lastTweetSize) {
			
			lastTweetSize = tweets.size();
			
			if (numberOfTweets - tweets.size() > 100) {
				query.setCount(100);
			} else {
				query.setCount(numberOfTweets - tweets.size());
			}
			try {
				QueryResult result = twitter.search(query);
				tweets.addAll(result.getTweets());
				System.out.println("Gathered " + tweets.size() + " tweets");

				for (Status t : tweets) {
					if (t.getId() < lastID) {
						lastID = t.getId();
					}
				}
			}

			catch (TwitterException te) {
				System.out.println("Couldn't connect: " + te);
			}

			query.setMaxId(lastID - 1);
		}

		for (int i = 0; i < tweets.size(); i++) {
			Status t = (Status) tweets.get(i);

			String user = t.getUser().getScreenName();
			String msg = t.getText();
			retVal.add(msg);
			
			System.out.println(i + " USER: " + user + " wrote: " + msg);
		}

		return retVal;
	}
}
