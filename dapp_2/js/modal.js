window.onload = function () {

  var sendModalBtn = document.getElementById('send_modal');
  var sendBtns = document.querySelectorAll('.send');
  var sendCloseBtns = document.querySelectorAll('.send_form_close');

  var receiveModalBtn = document.getElementById('receive_modal');
  var receiveCloseBtns = document.querySelectorAll('.receive_form_close');
  
  // Get the dialogs.
  var sendModal = document.getElementById('send_form');
  var receiveModal = document.getElementById('receive_form');

  // Setup Event Listeners
  sendModalBtn.addEventListener('click', function(e) {

    e.preventDefault();
    sendModal.showModal();

  });
  
  for (var i = 0; i < sendCloseBtns.length; i++) {
    sendCloseBtns[i].addEventListener('click', function(e) {
      this.parentNode.close();
    });
  }

  for (var i = 0; i < sendBtns.length; i++) {
        sendBtns[i].addEventListener('click', function(e) {

            var address = document.getElementById('receive_address').value;
    
            if(address.search(/0x[a-zA-Z0-9]{40}/) != -1) {
        
              var contractAddress = '0xb20083039a3b7b76c0dc3884c6e5f41c3784671d';
              var abi = [{"constant":false,"inputs":[{"name":"newAddress","type":"string"},{"name":"newMessage","type":"string"},{"name":"newMaster","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
              var sendMessage;

              window.web3 = new Web3(web3.currentProvider);

              sendMessage = web3.eth.contract(abi).at(contractAddress);
			  sendMessage.set(JSON.parse(address),document.getElementById('receive_contents').value,1,{gasPrice:web3.toWei(2, 'Gwei')}, function(e,r) {

                alert("TXID Copy to clipboard: Ctrl+C, Enter\n" + r);

              });
			
			//초기화 부분
              document.getElementById('receive_address').value = "";
              document.getElementById('receive_contents').value = "";
              this.parentNode.close();

            }
            else {
        
                alert('Please, recheck your sending address.');

             }
        });
    }

    receiveModalBtn.addEventListener('click', function(e) {

      var contractAddress = '0xb20083039a3b7b76c0dc3884c6e5f41c3784671d';
      var abi = [{"constant":false,"inputs":[{"name":"newAddress","type":"string"},{"name":"newMessage","type":"string"},{"name":"newMaster","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
      var message;
	  var addressResult;
	  var addressContent;
	  var messageContent;
	  var masterContent;
	  
      window.web3 = new Web3(web3.currentProvider);
      message = web3.eth.contract(abi).at(contractAddress);

      message.get(function(e,r) {
		
		addressResult = r[1];
		messageContent = r[2];
		masterContent = r[3];
		
		addressContent = JSON.stringify(addressResult);
		
        document.getElementById('send_address').value = addressResult;
        document.getElementById('send_contents').value = messageContent;

      });

      e.preventDefault();
      receiveModal.showModal();

    });
  
  for (var i = 0; i < receiveCloseBtns.length; i++) {
    receiveCloseBtns[i].addEventListener('click', function(e) {
        document.getElementById('receive_new_img').style.display = "none";
        this.parentNode.close();
    });
  }
  
};

