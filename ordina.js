const fs = require('fs');
const xml2js = require('xml2js');

// Leggi il file XML
fs.readFile('glossary.xml', 'utf-8', (err, data) => {
    if (err) {
        console.error('Errore nella lettura del file XML:', err);
        return;
    }

    // Parse del file XML
    const parser = new xml2js.Parser();
    parser.parseString(data, (err, result) => {
        if (err) {
            console.error('Errore nel parsing del file XML:', err);
            return;
        }

        // Estrai le voci del glossario
        const entries = result.glossary.entry;

        // Ordina le voci in ordine alfabetico per parola
        entries.sort((a, b) => {
            const wordA = a.word[0].toUpperCase();
            const wordB = b.word[0].toUpperCase();
            if (wordA < wordB) {
                return -1;
            }
            if (wordA > wordB) {
                return 1;
            }
            return 0;
        });

        // Costruisci il nuovo contenuto XML ordinato
        const builder = new xml2js.Builder();
        const xmlString = builder.buildObject(result);

        // Scrivi il nuovo contenuto XML nel file
        fs.writeFile('glossary_sorted.xml', xmlString, 'utf-8', (err) => {
            if (err) {
                console.error('Errore nella scrittura del file XML ordinato:', err);
                return;
            }
            console.log('Il file XML ordinato è stato creato con successo.');
        });
    });
});
