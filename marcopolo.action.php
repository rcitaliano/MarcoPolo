<?php
/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * MarcoPolo implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 * 
 * marcopolo.action.php
 *
 * MarcoPolo main action entry point
 *
 *
 * In this file, you are describing all the methods that can be called from your
 * user interface logic (javascript).
 *       
 * If you define a method "myAction" here, then you can call it from your javascript code with:
 * this.ajaxcall( "/marcopolo/marcopolo/myAction.html", ...)
 *
 */
  
  
  class action_marcopolo extends APP_GameAction
  { 
    // Constructor: please do not modify
   	public function __default()
  	{
  	    if( self::isArg( 'notifwindow') )
  	    {
            $this->view = "common_notifwindow";
  	        $this->viewArgs['table'] = self::getArg( "table", AT_posint, true );
  	    }
  	    else
  	    {
            $this->view = "marcopolo_marcopolo";
            self::trace( "Complete reinitialization of board game" );
      }
  	} 
  	
  	// TODO: defines your action entry points there
	
	function chooseCharacterAndDestinations()
	{
        self::setAjaxMode();     
		$this->game->chooseCharacterAndDestinations();
        self::ajaxResponse( );
	}
	function mandatory()
	{
        self::setAjaxMode();     
		$this->game->mandatory();
        self::ajaxResponse( );
	}
	function take5Gold()
	{
        self::setAjaxMode();     
		$this->game->take5Gold();
        self::ajaxResponse( );
	}
	function goToTheBazaar()
	{
        self::setAjaxMode();    
		$this->game->goToTheBazaar(); 
        self::ajaxResponse( );
	}
	function seekTheKhansFavor()
	{
        self::setAjaxMode();     
		$this->game->seekTheKhansFavor();
        self::ajaxResponse( );
	}
	function TakeAContract()
	{
        self::setAjaxMode();     
		$this->game->TakeAContract();
        self::ajaxResponse( );
	}
	function Travel()
	{
        self::setAjaxMode();    
		$this->game->Travel(); 
        self::ajaxResponse( );
	}
	function cityCard()
	{
        self::setAjaxMode();     
		$this->game->cityCard();
        self::ajaxResponse( );
	}
	function bonus()
	{
        self::setAjaxMode();     
		$this->game->bonus();
        self::ajaxResponse( );
	}
	function pass()
	{
        self::setAjaxMode();     
		$this->game->pass();
        self::ajaxResponse( );
	}
	function completeContract()
	{
        self::setAjaxMode();     
		$this->game->completeContract();
        self::ajaxResponse( );
	}
	function take3Coins()
	{
        self::setAjaxMode();     
		$this->game->take3Coins();
        self::ajaxResponse( );
	}
	function rerollDie()
	{
        self::setAjaxMode();     
		$this->game->rerollDie();
        self::ajaxResponse( );
	}
	function adjustDieResultByOne()
	{
        self::setAjaxMode();     
		$this->game->adjustDieResultByOne();
        self::ajaxResponse( );
	}
	function take1BlackDie()
	{
        self::setAjaxMode();    
		$this->game->take1BlackDie(); 
        self::ajaxResponse( );
	}

    /*
    
    Example:
  	
    public function myAction()
    {
        self::setAjaxMode();     

        // Retrieve arguments
        // Note: these arguments correspond to what has been sent through the javascript "ajaxcall" method
        $arg1 = self::getArg( "myArgument1", AT_posint, true );
        $arg2 = self::getArg( "myArgument2", AT_posint, true );

        // Then, call the appropriate method in your game logic, like "playCard" or "myAction"
        $this->game->myAction( $arg1, $arg2 );

        self::ajaxResponse( );
    }
    
    */

  }
  

