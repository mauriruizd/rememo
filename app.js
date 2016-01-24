tabris.ui.set({
	"background" :  "#5882FA",
	"textColor" : "#FFF"
});

var remedios;

var page = tabris.create("Page", {
	title : "Rememo",
	topLevel : true
})
.on("appear", function(widget){
	clearScrollView();
	remedios = JSON.parse(localStorage.getItem("remedios")) || [];
	remedios.forEach(function(remedio) {
		createRemedio(remedio.nombre, remedio.horarios)
		.appendTo(scroll);
	});
});
var registerPage = require("./register");

var drawer = tabris.create("Drawer");

tabris.create("PageSelector", {
	top : 20,
	left : 15,
	right : 15,
	bottom : 5
}).appendTo(drawer);

var scroll = tabris.create("ScrollView", {
	layoutData : {
		top : 0,
		left : 0,
		bottom : 0,
		right  : 0
	}
}).appendTo(page);

page.open();

function createHorario(text, selection) {
	return {"text" : text, "selection" : selection};
}

function saveRemedios(){
	localStorage.setItem("remedios", JSON.stringify(remedios));
}

function clearScrollView(){
	scroll.children().forEach(function(composite) {
		composite.dispose();
	});
}

function getRemedioIndex(remedio) {
	var index = -1;

	for(var i = 0; i < remedios.length; i++) {
		if (remedio === remedios[i].nombre) {
			index = i;
		}
	}
	return index;
}

function getHorarioIndex(horarios, horario) {
	var index = -1;
	for(var i = 0; i < horarios.length; i++) {
		if(horario === horarios[i].text) {
			index = i;
		}
	}
	return index;
}

function createRemedio(remedio, horarios) {
	var composite = tabris.create("Composite", {
		layoutData : {
			top : "prev() 10",
			left : 5,
			right : 5
		}
	});

	var title = tabris.create("TextView", {
		layoutData : {
			top : 5,
			left : 5
		},
		text : remedio,
		font : "bold 30px"
	})
	.appendTo(composite);

	horarios.forEach(function(horario) {
		tabris.create("CheckBox", {
			layoutData : {
				top : "prev() 5",
				left : 20
			},
			selection : horario.selection,
			text : horario.text
		})
		.on("select", function(widget, select){
			var remedioIndex = getRemedioIndex(remedio);
			var horarioIndex = getHorarioIndex(remedios[remedioIndex].horarios, horario.text);
			remedios[remedioIndex].horarios[horarioIndex].selection = select;
			saveRemedios();
		})
		.appendTo(composite);
	});

	return composite;
}