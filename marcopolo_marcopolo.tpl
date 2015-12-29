{OVERALL_GAME_HEADER}

<!-- 
--------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- MarcoPolo implementation : © <Your name here> <Your email address here>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-------

    marcopolo_marcopolo.tpl
    
    This is the HTML template of your game.
    
    Everything you are writing in this file will be displayed in the HTML page of your game user interface,
    in the "main game zone" of the screen.
    
    You can use in this template:
    _ variables, with the format {MY_VARIABLE_ELEMENT}.
    _ HTML block, with the BEGIN/END format
    
    See your "view" PHP file to check how to set variables and control blocks
    
    Please REMOVE this comment before publishing your game on BGA
-->


<div>
<h1>GameBoard</h1>
	<div>
	<h2>Take 5 Gold</h2>
	</div>
	<div>
	<h2>Go to the bazaar</h2>
	</div>
	<div>
	<h2>seek the khan's favor</h2>
	</div>
	<div>
	<h2>take a contract</h2>
	</div>
	<div>
	<h2>travel</h2>
	</div>
	<div>
	<h2>city card</h2>
	</div>
</div>

<script type="text/javascript">

// Javascript HTML templates

/*
// Example:
var jstpl_some_game_item='<div class="my_game_item" id="my_game_item_${id}"></div>';

*/

var jstpl_player_board = '\<div class="cp_board">\
	<div id="character_p${id}" >character_p${id}</div>\
    <div id="trading_posts_p${id}" >trading_posts_p${id}</div>\
	<div id="dices_p${id}" >dices_p${id}</div>\
	<div id="active_contracts_p${id}" >active_contracts_p${id}</div>\
</div>';

var jstpl_player_board_resources =  '\<div id="resources_p${id}" >resources:\
									</div>';
var jstpl_player_board_resource =  '\<div id="resource_p${id}_r${resource_id}" >${resourceName}\
									</div>';									
</script>  

{OVERALL_GAME_FOOTER}
