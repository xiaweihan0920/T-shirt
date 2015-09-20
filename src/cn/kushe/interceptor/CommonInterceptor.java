package cn.kushe.interceptor;

import java.util.Date;

import cn.kushe.common.Constants;
import cn.kushe.user.User;
import cn.kushe.utils.DateUtil;
import cn.kushe.utils.StrUtil;

import com.jfinal.aop.Interceptor;
import com.jfinal.core.ActionInvocation;

public class CommonInterceptor implements Interceptor {

	public void intercept(ActionInvocation ai) {
		
		String user_cookie=ai.getController().getCookie(Constants.USER_COOKIE);
		User user_session=(User)ai.getController().getSession().getAttribute(Constants.USER_SESSION);
		if(StrUtil.isBlank(user_cookie) && user_session!=null){
			
			ai.getController().setCookie(Constants.USER_COOKIE,StrUtil.getEncryptionToken(user_session.getStr("token")),60*60*24*30);
		
		} else if(!StrUtil.isBlank(user_cookie) && user_session==null){
			
			User user=User.me.findByToken(StrUtil.getDecryptToken(user_cookie));
			ai.getController().setSessionAttr(Constants.USER_SESSION, user);
			
		}
		
		ai.getController().setSessionAttr(Constants.TODAY, DateUtil.formatDate(new Date()));
		
		//...
		
		ai.invoke();
	}

}
