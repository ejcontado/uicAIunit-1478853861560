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

    private static final long serialVersionUID = -8613518709760109141L;

    @Override
    protected void doGet( HttpServletRequest request, HttpServletResponse response )
        throws ServletException, IOException
    {
        String type = getRequestParameter( request, "type" );
        String symbol = getRequestParameter( request, "symbol" );
        String startDate = getRequestParameter( request, "start_date" );
        String endDate = getRequestParameter( request, "end_date" );

        StockAnalyzer analyzer = new StockAnalyzer();
        String analysis = analyzer.getAnalysis( type, symbol, startDate, endDate );

        response.setContentType( "application/json" );
        response.getWriter().print( analysis );
    }

    private String getRequestParameter( HttpServletRequest request, String string )
    {
        String retVal = request.getParameter( string );
        return GeneralUtils.isEmpty( retVal ) ? "" : retVal;
    }
}
