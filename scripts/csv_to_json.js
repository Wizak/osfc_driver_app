const csv = require('csv-parser');
const fs = require('fs');
const _ = require('lodash');

const DICTIONARY_CSV_PATH = './translations/dictionary.csv';

const csvToJson = () => {
    const result = {};

    fs.createReadStream(DICTIONARY_CSV_PATH)
        .pipe(csv())
        .on('data', ({ key, ...langs }) => {
            for (let lang in langs) {
                if (!result[lang]) result[lang] = {};
                const str = langs[lang] || langs.en;
                _.set(result, [lang, key].join('.'), str);
            }
        })
        .on('end', () => {
            for (let lang in result) {
                const js = JSON.stringify(result[lang], null, 4);
                fs.writeFileSync(`src/translation/lang/${lang}.json`, js);
            }
        });
};

csvToJson();
