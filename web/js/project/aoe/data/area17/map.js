var dataMap={"map": {
	  "id": "file",
	  "value": "File",
	  "cases": {
			"rows": 40,
		  	"cols": 50,
			"defaultCase": {"type": "aoe.model.map.PlainCase"},
			"mcase": [
			      {"type": "aoe.model.map.MountainCase", "x": 0, "y" : 0},
			      {"type": "aoe.model.map.RiverCase", "x": 1, "y" : 0, "shape": "LI", "x2": 1, "y2": "NR"},
			      {"type": "aoe.model.map.RiverCase", "x": 3, "y" : 0, "shape": "LI", "x2": 3, "y2": 7},
			      {"type": "aoe.model.map.RiverCase", "x": 4, "y" : 6, "shape": "LI", "x2": 4, "y2": "NR"},
			      {"type": "aoe.model.map.RiverCase", "x": 2, "y" : "NR", "shape": "LI", "x2": 2, "y2": 0},
			      {"type": "aoe.data.area17.ForetBoisManteaux", "x": 8, "y" : 6, "shape": "CI", "r": 2},
			      {"type": "aoe.data.area17.ForetBoisManteaux", "x": 10, "y" : 2, "shape": "CI", "r": 4},
				  {"type": "aoe.data.area17.ForetBoisManteaux", "x": 20, "y" : 2, "shape": "CI", "r": 6},
			      {"type": "aoe.model.map.MountainCase", "x": 12, "y" :11, "shape": "CI", "r": 4},
				  {"type": "aoe.model.map.MountainCase", "x": 25, "y" :11, "shape": "CI", "r": 3},
				  {"type": "aoe.model.map.MountainCase", "x": 30, "y" :11, "shape": "CI", "r": 3},
				  {"type": "aoe.model.map.MountainCase", "x": 33, "y" :5, "shape": "CI", "r": 3},
				  {"type": "aoe.model.map.MountainCase", "x": 42, "y" :12, "shape": "CI", "r": 20},
				  {"type": "aoe.model.map.RiverCase", "x": 5, "y" :20, "shape": "CI", "r": 4},
				  {"type": "aoe.model.map.RiverCase", "x": 10, "y" :20, "shape": "LI", "x2": 30, "y2": 20},
				  {"type": "aoe.model.map.RiverCase", "x": 8, "y" :22, "shape": "LI", "x2": "NC", "y2": 22},
				  {"type": "aoe.model.map.RiverCase", "x": 30, "y" :7, "shape": "CI", "r": 2},
				  {"type": "aoe.model.map.RiverCase", "x": 30, "y" : 10, "shape": "LI", "x2": 30, "y2": 19},
			      {"type": "aoe.model.map.PlainCase", "x": 2, "y" : 4},
				  {"type": "aoe.model.map.PlainCase", "x": 49, "y" : 17, "shape": "CI", "r": 4}
			]
		  },
	  "objects": {	  
		  	"mobject": [
	   		  {"type": "aoe.model.equipment.Bow", "x": 5, "y" : 2},
			  {"type": "aoe.model.equipment.MagicCarpet", "x": 10, "y" : 5}
		    ]
		  },
	  "pnjs": {	  
		  	"pnj": [
			  {"type": "VO", "x": 0, "y" : 0},
	   		  {"type": "BE", "x": 5, "y" : 2}
		    ]
		  },
	  "player": {"x": 4, "y":5}
	 
	}};