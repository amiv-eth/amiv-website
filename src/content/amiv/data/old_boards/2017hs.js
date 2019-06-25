// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';
import boardImage from '../../images/board/old/hs17.jpg';

/**
 * Board information for autumn semester 2017 (HS17)
 */
export default {
  year: 2017,
  semester: 'hs',
  image: boardImage,
  members: [
    {
      role: boardRoles.president,
      name: 'Aurel Neff',
    },
    {
      role: boardRoles.quaestor,
      name: 'Patrick Wintermeyer',
    },
    {
      role: boardRoles.it,
      name: 'Sandro Lutz',
    },
    {
      role: boardRoles.information,
      name: 'Mathis Dedial',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Kira Erb',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Ruben Stadler',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Tino Gfrörer',
    },
    {
      role: boardRoles.universityPolicyMavt,
      name: 'Annan Zhang',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Celina Rhonheimer',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Christian Miklautz',
    },
    {
      role: boardRoles.infrastructure,
      name: 'Antonia Mosberger',
    },
  ],
};
