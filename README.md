# gpg-batch-uploader
Google Play Games batch uploader.

This script will batch update Google Play Games localizations for achievements and leaderboards.

## How to use

1. Get the BulkUploader.js file.
1. Set gpgGameId to your Google Play Games application id.
2. Fill out/generate the "achievements" structure with all your localizations, here is the spec:

        var achievements = [
          {
            "id": "xxxxxxxxx-xxxxxxxx",
            "position": 1,
            "locales": [
              {
                "code": "locale-code",
                "title": "title text",
                "desc": "desc text",
              },
              // more locales...
            ],
          },
          // more achievements...
        ];

3. Fill out/generate the "leaderboards" structure with all your localizations, here is an example:

         var leaderboards = [
          {
            "id": "xxxxxxxxx-xxxxxxxx",
            "position": 1,
            "locales": [
              {
                "code": "locale-code",
                "title": "title text",
                "suffix": "",
                "suffixSingular": "",
              },
              // more locales...
            ],
          },
          // more leaderboards...
        ];

4. Navigate to the Google Play developer console and paste the entire BulkUploader.js file into the javascript console in Chrome.
