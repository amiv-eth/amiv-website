# AMIV Website: Update Commissions Page

For every commission, there exist an object (indicated by curly braces `{}`) with additional information in the file [`data/commissions.js`](data/commissions.js).

* **At least one translation** for `description` is required. There is no mandatory language.
* **Name** is required and can be any string.
* **Website is optional**. If there is not website available, remove the key-value pair `website` from the object. (ONLY WEBSITES MAINTAINED BY THE COMMISSION HERE!)
* **Email is optional**. If there is no email address available, remove the key-value pair `email` from the object. (ONLY @amiv.ethz.ch EMAIL ADDRESSE HERE!)
* **Phone is optional**. If there is no phone number availabe, remove the key-value pair `website` from the object. (NO PRIVATE PHONE NUMBERS HERE!)
* **Image is optional**.
  * If there is no image, remove the key-value pair `image` from the object and remove the image resource file from [`images/commissions/`](images/commissions/).
  * If there is an image available, place it in [`images/commissions/`](images/commissions/) and make sure that there is a line like the following at the top of the file [`data/commissions.js`](data/commissions.js):

```js
import <imageName> from '../images/commissions/<file-name>.jpg';
```

_Example:_

```json
{
  name: 'Bastli',
  image: someImage,
  description: {
    en: 'This is a description',
    de: 'Dies ist eine Beschreibung',
  },
  website: 'https://bastli.ethz.ch',
  email: 'info@bastli.ethz.ch',
  phone: '+41 44 632 49 41',
},
```

Make sure that at the top of the file, there is a line like:

```js
import someImage from '../images/commissions/bastli.jpg';
```