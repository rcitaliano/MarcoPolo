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
 * material.inc.php
 *
 * MarcoPolo game material description
 *
 * Here, you can describe the material of your game with PHP variables.
 *   
 * This file is loaded in your game logic class constructor, ie these variables
 * are available everywhere in your game logic code.
 *
 */


/*

Example:

$this->card_types = array(
    1 => array( "card_name" => ...,
                ...
              )
);

*/

$this->player_resources = array();
$this->player_contracts = array();
$this->resourceTypes = array(
	0 => array("name"=>"camels"),
	1 => array("name"=>"pepper"),
	2 => array("name"=>"silk"),
	3 => array("name"=>"gold"),
	4 => array("name"=>"coin"),
	5 => array("name"=>"point")
);
$this->startingContracts = array(
	0 => array("name"=>"0"),
	1 => array("name"=>"1"),
	2 => array("name"=>"2"),
	3 => array("name"=>"3"),
	4 => array("name"=>"4"),
	5 => array("name"=>"5"),
	6 => array("name"=>"6"),
	7 => array("name"=>"7"),
	8 => array("name"=>"8"),
	9 => array("name"=>"9"),
	10 => array("name"=>"10"),
	11 => array("name"=>"11"),
	12 => array("name"=>"12"),
	13 => array("name"=>"13"),
	14 => array("name"=>"14")
);
$this->contracts = array(
	0 => array("name"=>"0"),
	1 => array("name"=>"1"),
	2 => array("name"=>"2"),
	3 => array("name"=>"3"),
	4 => array("name"=>"4"),
	5 => array("name"=>"5"),
	6 => array("name"=>"6"),
	7 => array("name"=>"7"),
	8 => array("name"=>"8"),
	9 => array("name"=>"9"),
	10 => array("name"=>"10"),
	11 => array("name"=>"11"),
	12 => array("name"=>"12"),
	13 => array("name"=>"13"),
	14 => array("name"=>"14"),
	15 => array("name"=>"15"),
	16 => array("name"=>"16"),
	17 => array("name"=>"17"),
	18 => array("name"=>"18"),
	19 => array("name"=>"19"),
	20 => array("name"=>"20"),
	21 => array("name"=>"21"),
	22 => array("name"=>"22"),
	23 => array("name"=>"23"),
	24 => array("name"=>"24"),
	25 => array("name"=>"25"),
	26 => array("name"=>"26"),
	27 => array("name"=>"27"),
	28 => array("name"=>"28"),
	29 => array("name"=>"29"),
	30 => array("name"=>"30"),
	31 => array("name"=>"31"),
	32 => array("name"=>"32"),
	33 => array("name"=>"33"),
	34 => array("name"=>"34"),
	35 => array("name"=>"35"),
	36 => array("name"=>"36"),
	37 => array("name"=>"37"),
	38 => array("name"=>"38"),
	39 => array("name"=>"39"),
	40 => array("name"=>"40"),
	41 => array("name"=>"41"),
	42 => array("name"=>"42"),
	43 => array("name"=>"43"),
	44 => array("name"=>"44"),
	45 => array("name"=>"45"),
	46 => array("name"=>"46")
);
$this->characters = array(
	0 => array("name"=>"0"),
	1 => array("name"=>"1"),
	2 => array("name"=>"2"),
	3 => array("name"=>"3"),
	4 => array("name"=>"4"),
	5 => array("name"=>"5"),
	6 => array("name"=>"6"),
	7 => array("name"=>"7"),
	8 => array("name"=>"8"),
	9 => array("name"=>"9")
	);