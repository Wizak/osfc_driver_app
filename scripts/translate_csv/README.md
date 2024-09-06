# README: CSV Translation Script

This script translates specified columns in a CSV file using the Google Cloud Translation API. It processes a CSV file where one column (e.g., English text) is translated into multiple other languages based on the column headers.

## Prerequisites

1. **Google Cloud Project**: You must have a Google Cloud project with the Translation API enabled.
2. **Service Account Key**: A JSON file for a service account that has access to the Translation API.
3. **Python Dependencies**: This script requires Python and the `google-cloud-translate` library.

## Installation

### 1. Set up Python environment

It's recommended to create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate   # For Linux/macOS
venv\Scripts\activate      # For Windows
```

### 2. Install required dependencies

Run the following command to install the necessary Python packages:

```bash
pip install google-cloud-translate
```

### 3. Enable Google Cloud Translation API

Make sure you have the Google Cloud Translation API enabled in your project:

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the "Cloud Translation API".
3. Create a service account and download the JSON key file.

### 4. Add your service account key

Save the service account key JSON file in the path specified in the script (`./scripts/key.json` by default). You can change this path as needed.

## How to Use

1. **Prepare your CSV file**:
   The script expects the following structure in your CSV file:

    - The column that contains the source text (e.g., `en` for English) should be the key for translations.
    - Additional columns where the translations will be written (e.g., `fr` for French, `de` for German, etc.) should be present in the CSV.

    Example CSV file (`dictionary.csv`):

    ```
    key, en, fr, de, es
    hello, Hello,,,
    world, World,,,
    ```

2. **Configure the script**:

    - Set the `input_file` and `output_file` variables in the script to point to your input and output CSV file locations.
    - Specify the `key_file` location for the Google Cloud service account JSON file.

3. **Run the script**:
   The script automatically backs up your input CSV file, translates text in the specified columns, and saves the translated text in the output CSV.

    ```bash
    python ./scripts/translate_csv/main.py
    ```

4. **Output**:
   The translated content will be saved in the `output_file` specified. The script will overwrite the original file unless you specify a different output path.

### Example

If your original CSV looks like this:

```
key,en,fr,de,es
greeting, Hello,,,
farewell, Goodbye,,,
```

OR

```
key,en,fr,de,es
greeting,Hello
farewell,Goodbye
```

OR

```
key,en,fr,de,es
greeting,Hello,Hello,Hello,Hello
farewell,Goodbye,Goodbye,Goodbye,Goodbye
```

After running the script, the file will be updated with translations like this:

```
key,en,fr,de,es
greeting,Hello,Bonjour,Hallo,Hola
farewell,Goodbye,Au revoir,Auf Wiedersehen,Adiós
```

## Configuration

-   `TRANSLATE_AFTER_LOCALE`: Specifies the locale after which the translations begin (in the example, "no").
-   `key_file`: Path to the Google Cloud service account key file.
-   `input_file` and `output_file`: Paths to the CSV file for input and output.
-   `backup_file`: Backup file path (the script creates a backup before overwriting the original).

## Notes

-   **Backup**: The script creates a backup of the original CSV file before making changes. The backup is saved with the `.backup.csv` extension.
-   **Encoding**: Make sure the CSV files are encoded in UTF-8 to avoid issues with special characters.
