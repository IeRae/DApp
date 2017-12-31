var blockNumber = 0;
var savedAddress = "";
var savedBalances = 0;

var user_address = 0x6733f8799f7c79bc15e0003e58159e60382429d3;
var dev1_address = 0x6733f8799f7c79bc15e0003e58159e6038242922;
//var dev2_address = 0xb462780cf95fe8c93025978302c32a2749eac9af;
//var dev3_address = 0xb462780cf95fe8c93025978302c32a2749eacssd;

setInterval(function() {

  var contractAddress = '0xb20083039a3b7b76c0dc3884c6e5f41c3784671d';
  var abi = [{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_message","type":"string"}],"name":"sendMsg","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getMsg","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"type":"function"}];
  var message;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    message = web3.eth.contract(abi).at(contractAddress);
    
    message.getMsg(function(e,r) {

        if(Number(blockNumber) != r[0]) {

            document.getElementById('receive_new_img').style.display = "block";
            blockNumber = r[0];

        }

    });

    if (document.getElementById('send_modal').style.visibility == "") {

      document.getElementById('send_modal').style.visibility = "visible";
      document.getElementById('send_form').style.visibility = "visible";
      document.getElementById('receive_modal').style.visibility = "visible";
      document.getElementById('receive_form').style.visibility = "visible";

    }

    web3.eth.getCoinbase(function(e, address) {

        web3.eth.getBalance(address, function(e, balances) {
console.log("test1");
          if (((address != null) && (savedAddress != address)) || (savedBalances != balances)) {
console.log("test2");			
			var thisDivice;
			switch(address){
				case dev1_address:
					thisDivice = dev1;
					break;
				case dev2_address:
					thisDivice = dev2;
					break;
				case dev3_address:
					thisDivice = dev3;
					break;
				default:
					thisDivice = user1;
			}
			console.log(thisDivice);
            document.getElementsByTagName("div")[2].innerHTML = "<input type='button' id='account_address' onclick='copy(this.value)' value='" + thisDivice + " (" + address + ") " "' readonly />";
            document.getElementsByTagName("div")[2].innerHTML += "<span id='account_balances'>" + Number(web3.fromWei(Number(balances), 'ether')).toFixed(2) + "&nbsp;ETH</span>";
console.log("test1");
            savedAddress = address;
            savedBalances = balances;
            
          }

        });

    });

  }

}, 1000);