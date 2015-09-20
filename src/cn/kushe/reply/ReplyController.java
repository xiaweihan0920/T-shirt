package cn.kushe.reply;

import cn.kushe.common.BaseController;
import cn.kushe.common.Constants;
import cn.kushe.interceptor.UserInterceptor;
import cn.kushe.topic.Topic;
import cn.kushe.user.User;
import cn.kushe.utils.StrUtil;
import cn.kushe.notification.Notification;

import com.jfinal.aop.Before;

import java.util.Date;

public class ReplyController extends BaseController {

    @Before(UserInterceptor.class)
    public void index() {
        String tid = getPara(0);
        System.out.println(tid);
        Topic topic = Topic.me.findById(tid);
        User user = getSessionAttr(Constants.USER_SESSION);
        if (topic == null) {
            renderJson("找不到该话题");
        } else {
            // 增加1积分
            Reply reply = new Reply();
            String content = getPara("content");
            reply.set("id", StrUtil.getUUID())
                 .set("tid", tid)
                 .set("content", content)
                 .set("in_time", new Date())
                 .set("quote", 0)
                 .set("author_id", user.get("id"))
                 .save();
            if (!user.get("id").equals(topic.get("author_id"))) {
                // 通知话题发布者
                Notification topicNoti = new Notification();
                topicNoti.set("tid", tid)
                        .set("rid", reply.get("id"))
                        .set("read", 0)
                        .set("message", Constants.NOTIFICATION_MESSAGE1)
                        .set("from_author_id", user.get("id"))
                        .set("author_id", topic.get("author_id"))
                        .set("in_time", new Date()).save();
            }
            redirect("/groups/lookup/"+tid);
        }
    }
    public void delete(){
    	String rid=getPara("rid");
    	String tid=getPara("tid");
    	System.out.println(rid);
    	User user=getSessionAttr(Constants.USER_SESSION);
    	Reply.me.deleteById(rid);
    	redirect("/groups/lookup/"+tid);
    }
}
