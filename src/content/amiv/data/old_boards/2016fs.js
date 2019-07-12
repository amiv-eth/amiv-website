// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';
import boardImage from '../../images/board/old/fs16.jpg';

/**
 * Board information for spring semester 2016 (FS16)
 */
export default {
  year: 2016,
  semester: 'fs',
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
      name: 'Nepheli Papagiannakopoulou Zwicky-Zwicky',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Niklas Bachmaier',
    },
    {
      role: boardRoles.universityPolicyMavt,
      name: 'Alice Mylaeus',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Simona Santamaria',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Alexander Ens',
    },
    {
      role: boardRoles.infrastructure,
      name: 'Vital Stocker',
    },
  ],
};
