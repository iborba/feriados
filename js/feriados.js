angular.module('FeriadosSantos', [])
	.filter('brDate', function() {
		return function(date) {
			//INCOMPLETO
			return date + " - SEGUNDA-FEIRA";
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
		{ name: "SEXTA-FEIRA DE ALELUIA", date: null, qtyDaysToEaster: -2},
		{ name: "CARNAVAL", date: null, qtyDaysToEaster: -47 },
		{ name: "ANO NOVO", date: '01-01-1900', qtyDaysToEaster: 0 },
		{ name: "NATAL", date: '12-25-1900', qtyDaysToEaster: 0 }
	]; //mongodb data
	
	vm.pesquisarFeriado = pesquisarFeriado;
	function pesquisarFeriado(pAno){
        var dataPascoa;

        var X = 24;
        var Y = 5;
        var a = pAno % 19;
        var b = pAno % 4;
        var c = pAno % 7;
        var d = (19 * a + X) % 30;
        var e = (2 * b + 4 * c + 6 * d + Y) % 7;

        var f = d + e;
        var dia;

        if (f > 9)
        {
            dia = f - 9;

            if (dia === 26 || (dia === 25 && d === 28 && a > 10))
                dia -= 8;

            dataPascoa = new Date(pAno, 3, dia, 1, 1);
        }
        else
        {
            dia = f - 23;
            dataPascoa = new Date(pAno, 2, dia, 1, 1);
        }
		
		var data;
		
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
			
			vm.result.push({name: angular.copy(vm.data[k].name), date: angular.copy(data.toLocaleDateString("pt-BR")) })
		}
	}
}
