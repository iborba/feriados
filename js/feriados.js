angular.module('FeriadosSantos', [])
	.controller('FeriadosController', FeriadosController)
	;

function FeriadosController() {
	var vm = this;
	vm.title = "FERIADOS";

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

            if (dia == 26 || (dia == 25 && d == 28 && a > 10))
                dia -= 7;

            dataPascoa = new Date(pAno, 4, dia, 1, 1);
        }
        else
        {
            dia = f - 22;
            dataPascoa = new Date(pAno, 3, dia, 1, 1);
        }
        vm.feriados = { name:"PÁSCOA", date:dataPascoa };

	}

	// vm.add = add;
	// function add(user){
	// 	vm.users.push(angular.copy(user)); //angular.copy é necessário, se for excluído, o campo é inserido inicialmente, passa a ser atualizado nos próximos clicks.
	// }
	
	// vm.order = order;
	// function order(key){
	// 	vm.predicate = key;
	// 	vm.reverse = !vm.reverse;
	// }

	// vm.remove = remove;
	// function remove(pUsers){
	// 	vm.users = pUsers.filter(function(el){ return !el.selecionado });
	// }

}
