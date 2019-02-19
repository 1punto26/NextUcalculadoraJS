	function Calculadora(){
		
		this.display=0;
		this.token = 0;
		this.secondToken = 0;
		this.operator = "";
		this.lastOperator = "";
		
		
	}
	
	Calculadora.prototype.pushNumber = function (number)
	
	
	{
			
		console.log("Inicio: " + number);
		console.log("Iniciodisplay: " + this.display);
		if (this.display == "INFINITY") return;
		
		var strDisplay = "" + Math.abs(this.display);
		var txtDisplay = "" + this.display;
		var maxNumbers = 8;
		console.log("strDisplay = " + strDisplay + " isnumber = " + Number(strDisplay));
		console.log(number);
		//controla que en pantalla no haya mas de 8 digitos
		if (strDisplay.includes("."))
		{
			maxNumbers = 9;
		}
		
		if (strDisplay.length < maxNumbers)
		{
			//si es un cero y se pulsa la tecla 0 (cero), no se toma en cuenta
			if (Math.abs(this.display) == 0 && number == 0)
			{			
				return;
			}
			
			
			if (number == "." && txtDisplay.includes("."))
			{
				return;
			}
			
			//si en pantalla hay un cero, dado que se adicionará el numero tecleado, el cero se quita
			if (this.display == 0)
			{
				console.log('display = 0');
				if (number == ".") return;
				
				this.display = "";
			}
			//console.log("Despues "+number);
			this.display = "" + this.display + number;
			console.log("number"+number);
			console.log("Display:: "+this.display);
			calculadora.updateDisplay();
		}
	};


	Calculadora.prototype.pushOperator= function (op)
	{	
		var value = 0;

		if (this.display == "INFINITY") return;

		//console.log ("operador recibido: " + op);
		if (Number(this.display) == 0 && op != "=") return;
			//console.log ("despues de op recibido");
		
		switch(op) {
			case "+":
			case "*":
			case "/":
			case "-":
				this.token = Number(this.display);
				this.display = 0;				
				this.operator = op;
				this.lastOperator = op;
				break;					
			case "=":
				
				if (this.lastOperator == "=")
				{
					//console.log("display 0 usamos secondToken " + secondToken);
					this.value = this.secondToken;
				}
				else
				{
					//console.log("modifimos secondToken de: " + secondToken);
					this.value = Number(this.display);				
					this.secondToken = this.value;
					//console.log("modifimos secondToken a: " + secondToken);
				}
			
				switch(this.operator){
					case "+":
						this.token = Number(this.token) + this.value;
						break;
					case "-":
						this.token = Number(this.token) - this.value;
						break;
					case "*":
						this.token = Number(this.token) * this.value;
						break;
					case "/":
						if (this.value > 0)
						{   console.log("dividir"+this.value);
							this.token = Number(this.token) / this.value;	
						}
						else
						{//console.log("infinitooooooooooooo");
							this.display = "INFINITY";
							calculadora.updateDisplay();
							return;
						}
						
						break;
				}
				this.lastOperator = "=";
				this.display = this.token;
				break;
		}
			
		calculadora.updateDisplay();
		printLog();
	};

	Calculadora.prototype.toogleSign= function ()
	{
		//console.log("+/- ");
		this.display = this.display * -1;
		//console.log(display);
		calculadora.updateDisplay();
	};

	Calculadora.prototype.ONC = function ()
	{
		this.display = 0;
		this.token = 0;
		this.secondToken = 0;
		this.operator = "";
		this.lastOperator = "";
		calculadora.updateDisplay();
	};

	Calculadora.prototype.updateDisplay = function ()
	{	
		console.log("UpdateDisplay()"+this.display);
		var strDisplay = "" + this.display;
		var nocars = 8;
		console.log("strDisplay::: " + strDisplay);
		console.log("Display::: " + strDisplay.substr(0,8));
		
		if (Number(this.display) < 0)
		{
			if (strDisplay.includes("."))
			{
				nocars = 10;
			}		
			else
			{
				9
			}
		}
		else
		{
			if (strDisplay.includes("."))
			{
				nocars = 9;
			}		
		}
		
		console.log("Display: " + Number(strDisplay.substr(0,nocars)));
		this.display = Number(strDisplay.substr(0,nocars));
		
		if (Number(this.display) > 99999999 || Number(this.display) < -99999999)
		{
			document.getElementById("display").innerHTML = "OVERFLOAD";	
		}
		else
		{
			document.getElementById("display").innerHTML = "" + this.display;	
		}		
	};

	/*function printLog()
	{
		//console.log("display: " + display);
		//console.log("token: " + token);
		//console.log("secondtoken: " + secondToken);
		//console.log("operator: " + operator);
	};*/

	function printTotal()
	{
		alert(Number(display));
	};
	
	
	
	var calculadora = new Calculadora();
	
	function digitaValor(number) {
		calculadora.pushNumber(number);
		}
	
	function digitaOperador(op){
		calculadora.pushOperator(op);
		}
	
	function invierteSigno(){
		calculadora.toogleSign();
	}
	
	function limpiaCalculadora(){
		calculadora.ONC();
	}
	
	