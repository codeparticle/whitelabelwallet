/**
 * Modiify "body" on releases section on github with formatted text
 */

var request = require('request');
var githubAuth = process.argv[2];
var tagName = process.argv[3];
var dmgSHA = process.argv[4];
var exeSHA = process.argv[5];
var debSHA = process.argv[6];
var appImageSHA = process.argv[7];

if (!githubAuth || !tagName) {
  console.log('GithubAuth or TagName not found. Tagname: ' + tagName);
}

// Get all release tags
request(
  {
    url: 'https://api.github.com/repos/CodeParticle/whitelabelwallet/releases',
    headers : {
      'Authorization': 'token 0ab24173c2f2797a7587c32334b3feb9d2c18774',
      'User-Agent': 'TravisCI',
    },
  },
  function (error, response, body) {
    try {
      var tags = JSON.parse(body);
      var tagBeingEdited = (tags || []).find((tag) => {
        return tag.tag_name === tagName;
      });

      if (tagBeingEdited) {
        var data = JSON.stringify({
          body: '## sha256sum\nDMG: ' + dmgSHA + '\nEXE: ' + exeSHA + '\nDEB: ' + debSHA + '\nAppImage: ' + appImageSHA,
          name: tagName,
          tag_name: tagName,
          draft: false,
          prerelease: false,
        });

        // Modify found tag's body
        request(
          {
            method: 'POST',
            uri: 'https://api.github.com/repos/CodeParticle/whitelabelwallet/releases/' + tagBeingEdited.id,
            body: data,
            headers: {
              'Authorization': 'token ' + githubAuth,
              'User-Agent': 'TravisCI',
            },
          },
          function (error) {
            if (error) {
              console.log(error);
            } else {
              console.log('Successfuly updated release body.');
            }
          }
        );
      } else {
        console.log('Tag not found on github.');
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
);
