(function($) {
    "use strict";

    function UtilsJS(){
    };

    UtilsJS.prototype.constructor = UtilsJS;

    /*
     *
     * Validate email
     *
     * */
    UtilsJS.prototype.isEmail = function (elementValue)
    {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    };

    /*
     *
     * Validate cpf
     *
     * */
    UtilsJS.prototype.isCPF = function (obj){
        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;

        var cpf = obj.replace(/[\./-]/g,"");

        if (cpf.length < 11)
        {
            return false;
        }
        for (i = 0; i < cpf.length - 1; i++)
        {
            if (cpf.charAt(i) != cpf.charAt(i + 1))
            {
                digitos_iguais = 0;
                break;
            }
        }
        if (!digitos_iguais)
        {
            numeros = cpf.substring(0,9);
            digitos = cpf.substring(9);
            soma = 0;

            for (i = 10; i > 1; i--)
            {
                soma += numeros.charAt(10 - i) * i;
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            if (resultado != digitos.charAt(0))
            {
                return false;
            }

            numeros = cpf.substring(0,10);
            soma = 0;

            for (i = 11; i > 1; i--)
            {
                soma += numeros.charAt(11 - i) * i;
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            if(resultado != digitos.charAt(1))
            {
                return false;
            }

            return true;
        }
        else
        {
            return false;
        }
    };

    /*
     *
     * Validate date
     *
     * */
    UtilsJS.prototype.isDate = function (value,maxDate){
        try {

            var DayIndex = 0;
            var MonthIndex = 1;
            var YearIndex = 2;

            value = value.replace(/-/g, "/").replace(/\./g, "/");
            var SplitValue = value.split("/");
            var OK = true;

            if (!(SplitValue[DayIndex].length == 1 || SplitValue[DayIndex].length == 2))
            {
                OK = false;
            }
            if (OK && !(SplitValue[MonthIndex].length == 1 || SplitValue[MonthIndex].length == 2))
            {
                OK = false;
            }
            if (OK && SplitValue[YearIndex].length != 4)
            {
                OK = false;
            }
            if (OK)
            {
                var Day = parseInt(SplitValue[DayIndex], 10);
                var Month = parseInt(SplitValue[MonthIndex], 10);
                var Year = parseInt(SplitValue[YearIndex], 10);

                if (OK = ((Year > 1900) && (Year <= new Date().getFullYear()) || ((Year > 1900) && (maxDate == false))))
                {
                    if (OK = ((Month <= 12 && Month > 0 && maxDate == false) || ((Year < new Date().getFullYear() && Month <= 12 && Month > 0) || (Year = new Date().getFullYear() && Month <= new Date().getMonth()+1 && Month > 0))))
                    {
                        if(OK = ((maxDate == false) || (Day > 0 && Day <= new Date().getDate())))
                        {
                            var LeapYear = (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0));

                            if (Month == 2)
                            {
                                OK = LeapYear ? Day <= 29 : Day <= 28;
                            }
                            else
                            {
                                if ((Month == 4) || (Month == 6) || (Month == 9) || (Month == 11))
                                {
                                    OK = (Day > 0 && Day <= 30);
                                }
                                else
                                {
                                    OK = (Day > 0 && Day <= 31);
                                }
                            }
                        }
                    }
                }
            }
            return OK;
        }
        catch (e)
        {
            return false;
        }
    };

    /*
     *
     * Validate time
     *
     * */
    UtilsJS.prototype.isTime = function (elementValue){
        return elementValue.match(new RegExp(/^((\d)|(0\d)|(1\d)|(2[0-3]))\:((\d)|([0-5]\d))$/));
    };

    /*
     *
     * Validate integer
     *
     * */
    UtilsJS.prototype.isInteger = function (s){
        var isInteger_re = /^\s*(\+|-)?\d+\s*$/;
        return String(s).search (isInteger_re) != -1;
    };

    /*
     *
     * Validate cnpj
     *
     * */
    UtilsJS.prototype.isCNPJ = function (obj){
        var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
        digitos_iguais = 1;

        var cnpj = obj.replace(/[\./-]/g,"");

        if (cnpj.length != 14)
        {
            return false;
        }
        for (i = 0; i < cnpj.length - 1; i++)
        {
            if (cnpj.charAt(i) != cnpj.charAt(i + 1))
            {
                digitos_iguais = 0;
                break;
            }
        }
        if (!digitos_iguais)
        {
            tamanho = cnpj.length - 2;
            numeros = cnpj.substring(0,tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;

            for (i = tamanho; i >= 1; i--)
            {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                {
                    pos = 9;
                }
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            if (resultado != digitos.charAt(0))
            {
                return false;
            }

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0,tamanho);
            soma = 0;
            pos = tamanho - 7;

            for (i = tamanho; i >= 1; i--)
            {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                {
                    pos = 9;
                }
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            if (resultado != digitos.charAt(1))
            {
                return false;
            }
            return true;
        }
        else
        {
            return false;
        }
    };

//------------------------------------------------
    $.utilsJS = new UtilsJS();

})(jQuery);


