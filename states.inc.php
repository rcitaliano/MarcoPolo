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
 * states.inc.php
 *
 * MarcoPolo game states description
 *
 */

/*
   Game state machine is a tool used to facilitate game developpement by doing common stuff that can be set up
   in a very easy way from this configuration file.

   Please check the BGA Studio presentation about game state to understand this, and associated documentation.

   Summary:

   States types:
   _ activeplayer: in this type of state, we expect some action from the active player.
   _ multipleactiveplayer: in this type of state, we expect some action from multiple players (the active players)
   _ game: this is an intermediary state where we don't expect any actions from players. Your game logic must decide what is the next game state.
   _ manager: special type for initial and final state

   Arguments of game states:
   _ name: the name of the GameState, in order you can recognize it on your own code.
   _ description: the description of the current game state is always displayed in the action status bar on
                  the top of the game. Most of the time this is useless for game state with "game" type.
   _ descriptionmyturn: the description of the current game state when it's your turn.
   _ type: defines the type of game states (activeplayer / multipleactiveplayer / game / manager)
   _ action: name of the method to call when this game state become the current game state. Usually, the
             action method is prefixed by "st" (ex: "stMyGameStateName").
   _ possibleactions: array that specify possible player actions on this step. It allows you to use "checkAction"
                      method on both client side (Javacript: this.checkAction) and server side (PHP: self::checkAction).
   _ transitions: the transitions are the possible paths to go from a game state to another. You must name
                  transitions in order to use transition names in "nextState" PHP method, and use IDs to
                  specify the next game state for each transition.
   _ args: name of the method to call to retrieve arguments for this gamestate. Arguments are sent to the
           client side to be used on "onEnteringState" or to set arguments in the gamestate description.
   _ updateGameProgression: when specified, the game progression is updated (=> call to your getGameProgression
                            method).
*/

//    !! It is not a good idea to modify this file when a game is running !!
class StateEnumerator
{
	const gameSetup = 1;
    const firstRoundBegin = 2;
    const roundBegin = 3;
	const roundEnd = 4;
	const playerTurn = 5;
	const mandatoryState = 6;
	const bonusState = 7;
	const nextPlayer = 8;
	const gameEnd = 99;
};
$machinestates = array(

    // The initial state. Please do not modify.
    1 => array(
        "name" => "gameSetup",
        "description" => "",
        "type" => "manager",
        "action" => "stGameSetup",
        "transitions" => array( "" => 2 )
    ),
    
    // Note: ID=2 => your first state
	
    StateEnumerator::firstRoundBegin => array(
    		"name" => "firstRoundBegin",
    		"description" => clienttranslate('This is the first Round, every player must choose a Character and Destination Cards'),
    		"descriptionmyturn" => clienttranslate('This is the first Round, ${you} must choose your Character and your Destination Cards'),
    		"type" => "multipleactiveplayer",
    		"possibleactions" => array( "chooseCharacterAndDestinations"),
    		"transitions" => array( "playerTurn" => StateEnumerator::playerTurn)
    ),
    StateEnumerator::roundBegin => array(
    		"name" => "roundBegin",
    		"description" => clienttranslate('${actplayer} must make a mandatory action or bonus action'),
    		"descriptionmyturn" => clienttranslate('${you} must make a mandatory action or bonus action'),
    		"type" => "multipleactiveplayer",
			"action" => "stRoundBegin",
    		"possibleactions" => array( "mandatory", "bonus", "pass" ),
    		"transitions" => array( "playerTurn" => StateEnumerator::playerTurn)
    ),
    StateEnumerator::playerTurn => array(
    		"name" => "playerTurn",
    		"description" => clienttranslate('${actplayer} must make a mandatory action or bonus action'),
    		"descriptionmyturn" => clienttranslate('${you} must make a mandatory action or bonus action'),
    		"type" => "activeplayer",
    		"possibleactions" => array( "mandatory", "bonus", "pass" ),
    		"transitions" => array( "mandatoryState" => StateEnumerator::mandatoryState, 
									"bonusState" => StateEnumerator::bonusState, 
									"nextPlayer" => StateEnumerator::nextPlayer)
    ),
    StateEnumerator::mandatoryState => array(
    		"name" => "mandatoryState",
    		"description" => clienttranslate('${actplayer} must make a mandatory action'),
    		"descriptionmyturn" => clienttranslate('${you} must make a mandatory action'),
    		"type" => "activeplayer",
    		"possibleactions" => array( "take5Gold", "goToTheBazaar", "seekTheKhansFavor", "TakeAContract", "Travel", "cityCard" ),
    		"transitions" => array( "playerTurn" => StateEnumerator::playerTurn)
    ),
    StateEnumerator::bonusState => array(
    		"name" => "bonusState",
    		"description" => clienttranslate('${actplayer} must make a bonus action'),
    		"descriptionmyturn" => clienttranslate('${you} must make a bonus action'),
    		"type" => "activeplayer",
    		"possibleactions" => array( "pass", "completeContract", "take3Coins", "rerollDie", "adjustDieResultByOne", "take1BlackDie" ),
    		"transitions" => array( "playerTurn" => StateEnumerator::playerTurn,
									"nextPlayer" => StateEnumerator::nextPlayer)
    ),
	StateEnumerator::nextPlayer => array (
    		"name" => "nextPlayer",
    		"description" => clienttranslate('${actplayer} ended his/her turn'),
    		"descriptionmyturn" => clienttranslate('${you} ended your turn'),
    		"type" => "game",
    		"action" => "stNextPlayer",
			"updateGameProgression" => true,   
    		"transitions" => array( "playerTurn" => StateEnumerator::playerTurn,
									"nextPlayer" => StateEnumerator::nextPlayer, 
									"roundBegin" => StateEnumerator::roundEnd)
	),
	StateEnumerator::roundEnd => array (
    		"name" => "nextPlayer",
    		"description" => clienttranslate('Round Ended'),
    		"descriptionmyturn" => clienttranslate('Round Ended'),
    		"type" => "game",
    		"action" => "stRoundEnd",
			"updateGameProgression" => true,   
    		"transitions" => array( "roundBegin" => StateEnumerator::roundBegin, "gameEnd" => StateEnumerator::gameEnd)
	),
	
    
/*
    Examples:
    
    2 => array(
        "name" => "nextPlayer",
        "description" => '',
        "type" => "game",
        "action" => "stNextPlayer",
        "updateGameProgression" => true,   
        "transitions" => array( "endGame" => 99, "nextPlayer" => 10 )
    ),
    
    10 => array(
        "name" => "playerTurn",
        "description" => clienttranslate('${actplayer} must play a card or pass'),
        "descriptionmyturn" => clienttranslate('${you} must play a card or pass'),
        "type" => "activeplayer",
        "possibleactions" => array( "playCard", "pass" ),
        "transitions" => array( "playCard" => 2, "pass" => 2 )
    ), 

*/    
   
    // Final state.
    // Please do not modify.
    99 => array(
        "name" => "gameEnd",
        "description" => clienttranslate("End of game"),
        "type" => "manager",
        "action" => "stGameEnd",
        "args" => "argGameEnd"
    )

);


