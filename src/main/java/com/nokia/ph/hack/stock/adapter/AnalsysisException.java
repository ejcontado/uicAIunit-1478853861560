package com.nokia.ph.hack.stock.adapter;

public class AnalsysisException extends RuntimeException
{
    /**
     * 
     */
    private static final long serialVersionUID = 3901784843134928423L;

    public AnalsysisException()
    {
        super();
    }

    public AnalsysisException( String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace )
    {
        super( message, cause, enableSuppression, writableStackTrace );
    }

    public AnalsysisException( String message, Throwable cause )
    {
        super( message, cause );
    }

    public AnalsysisException( String message )
    {
        super( message );
    }

    public AnalsysisException( Throwable cause )
    {
        super( cause );
    }

}
