package cu.kushe.groups;

import java.util.Date;
import java.util.List;

import com.jfinal.aop.Before;

import cn.kushe.common.BaseController;
import cn.kushe.common.Constants;
import cn.kushe.interceptor.UserInterceptor;
import cn.kushe.member.Member;
import cn.kushe.reply.Reply;
import cn.kushe.topic.Topic;
import cn.kushe.user.User;
import cn.kushe.utils.FileUtil;
import cn.kushe.utils.StrUtil;

public class GroupsController extends BaseController {
	
	//index应为无差别group+topic 	
	public void index(){
		
		setAttr("topics", Topic.me.paginateAll(getParaToInt(0, 1), 10));	
		setAttr("groups", Groups.me.paginate(getParaToInt(0, 1), 5));
		render("index.html");
			
	}
	//mygroup为个人的所有小组和话题
	@Before(UserInterceptor.class)
	public void mygroup(){
		//查看当前用户的所有groups
		User user = getSessionAttr(Constants.USER_SESSION);
		String userId=user.get("id");
	    List<Topic> topics=Topic.me.find("select t.*,u.username,g.groupname from topic t left join user u on t.author_id=u.id left join groups g on t.gid=g.id where t.gid=any(select g.id from groups g where uid='"+userId+"')");
	    List<Groups> groups=Groups.me.find("select * from groups g where g.uid=?",userId);
	    setAttr("topics", topics);
	    setAttr("groups", groups);
	    render("mygroups.html");
	}
	//进入一个小组的主页
	public void ghome(){
		//进入一个小组的主页
		String id=getPara(0);
	
		setAttr("group", Groups.me.findFirst("select g.*,u.username from groups g left join user u on g.uid=u.id where g.id=?",id));
		setAttr("topics",Topic.me.paginateByGid(1, 5, id));
		System.out.println("ok");
		//猜你喜欢的小组
		setAttr("guessGroup", Groups.me.findGuess(id));
		render("team-home.html");
	}
	//推荐加入其他小组
	@Before(UserInterceptor.class)
	public void othergroup(){
		User user=getSessionAttr(Constants.USER_SESSION);
		String uid=user.get("id");
		setAttr("username",user.get("username"));
		setAttr("groups", Groups.me.findGuess(uid));
		render("othergroup.html");
	}
	//创建小组
	@Before(UserInterceptor.class)
	public void create(){
		render("create.html");
	}
	//保存创建的小组
	@Before(UserInterceptor.class)
	public void save(){
		//创建小组
		String finalPath=new FileUtil().upload(getRequest());
		String groupname=getAttr("groupname");
		String grouptype=getAttr("grouptype");
		String gdesc=getAttr("gr-desc");
		
		Groups groups=new Groups();
		String id=StrUtil.getUUID();
		User user=(User)getSessionAttr(Constants.USER_SESSION);
		groups.set("id", id)
		     .set("groupname", groupname)
		     .set("type",grouptype)
		     .set("description", gdesc)
		     .set("avatar", finalPath)
		     .set("uid",user.get("id"))
		     .set("in_time", new Date())
		     .save();
		Member member=new Member();
		member.set("id", StrUtil.getUUID())
	  	  .set("gid", id)
	  	  .set("uid", user.get("id"))
	  	  .set("in_time", new Date())
	  	  .save();
		mygroup();
	}
	//加入一个小组
	@Before(UserInterceptor.class)
	public void join(){
		//记录xx用户加入了xx小组
		User user=(User)getSessionAttr(Constants.USER_SESSION);
		String uid=user.get("id");
		String gid=getPara(0);
		Member member=new Member();
		if(member.findById(uid,gid)!=null){
			
			renderHtml("<script>location.href='/groups/mygroup'</script>");
			
		}else{
			member.set("id", StrUtil.getUUID())
			  	  .set("gid", getPara())
			  	  .set("uid", uid)
			  	  .set("in_time", new Date())
			  	  .save();
			renderHtml("<script>alert('haha')</script>");
		}	
	}
	//查看一个话题
	public void lookup(){
		String tid=getPara(0);
		setAttr("topic", Topic.me.findByTid(tid));
		setAttr("reply", Reply.me.findByTid(tid));
		renderFreeMarker("topic.html");
	}
}
