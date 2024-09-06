# CSV to JSON Translation Converter

This project provides a Node.js script that reads a CSV file of translations and converts it into JSON format, one file per language. The resulting JSON files are saved into the `src/translation/lang/` directory.

## Prerequisites

To run this script, you need the following Node.js packages:

-   `csv-parser` - A simple CSV parsing library for Node.js
-   `fs` - The Node.js File System module, which is available by default
-   `lodash` - A utility library for working with objects and arrays

You can install these packages globally and use them in any project by following the instructions below.

## Steps to Install and Use the Script

### 1. Install Global Packages

You can install the required packages globally using the following command:

```bash
npm install -g csv-parser fs lodash
```

### 2. Link Global Packages to Your Project

In the root of your project directory, run the following command to create symlinks to the globally installed packages in your local `node_modules` directory:

```bash
npm link csv-parser fs lodash
```

This ensures that your project can access these global packages as if they were installed locally.

### 3. Add a CSV File

Ensure that you have your translation CSV file located at `./translations/dictionary.csv`. The CSV file should have the following format:

```
key,en,fr,es
greeting,Hello,Bonjour,Hola
farewell,Goodbye,Au revoir,Adiós
```

-   `key`: Represents the key for the translation (e.g., "greeting")
-   Language codes such as `en`, `fr`, `es`: Represent the translations for different languages (e.g., "Hello" in English, "Bonjour" in French, "Hola" in Spanish)

### 4. Run the Script

Run the script using Node.js to generate JSON files for each language:

```bash
node ./scripts/csv_to_json/main.js
```

### 5. Output

After running the script, the generated JSON files will be saved in the `src/translation/lang/` directory. The resulting JSON structure will look like this:

For the language `en` (`src/translation/lang/en.json`):

```json
{
    "greeting": "Hello",
    "farewell": "Goodbye"
}
```

For the language `fr` (`src/translation/lang/fr.json`):

```json
{
    "greeting": "Bonjour",
    "farewell": "Au revoir"
}
```

For the language `es` (`src/translation/lang/es.json`):

```json
{
    "greeting": "Hola",
    "farewell": "Adiós"
}
```

## Explanation of the Script

The script reads the `dictionary.csv` file, parses each line to extract translation data, and converts it into JSON format. It uses the following libraries:

-   **`csv-parser`**: Reads the CSV file.
-   **`fs`**: Handles file system operations, such as reading from and writing to files.
-   **`lodash`**: Provides utilities like `_.set()` to create nested objects from keys.

The translations are saved as JSON files in the `src/translation/lang/` folder. Each language has its own JSON file, with the keys representing translation phrases and the values being the corresponding translations.
