import icons from './icons';

const defaultIcon = icons.file;
const fileTypeToIconMapping = {
  'application/pdf': icons.filePdf,
  // Word Documents
  'application/vnd.oasis.opendocument.text': icons.fileWord,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': icons.fileWord,
  'application/msword': icons.fileWord,
  // PowerPoint Documents
  'application/vnd.oasis.opendocument.presentation': icons.filePowerPoint,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': icons.filePowerPoint,
  'application/vnd.ms-powerpoint': icons.filePowerPoint,
  // Excel Document
  'application/vnd.oasis.opendocument.spreadsheet': icons.fileExcel,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': icons.fileExcel,
  'application/vnd.ms-excel': icons.fileExcel,
  // Archives
  'application/x-tar': icons.fileArchive,
  'application/octet-stream': icons.fileArchive,
  'application/x-bzip': icons.fileArchive,
  'application/x-bzip2': icons.fileArchive,
  'application/x-rar-compressed': icons.fileArchive,
  'application/zip': icons.fileArchive,
  'application/x-7z-compressed': icons.fileArchive,
  // Images
  'image/jpeg': icons.fileImage,
  'image/gif': icons.fileImage,
  'image/png': icons.fileImage,
  'image/svg+xml': icons.fileImage,
};

export default mimeType => fileTypeToIconMapping[mimeType] || defaultIcon;
