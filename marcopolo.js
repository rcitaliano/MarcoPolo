/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * MarcoPolo implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * marcopolo.js
 *
 * MarcoPolo user interface script
 * 
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

define([
    "dojo","dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter"
],
function (dojo, declare) {
    return declare("bgagame.marcopolo", ebg.core.gamegui, {
        constructor: function(){
            console.log('marcopolo constructor');
              
            // Here, you can init the global variables of your user interface
            // Example:
            // this.myGlobalValue = 0;

        },
        
        /*
            setup:
            
            This method must set up the game user interface according to current game situation specified
            in parameters.
            
            The method is called each time the game interface is displayed to a player, ie:
            _ when the game starts
            _ when a player refreshes the game page (F5)
            
            "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
        */
        
        setup: function( gamedatas )
        {
            console.log( "Starting game setup" );
            
            // Setting up player boards
            for( var player_id in gamedatas.players )
            {
                var player = gamedatas.players[player_id];
                         
                // TODO: Setting up players boards if needed
                var player_board_div = $('player_board_'+player_id);
                dojo.place( this.format_block('jstpl_player_board', player ), player_board_div );
				dojo.place( this.format_block('jstpl_player_board_resources', {id:player_id} ), player_board_div );
				
				var player_resources_div = $('resources_p'+player_id);
				var player_resources = gamedatas.player_resources[player_id];
				for(var resource_id in gamedatas.resource_types)
				{
					var resource = gamedatas.resource_types[resource_id];
					dojo.place( this.format_block('jstpl_player_board_resource', 
													{
														id:player_id,
														resource_id:resource_id,
														resourceName:resource['name'],
														resourceAmount:player_resources[resource_id]
													} 
													), 
													player_resources_div );
				}
            }
            
            // TODO: Set up your game interface here, according to "gamedatas"
            
 
            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            console.log( "Ending game setup" );
        },
       

        ///////////////////////////////////////////////////
        //// Game & client states
        
        // onEnteringState: this method is called each time we are entering into a new game state.
        //                  You can use this method to perform some user interface changes at this moment.
        //
        onEnteringState: function( stateName, args )
        {
            console.log( 'Entering state: '+stateName );
            
            switch( stateName )
            {
            
            /* Example:
            
            case 'myGameState':
            
                // Show some HTML block at this game state
                dojo.style( 'my_html_block_id', 'display', 'block' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }
        },

        // onLeavingState: this method is called each time we are leaving a game state.
        //                 You can use this method to perform some user interface changes at this moment.
        //
        onLeavingState: function( stateName )
        {
            console.log( 'Leaving state: '+stateName );
            
            switch( stateName )
            {
            
            /* Example:
            
            case 'myGameState':
            
                // Hide the HTML block we are displaying only during this game state
                dojo.style( 'my_html_block_id', 'display', 'none' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }               
        }, 

        // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
        //                        action status bar (ie: the HTML links in the status bar).
        //        
        onUpdateActionButtons: function( stateName, args )
        {
            console.log( 'onUpdateActionButtons: '+stateName );
                      
            if( this.isCurrentPlayerActive() )
            {            
                switch( stateName )
                {
/*               
                 Example:
 
                 case 'myGameState':
                    
                    // Add 3 action buttons in the action status bar:
                    
                    this.addActionButton( 'button_1_id', _('Button 1 label'), 'onMyMethodToCall1' ); 
                    this.addActionButton( 'button_2_id', _('Button 2 label'), 'onMyMethodToCall2' ); 
                    this.addActionButton( 'button_3_id', _('Button 3 label'), 'onMyMethodToCall3' ); 
                    break;
*/
				case 'firstRoundBegin':
					this.addActionButton( 'chooseCharacterAndDestinations', _('chooseCharacterAndDestinations'), 'onchooseCharacterAndDestinations' ); 
				break;
				case 'playerTurn':
					this.addActionButton( 'mandatory', _('mandatory'), 'onmandatory' ); 
					this.addActionButton( 'bonus', _('bonus'), 'onbonus' ); 
					this.addActionButton( 'pass', _('pass'), 'onpass' );
				break;
				case 'mandatoryState':
					this.addActionButton( 'take5Gold', _('take5Gold'), 'ontake5Gold' ); 
					this.addActionButton( 'goToTheBazaar', _('goToTheBazaar'), 'ongoToTheBazaar' ); 
					this.addActionButton( 'seekTheKhansFavor', _('seekTheKhansFavor'), 'onseekTheKhansFavor' ); 
					this.addActionButton( 'TakeAContract', _('TakeAContract'), 'onTakeAContract' ); 
					this.addActionButton( 'Travel', _('Travel'), 'onTravel' ); 
					this.addActionButton( 'cityCard', _('cityCard'), 'oncityCard' ); 
				break;
				case 'bonusState':
					this.addActionButton( 'completeContract', _('completeContract'), 'oncompleteContract' ); 
					this.addActionButton( 'take3Coins', _('take3Coins'), 'ontake3Coins' ); 
					this.addActionButton( 'rerollDie', _('rerollDie'), 'onrerollDie' ); 
					this.addActionButton( 'adjustDieResultByOne', _('adjustDieResultByOne'), 'onadjustDieResultByOne' ); 
					this.addActionButton( 'take1BlackDie', _('take1BlackDie'), 'ontake1BlackDie' ); 
					this.addActionButton( 'pass', _('pass'), 'onpass' );
				break;
                }
            }
        },        

        ///////////////////////////////////////////////////
        //// Utility methods
        
        /*
        
            Here, you can defines some utility methods that you can use everywhere in your javascript
            script.
        
        */


        ///////////////////////////////////////////////////
        //// Player's action
        
        /*
        
            Here, you are defining methods to handle player's action (ex: results of mouse click on 
            game objects).
            
            Most of the time, these methods:
            _ check the action is possible at this game state.
            _ make a call to the game server
        
        */
        ///////////////////////////////////////////////////
        //// firstRoundBegin actions        
        onchooseCharacterAndDestinations: function( evt )
        {
            console.log( 'onchooseCharacterAndDestinations' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'chooseCharacterAndDestinations' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/chooseCharacterAndDestinations.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },      
        ///////////////////////////////////////////////////
        //// Mandatory Actions  
        onmandatory: function( evt )
        {
            console.log( 'onmandatory' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'mandatory' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/mandatory.html", { 
                                                                    lock: true
                                                                 }, 
                         this, function( result ) {
                            
                            // What to do after the server call if it succeeded
                            // (most of the time: nothing)
                            
                         }, function( is_error) {

                            // What to do after the server call in anyway (success or failure)
                            // (most of the time: nothing)

                         } );    

        }, 		
        ontake5Gold: function( evt )
        {
            console.log( 'ontake5Gold' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'take5Gold' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/take5Gold.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },      
        ongoToTheBazaar: function( evt )
        {
            console.log( 'ongoToTheBazaar' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'goToTheBazaar' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/goToTheBazaar.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },       
        onseekTheKhansFavor: function( evt )
        {
            console.log( 'onseekTheKhansFavor' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'seekTheKhansFavor' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/seekTheKhansFavor.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },
        onTakeAContract: function( evt )
        {
            console.log( 'onTakeAContract' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'TakeAContract' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/TakeAContract.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },
        onTravel: function( evt )
        {
            console.log( 'onTravel' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'Travel' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/Travel.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },
        oncityCard: function( evt )
        {
            console.log( 'oncityCard' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'cityCard' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/cityCard.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },
		// Bonus Actions
        onbonus: function( evt )
        {
            console.log( 'onbonus' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'bonus' ) )
            {   return; }
            this.ajaxcall( "/marcopolo/marcopolo/bonus.html", { 
                                                                    lock: true
                                                                 }, 
                         this, function( result ) {
                            
                            // What to do after the server call if it succeeded
                            // (most of the time: nothing)
                            
                         }, function( is_error) {

                            // What to do after the server call in anyway (success or failure)
                            // (most of the time: nothing)

                         } );    


        },      
        onpass: function( evt )
        {
            console.log( 'onpass' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'pass' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/pass.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },  
        oncompleteContract: function( evt )
        {
            console.log( 'oncompleteContract' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'completeContract' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/completeContract.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },  
        ontake3Coins: function( evt )
        {
            console.log( 'ontake3Coins' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'take3Coins' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/take3Coins.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },  
        onrerollDie: function( evt )
        {
            console.log( 'onrerollDie' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'rerollDie' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/rerollDie.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },  
        onadjustDieResultByOne: function( evt )
        {
            console.log( 'onadjustDieResultByOne' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'adjustDieResultByOne' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/adjustDieResultByOne.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },  
        ontake1BlackDie: function( evt )
        {
            console.log( 'ontake1BlackDie' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'take1BlackDie' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/take1BlackDie.html", { lock: true}, this, function( result ) {}, function( is_error) {} );    

        },  
        /* Example:
        
        onMyMethodToCall1: function( evt )
        {
            console.log( 'onMyMethodToCall1' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'myAction' ) )
            {   return; }

            this.ajaxcall( "/marcopolo/marcopolo/myAction.html", { 
                                                                    lock: true, 
                                                                    myArgument1: arg1, 
                                                                    myArgument2: arg2,
                                                                    ...
                                                                 }, 
                         this, function( result ) {
                            
                            // What to do after the server call if it succeeded
                            // (most of the time: nothing)
                            
                         }, function( is_error) {

                            // What to do after the server call in anyway (success or failure)
                            // (most of the time: nothing)

                         } );        
        },        
        
        */

        
        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        /*
            setupNotifications:
            
            In this method, you associate each of your game notifications with your local method to handle it.
            
            Note: game notification names correspond to "notifyAllPlayers" and "notifyPlayer" calls in
                  your marcopolo.game.php file.
        
        */
        setupNotifications: function()
        {
            console.log( 'notifications subscriptions setup' );
            
            // TODO: here, associate your game notifications with local methods
            
            // Example 1: standard notification handling
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            
            // Example 2: standard notification handling + tell the user interface to wait
            //            during 3 seconds after calling the method in order to let the players
            //            see what is happening in the game.
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            // this.notifqueue.setSynchronous( 'cardPlayed', 3000 );
            // 
        },  
        
        // TODO: from this point and below, you can write your game notifications handling methods
        
        /*
        Example:
        
        notif_cardPlayed: function( notif )
        {
            console.log( 'notif_cardPlayed' );
            console.log( notif );
            
            // Note: notif.args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call
            
            // TODO: play the card in the user interface.
        },    
        
        */
   });             
});
