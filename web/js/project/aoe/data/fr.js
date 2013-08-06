﻿JClass.import('aoe.util.Dice');

var dataLang={
	BtnWLab:"W",
	BtnWInfo:"Ouest",
	EQP_STATUS_BROKEN:"Inutilisable",
	EQP_QA_WORTH:"Médiocre",
	EQP_QA_V_BAD:"Très mauvaise",
	EQP_QA_BAD:"Mauvaise",
	EQP_QA_NORMAL:"Normale",
	EQP_QA_GOOD:"Bonne",
	EQP_QA_V_GOOD:"Très bonne",
	EQP_QA_BEST:"Meilleure",
	EqSwordShort:"SW",
	EqSwordLabel:"Epée courte",
	EqSwordDesc:"l'épée courte est une arme relativement puissante et maniable. Elle vous permet d'attaquer vos adversaires au contact",
	EqSwordLog:"félicitation vous avez trouvé une épée courte! vous pouvez maintenant attaquez vos ennemis au contact",
	EqDaggerShort:"DG",
	EqDaggerLabel:"Dague",
	EqDaggerDesc:"la dague est une arme à double tranchant efficace sur les coups d'estoc",
	EqDaggerLog:"félicitation vous avez trouvé une dague! vous pouvez maintenant attaquez vos ennemis au contact",
	EqBowShort:"BW",
	EqBowLabel:"Arc Court",
	EqBowDesc:"l'arc permet d'attaquer à long portée",
	EqBowLog:"félicitation vous avez trouvé un arc! vous pouvez maintenant attaquez vos ennemis à distance",
	EqClawLabel:"Griffe",
	EqClawDesc:"la griffe est une arme de corps à corps",
	EqClawLog:"félicitation vous avez trouvé une griffe! vous pouvez maintenant attaquez vos ennemis au crops à corps",
    SkRunningLabel:"Course",
	SkRunningDesc:"La course est une compétence de base que chaque individu possède. Différentes actions peuvent être liées a cette compétence: fuire un combat, pourchasser un individu ou un animal, parcourir de longue distance...",
	SkRunningLog: {},
    SkConcentrateLabel:"Se concentrer",
	SkConcentrateDesc:"La concentration vous permet d'effectuer des actions plus précisemment et augmente vos chances de réussir les actions suivantes",
	SkConcentrateLog: {},
    SkArcheryLabel:"Tir à l'arc",
	SkArcheryDesc:"L'utilisation d'un arc demande beaucoup de concentration et de mentale",
	SkArcheryLog: {},
	SkFencingLabel:"Escrime",
	SkFencingDesc:"L'escrime est l'art d'utiliser trois types de lame : l'épée, le sabre et le fleuret",
	SkFencingLog: {},
	SkWrestlingLabel:"Bagarre/Lutte",
	SkWrestlingDesc:"La lutte consiste à utiliser des parties de son corps comme arme d'attaque",
	SkWrestlingLog: {},
    ActRunAwayLabel:"Fuire",
    ActRunAwayDesc:"La fuite est parfois la meilleure solution pour garder la tête sur les épaules.",
    ActRunAwayLog: {
    				execute: "%s tente de s'enfuir",
    				qa_perfect:"Coup magistral! Devant votre agilité et votre endurance, votre adversaire n'a pas vu la racine qui dépassait du sol et tombe lourdement par terre",
    				qa_v_good: "Réussite parfaite! a rapide coup d'oeil dérrière vous indique que votre adversaire a depuis longtemps abandonné la partie et peine a retrouver son souffle",
	                qa_good: "Réussite! Votre adversaire n'est plus qu'un mauvais souvenir",
	                qa_no_qa: "Votre adversaire vous manque de peu, la prochaine fois ça ne sera peut-être pas le cas!",
	                qa_bad: "Echec partiel! Malgrés un bon tempo votre adversaire vous rattrappe",
	                qa_v_bad: "Echec complet! hors d'haleine, vous avez du mal a récupérer votre souffle",
	                qa_worth: "Catastrophe! votre pied trébuche sur une pierre et vous tord la cheville."
	                },
    ActGetOutLabel:"Se dégager",
    ActGetOutDesc:"Le dégagement permet de repouser un adversaire ou un objet situé au corps à corps.",
    ActGetOutLog: {
    				execute: "%s se dégage",
    				qa_perfect:"Coup magistral! dégagement",
    				qa_v_good: "Réussite parfaite! dégagement",
	                qa_good: "Réussite! dégagement",
	                qa_no_qa: "dégagement",
	                qa_bad: "Echec partiel! dégagement",
	                qa_v_bad: "Echec complet! dégagement",
	                qa_worth: "Catastrophe! dégagement."
	                },
    ActCatchLabel:"Attrapper",
    ActCatchDesc:"Attrapper permet de rentrer en contact avec un objet ou un être vivant au corps à corps.",
    ActCatchLog: {
    				execute: "%s attrappe",
    				qa_perfect:"Coup magistral! attrappe",
    				qa_v_good: "Réussite parfaite! attrappe",
	                qa_good: "Réussite! attrappe",
	                qa_no_qa: "attrappe",
	                qa_bad: "Echec partiel! attrappe",
	                qa_v_bad: "Echec complet! attrappe",
	                qa_worth: "Catastrophe! attrappe."
	                },
    ActMoveForwardLabel:"Avançer",
    ActMoveForwardDesc:"Se rapprocher de son adversaire permet d'utiliser des actions de contact.",
    ActMoveForwardLog: {
    				execute: "%s se rapproche",
    				qa_perfect:"Coup magistral! se rapprocher",
    				qa_v_good: "Réussite parfaite! se rapprocher",
	                qa_good: "Réussite! se rapprocher",
	                qa_no_qa: "se rapprocher",
	                qa_bad: "Echec partiel! se rapprocher",
	                qa_v_bad: "Echec complet! se rapprocher",
	                qa_worth: "Catastrophe! un obstacle empêche %s d'avancer correctement."
	                },
	ActTargetLabel: "Viser",
	ActTargetDesc: "Viser permet d'augmenter les chances d'atteindre une cible à distance.",
	ActTargetLog: {
					execute: "%s vise",
					qa_perfect:"Coup magistral! la concentration est parfaite, le bonus augmente de 30",
					qa_v_good: "Réussite parfaite! la concentration est parfaite, le bonus augmente de 20",
	                qa_good: "Réussite!  la concentration est parfaite, le bonus augmente de 15",
	                qa_no_qa: "la concentration est parfaite, le bonus augmente de 10",
	                qa_bad: "Echec partiel! viser",
	                qa_v_bad: "Echec complet! viser",
	                qa_worth: "Catastrophe! une mouche tourne sans cesse autour de vous et vous déconcentre tellement que vous perdez le prochain tour."
	                },
    ActShotArrowLabel:"Tirer une flèche",
    ActShotArrowDesc:"Attaquer votre ennemi à distance grâce aux flèches. Arme puissante pouvant tuer un adversaire d'un seul coup",
    ActShotArrowLog: {
    				execute: "%s décoche une flèche avec son arc",
    				qa_perfect:"Coup magistral! La flèche transperce %s de part en part",
    				qa_v_good: "Réussite parfaite! la flèche atteint un point sensible de %s",
	                qa_good: "Réussite! La flèche atteint son but et s'enfonce douloureusement dans l'abdomende %s",
	                qa_no_qa: "La flèche effleure %s, juste une égratignure rien de plus",
	                qa_bad: "Echec partiel! la flèche passe à quelques centimètres de %s sans l'atteindre",
	                qa_v_bad: "Echec complet! la flèche vrille et part se briser contre le sol",
	                qa_worth: "Catastrophe! La corde de votre arc lâche et la flèche se retrouve dans votre pied."
	                },
    ActHitWithEdgeLabel:"Porter un coup de taille",
    ActHitWithEdgeDesc:"Un coup de taille s'effectue avec une arme tranchante, type une épée ou toute arme ayant une lame tranchante",
    ActHitWithEdgeLog: {
    				execute: "%s porte un coup de taille",
    				qa_perfect:"Coup magistral! le coup coupe littérallement la main de %s",
    				qa_v_good: "Réussite parfaite! le coup tranche la cuisse de %s jusqu'au rebord de la lame",
	                qa_good: "Réussite! le coup incise les côtes de %s",
	                qa_no_qa: "le coup incise %s, rien de plus qu'une petite coupure",
	                qa_bad: "Echec partiel! le coup passe au raz de %s",
	                qa_v_bad: "Echec complet! la lame heurte un arbre.",
	                qa_worth: "Catastrophe! Le pommeau de l'arme se dévisse et %s se luxe l'épaule"
	                },
    ActHitWithTipLabel:"Porter un coup d'estoc",
    ActHitWithTipDesc:"Un coup d'estoc s'effectue avec une arme pointue, type une épée ou toute arme ayant une lame pointue",
    ActHitWithTipLog: {
    				execute: "%s porte un coup d'estoc",
    				qa_perfect:"Coup magistral! le coup transperse littérallement la main de %s",
    				qa_v_good: "Réussite parfaite! le coup s'enfonce dans la cuisse de %s jusqu'au rebord de la lame",
	                qa_good: "Réussite! le coup perfore les côtes de %s",
	                qa_no_qa: "le coup plonge dans %s, rien de plus qu'une petite perforation",
	                qa_bad: "Echec partiel! le coup passe au raz de %s",
	                qa_v_bad: "Echec complet! la lame heurte un arbre.",
	                qa_worth: "Catastrophe! Le pommeau de l'arme se dévisse et %s se luxe l'épaule"
	                },
    ActSwitchEquipmentLabel:"Changer d'équipement",
    ActSwitchEquipmentDesc:"Placer un objet dans sa main",
    ActSwitchEquipmentLog: {
    				execute: "%s change d'équipement",
    				qa_perfect:"Coup magistral! le changement est tellement rapide que vous pouvez executer une autre action",
    				qa_v_good: "",
	                qa_good: "",
	                qa_no_qa: "",
	                qa_bad: "",
	                qa_v_bad: "",
	                qa_worth: "Catastrophe! la boucle de votre sac à dos se coince et endommage votre arme."
	                },
    ActDoNothingLabel:"Passer son tour",
    ActDoNothingDesc:"Ne rien faire est parfois une bonne solution pour temporiser et laisser votre interaction agir",
    ActDoNothingLog: {
    				execute: "%s reste passif",
    				qa_perfect:"Coup magistral! ne rien faire",
    				qa_v_good: "Réussite parfaite! ne rien faire",
	                qa_good: "Réussite! ne rien faire",
	                qa_no_qa: "ne rien faire",
	                qa_bad: "Echec partiel! ne rien faire",
	                qa_v_bad: "Echec complet! ne rien faire",
	                qa_worth: "Catastrophe! ne rien faire"
	                },
    ActScratchByClawLabel:"Griffer",
    ActScratchByClawDesc:"Les coups de griffe peuvent lacérer un adversaire et lui faire perdre beaucoup de sang",
    ActScratchByClawLog: {
    				execute: "%s attaque avec ses griffes",
    				qa_perfect:"Coup magistral! la griffe touche un organe vitale",
    				qa_v_good: "Réussite parfaite! la griffe s'enfonce profondément dans le bras",
	                qa_good: "Réussite! la griffe s'enfonce profondément dans le bras",
	                qa_no_qa: "la griffe effleure votre épaule",
	                qa_bad: "Echec partiel! la griffe fouette l'air et brasse du vent",
	                qa_v_bad: "Echec complet! la griffe heurte un rocher au moment d'armer la frappe",
	                qa_worth: "Catastrophe! la griffe se plante l'arbre et s'arrache de la patte"
	                },
	CaseRivLogErr:"vous ne pouvez pas traverser les rivières. vous avez besoin d'un tapis magique",
	CaseMtnLogErr:"vous ne pouvez pas traverser les montagnes. vous avez besoin d'un équipement d'alpiniste"
}