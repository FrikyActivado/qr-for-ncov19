
function buscarPdf(){
	var ultimoURL="https://www.who.int/docs/default-source/coronaviruse/situation-reports/"+(Number(formatoFecha(""))-1)+"-sitrep-"+(numeroReporte()-1)+"-covid-19.pdf";
	var fecha=formatoFecha("");
	var nReporte=numeroReporte();
	var respuesta="#";
	var promesa = fetch("https://www.who.int/docs/default-source/coronaviruse/situation-reports/"+fecha+"-sitrep-"+nReporte+"-covid-19.pdf").then(
		resp =>{
		respuesta= (resp.ok) ? "https://www.who.int/docs/default-source/coronaviruse/situation-reports/"+fecha+"-sitrep-"+nReporte+"-covid-19.pdf": ultimoURL;
		return respuesta
		});
	return promesa;
}

function formatoFecha(separador){
	var fechaHoy = new Date();
	var mes="";
	var dia="";
	if(separador==""){
		mes= ((fechaHoy.getMonth()+1)<10)?"0"+(fechaHoy.getMonth()+1):""+(fechaHoy.getMonth()+1);
		dia= ((fechaHoy.getDate())<10)?"0"+fechaHoy.getDate():""+fechaHoy.getDate();
	}else{
		mes= ((fechaHoy.getMonth()+1)<10)?separador+"0"+(fechaHoy.getMonth()+1):separador+""+(fechaHoy.getMonth()+1);
		dia= ((fechaHoy.getDate())<10)?separador+"0"+fechaHoy.getDate():separador+""+fechaHoy.getDate();
	}
	
	return fechaHoy.getFullYear()+mes+dia;
}

function numeroReporte(){
	// var ultimaFecha=Number(formatoFecha());
	// var primerFecha=20200121;
	var ultimaFecha=moment(formatoFecha("-"));
	var primerFecha=moment('2020-01-21');
	return Number(ultimaFecha.diff(primerFecha,'days'))+1;
}

function redireccionar(){
	buscarPdf().then( resp =>{
	 // location.href= resp;
	 //window.open(resp);
	var pdf= document.querySelector("object");
	pdf.setAttribute("data",resp);
	 //return '<object width="400" height="400" data="+resp+"></object>';
	});
}