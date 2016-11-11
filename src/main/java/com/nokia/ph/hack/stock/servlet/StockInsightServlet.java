package com.nokia.ph.hack.stock.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nokia.ph.hack.stock.servlet.analysis.StockAnalyzer;
import com.nokia.ph.hack.stock.servlet.utils.GeneralUtils;

@WebServlet( "/StockInsightServlet" )
public class StockInsightServlet extends HttpServlet
{
    /**
     * 
     */
    private static final long serialVersionUID = -3161191497012406808L;

    @Override
    protected void doGet( HttpServletRequest request, HttpServletResponse response )
        throws ServletException, IOException
    {
        response.setContentType( "application/json" );

        String type = getRequestParameter( request, "type" );
        String symbol = getRequestParameter( request, "symbol" );
        System.out.println( "Type: " + type + " Symbol: " + symbol );

        StockAnalyzer analyzer = new StockAnalyzer();
        response.getWriter().print( analyzer.getAnalysis( type, symbol ) );
    }

    private String getRequestParameter( HttpServletRequest request, String string )
    {
        String retVal = request.getParameter( string );
        return GeneralUtils.isEmpty( retVal ) ? "" : retVal;
    }
}
