angular.module('FeriadosSantos', [])
	.filter('brDate', function() {
		return function(date) {
			date = date.substring(0, 3);
			
			switch(date.toLowerCase()) {
				case "sun":
					date = "DOMINGO";
					break;
				case "mon":
					date = "SEGUNDA-FEIRA";
					break;
				case "tue":
					date = "TERÇA-FEIRA";
					break;
				case "wed":
					date = "QUARTA-FEIRA";
					break;
				case "thu":
					date = "QUINTA-FEIRA";
					break;
				case "fri":
					date = "SEXTA-FEIRA";
					break;
				case "sat":
					date = "SÁBADO";
					break;
			}
			
			return date;
		};
	})
	.controller('FeriadosController', FeriadosController)
	;

function FeriadosController() {
	var vm = this;
	vm.title = "";
	vm.result = [];
	vm.data = [
		{ name: "PÁSCOA", date: null, qtyDaysToEaster: 0 },
		{ name: "CORPUS CHRISTI", date: null, qtyDaysToEaster: 60 },
		{ name: "SEXTA-FEIRA SANTA", date: null, qtyDaysToEaster: -2},
		{ name: "CARNAVAL", date: null, qtyDaysToEaster: -47 },
		{ name: "ANO NOVO", date: '01-01-1900', qtyDaysToEaster: 0 },
		{ name: "NATAL", date: '12-25-1900', qtyDaysToEaster: 0 }
	]; //mongodb data
	
	vm.pesquisarFeriado = pesquisarFeriado;
	function pesquisarFeriado(pAno){
        var dataPascoa;
		vm.result = [];
		//Algoritmo de Meeus/Jones/Butcher
		var a = (pAno % 19);
		var b = parseInt(pAno / 100);
		var c = (pAno % 100);
		var d = parseInt(b / 4);
		var e = (b % 4);
		var f = parseInt((b + 8) / 25);
		var g = parseInt((b - f + 1) / 3);
		var h = ((19 * a + b - d - g + 15) % 30);
		var i = parseInt(c / 4);
		var k = (c % 4);
		var L = ((32 + 2 * e + 2 * i - h - k) % 7);
		var m = parseInt((a + 11 * h + 22 * L) / 451);
		var mes = parseInt((h + L - 7 * m + 114) / 31);
		var dia = ((h + L - 7 * m + 114) % 31) + 1;
		var data;
		
		dataPascoa = new Date(pAno, mes - 1, dia, 1, 1);
		
		for(var k in vm.data) {			
			if (vm.data[k].qtyDaysToEaster === 0 && vm.data[k].date !== null)
				data = new Date(pAno, new Date(vm.data[k].date).getMonth(), new Date(vm.data[k].date).getDate())
			
			else if (vm.data[k].qtyDaysToEaster !== 0 && vm.data[k].date === null)
			{
				data = angular.copy(dataPascoa);
				data.setDate(data.getDate() + vm.data[k].qtyDaysToEaster);
			}
			else
				data = dataPascoa;
			
			vm.result.push({name: angular.copy(vm.data[k].name), date: angular.copy(data.toLocaleDateString("pt-BR")), wkday: angular.copy(data.toGMTString("pt-BR")) })
		}
	}
}
