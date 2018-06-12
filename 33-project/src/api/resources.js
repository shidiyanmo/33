import config from '../config'

var API_ROOT = config.API_ROOT

export default {
  login: `${API_ROOT}wechat/login`,
  register: `${API_ROOT}wechat/register`,
  getCaptcha: `${API_ROOT}common/sendSms`,
  getPayQRCode: `${API_ROOT}wechat/qrcode`,
  vipCardInfo: `${API_ROOT}wechat/card`,
  handleHistory: `${API_ROOT}wechat/log`,
  handleDetail: `${API_ROOT}wechat/detail`,
  integral: `${API_ROOT}wechat/point`,
  VIPSign: `${API_ROOT}wechat/clock`,
  integralHistory: `${API_ROOT}wechat/pointlog`,
  bindWX: `${API_ROOT}wechat/bind`
}
