
var myChart;




$(document).ready(function(){
	apagaMensagem()
	criarGrafico()
	criaLinhaTabela()
})

$("#button-plus").on('click', function(){
	criaLinhaTabela()
})

$("#titulo_tabela").on('keyup', function(){
	myChart.options.title.text = $(this).val();
	myChart.update();
})

document.addEventListener('keydown', function(e){
	if(e.key == "Enter") criaLinhaTabela();
})

function criaLinhaTabela(){
	let linhas = $(".linha_tabela").length

	$("#table-body").append(`
		<tr class="linha_tabela">
			<th class="th_linha_tabela">${linhas + 1}</th>
			<td><input class="custom-input input-body input-1" onkeyup="edt_coluna1(event)" data-reference="${linhas}" type="text" placeholder="Editar..."></td>
			<td><input class="custom-input input-body input-2" onkeyup="edt_coluna2(event)" data-reference="${linhas}" type="number" placeholder="Editar...">
				<i onclick="apaga(event)" class="fa fa-trash-o fa-custom input-3" data-reference="${linhas}"></i>
			</td>
		</tr>
	`)

	myChart.data.labels.push('')
	myChart.data.datasets[0].data.push('')
	myChart.data.datasets[0].backgroundColor.push(backgroundColor(linhas))
	myChart.data.datasets[0].borderColor.push(borderColor(linhas))
	myChart.update()
}

function backgroundColor(index){
	var backgroundColor = ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)'];
	return backgroundColor[index%(backgroundColor.length)]
}

function borderColor(index){
	var borderColor = ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)'];
	return borderColor[index%(borderColor.length)]
}

function apaga(event){
	let linha = event.target.dataset.reference;

	$(".linha_tabela")[linha].remove()
	myChart.data.labels.splice(linha, 1);
	myChart.data.datasets[0].data.splice(linha, 1);
	myChart.data.datasets[0].backgroundColor.splice(linha, 1);
	myChart.data.datasets[0].borderColor.splice(linha, 1);

	reordena(linha)
	myChart.update()
}

function reordena(pos){
	for(let i = pos; i < myChart.data.labels.length; i++){
		myChart.data.datasets[0].backgroundColor[i] = backgroundColor(i)
		myChart.data.datasets[0].borderColor[i] = borderColor(i)
		$(".th_linha_tabela")[i].innerHTML = parseInt(i)+1
		$(".input-1")[i].dataset.reference -= 1;
		$(".input-2")[i].dataset.reference -=1;
		$(".input-3")[i].dataset.reference -=1;
	}
}

function edt_coluna1(event){
	console.log(myChart.data.labels)
	let coluna = event.target.value;
	let posicao = event.target.dataset.reference;
	myChart.data.labels[posicao] = coluna;
	myChart.update();
}

function edt_coluna2(event){
	let coluna = event.target.value;
	let posicao = event.target.dataset.reference;
	myChart.data.datasets[0].data[posicao] = coluna;
	myChart.update();
}

function criarGrafico() {
	var ctx = document.getElementById('myChart').getContext('2d');
	myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: [],
	        datasets: [{
	            label: '',
	            data: [],
	            backgroundColor: [],
	            borderColor: [],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	title: {
            	display: true,
            	text: 'Título do Gráfico'
        	},
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
}

function apagaMensagem(){
	setTimeout(() => {
		$("#mensagem").hide()
	}, 5000);
}