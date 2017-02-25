angular.module("documentos").controller("documentosCtrl", function($scope){

			//$scope.active="home";
	$scope.loggedUser = "User 1";
	$scope.hash="";
	$scope.app = "My Documents";
	$scope.app2 = "My Shares";
	$scope.alertMessage = "Document(s) sent for sharing";
	$scope.documentos = [
		{name: "CPF", desc:"Cadastro de Pessoa Física",tags:"Documentos, CPF", img:"/img/doc3.jpeg"},
		{name: "Declaração IRPF 2015", desc:"IRPF 2015 Ratificada",tags:"2015, IRPF, Ratificado", img:"/img/doc2.jpeg"},
		{name: "Declaração IRPF 2015 R", desc:"IRPF 2015",tags:"2015, IRPF", img:"/img/doc1.jpeg"},
		{name: "Declaração IRPF 2016", desc:"IRPF 2016",tags:"2016, IRPF, Ratificado", img:"/img/doc2.jpeg"},
		{name: "Declaração IRPF 2014", desc:"IRPF 2014",tags:"2014, IRPF", img:"/img/doc1.jpeg"},
	];

			
	$scope.shares = [];
	$scope.receives = [];
	$scope.documentos2 = [];

	$scope.compartilharDocumento = function(documentos){
		
		if($scope.loggedUser == "User 1"){
			$scope.shares = documentos.filter(function(documento){
				if(documento.selecionado) return documento;
			});
			for(var i=0; i < documentos.length; i++){
				documentos[i].selecionado = false;
			}
			$scope.documentoForm.$setPristine();
			$scope.hash="";
			
			$('#alert').append('<div class="alert alert-success fade in"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Success!</strong> <br>The selected Document(s) was/were sent for sharing.<br>They are pending of the other part acceptance.</div>');
		}else{
			$('#alert').append('<div class="alert alert-danger fade in"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Error!</strong> <br>User 1 already have this version of the document.</div>');
		}
	}
	$scope.isDocumentoSelecionado = function(documentos){
		return documentos.some(function(documento){
			return documento.selecionado;
		});
	}

	$scope.reject = function(doc){
		
		$scope.receives = $scope.receives.filter(function(rec){
			if(rec.name != doc.name) return rec;
		});
	}

	$scope.accept = function(doc){
		
		$scope.documentos2.push(angular.copy(doc));
		$scope.documentos.push(angular.copy(doc));
		$scope.reject(doc);
	}

	$scope.switchUser = function(){
		
		$scope.receives = $scope.shares.slice();
		$scope.shares = [];
		$scope.documentos = [];
		//Switch to user 2
		if($scope.loggedUser == "User 1"){
			$scope.loggedUser = "User 2";
			$scope.documentos = $scope.documentos2.slice();


		//Switch to User 1	
		}else{
			$scope.loggedUser = "User 1";
			$scope.documentos = [
				{name: "CPF", desc:"Cadastro de Pessoa Física",tags:"Documentos, CPF", img:"/img/doc3.jpeg"},
				{name: "Declaração IRPF 2015", desc:"IRPF 2015 Ratificada",tags:"2015, IRPF, Ratificado", img:"/img/doc2.jpeg"},
				{name: "Declaração IRPF 2015 R", desc:"IRPF 2015",tags:"2015, IRPF", img:"/img/doc1.jpeg"},
				{name: "Declaração IRPF 2016", desc:"IRPF 2016",tags:"2016, IRPF, Ratificado", img:"/img/doc2.jpeg"},
				{name: "Declaração IRPF 2014", desc:"IRPF 2014",tags:"2014, IRPF", img:"/img/doc1.jpeg"},
			];
		}
 		

	}

});
