angular.module('myApp').factory("conditionChecker", [function(){
	var context;
	var operations = [
		{
			identifier: "&&",
			fn: function(operand1, operand2) {
				return operand1 && operand2;
			}
		},
		{
			identifier: "||",
			fn: function(operand1, operand2) {
				return operand1 || operand2;
			}
		},
		{
			identifier: "+",
			fn: function(operand1, operand2) {
				return operand1 + operand2;
			}
		},
		{
			identifier: "-",
			fn: function(operand1, operand2) {
				return operand1 - operand2;
			}
		},
		{
			identifier: "*",
			fn: function(operand1, operand2) {
				return operand1 * operand2;
			}
		},
		{
			identifier: "/",
			fn: function(operand1, operand2) {
				return operand1 / operand2;
			}
		},
		{
			identifier: ">",
			fn: function(operand1, operand2) {
				return operand1 > operand2;
			}
		},
		{
			identifier: "<",
			fn: function(operand1, operand2) {
				return operand1 < operand2;
			}
		},
		{
			identifier: "==",
			fn: function(operand1, operand2) {
				return operand1 == operand2;
			}
		}
	]
	var nakedSpaces = function(propertyName) {
		if (propertyName.indexOf(" ") < 0) return false;
		if (!propertyName.startsWith("'")) return true;
		if (!propertyName.endsWith("'")) return true;
		return false;
	}
	var readPath = function(path) {
		var properties = path.split(".");
		var lastResult = context;
		for (var i = 1; i < properties.length; i++) {
			var lastPropertyName = properties[i];
			if (nakedSpaces(lastPropertyName)) throw new Error("Unexpected spaces in property name " + lastPropertyName + " of object " + properties[i-1]);
			if (lastPropertyName.startsWith("'") && lastPropertyName.endsWith("'")) lastPropertyName = lastPropertyName.slice(1, lastPropertyName.length - 1);
			lastResult = lastResult[lastPropertyName];
		}
		return lastResult;
	}
	var isNumber = function(n) {
  	return !isNaN(parseFloat(n)) && isFinite(n);
	}
	var readIdentifier = function(identifier) {
		if (identifier.startsWith("'") && identifier.endsWith("'")) return identifier.slice(1, identifier.length - 1);
		if (isNumber(identifier)) return identifier * 1;
		if (identifier.startsWith("$.")) return readPath(identifier);
		throw new Error("Unexpected identifier " + identifier);
	}
	var extractFirstOperation = function(expression) {
		var leftOver = "";
		var rightOver = expression;
		while (rightOver.length > 0) {
			if (!rightOver.startsWith(" ")) {
				for (var i = 0; i < operations.length; i++) {
					var identifier = operations[i].identifier;
					if (rightOver.startsWith(identifier)) return [leftOver, operations[i], rightOver.slice(identifier.length)];
				}
				leftOver += rightOver[0];
			}
			rightOver = rightOver.slice(1);
		}
		throw new Error("No operation found: " + expression);
	}
	var operation = function(expression) {
		var operationExtract;
		if (expression.startsWith("(")) {
			var end1 = closingParenthesisIndex(expression, 0);
			var rightOver = expression.slice(end1+1);
			operationExtract = extractFirstOperation(rightOver);
			operationExtract[0] = expression.slice(1, end1);
		} else {
			operationExtract = extractFirstOperation(expression);
		}
		return operationExtract[1].fn(read(operationExtract[0]), read(operationExtract[2]));
	}
	var containsOperation = function(expression) {
		for (var i = 0; i < operations.length; i++) {
			if (expression.indexOf(operations[i].identifier) > -1) return true;
		}
		return false;
	}
	var closingParenthesisIndex = function(expression, startIndex){
		var openCounter = 0;
		for (var i = startIndex+1; i < expression.length; i++) {
			if (expression[i] == "(") openCounter++;
			if (expression[i] == ")" && openCounter == 0) return i;
		}
	}
	var encapsulated = function(expression) {
		return expression.startsWith("(") && closingParenthesisIndex(expression, 0) == expression.length - 1;
	}
	var read = function(expression) {
		// console.debug("Reading: " + expression);
		expression = expression.trim()
		if (encapsulated(expression)) return read(expression.slice(1, -1));
		if (!containsOperation(expression)) return readIdentifier(expression);
		return operation(expression);
	};
	return function(expression, c){
		context = c;
		return read(expression);
	};
}]);
