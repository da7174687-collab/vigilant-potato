# NumberScope — NumVerify API version

This version connects the website to the NumVerify phone-number validation API.

## Setup

1. Create a NumVerify account and obtain an API Access Key.
2. Open `script.js`.
3. Replace:

`PASTE_YOUR_NUMVERIFY_API_KEY_HERE`

with your key.
4. Test the website locally.
5. For a public GitHub repository, move the API request to a backend/serverless function so the key is not exposed.

The NumVerify API provides validation, international formatting, country, number-associated location, carrier and line type data.

**Important:** `location` is number-associated geographical metadata. It is not a person's live GPS location.

Official documentation:
https://numverify.com/documentation
