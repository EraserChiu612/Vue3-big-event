import request from '@/utils/request'

//註冊接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('api/reg', { username, password, repassword })

//登入接口
export const userLoginService = ({ username, password }) =>
  request.post('api/login', { username, password })
