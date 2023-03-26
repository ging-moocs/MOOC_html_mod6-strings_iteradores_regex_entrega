/* eslint-disable no-invalid-this*/
/* eslint-disable no-undef*/
// IMPORTS
const path = require("path");
const Utils = require("../utils/testutils");

const path_assignment = path.resolve(path.join(__dirname, "../../", "index.html"));
const URL = `file://${path_assignment.replace("%", "%25")}`;
const browser = new Browser({"waitDuration": 100, "silent": true});

// CRITICAL ERRORS
let error_critical = null;


// TESTS
describe("Strings e iteradores", function () {
    it("1(Precheck): Comprobando que existe el fichero de la entrega...", async function () {
        this.name = "";
        this.score = 0;
        this.msg_ok = `Encontrado el fichero '${path_assignment}'`;
        this.msg_err = `No se encontró el fichero '${path_assignment}'`;
        const fileexists = await Utils.checkFileExists(path_assignment);

        if (!fileexists) {
            error_critical = this.msg_err;
        }
        fileexists.should.be.equal(true);
    });

    it("2(Precheck): Comprobando que el fichero contiene HTML válido...", async function () {
        this.score = 0;
        if (error_critical) {
            this.msg_err = error_critical;
        } else {
            this.msg_ok = `El fichero '${path_assignment}' se ha parseado correctamente`;
            this.msg_err = `Error al parsear '${path_assignment}'`;
            const [error_nav] = await Utils.to(browser.visit(URL));

            if (error_nav) {
                this.msg_err = `Error al parsear '${path_assignment}': ${error_nav}`;
                error_critical = this.msg_err;
            }
        }
        should.not.exist(error_critical);
    });

    it("3: Comprobando que el botón 'Contar' incluye el número de palabras'...", async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const [error_nav] = await Utils.to(browser.visit(URL));

            if (error_nav) {
                this.msg_err = `Error al abrir el fichero ${path_assignment}
                Error: ${error_nav}
                Recibido: ${browser.text("body")}`;
            }

            this.msg_err = "El número de palabras NO se cuenta correctamente";
            this.msg_ok = "El número de palabras se cuenta correctamente";

            const input = Utils.randomArrayOfWordsGenerator();
            const expected = "Palabras: "+ input.length;

            await browser.fill('text', input.join(" "));
            await browser.pressButton('Contar');
            Utils.search(expected, browser.text("#view")).should.be.equal(true);
        }
    });

    it("4: Comprobando que el el botón 'Contar' ignora las mayúsculas, números y los signos de puntuación...", async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const [error_nav] = await Utils.to(browser.visit(URL));

            if (error_nav) {
                this.msg_err = `Error al abrir el fichero ${path_assignment}
                Error: ${error_nav}
                Recibido: ${browser.text("body")}`;
            }

            this.msg_err = "El número de palabras NO se cuenta correctamente";
            this.msg_ok = "El número de palabras se cuenta correctamente";
            let words = Utils.randomArrayOfWordsGenerator();
            let input = words.concat(words.map(w=>w.toUpperCase())).concat("555");
           const expected = "Palabras: "+ (input.length - 1);
            input = input.join(",     ");
            await browser.fill('text', input + " !");
            await browser.pressButton('Contar');
            Utils.search(expected, browser.text("#view")).should.be.equal(true);
        }
    });

    it("5: Comprobando que el el botón 'Repeticiones de palabras' cuenta correctamente palabras distintas...", async function () {
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const [error_nav] = await Utils.to(browser.visit(URL));

            if (error_nav) {
                this.msg_err = `Error al abrir el fichero ${path_assignment}
                Error: ${error_nav}
                Recibido: ${browser.text("body")}`;
            }

            this.msg_err = "Las repeticiones de palabras NO se muestran correctamente";
            this.msg_ok = "Las repeticiones de palabras se muestran correctamente";

            const input = Utils.randomArrayOfWordsGenerator();
            const expected = input.map(w=> `${w}: 1`).sort().join(" ");
            await browser.fill('text', input.join(" "));
            await browser.pressButton('Repeticiones de palabras');
            Utils.search(expected, browser.text("#view")).should.be.equal(true);
        }
    });

    it("6: Comprobando que el el botón 'Repeticiones de palabras' cuenta correctamente palabras iguales...", async function () {
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const [error_nav] = await Utils.to(browser.visit(URL));

            if (error_nav) {
                this.msg_err = `Error al abrir el fichero ${path_assignment}
                Error: ${error_nav}
                Recibido: ${browser.text("body")}`;
            }

            this.msg_err = "Las repeticiones de palabras NO se muestran correctamente";
            this.msg_ok = "Las repeticiones de palabras se muestran correctamente";

            let input = Utils.randomArrayOfWordsGenerator();

            let nConcat = Math.floor(Math.random() * 5 ) + 2;
            let i = nConcat;
            let inputConc = [...input];
            while (i > 0) {
                inputConc = [...inputConc, ...input];
                i--;
            }
            const expected = input.map(w => `${w}: ${nConcat + 1}`).sort().join(" ");

            await browser.fill('text', inputConc.join(" "));
            await browser.pressButton('Repeticiones de palabras');
            Utils.search(expected, browser.text("#view")).should.be.equal(true);
        }
    });

    it("7: Comprobando que el el botón 'Repeticiones de palabras' cuenta las palabras en mayúsculas y minúsculas como iguales e ignora los signos de puntuación...", async function () {
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const [error_nav] = await Utils.to(browser.visit(URL));

            if (error_nav) {
                this.msg_err = `Error al abrir el fichero ${path_assignment}
                Error: ${error_nav}
                Recibido: ${browser.text("body")}`;
            }

            this.msg_err = "Las repeticiones de palabras NO se muestran correctamente";
            this.msg_ok = "Las repeticiones de palabras se muestran correctamente";

            let input = Utils.randomArrayOfWordsGenerator();

            let nConcat = Math.floor(Math.random() * 5 ) + 2;
            let i = nConcat;
            let inputConc = [...input.map(w => w.toUpperCase() +"!.,;")];
            while (i > 0) {
                inputConc = [...inputConc, ...input];
                i--;
            }
            const expected = input.map(w => `${w}: ${nConcat + 1}`).sort().join(" ");

            await browser.fill('text', inputConc.join(" "));
            await browser.pressButton('Repeticiones de palabras');
            Utils.search(expected, browser.text("#view")).should.be.equal(true);
        }
    });

    it("8: Comprobando que el el botón 'Buscar palabras' funciona correctamente..", async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const [error_nav] = await Utils.to(browser.visit(URL));

            if (error_nav) {
                this.msg_err = `Error al abrir el fichero ${path_assignment}
                Error: ${error_nav}
                Recibido: ${browser.text("body")}`;
            }

            this.msg_err = "Las palabras NO se encuentran correctamente";
            this.msg_ok = "Las palabras se encuentran correctamente";

            let input = Utils.randomArrayOfWordsGenerator();

            const chars = input[0];
            const expected = `2 repeticiones de`;
            const inputContent =  [...input, ...input].join(". ");
            await browser.fill('text', inputContent);
            await browser.fill('search', chars);
            await browser.pressButton('Buscar palabras');
            Utils.search(expected, browser.text("#view")).should.be.equal(true);
        }
    });

    it("9: Comprobando que el el botón 'Buscar palabras' no diferencia entre mayúsculas y mínúsculas..", async function () {
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const [error_nav] = await Utils.to(browser.visit(URL));

            if (error_nav) {
                this.msg_err = `Error al abrir el fichero ${path_assignment}
                Error: ${error_nav}
                Recibido: ${browser.text("body")}`;
            }

            this.msg_err = "Las palabras NO se encuentran correctamente";
            this.msg_ok = "Las palabras se encuentran correctamente";

            let input = Utils.randomArrayOfWordsGenerator();

            const chars = input[0];
            const expected = `2 repeticiones de`;
            const inputContent =  [...input, ...input.map(w=>w.toUpperCase())].join(". ");
            await browser.fill('text', inputContent);
            await browser.fill('search', chars);
            await browser.pressButton('Buscar palabras');
            Utils.search(expected, browser.text("#view")).should.be.equal(true);
        }
    });
});
