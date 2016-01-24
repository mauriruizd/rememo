var remedios;

var page = tabris.create("Page", {
	title : "Registro",
	topLevel : true
})
.on("appear", function(){
	remedios = JSON.parse(localStorage.getItem("remedios")) || [];
	collectionView.set("items", remedios);
});

var addRemedioText = tabris.create("TextInput", {
	layoutData : {
		top : 10,
		left : 30,
		right : 30
	},
	message : "Nombre del remedio"
})
.appendTo(page);

var addRemedioBtn = tabris.create("Button", {
	layoutData : {
		top : "prev() 10",
		width : 200,
		centerX : 0
	},
	text : "Agregar remedio"
})
.on("select", function(){
	remedios.push({
		"nombre" : addRemedioText.get("text"),
		"horarios" : []
	});
	addRemedioText.set("text", "");
	updateCollectionView();
})
.appendTo(page);

var collectionView = tabris.create("CollectionView", {
	layoutData : {
		top : "prev() 20",
		left : 5,
		right : 5,
		bottom : 0
	},
	itemHeight : 50,
	initializeCell : function(cell) {
		var text = tabris.create("TextView", {
			layoutData : {
				centerX : 0,
				centerY : 0
			}
		})
		.appendTo(cell);
		cell
		.on("change:item", function(widget, item) {
			text.set("text", item.nombre);
		});
	}
})
.on("select", function(widget,item, options) {
	createHorariosPage(options.index);
})
.appendTo(page);

function updateCollectionView(){
	collectionView.set("items", remedios);
	saveRemedios();
}

function saveRemedios(){
	localStorage.setItem("remedios", JSON.stringify(remedios));
}

function createHorariosPage(index) {
	var page = tabris.create("Page", {
		title : remedios[index].nombre,
		topLevel : false
	});
	var addHorarioText = tabris.create("TextInput", {
		layoutData : {
			top : 10,
			left : 30,
			right : 30
		},
		message : "Ingresar horario"
	})
	.appendTo(page);

	var addHorarioBtn = tabris.create("Button", {
		layoutData : {
			top : "prev() 10",
			width : 200,
			centerX : 0
		},
		text : "Agregar horario"
	})
	.on("select", function(){
		remedios[index].horarios.push({
			"text" : addHorarioText.get("text"),
			"selection" : false
		});
		addHorarioText.set("text", "");
		updateCollectionView();
	})
	.appendTo(page);

	var collectionView = tabris.create("CollectionView", {
		layoutData : {
			top : "prev() 20",
			left : 5,
			right : 5,
			bottom : 0
		},
		items : remedios[index].horarios,
		itemHeight : 50,
		initializeCell : function(cell) {
			var text = tabris.create("TextView", {
				layoutData : {
					centerX : 0,
					centerY : 0
				}
			})
			.appendTo(cell);
			cell.on("change:item", function(widget, item) {
				text.set("text", item.text);
			});
		}
	})
	.appendTo(page);

	page.open();

	function updateCollectionView(){
		collectionView.set("items", remedios[index].horarios);
		saveRemedios();
	}
}

exports = page;