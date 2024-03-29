var blockNumber = 0;
var savedAddress = "";
var savedBalances = 0;

setInterval(function() {

  var contractAddress = '0xb20083039a3b7b76c0dc3884c6e5f41c3784671d';
  var abi = [{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"newMessage","type":"string"}],"name":"set_data","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_data","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
  var message;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    message = web3.eth.contract(abi).at(contractAddress);
    
    message.get_data(function(e,r) {

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

          if (((address != null) && (savedAddress != address)) || (savedBalances != balances)) {

            document.getElementsByTagName("div")[2].innerHTML = "<input type='button' id='account_address' onclick='copy(this.value)' value='" + address + "' readonly />";
            document.getElementsByTagName("div")[2].innerHTML += "<span id='account_balances'>" + Number(web3.fromWei(Number(balances), 'ether')).toFixed(2) + "&nbsp;ETH</span>";

            savedAddress = address;
            savedBalances = balances;
            
          }

        });

    });

  }

}, 1000);