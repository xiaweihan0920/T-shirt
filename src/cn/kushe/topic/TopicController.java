package cn.kushe.topic;

import cn.kushe.collect.Collect;
import cn.kushe.common.BaseController;
import cn.kushe.common.Constants;
import cn.kushe.interceptor.UserInterceptor;
import cn.kushe.reply.Reply;
import cn.kushe.user.User;
import cn.kushe.utils.StrUtil;

import java.util.Date;

import com.jfinal.aop.Before;

public class TopicController extends BaseController {

    public void index() { 	
    	setAttr("topic", Topic.me.findById(getParaToInt()));
        render("/ishetuan/groups/topic.html");
    }

    @Before(UserInterceptor.class)
    public void create(){
    	
    	User user = getSessionAttr(Constants.USER_SESSION);
    	String gid=getPara();
    	String title=getPara("title");
    	String content=getPara("content");
    	Topic topic=new Topic();
    	//User user=new User();
    	topic.set("id", StrUtil.getUUID())
    		 .set("title", title)
    		 .set("content",content)
    		 .set("in_time", new Date())
    		 .set("author_id", user.get("id"))
    		 .set("gid", gid)
    		 .set("top",0)
    		 .set("good", 0)
    		 .save();
        redirect("/groups/");
    }

    @Before(UserInterceptor.class)
    public void design(){
        
            render("edit.html");

    }

    @Before(UserInterceptor.class)
    public void update() {
        String tid = getPara("tid");
        Topic topic = Topic.me.findById(tid);
        if(topic == null) {
            renderText(Constants.OP_ERROR_MESSAGE);
        } else {
            String sid = getPara("sid");
            String title = getPara("title");
            String content = getPara("content");
            String original_url = getPara("original_url");
            topic.set("title", title)
                    .set("s_id", sid)
                    .set("content", content)
                    .set("reposted", StrUtil.isBlank(original_url) ? 0:1)
                    .set("original_url", original_url)
                    .set("modify_time", new Date())
                    .update();
            redirect("/topic/" + tid);
        }
    }

    @Before({UserInterceptor.class})
    public void delete() {
        String tid = getPara(0);
        Topic topic = Topic.me.findById(tid);
        User user = getSessionAttr(Constants.USER_SESSION);
        if(topic == null || !topic.get("author_id").equals(user.get("id"))) {
            renderText(Constants.OP_ERROR_MESSAGE);
        } else {
            try {
                topic.delete();
                //删除回复
                Reply.me.deleteByTid(topic.getStr("id"));
                //删除收藏
                Collect.me.deleteByTid(topic.getStr("id"));
                redirect("/");
            } catch (Exception e) {
                e.printStackTrace();
                renderText("删除失败");
            }
        }
    }
}
