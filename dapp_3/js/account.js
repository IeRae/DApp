var blockNumber = 0;
var savedAddress = "";
var savedBalances = 0;

var user_address = '0x6733f8799f7c79bc15e0003e58159e60382429d3';
var dev1_address = '0xd029feeed0dbb6fd60128aae6e591962df11e76f';
var dev2_address = '0xb462780cf95fe8c93025978302c32a2749eac9af';
var dev3_address = '0xd029FeeeD0Dbb6FD60128aaE6e591962df11E76f';

setInterval(function() {

  var contractAddress = '0x6733f8799f7c79bc15e0003e58159e60382429d3';
  var abi = [{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"text","type":"string"}],"name":"senMsg","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMsg","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
  var message;
  var content;
  
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    message = web3.eth.contract(abi).at(contractAddress);
  
    message.getMsg(function(e,r) {
console.log(message);
console.log(r[1]);
		content = JSON.parse(r[2]);

		switch(r[1]){
			
			case user_address:
				//user interface;
				document.getElementById('state_btn').innerHTML = "<button onclick='send_dev_1()' class='send_modal'>dev1<br/><span id='working_state'>" + content.dev1 + "</span></button><button onclick='send_dev_2()' class='send_modal'>dev2<br/><span id='working_state'>" + content.dev2 + "</span></button><button onclick='send_dev_3()' class='send_modal'>dev3<br/><span id='working_state'>" + content.dev3 + "</span></button>";
				
				//console.log("user set");
				break;
				
			case dev1_address:
				//dev1 interface;
				document.getElementById('state_btn').innerHTML = "<span class='other_device_info' onclick='copy(this.value)' value=" + dev2_address + " readonly>dev2 : " + content.dev2 + "</span>";
				//console.log("dev1 set");
				break;
			case dev2_address:
				//dev2 interface;
				document.getElementById('state_btn').innerHTML = "<span class='other_device_info' onclick='copy(this.value)' value=" + dev1_address + " readonly>dev1 : " + content.dev1 + "</span>";
				//console.log("dev2 set");
				break;
		}
		
    });
/*
    if (document.getElementById('send_modal').style.visibility == "") {

      document.getElementById('send_modal').style.visibility = "visible";
      document.getElementById('send_form').style.visibility = "visible";
      document.getElementById('receive_modal').style.visibility = "visible";
      document.getElementById('receive_form').style.visibility = "visible";

    }
*/
    web3.eth.getCoinbase(function(e, address) {

        web3.eth.getBalance(address, function(e, balances) {

          if (((address != null) && (savedAddress != address)) || (savedBalances != balances)) {
			var thisDevice = 'dev1';

			
			switch(address){
				case user_address:
					thisDevice = 'user';
					break;
				case dev1_address:
					thisDevice = 'dev1';
					break;
				case dev2_address:
					thisDevice = 'dev2';
					break;
				case dev3_address:
					thisDevice = 'dev3';
					break;
				default:
					thisDevice = 'wrong';
					break;
			}
			
			//console.log(thisDevice);
            document.getElementsByTagName("div")[2].innerHTML = "<input type='button' id='account_address' onclick='copy(this.value)' value='" +thisDevice + "(" + address +")"+ "' readonly />";
            document.getElementsByTagName("div")[2].innerHTML += "<span id='account_balances'>" + Number(web3.fromWei(Number(balances), 'ether')).toFixed(2) + "&nbsp;ETH</span>";

			if(thisDevice != 'user'){
				 document.getElementById('user_form').style.visibility = "visible";
				 document.getElementById('user_address').style.text = user_address;
			}
			
            savedAddress = address;
            savedBalances = balances;
			

            
          }

        });

    });

  }

}, 1000);

	var message;
	var getcontent;
	var setcontent;
  
  
	console.log('device 1 start')
	function send_dev_1(){
		
		var address = '0x6733f8799f7c79bc15e0003e58159e60382429d3';
		var abi = [{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"text","type":"string"}],"name":"senMsg","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMsg","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
			
			console.log('device etx start')
			
		if(address.search(/0x[a-zA-Z0-9]{40}/) != -1) {
			console.log('device 2 start')
		  window.web3 = new Web3(web3.currentProvider);
		  message = web3.eth.contract(abi).at(address);
		  
		  message.getMsg(function(e,r) {
			  getcontent = JSON.parse(r[2]);
			
			
			  if(getcontent.dev1 == 'working')
				  getcontent.dev1 = 'stop';
			  else
				  getcontent.dev1 = 'working';
			  
			  setcontent = { dev1 : "" + getcontent.dev1 + "", dev2 :  "" + getcontent.dev2 + "", dev3 : "" + getcontent.dev3 + ""};
			  
			  
			  /*
			   content = { dev1 : "" + document.getElementById('receive_contents').value + "", dev2 :  "working" };
			   */
			   console.log('device 3 start')
			  console.log(setcontent);
			  
			  message.sendMsg(address, JSON.stringify(setcontent), {gasPrice:web3.toWei(2000, 'Gwei')}, function(e,r) {

				alert("TXID Copy to clipboard: Ctrl+C, Enter\n" + r);

			  });
		  });
		  
		}
		else {
	
			alert('Please, recheck your sending address.');

		 }
	}
   
