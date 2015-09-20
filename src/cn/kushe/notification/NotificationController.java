package cn.kushe.notification;

import cn.kushe.common.BaseController;
import cn.kushe.common.Constants;
import cn.kushe.interceptor.UserInterceptor;
import cn.kushe.user.User;
import com.jfinal.aop.Before;


public class NotificationController extends BaseController {

    @Before(UserInterceptor.class)
    public void countnotread() {
        User user = getSessionAttr(Constants.USER_SESSION);
        if(user == null) {
            error(Constants.ResultDesc.FAILURE);
        } else {
            try {
                int count = Notification.me.countNotRead(user.getStr("id"));
                success(count);
            } catch (Exception e) {
                e.printStackTrace();
                error(Constants.ResultDesc.FAILURE);
            }
        }
    }
}
