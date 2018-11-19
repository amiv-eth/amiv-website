# AMIV Website: Update Board Page

For every image, there exist an object (indicated by curly braces `{}`) with additional information to that image in the file [`data/board.js`](data/board.js).

* **At least one translation** for `description` of a portrait and `tasks` are required. There is no mandatory language.
* **Roles** can be any string. In order that the translation works, please add a translation of the role to the language dictionary files in [`src/languages/`](../../languages/).
* **Image is optional**.
  * If there is no image, remove the key-value pair `image` from the object and remove the image resource file from [`images/board/`](images/board/).
  * If there is an image available, place it in [`images/board/`](images/board/) and make sure that there is a line like the following at the top of the file [`data/board.js`](data/board.js):

```js
import <imageName> from '../images/board/<file-name>.jpg';
```

_Example:_

```json
{
  image: someImage,
  portraits: [
    {
      role: 'President',
      name: 'Zoidberg',
      description: {
        de: 'Dies ist ein markdown Text.',
        en: 'This is some markdown text.',
      },
    },
    {
      role: 'Quaestor',
      name: 'Leela',
      description: {
        de: 'Dies ist ein anderer Text.',
        en: 'This is another text.',
      },
    },
  ],
  tasks: {
    de: `
      _Beschreibung der Aufgaben des Präsidenten._

      _Beschreibung der Aufgaben des Qästors._`,
    en: '_Description of the tasks of the president._\n\n_Description of the tasks of the quaestor._',
  },
}
```

Make sure that at the top of the file, there is a line like:

```js
import someImage from '../images/board/pq.jpg';
```
