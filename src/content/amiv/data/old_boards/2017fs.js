// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';
import boardImage from '../../images/board/old/fs17.jpg';

/**
 * Board information for spring semester 2017 (FS17)
 */
export default {
  year: 2017,
  semester: 'fs',
  image: boardImage,
  members: [
    {
      role: boardRoles.president,
      name: 'Mohammed Khouni',
    },
    {
      role: boardRoles.quaestor,
      name: 'Aldo Tobler',
    },
    {
      role: boardRoles.it,
      name: 'Sandro Lutz',
    },
    {
      role: boardRoles.information,
      name: 'Isabelle Schlatter',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Aurel Neff',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Ruben Stadler',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Sandro Baumgartner',
    },
    {
      role: boardRoles.universityPolicyMavt,
      name: 'Dimitri Eckert',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Giovanni Cavolina',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Christian Miklautz',
    },
    {
      role: boardRoles.infrastructure,
      name: 'Luca (Ran)Dahle',
    },
  ],
};
