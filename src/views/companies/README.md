# Company profiles HowTo

## Add/update a company profile

1. Add/update the company information in the file `./data/companies.js` with the structure below.
2. Add the text for the company profile to the folder `./markdown/`. Name the file like `<company-id>.<language-code>.md`.
3. Add the company logo to the folder `./logos`. Import the file on the top of the file `./data/companies.js` and reference it at the key `logo`.

```JSON
<company-id>: {
  name: 'ABB Schweiz AG',
  logo: <logo-reference>,
  address: ['ABB Schweiz AG', 'Herr Marcel Winkelmann', 'Brown Boveri Strasse 6', '5400 Baden'],
  email: 'hrmarketing@ch.abb.com',
  website: 'http://www.abb.ch/',
  employees: {
    worldwide: 145000,
    Switzerland: 6800,
  },
}
```

### Notes

* `<company-id>` can contain upper and lower case letters, numbers, `-` and `_`.
* `<language-code>` is a two letter code, e.g. `en`, `de`.
* In order to add another country in the section `employees`, the website maintainer has to add the language key `companies.employees_<country-key>`, where `<country-key>` is e.g. `Switzerland`.

## Remove a company profile

1. Remove the section/key (`<company-id>`) in the file `./data/companies.js`.
2. Remove the files `./markdown/<company-id>.xx.md`
3. Remove the logo from the folder `./logos/`.
