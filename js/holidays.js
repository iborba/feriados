angular.module('HoliDays', [])
	.filter('brDate', () => ((date) => getBRDate(date)))
	.controller('HolidayController', HolidayController);

function getBRDate(date) {
	date = date.substring(0, 3).toLowerCase();
	
	switch(date) {
		case "sun":
			return "DOMINGO";
		case "mon":
			return "SEGUNDA-FEIRA";
		case "tue":
			return "TERÇA-FEIRA";
		case "wed":
			return "QUARTA-FEIRA";
		case "thu":
			return "QUINTA-FEIRA";
		case "fri":
			return "SEXTA-FEIRA";
		case "sat":
			return "SÁBADO";
	}
};

function HolidayController() {
	const dataObject = this;
	dataObject.title = "Feriados santos do Brasil";
	dataObject.result = [];
	dataObject.data = [
		{ name: "CARNAVAL", date: null, qtyDaysToEaster: -47 },
		{ name: "SEXTA-FEIRA SANTA", date: null, qtyDaysToEaster: -2},
		{ name: "PÁSCOA", date: null },
		{ name: "CORPUS CHRISTI", date: null, qtyDaysToEaster: 60 },
		{ name: "ANO NOVO", date: '01-01-1900' },
		{ name: "NATAL", date: '12-25-1900' }
	]; //sql/noql data
	
	dataObject.findHoliday = findHoliday;
	function findHoliday(year){
		dataObject.result = [];
		
		//Meeus/Jones/Butcher algorithm
		const a = (year % 19);
		const b = parseInt(year / 100);
		const c = (year % 100);
		const d = ((19 * a + b - (parseInt(b / 4)) - parseInt((b - parseInt((b + 8) / 25) + 1) / 3) + 15) % 30);
		const e = ((32 + 2 * (b % 4) + 2 * parseInt(c / 4) - d - (c % 4)) % 7);
		const f = parseInt((a + 11 * d + 22 * e) / 451);
		const mes = parseInt((d + e - 7 * f + 114) / 31);
		const dia = ((d + e - 7 * f + 114) % 31) + 1;
		let newDate;
		let easterDate = new Date(year, mes - 1, dia, 1, 1);
		
		for(let d in dataObject.data) {
			const daysToEaster = dataObject.data[d]?.qtyDaysToEaster || 0;
			const date = dataObject.data[d].date !== null ? new Date(dataObject.data[d].date) : null;
			const holidayName = dataObject.data[d].name;

			if (daysToEaster === 0 && date !== null) {
				newDate = new Date(year, date.getMonth(), date.getDate())
			}
			else if (daysToEaster !== 0 && date === null) {
				newDate = angular.copy(easterDate);
				newDate.setDate(newDate.getDate() + daysToEaster);
			}
			else {
				newDate = easterDate;
			}
			
			dataObject.result.push({
				name: angular.copy(holidayName), 
				date: angular.copy(newDate.toLocaleDateString("pt-BR")), 
				wkday: angular.copy(newDate.toGMTString("pt-BR")) 
			})
		}
	}
}
