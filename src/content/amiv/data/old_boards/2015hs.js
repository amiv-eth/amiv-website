// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';
import boardImage from '../../images/board/old/hs15.jpg';

/**
 * Board information for autumn semester 2015 (HS15)
 */
export default {
  year: 2015,
  semester: 'hs',
  image: boardImage,
  members: [
    {
      role: boardRoles.president,
      name: 'Oliver Schneider',
    },
    {
      role: boardRoles.quaestor,
      name: 'Jonas Kühne',
    },
    {
      role: boardRoles.it,
      name: 'Igor Susmelj',
    },
    {
      role: boardRoles.information,
      name: 'Stefan Mach',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Cliff Li',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Gianna Paulin',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Joy Schuurmans Stekhoven',
    },
    {
      role: boardRoles.universityPolicyMavt,
      name: 'Alice Mylaeus',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Kay Wacker',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Alexander Ens',
    },
    {
      role: boardRoles.infrastructure,
      name: 'Moritz Schneider',
    },
  ],
};
