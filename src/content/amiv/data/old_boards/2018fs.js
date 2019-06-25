// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';
import boardImage from '../../images/board/old/fs18.jpg';

/**
 * Board information for spring semester 2018 (FS18)
 */
export default {
  year: 2018,
  semester: 'fs',
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
      name: 'Lina Gehri',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Tino Gfrörer',
    },
    {
      role: boardRoles.universityPolicyMavt,
      name: 'Johannes Schretter',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Silvio Geel',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Shuaixin Qi',
    },
    {
      role: boardRoles.infrastructure,
      name: 'Antonia Mosberger',
    },
  ],
};
