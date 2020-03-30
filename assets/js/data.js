$(document).ready(function(){
var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
var d = new Date();
$("#tanggal").html(d.getDate() + " " + months[(d.getMonth())] + " " + d.getFullYear());
    $.ajax({url: "https://api.kawalcorona.com/indonesia/", success: function(result){
     var positif = result[0].positif;
     var sembuh = result[0].sembuh;
     var meninggal = result[0].meninggal
     var ganti_angka_positif = positif.replace(",", "");
     var ganti_angka_sembuh = sembuh.replace(",", "");
     var ganti_angka_meninggal = meninggal.replace(",", "");
     $("#positif").html(result[0].positif);
     $("#sembuh").html(result[0].sembuh);
     $("#meninggal").html(result[0].meninggal);
     var tingkat_kematian = (ganti_angka_meninggal / ganti_angka_positif) * 100;
     $("#total").html(tingkat_kematian.toFixed(1) + "%");
    }});
});

fetch('https://api.kawalcorona.com/indonesia/provinsi/').then(response62 => response62.json()).then(data62prov => {
    var kareelRow = '',
        kareelTPosi = 0,
        kareelTSemb = 0,
        kareelTMeni = 0;
    for (var i = 0; i < data62prov.length; i++) {
        kareelTPosi = parseInt(data62prov[i].attributes.Kasus_Posi + kareelTPosi);
        kareelTSemb = parseInt(data62prov[i].attributes.Kasus_Semb + kareelTSemb);
        kareelTMeni = parseInt(data62prov[i].attributes.Kasus_Meni + kareelTMeni);
        kareelRow += '<tr><th scope="row" class="text-center">' + (i + 1) + '</th><td>' + data62prov[i].attributes.Provinsi + '</td><td>' + data62prov[i].attributes.Kasus_Posi + '</td><td>' + data62prov[i].attributes.Kasus_Semb + '</td><td>' + data62prov[i].attributes.Kasus_Meni + '</td></th></tr>';
    }
    kareelRow += '<tr><th scope="col" colspan="2" class="text-center">Total Berdasarkan Provinsi</th><th scope="col">' + kareelTPosi + '</th><th scope="col">' + kareelTSemb + '</th><th scope="col">' + kareelTMeni + '</th></tr>';
    document.getElementById('arrayProvinsi').innerHTML = kareelRow;
}).catch(error62prov => console.error(error62prov));
fetch('https://api.kawalcorona.com/positif/').then(responseGp => responseGp.json()).then(dataG => {
    document.getElementById("Gpositif").innerHTML = dataG.value;
}).catch(errorGp => console.error(errorGp));
fetch('https://api.kawalcorona.com/sembuh/').then(responseGs => responseGs.json()).then(dataG => {
    document.getElementById("Gsembuh").innerHTML = dataG.value;
}).catch(errorGs => console.error(errorGs));
fetch('https://api.kawalcorona.com/meninggal/').then(responseGm => responseGm.json()).then(dataG => {
    document.getElementById("Gmeninggal").innerHTML = dataG.value;
}).catch(errorGm => console.error(errorGm));
fetch('https://api.kawalcorona.com/meninggal/').then(responseGT => responseGT.json()).then(dataGT => {
    fetch('https://api.kawalcorona.com/positif/').then(responseGTp => responseGTp.json()).then(dataGTp => {
        var kpTingkat = parseInt((dataGT.value.replace(',', '') / dataGTp.value.replace(',', '')) * 100);
        document.getElementById("Gtotal").innerHTML = kpTingkat.toFixed(1) + '%';
    }).catch(errorGTp => console.error(errorGTp));
}).catch(errorGT => console.error(errorGT));

// url to scrape
var urlToScrape = "https://covid19.pontianakkota.go.id/peta-persebaran";

// workaround for cross origin requests
$.ajaxPrefilter(function(options) {
	if (options.crossDomain && jQuery.support.cors) {
		var http = window.location.protocol === "http:" ? "http:" : "https:";
		options.url = http + "//cors-anywhere.herokuapp.com/" + options.url;
	}
});

$.ajax({
	url: urlToScrape,
	method: "GET"
}).done(function(data) {
	var html = $(data);
	var inmateInfo = html
		.find("table")
		.html()
		.trim();
	console.log(inmateInfo);
	$("#inmateRoster").append(inmateInfo);
	document.getElementById("inmateRoster").deleteRow(0);
	$("tr td.tbold:first").remove();
	$("tr td.tbold:last").remove();
});


window.setTimeout("waktu()",1000);  
function waktu() {   
var tanggal = new Date();  
document.getElementById("jam").innerHTML = tanggal.getHours()+":"+tanggal.getMinutes()+":"+tanggal.getSeconds();
}