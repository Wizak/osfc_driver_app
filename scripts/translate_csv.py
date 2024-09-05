import csv
import shutil

from google.cloud import translate_v2 as translate
from google.oauth2 import service_account


TRANSLATE_AFTER_LOCALE = "en"


def translate_columns(input_file, output_file, key_file):
    # Initialize the credentials and the translation client
    credentials = service_account.Credentials.from_service_account_file(
        filename=key_file,
        scopes=["https://www.googleapis.com/auth/cloud-platform"]
    )
    translate_client = translate.Client(credentials=credentials)
    
    with open(input_file, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        fieldnames = reader.fieldnames
        
        # Find the index of TRANSLATE_AFTER_LOCALE column and determine columns to translate to
        after_index = fieldnames.index(TRANSLATE_AFTER_LOCALE)
        columns_to_translate = fieldnames[after_index + 1:]

        translated_rows = []
        for row in reader:
            for column in columns_to_translate:
                if row['en']:
                    # Translate 'en' text to the language specified by each column
                    translated_text = translate_client.translate(
                        row['en'], target_language=column)['translatedText']
                    row[column] = translated_text
            translated_rows.append(row)
        
    # Write the translated data to a new file
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(translated_rows)


if __name__ == "__main__":
    input_file = "./translations/dictionary.csv"  # Replace with your input CSV file path
    output_file = "./translations/dictionary.csv"  # Replace with your desired output file path

    backup_file = "./translations/dictionary.backup.csv"  # Replace with your input CSV file path
    key_file = "./scripts/key.json"  # Replace with your Google Cloud service account key file

    shutil.copy(input_file, backup_file)
    translate_columns(input_file, output_file, key_file)
