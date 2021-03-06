function make(){
	make_ingre();
	ajax_get_items();
	ajax_get_news();
	ajax_get_rank();
	ajax_get_graph_data();
}


var canvas;
var header;
var wrap;

var logout;

var some_box;

var links;

var items;
var items_list;
var item;
var price;

var sospi;
var data_term;

var graph_form;
var sospiGraph;
var sospiGraph_1;
var table_form;
var table_row;
var table_cell;


var news;
var news_view;

var rank;
var rank_list;

function make_ingre(){
	logout = document.getElementById("logout");

	header = document.getElementsByTagName("header")[0];
	wrap = document.getElementsByTagName("wrap")[0];

	links = document.getElementById("links");

	items = document.getElementsByClassName("items")[0];
	items_list = document.getElementsByClassName("items_list")[0];
	item = document.getElementsByClassName("item");
	price = document.getElementsByClassName("price");

	some_box = document.getElementsByClassName("some_box")[0];
	sospi = document.getElementsByClassName("sospi")[0];
	term = document.getElementById("term");
	data_term = document.getElementsByClassName("data_term");
	img = document.getElementsByClassName("img");
	fluc = document.getElementsByClassName("fluc");
	graph_form = document.getElementsByClassName("graph_form")[0];
	sospiGraph = document.getElementById("sospiGraph");
	sospiGraph_1 = document.getElementById("sospiGraph_1");
	table_form = document.getElementById("table_form");
	table_row = document.getElementsByClassName("y_cell");
	table_cell = document.getElementsByClassName("x_cell");

	news = document.getElementsByClassName("news")[0];
	news_view = document.getElementsByClassName("news_view")[0];

	rank = document.getElementById("rank");
	rank_list = document.getElementsByClassName("rank_list")[0];

	page_layout();
}
function page_layout(){
	some_box.style.lineHeight = some_box.offsetHeight + "px";

	links.style.height= wrap.offsetHeight - header.offsetHeight + "px"; 
	

	news.style.height = sospi.offsetHeight + "px";
	rank.style.height = news.offsetHeight + items.offsetHeight + "px";

	table_row[0].style.maxWidth = table_form.offsetWidth / 4 + "px";
	table_row[0].style.marginTop = ".1rem";
	for( var i = 0 ; i < table_row.length ; i++){
		if( i == 0){
			table_row[i].style.height = table_form.offsetHeight / 5 + "px";
		}
		else{
			table_row[i].style.height = table_form.offsetHeight / 5 + "px";
		}
		table_row[table_row.length - 1].style.height = "0px";
		table_row[i].style.verticalAlign = "top";
		table_row[i].style.minWidth = table_row[0].offsetWidth + "px";
	}
	sospiGraph.style.height = graph_form.offsetHeight / 100 * 85 - parseInt(getComputedStyle(sospiGraph,true).marginTop) + "px";
	//sospiGraph.style.width = graph_form.offsetWidth / 100 * 90 - parseInt(getComputedStyle(sospiGraph,true).marginRight) + "px";
	sospiGraph.style.width = table_form.offsetWidth - table_row[0].offsetWidth - parseInt(getComputedStyle(sospiGraph,true).marginRight)+ "px";
	sospiGraph_1.style.width = sospiGraph.offsetWidth + "px";
	sospiGraph_1.style.height = sospiGraph.offsetHeight + "px";

	for( var i = 1 ; i < table_cell.length ; i++){
		table_cell[i].style.width = sospiGraph.offsetWidth / 4 + "px";
	}

	
	document.styleSheets[0].removeRule("canvas",0);
	document.styleSheets[0].addRule("canvas" , "display : inline-block !important; width:"+ sospiGraph.offsetWidth + "px ; height :"+sospiGraph.offsetHeight+ "px ;",0);

	set_event();
}

function set_event(){
	logout.addEventListener("click",do_logout);
	for( var i = 0 ; i < item.length; i++){
		item[i].addEventListener("click", link);
	}
	term.addEventListener("change",ajax_get_graph_data);
}


function start_graph(data_temp){
	var temp = JSON.parse(data_temp);

	var min_temp;
	var max_temp;
	for(var i = 0 ; i < temp.length ; i ++){
		if( i == 0){
			min_temp = temp[i];
			max_temp = temp[i];
		}
		else{
			if( temp[i] < min_temp ){
				min_temp = temp[i];
			}
			else if( temp[i] > max_temp ){
				max_temp = temp[i];
			}
		}
	}

	var max_value = (parseInt( max_temp ) * 1.3).toFixed(0);

	for( var i = 0 ; i < temp.length ; i ++){
		temp[i] = max_value - temp[i];
	}

	var data_length;

	if( term.value == "day"){
		sospiGraph.style.zIndex = "10";
		sospiGraph_1.style.zIndex = "-1";
		VJ.graph("sospiGraph").options.max = max_value;
		for (var i = 0 ; i < temp.length ; i++){
			VJ.graph("sospiGraph").appendData([temp[i]]);
		}
	}
	else if(term.value == "week"){
		sospiGraph_1.style.zIndex = "10";
		sospiGraph.style.zIndex = "-1";
		VJ.graph("sospiGraph_1").options.max = max_value;
		for (var i = 0 ; i < temp.length ; i++){
			VJ.graph("sospiGraph_1").appendData([temp[i]]);
		}
	}


	setting_table(max_value);
	make_ingre();
}


function first_start_graph(temp_array){
	var temp = JSON.parse(temp_array);
	var min_temp;
	var max_temp;
	for(var i = 0 ; i < temp.length ; i ++){
		if( i == 0){
			min_temp = temp[i];
			max_temp = temp[i];
		}
		else{
			if( temp[i] < min_temp ){
				min_temp = temp[i];
			}
			else if( temp[i] > max_temp ){
				max_temp = temp[i];
			}
		}
	}

	var max_value = (parseInt( max_temp ) * 1.3).toFixed(0);

	for( var i = 0 ; i < temp.length ; i ++){
		temp[i] = max_value - temp[i];
	}

	var data_length;

	VJ.graph("sospiGraph", [0,0,0], {max:max_value, width:sospiGraph.offsetWidth, height:sospiGraph.offsetHeight, dataLength:48 });
	VJ.graph("sospiGraph_1", [0,0,0], {max:max_value, width:sospiGraph.offsetWidth, height:sospiGraph.offsetHeight, dataLength:336 });

	if( term.value == "day"){
		sospiGraph.style.zIndex = "10";
		sospiGraph_1.style.zIndex = "-1";
	}
	else if(term.value == "week"){
		sospiGraph_1.style.zIndex = "10";
		sospiGraph.style.zIndex = "-1";
	}
	check = 0;
}

function do_logout(){
	var form_temp = document.createElement("form");
	form_temp.action = "/logout";
	form_temp.method = "POST";
	form_temp.style.display = "none";

	document.body.appendChild(form_temp);
	if(confirm("정말 로그아웃 하시겠습니까? \n\n") ){
		form_temp.submit();
	}
}

function link(){
	var form_temp = document.createElement("form");
	form_temp.action = "/stock_item/" + this.children.namedItem('item_code').value;
	form_temp.method = "POST";

	var out = "";
	out += "<input name = 'code' type = 'button' value = '"+this.children.namedItem('item_code').value+"' />";

	form_temp.innerHTML = out;

	form_temp.submit();
}


function get_items(item_array_temp){
	var temp = JSON.parse(item_array_temp);

	for(var i = 0 ; i < temp.length;i ++){

		var div_temp = document.createElement("div");
		div_temp.className = "item";
		var out = "";
		out += temp[i].item+"<input id = 'item_code' value = '"+temp[i].item+"' />";

		div_temp.innerHTML = out;

		items_list.appendChild(div_temp);
	}

	make_ingre();
}
function get_news(news_array_temp){
	var temp = JSON.parse(news_array_temp);
	for(var i = 0 ; i < temp.length; i++){
		var div_temp = document.createElement("div");
		div_temp.className = "news_box"

		var out = "";
		out += "\
			<span class = 'megaphone_img'>\
				<img src = '/static/images/main/megaphone.png' alt = '뉴스'/>\
			</span>\
			<span class = 'news_text'>\
				<font title = '"+temp[i].content+"'><p>\"\
				"+temp[i].content+"\
				\"</p></font>\
			</span>\
		";
		div_temp.innerHTML = out;

		news_view.appendChild(div_temp);
	}

}

function get_rank(rank_array_temp){
	var temp = JSON.parse(rank_array_temp);
	for( var i = 0 ; i < temp.length; i++){
		var div_temp = document.createElement("div");
		div_temp.className = "rank"
		var out = "";
		out += "\
			<div class = 'rank'>\
				<span class = 'grade'>\
					<span>"+(i+1)+".</span>\
				</span>\
				<span class = 'item_name'>\
					<span>"+temp[i].item+"</span>\
				</span>\
			";

		out += "<div id = 'main_price_div'>";

		if(temp[i].up_down == 1){
			out += "<img id = 'sibal' src = '/static/images/stock_item/"+temp[i].img+"_sibong.png' alt = '전일 대비 상승'/>";
		}
		else if(temp[i].up_down == 0){
			out += "<img id = 'sibal' src = '/static/images/stock_item/"+temp[i].img+"_sibong.png' alt = '전일과 동일'/>";
		}
		else if(temp[i].up_down == -1){
			out += "<img id = 'sibal' src = '/static/images/stock_item/"+temp[i].img+"_sibong.png'' alt = '전일 대비 하락'/>";
		}

		out += "<div id= 'main_fluc'>";
		out += "<span class = 'value' >"+temp[i].price + "% </span>";
		out += "</div>";

		out += "<div id = 'main_price' >";
		out += "<span class = 'value' >"+temp[i].fluc + " </span>";
		out += "</div>";




		out += "</div>"
		out+="</div>"

		div_temp.innerHTML = out;

		rank_list.appendChild(div_temp);
	}
}


function setting_table(max){
	var max_temp = max;

	for(var i = 0 ; i < table_row.length;i++){
		var temp = Math.round(max_temp /4 * ( 4-i )/100 )* 100;
		table_row[i].innerHTML = commify(temp) + " -&nbsp&nbsp";
	}
	if( term.value == "day"){
		for(var i = 0 ; i < table_cell.length ; i++){
			table_cell[i].innerHTML = i * 6 +"h";
		}
	}
	else if( term.value == "week"){
		for(var i = 0 ; i < table_cell.length; i++){
			table_cell[i].innerHTML = i * 42 + "h";
		}
	}
}

function commify(n) {
  var reg = /(^[+-]?\d+)(\d{3})/;
  n += '';

  while (reg.test(n))
    n = n.replace(reg, '$1' + ',' + '$2');

  return n;
}