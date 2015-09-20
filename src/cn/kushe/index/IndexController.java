package cn.kushe.index;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.qq.connect.QQConnectException;
import com.qq.connect.api.OpenID;
import com.qq.connect.api.qzone.UserInfo;
import com.qq.connect.javabeans.AccessToken;
import com.qq.connect.javabeans.qzone.UserInfoBean;
import com.qq.connect.oauth.Oauth;



import cn.kushe.common.BaseController;
import cn.kushe.common.Constants;
import cn.kushe.user.User;
import cn.kushe.utils.CaptchaRender;
import cn.kushe.utils.DateUtil;
import cn.kushe.utils.EncryptionUtil;
import cn.kushe.utils.StrUtil;

public class IndexController extends BaseController {
	
	public void index(){
		
    	render("index.html");
		
	}
	public void search(){
		
	}
	public void regis(){
		render("/ishetuan/register.html");
	}
	public void register(){
		String basePath=getRequest().getScheme()+"://"+getRequest().getServerName()+":"+getRequest().getServerPort();
		String method=getRequest().getMethod();
		if(method.equalsIgnoreCase(Constants.RequestMethod.GET)){
			render("/regis");
		}else if(method.equalsIgnoreCase(Constants.RequestMethod.POST)){
		String captchaCode = getPara("security-code");
		Object objMd5RandomCode = getSessionAttr(CaptchaRender.DEFAULT_CAPTCHA_MD5_CODE_KEY);
		String md5RandomCode = null;
		if(objMd5RandomCode != null){
		       md5RandomCode = objMd5RandomCode.toString();
		       this.removeSessionAttr(CaptchaRender.DEFAULT_CAPTCHA_MD5_CODE_KEY);
		       if(!CaptchaRender.validate(md5RandomCode, captchaCode)){
			        
					renderHtml("<script>alert('验证码错误，请重新输入');history.back()</script>");
			 
		       }else{
						String username=getPara("username");
						String password=getPara("password");
						String email=getPara("email");
						if(User.me.findByEmail(email)==null){
							User user=new User();
							user.set("id", StrUtil.getUUID())
								.set("username", username)
								.set("token" , StrUtil.getUUID())
								.set("password", EncryptionUtil.md5Encrypt(password))
								.set("email", email)
								.set("avatar", basePath+"/static/images/avatar.jpg") 
								.set("mission", new Date())
								.set("in_time", new Date())
								.save();
							render("login.html");
						}else{
							renderText("邮箱已被注册");
						}
		       		}
		  }
	   }	
	}
	
	public void img(){
		
		CaptchaRender img = new CaptchaRender(4);
		this.setSessionAttr(CaptchaRender.DEFAULT_CAPTCHA_MD5_CODE_KEY, img.getMd5RandonCode());
		render(img);     
	}
	public void login(){
		String method=getRequest().getMethod();
		if(method.equalsIgnoreCase(Constants.RequestMethod.GET)){
			String email= getCookie(Constants.COOKIE_EMAIL);
			setAttr(Constants.COOKIE_EMAIL, email);
			render("/ishetuan/login.html");
		}else if(method.equalsIgnoreCase(Constants.RequestMethod.POST)){
			String email=getPara("email");
			String password=getPara("password");
			User user=User.me.localLogin(email, EncryptionUtil.md5Encrypt(password));
			if(user==null){
				renderJson("账号或密码错误");
			}else{
				//记住邮箱
				String remember_me= getPara("remember_me");
				if("1".equalsIgnoreCase(remember_me)){
					setCookie(Constants.COOKIE_EMAIL,email,60*60*24*30);
				}
				setCookie(Constants.USER_COOKIE, StrUtil.getEncryptionToken(user.getStr("token")), 60*60*24*30);
				setSessionAttr(Constants.USER_SESSION, user);
				redirect("/");
				//forwardAction("/");
			}	
		}
	}
	public void qqlogin() throws QQConnectException {
	        
		 redirect(new Oauth().getAuthorizeURL(getRequest()));
	}
	//qq登陆回调方法
    public void qqlogincallback() throws QQConnectException {
        HttpServletRequest request = getRequest();
        AccessToken accessTokenObj = (new Oauth()).getAccessTokenByRequest(request);
        String accessToken = null,openID = null;
        long tokenExpireIn = 0L;
        if (accessTokenObj.getAccessToken().equals("")) {
            renderText("用户取消了授权或没有获取到响应参数");
        } else {
            accessToken = accessTokenObj.getAccessToken();
            tokenExpireIn = accessTokenObj.getExpireIn();
            // 利用获取到的accessToken 去获取当前用的openid -------- start
            OpenID openIDObj =  new OpenID(accessToken);
            openID = openIDObj.getUserOpenID();
            User user = User.me.findByOpenID(openID, "qq");
            if (user == null) {
                UserInfo qzoneUserInfo = new UserInfo(accessToken, openID);
                UserInfoBean userInfoBean = qzoneUserInfo.getUserInfo();
                if (userInfoBean.getRet() == 0) {
                    String nickname = userInfoBean.getNickname();
                    String gender = userInfoBean.getGender();
                    String avatar = userInfoBean.getAvatar().getAvatarURL50();
                    Date expire_in = DateUtil.getDateAfter(new Date(), (int) tokenExpireIn / 60 / 60 / 24);
                    user = new User();
                    user.set("id", StrUtil.getUUID())
                        .set("nickname", nickname)
                        .set("token", StrUtil.getUUID())
                        .set("score", 0)
                        .set("gender", gender)
                        .set("avatar", avatar)
                        .set("open_id", openID)
                        .set("expire_time", expire_in)
                        .set("in_time", new Date())
                        .set("thirdlogin_type", "qq").save();
                } else {
                    renderText("很抱歉，我们没能正确获取到您的信息，原因是： " + userInfoBean.getMsg());
                }
            } else if(DateUtil.isExpire((Date) user.get("expire_time"))) {
                user.set("expire_time", tokenExpireIn).set("open_id", openID).update();
            }
            setSessionAttr(Constants.USER_SESSION, user);
            setCookie(Constants.USER_COOKIE, user != null ? StrUtil.getEncryptionToken(user.getStr("token")) : null, 30*24*60*60);
            String uri = getSessionAttr(Constants.BEFORE_URL);
            if(StrUtil.isBlank(uri)) {
                redirect("/");
            } else {
                redirect(uri);
            }
        }
    }
	public void logout(){
		removeCookie(Constants.USER_COOKIE);
		removeSessionAttr(Constants.USER_SESSION);
		redirect("/");
	}
	public void category(){
		render("/ishetuan/category/category.html");
	}
}
