class DeviceInfo {
  IS_IPX = false;
  IS_IOS = false;
  IS_IPAD = false;
  IS_ANDROID = false;
  HAS_NOTCH = false;
  WIDTH = 712;
  HEIGHT = 1080;
  STATUSBAR_HEIGHT = 0;
  UNIQUE_ID = '';
  NAVBAR_BOTTOM_HEIGHT = 0;
  BOTTOM_PADDING = 0;

  setDeviceInfo = (info: any) => {
    this.IS_IPX = info.IS_IPX;
    this.IS_IOS = info.IS_IOS;
    this.IS_IPAD = info.IS_IPAD;
    this.IS_ANDROID = info.IS_ANDROID;
    this.HAS_NOTCH = info.HAS_NOTCH;
    this.WIDTH = info.WIDTH;
    this.HEIGHT = info.HEIGHT;
    this.STATUSBAR_HEIGHT = info.STATUSBAR_HEIGHT;
    this.NAVBAR_BOTTOM_HEIGHT = info.NAVBAR_BOTTOM_HEIGHT;
    this.UNIQUE_ID = info.UNIQUE_ID;
    this.BOTTOM_PADDING = info.BOTTOM_PADDING;
  };
}

export default new DeviceInfo();
