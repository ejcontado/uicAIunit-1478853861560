package com.nokia.ph.hack.stock.credentials;

public class Credentials {
	
	public WatsonCredential RobbyPersonalityInsights = new WatsonCredential();
	public WatsonCredential MikeeToneAnalysis = new WatsonCredential();
	
	public Credentials() {
		//Crude implementation (Sorry Robby)
		RobbyPersonalityInsights.username = "e0770267-c897-41b5-8af0-3c1bc484ba7e";
		RobbyPersonalityInsights.password = "ygdcP0rC5e2G";
		
		MikeeToneAnalysis.username = "8a481cbe-2b10-4c3b-ba0e-b93621ba70f0";
		MikeeToneAnalysis.password = "kmmCgxQQWBoO";
	}
}
