var numeral = require('../../numeral');

exports.misc = {

    value: function (test) {
        test.expect(5);

        var tests = [
                [1000, 1000],
                [0.5, 0.5],
                [, 0],
                ['1,000', 1000],
                ['not a number', 0]
            ],
            num;

        for (var i = 0; i < tests.length; i++) {
            num = numeral(tests[i][0]);
            test.strictEqual(num.value(), tests[i][1], tests[i][1]);
        }

        test.done();
    },

    set: function (test) {
        test.expect(2);

        var tests = [
                [1000,1000],
                [-0.25,-0.25]
            ],
            num;

        for (var i = 0; i < tests.length; i++) {
            num = numeral().set(tests[i][0]);
            test.strictEqual(num.value(), tests[i][1], tests[i][0]);
        }

        test.done();
    },

    customZero: function (test) {
        test.expect(3);

        var tests = [
                [0,null,'0'],
                [0,'N/A','N/A'],
                [0,'','']
            ];

        for (var i = 0; i < tests.length; i++) {
            numeral.zeroFormat(tests[i][1]);
            test.strictEqual(numeral(tests[i][0]).format('0'), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    clone: function (test) {
        test.expect(4);

        var a = numeral(1000),
            b = numeral(a),
            c = a.clone(),
            aVal = a.value(),
            aSet = a.set(2000).value(),
            bVal = b.value(),
            cVal = c.add(10).value();

        test.strictEqual(aVal, 1000, 'Parent starting value');
        test.strictEqual(aSet, 2000, 'Parent set to 2000');
        test.strictEqual(bVal, 1000, 'Implicit clone unmanipulated');
        test.strictEqual(cVal, 1010, 'Explicit clone + 10');

        test.done();
    },

    isNumeral: function (test) {
        test.expect(2);

        var tests = [
                [numeral(),true],
                [1,false]
            ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numeral.isNumeral(tests[i][0]), tests[i][1], tests[i][0]);
        }

        test.done();
    },

    localeData: function(test) {
        test.expect(10);

        var cOld = '$',
            cNew = '!',
            formatTestVal = function() { return numeral('100').format('$0,0') },
            oldCurrencyVal = cOld + '100',
            newCurrencyVal = cNew + '100';

        test.strictEqual(numeral.localeData().currency.symbol, cOld, 'Current language currency is ' + cOld);
        test.strictEqual(numeral.localeData('en').currency.symbol, cOld, 'English language currency is ' + cOld);

        numeral.localeData().currency.symbol = cNew;
        test.strictEqual(numeral.localeData().currency.symbol, cNew, 'Current language currency is changed to ' + cNew);
        test.strictEqual(formatTestVal(), newCurrencyVal, 'Format uses new currency');

        numeral.localeData().currency.symbol = cOld;
        test.strictEqual(numeral.localeData().currency.symbol, '$', 'Current language currency is reset to ' + cOld);
        test.strictEqual(formatTestVal(), oldCurrencyVal, 'Format uses old currency');

        numeral.localeData('en').currency.symbol = cNew;
        test.strictEqual(numeral.localeData().currency.symbol, cNew, 'English language currency is changed to ' + cNew);
        test.strictEqual(formatTestVal(), newCurrencyVal, 'Format uses new currency');

        numeral.localeData('en').currency.symbol = cOld;
        test.strictEqual(numeral.localeData().currency.symbol, cOld, 'English language currency is reset to ' + cOld);
        test.strictEqual(formatTestVal(), oldCurrencyVal, 'Format uses old currency');

        test.done();
    },

    locale: function(test) {
      numeral.locale('es');

      test.expect(16);

      var tests = [
          [10000,'0,0.0000','10.000,0000'],
          [10000.23,'0,0','10.000'],
          [-10000,'0,0.0','-10.000,0'],
          [10000.1234,'0.000','10000,123'],
          [-10000,'(0,0.0000)','(10.000,0000)'],
          [-0.23,'.00','-,23'],
          [-0.23,'(.00)','(,23)'],
          [0.23,'0.00000','0,23000'],
          [1230974,'0.0a','1,2mm'],
          [1460,'0a','1k'],
          [-104000,'0a','-104k'],
          [1,'0o','1er'],
          [52,'0o','52do'],
          [23,'0o','23er'],
          [100,'0o','100mo'],
          [1,'0[.]0','1']
      ];

      for (var i = 0; i < tests.length; i++) {
          test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
      }

      numeral.locale('en');

      test.done();
    }
};
