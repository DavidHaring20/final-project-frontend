import {
  cilArrowCircleLeft,
  cilArrowCircleRight,
  cilBell,
  cilCamera,
  cilCheck,
  cilClock,
  cilCloudDownload,
  cilDevices,
  cilFile,
  cilFolderOpen,
  cilGradient,
  cilGraph,
  cilImage1,
  cilInfo,
  cilLanguage,
  cilList,
  cilListFilter,
  cilListLowPriority,
  cilLockLocked,
  cilMap,
  cilMinus,
  cilPencil,
  cilPlus,
  cilReload,
  cilSave,
  cilSettings,
  cilSpeedometer,
  cilSquare,
  cilTrash,
  cilUser,
  cilVideo,
  cilWarning,
} from '@coreui/icons';

import {
  faArrowsAltV,
  faCircle,
  faCropAlt,
  faDesktop,
  faDownload,
  faEllipsisV,
  faExclamationCircle,
  faExclamationTriangle,
  faFileDownload,
  faFilm,
  faLayerGroup,
  faMinus,
  faPlus,
  faSignOutAlt,
  faSitemap,
  faUsers,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';

import {
  faPlayCircle,
  faUser
} from '@fortawesome/free-regular-svg-icons';

export default {
  install: (app, options) => {

    let convertFAIcon = (faIcon) => {
      return [faIcon.icon[0] + ' ' + faIcon.icon[1], '<path d="' + faIcon.icon[4] + '"></path>'];
    };

    app.options.icons = Object.assign({}, app.options.icons ? app.options.icons : {});

    app.options.icons.cilArrowCircleLeft = cilArrowCircleLeft;
    app.options.icons.cilArrowCircleRight = cilArrowCircleRight;
    app.options.icons.cilBell = cilBell;
    app.options.icons.cilCamera = cilCamera;
    app.options.icons.cilCheck = cilCheck;
    app.options.icons.cilClock = cilClock;
    app.options.icons.cilCloudDownload = cilCloudDownload;
    app.options.icons.cilDevices = cilDevices;
    app.options.icons.cilFile = cilFile;
    app.options.icons.cilFolderOpen = cilFolderOpen;
    app.options.icons.cilGradient = cilGradient;
    app.options.icons.cilGraph = cilGraph;
    app.options.icons.cilImage = cilImage1;
    app.options.icons.cilInfo = cilInfo;
    app.options.icons.cilLanguage = cilLanguage;
    app.options.icons.cilList = cilList;
    app.options.icons.cilListFilter = cilListFilter;
    app.options.icons.cilListLowPriority = cilListLowPriority;
    app.options.icons.cilLockLocked = cilLockLocked;
    app.options.icons.cilMap = cilMap;
    app.options.icons.cilMinus = cilMinus;
    app.options.icons.cilPencil = cilPencil;
    app.options.icons.cilPlus = cilPlus;
    app.options.icons.cilReload = cilReload;
    app.options.icons.cilSave = cilSave;
    app.options.icons.cilSettings = cilSettings;
    app.options.icons.cilSpeedometer = cilSpeedometer;
    app.options.icons.cilSquare = cilSquare;
    app.options.icons.cilTrash = cilTrash;
    app.options.icons.cilUser = cilUser;
    app.options.icons.cilVideo = cilVideo;
    app.options.icons.cilWarning = cilWarning;

    //fa-solid
    app.options.icons.faArrowsAltV = convertFAIcon(faArrowsAltV);
    app.options.icons.faCircle = convertFAIcon(faCircle);
    app.options.icons.faCropAlt = convertFAIcon(faCropAlt);
    app.options.icons.faDesktop = convertFAIcon(faDesktop);
    app.options.icons.faDownload = convertFAIcon(faDownload);
    app.options.icons.faEllipsisV = convertFAIcon(faEllipsisV);
    app.options.icons.faExclamationCircle = convertFAIcon(faExclamationCircle);
    app.options.icons.faExclamationTriangle = convertFAIcon(faExclamationTriangle);
    app.options.icons.faFileDownload = convertFAIcon(faFileDownload);
    app.options.icons.faFilm = convertFAIcon(faFilm);
    app.options.icons.faLayerGroup = convertFAIcon(faLayerGroup);
    app.options.icons.faMinus = convertFAIcon(faMinus);
    app.options.icons.faPlus = convertFAIcon(faPlus);
    app.options.icons.faSignOutAlt = convertFAIcon(faSignOutAlt);
    app.options.icons.faSitemap = convertFAIcon(faSitemap);
    app.options.icons.faUsers = convertFAIcon(faUsers);
    app.options.icons.faVideo = convertFAIcon(faVideo);

    //fa-regular
    app.options.icons.faPlayCircle = convertFAIcon(faPlayCircle);
    app.options.icons.faUser = convertFAIcon(faUser);

  },
};
