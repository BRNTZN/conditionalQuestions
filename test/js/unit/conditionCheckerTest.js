var conditionChecker;
beforeEach(module('myApp'));
beforeEach(function() {
  inject(function($injector) {
    conditionChecker = $injector.get('conditionChecker');
  });
});
it('root attr contains true', function() {
  var obj = {
    attr: true
  };
  expect(conditionChecker("$.attr", obj)).toBe(true);
});
it('root attr contains false', function() {
  var obj = {
    attr: false
  };
  expect(conditionChecker("$.attr", obj)).toBe(false);
});
it('array[0] contains true', function() {
  var arr = [true];
  expect(conditionChecker("$.0", arr)).toBe(true);
});
it('array[0] contains false', function() {
  var arr = [false];
  expect(conditionChecker("$.0", arr)).toBe(false);
});
it('array[1] contains true', function() {
  var arr = [false, true, false];
  expect(conditionChecker("$.1", arr)).toBe(true);
});
it('array[1] contains false', function() {
  var arr = [true, false, true];
  expect(conditionChecker("$.1", arr)).toBe(false);
});
it('x2 down attr contains true', function() {
  var obj = {
    a: {
      attr: true
    }
  };
  expect(conditionChecker("$.a.attr", obj)).toBe(true);
});
it('array[0] in object in array[2] contains true', function() {
  var arr = [
    {},
    {},
    {
      a: [true]
    }
  ];
  expect(conditionChecker("$.2.a.0", arr)).toBe(true);
});
it('basic && true&&true', function() {
  var obj = {
    a: true,
    b: true
  }
  expect(conditionChecker("$.a && $.b", obj)).toBe(true);
});
it('basic && false&&false', function() {
  var obj = {
    a: false,
    b: false
  }
  expect(conditionChecker("$.a && $.b", obj)).toBe(false);
});
it('basic && true&&false', function() {
  var obj = {
    a: true,
    b: false
  }
  expect(conditionChecker("$.a && $.b", obj)).toBe(false);
});
it('basic && false&&true', function() {
  var obj = {
    a: false,
    b: true
  }
  expect(conditionChecker("$.a && $.b", obj)).toBe(false);
});
it('basic && true&&true (no spaces)', function() {
  var obj = {
    a: true,
    b: true
  }
  expect(conditionChecker("$.a&&$.b", obj)).toBe(true);
});
it('basic && false&&false  (no spaces)', function() {
  var obj = {
    a: false,
    b: false
  }
  expect(conditionChecker("$.a&&$.b", obj)).toBe(false);
});
it('basic && true&&false  (no spaces)', function() {
  var obj = {
    a: true,
    b: false
  }
  expect(conditionChecker("$.a&&$.b", obj)).toBe(false);
});
it('basic && false&&true  (no spaces)', function() {
  var obj = {
    a: false,
    b: true
  }
  expect(conditionChecker("$.a&&$.b", obj)).toBe(false);
});
it('basic || true||true', function() {
  var obj = {
    a: true,
    b: true
  }
  expect(conditionChecker("$.a || $.b", obj)).toBe(true);
});
it('basic || false||false', function() {
  var obj = {
    a: false,
    b: false
  }
  expect(conditionChecker("$.a || $.b", obj)).toBe(false);
});
it('basic || true||false', function() {
  var obj = {
    a: true,
    b: false
  }
  expect(conditionChecker("$.a || $.b", obj)).toBe(true);
});
it('basic || false||true', function() {
  var obj = {
    a: false,
    b: true
  }
  expect(conditionChecker("$.a || $.b", obj)).toBe(true);
});
it('($.a) contains true', function() {
  var obj = {
    a: true
  };
  expect(conditionChecker("($.a)", obj)).toBe(true);
});
it('($.a) && ($.b) contain true', function() {
  var obj = {
    a: true,
    b: true
  };
  expect(conditionChecker("($.a) && ($.b)", obj)).toBe(true);
});
it('$.a && ($.b) contain true', function() {
  var obj = {
    a: true,
    b: true
  };
  expect(conditionChecker("$.a && ($.b)", obj)).toBe(true);
});
it('($.a) && $.b contain true', function() {
  var obj = {
    a: true,
    b: true
  };
  expect(conditionChecker("($.a) && $.b", obj)).toBe(true);
});
it('($.a && $.b) && $.c all true', function() {
  var obj = {
    a: true,
    b: true,
    c: true
  };
  expect(conditionChecker("($.a && $.b) && $.c", obj)).toBe(true);
});
it('$.a && ($.b && $.c) all true', function() {
  var obj = {
    a: true,
    b: true,
    c: true
  };
  expect(conditionChecker("$.a && ($.b && $.c)", obj)).toBe(true);
});
it('($.a && $.b) && $.c with b false', function() {
  var obj = {
    a: true,
    b: false,
    c: true
  };
  expect(conditionChecker("($.a && $.b) && $.c", obj)).toBe(false);
});
it('addition', function() {
  var obj = {
    a: 8,
    b: 1
  };
  expect(conditionChecker("$.a + $.b", obj)).toBe(9);
});
it('addition no spaces', function() {
  var obj = {
    a: 124,
    b: 8
  };
  expect(conditionChecker("$.a+$.b", obj)).toBe(132);
});
it('subtraction', function() {
  var obj = {
    a: 400,
    b: 8
  };
  expect(conditionChecker("$.a-$.b", obj)).toBe(392);
});
it('multiplication', function() {
  var obj = {
    a: 10,
    b: 8
  };
  expect(conditionChecker("$.a*$.b", obj)).toBe(80);
});
it('division', function() {
  var obj = {
    a: 80,
    b: 8
  };
  expect(conditionChecker("$.a/$.b", obj)).toBe(10);
});
it('order of operation', function() {
  var obj = {
    a: 5,
    b: 2,
    c: 3
  };
  expect(conditionChecker("$.a*$.b+$.c", obj)).toBe(25);
});
it('greater than true', function() {
  var obj = {
    a: 5,
    b: 2
  };
  expect(conditionChecker("$.a>$.b", obj)).toBe(true);
});
it('greater than false', function() {
  var obj = {
    a: 5,
    b: 2
  };
  expect(conditionChecker("$.b>$.a", obj)).toBe(false);
});
it('lesser than true', function() {
  var obj = {
    a: 5,
    b: 2
  };
  expect(conditionChecker("$.b<$.a", obj)).toBe(true);
});
it('lesser than false', function() {
  var obj = {
    a: 5,
    b: 2
  };
  expect(conditionChecker("$.a<$.b", obj)).toBe(false);
});
it('equals true', function() {
  var obj = {
    a: 5,
    b: 5
  };
  expect(conditionChecker("$.a==$.b", obj)).toBe(true);
});
it('equals false', function() {
  var obj = {
    a: 5,
    b: 2
  };
  expect(conditionChecker("$.a==$.b", obj)).toBe(false);
});
it('number', function() {
  var obj = {
    a: 5
  };
  expect(conditionChecker("$.a>2", obj)).toBe(true);
});
it('string', function() {
  var obj = {
    a: 5
  };
  expect(conditionChecker("'hey'", obj)).toBe("hey");
});
it('error', function() {
  var obj = [
    {
      "attr": "hey",
      "array": [
        {
          "text": "hehe"
        }
      ]
    }
  ];
  expect( function(){
    conditionChecker("$.0.array.0.text == $.0.array[0].text", obj)
  }).toThrow(new TypeError("Cannot read property 'text' of undefined"));
});
it('spaces in propertynames', function() {
  var obj = {
    "first name": "Eric"
  };
  expect(conditionChecker("$.'first name'", obj)).toBe("Eric");
});
it('error on spaces without single quotes', function() {
  var obj = {
    "first name": "Eric"
  };
  expect( function(){
    conditionChecker("$.first name", obj)
  }).toThrow(new Error("Unexpected spaces in property name first name of object $"));
});
it('error on spaces with one single quote', function() {
  var obj = {
    "first name": "Eric"
  };
  expect( function(){
    conditionChecker("$.'first name", obj)
  }).toThrow(new Error("Unexpected spaces in property name 'first name of object $"));
});
it('error unexpected identifier', function() {
  var obj = {};
  expect( function(){
    conditionChecker("0.5.attr", obj)
  }).toThrow(new Error("Unexpected identifier 0.5.attr"));
});
