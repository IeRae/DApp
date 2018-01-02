var blockNumber = 0;
var savedAddress = "";
var savedBalances = 0;

var user_address = '0x6733f8799f7c79bc15e0003e58159e60382429d3';
var dev1_address = '0xd029feeed0dbb6fd60128aae6e591962df11e76f';
var dev2_address = '0xb462780cf95fe8c93025978302c32a2749eac9af';
var dev3_address = '0xd029FeeeD0Dbb6FD60128aaE6e591962df11E76f';

var contractAddress = '0xae7b5e43a48a996025c07a1075d42217dfcf8177';
var abi = [{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"text","type":"string"}],"name":"sendMsg","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMsg","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
  
var message;
var content;
  
setInterval(function() {
  
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    message = web3.eth.contract(abi).at(contractAddress);
  
	var thisDevice = 'dev1';
  
    web3.eth.getCoinbase(function(e, address) {
	
        web3.eth.getBalance(address, function(e, balances) {
		
          if (((address != null) && (savedAddress != address)) || (savedBalances != balances)) {
			

			
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
				 document.getElementById('user').innerHTML = "<input type='button' onclick='copy(this.value)' id='user_address' value='user_info (" + user_address +")"+ "' readonly />";	 
			}
			
            savedAddress = address;
            savedBalances = balances;
			

            
          }

        });

    });
	
	
    message.getMsg(function(e,r) {

		content = JSON.parse(r[1]);

		web3.eth.getCoinbase(function(e, address) {

			switch(address){
				
				case user_address:
					//user interface;
					document.getElementById('state_btn').innerHTML = "<button onclick='send_dev_1()' class='send_modal'>Dev1<br/><br/><br/><span id='working_state'>" + content.dev1 + "</span></button><button onclick='send_dev_2()' class='send_modal'>Dev2<br/><br/><br/><span id='working_state'>" + content.dev2 + "</span></button><button onclick='send_dev_3()' class='send_modal'>Dev3<br/><br/><br/><span id='working_state'>" + content.dev3 + "</span></button>";
					
					console.log("user set");
					break;
					
				case dev1_address:
					//dev1 interface;
					document.getElementById('state_btn').innerHTML = "<button onclick='send_dev_1()' class='send_modal'>Dev1<br/><br/><br/><span id='working_state'>" + content.dev1 + "</span></button><button onclick='send_dev_2()' class='disableBtn' disabled>Dev2<br/><br/><br/><span id='working_state'>" + content.dev2 + "</span></button><button onclick='send_dev_3()' class='disableBtn' disabled>Dev3<br/><br/><br/><span id='working_state'>" + content.dev3 + "</span></button>";
					console.log("dev1 set");
					break;
				case dev2_address:
					//dev2 interface;
					document.getElementById('state_btn').innerHTML = "<button onclick='send_dev_1()' class='disableBtn' disabled>Dev1<br/><br/><br/><span id='working_state'>" + content.dev1 + "</span></button><button onclick='send_dev_2()' class='send_modal' >Dev2<br/><br/><br/><span id='working_state'>" + content.dev2 + "</span></button><button class='disableBtn' disabled>Dev3<br/><br/><br/><span id='working_state'>" + content.dev3 + "</span></button>";
					console.log("dev2 set");
					break;
				case dev3_address:
					//dev3 interface;
					document.getElementById('state_btn').innerHTML = "<button onclick='send_dev_1()' class='disableBtn' disabled>Dev1<br/><br/><br/><span id='working_state'>" + content.dev1 + "</span></button><button class='disableBtn' disabled>Dev2<br/><br/><br/><span  id='working_state'>" + content.dev2 + "</span></button><button class='send_modal' >Dev3<br/><br/><br/><span id='working_state'>" + content.dev3 + "</span></button>";
					console.log("dev3 set");
					break;
				default:
					break;
			}
		});

		
    });

  }

}, 1000);

var setcontent;

function send_dev_1(){
		
	if(contractAddress.search(/0x[a-zA-Z0-9]{40}/) != -1) {
		
		switch(content.dev1){
			case 'stop':
				console.log('stop site');
				content.dev1 = 'working';
				break;
			default:
				console.log('default site');
				content.dev1 = 'stop';
				break;
		}
				
		setcontent = { "dev1" : ""+content.dev1+"", "dev2" :  ""+content.dev2+"", "dev3" : ""+content.dev3+""};
	  
		message.sendMsg(contractAddress, JSON.stringify(setcontent), {gasPrice:web3.toWei(50, 'Gwei')}, function(e,r) {

			alert("TXID Copy to clipboard: Ctrl+C, Enter\n" + r);

		});
	  
	}
	else {

		alert('Please, recheck your sending address.');

	 }
}

function send_dev_2(){
	
	if(contractAddress.search(/0x[a-zA-Z0-9]{40}/) != -1) {
		
		switch(content.dev2){
			case 'stop':
				console.log('stop site');
				content.dev2 = 'working';
				break;
			default:
				console.log('default site');
				content.dev2 = 'stop';
				break;
		}
		
		setcontent = { "dev1" : ""+content.dev1+"", "dev2" :  ""+content.dev2+"", "dev3" : ""+content.dev3+""};
	  
		message.sendMsg(contractAddress, JSON.stringify(setcontent), {gasPrice:web3.toWei(50, 'Gwei')}, function(e,r) {

			alert("TXID Copy to clipboard: Ctrl+C, Enter\n" + r);

		});
	  
	}
	else {

		alert('Please, recheck your sending address.');

	}
}

function send_dev_3(){
		
	if(contractAddress.search(/0x[a-zA-Z0-9]{40}/) != -1) {
		
		switch(content.dev3){
			case 'stop':
				console.log('stop site');
				content.dev3 = 'working';
				break;
			default:
				console.log('default site');
				content.dev3 = 'stop';
				break;
		}
			  
		setcontent = { "dev1" : ""+content.dev1+"", "dev2" :  ""+content.dev2+"", "dev3" : ""+content.dev3+""};
	  
		message.sendMsg(contractAddress, JSON.stringify(setcontent), {gasPrice:web3.toWei(50, 'Gwei')}, function(e,r) {

			alert("TXID Copy to clipboard: Ctrl+C, Enter\n" + r);

		});
	  
	}
	else {

		alert('Please, recheck your sending address.');

	}
}

