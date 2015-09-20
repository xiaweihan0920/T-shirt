package cn.kushe.common;

import cn.kushe.collect.Collect;
import cn.kushe.collect.CollectController;
import cn.kushe.index.IndexController;
import cn.kushe.interceptor.CommonInterceptor;
import cn.kushe.member.Member;
import cn.kushe.notification.Notification;
import cn.kushe.notification.NotificationController;
import cn.kushe.reply.Reply;
import cn.kushe.reply.ReplyController;
import cn.kushe.shirt.Shirt;
import cn.kushe.shirt.ShirtController;
import cn.kushe.topic.Topic;
import cn.kushe.topic.TopicController;
import cn.kushe.user.User;
import cn.kushe.user.UserController;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.ext.handler.ContextPathHandler;
import com.jfinal.ext.interceptor.SessionInViewInterceptor;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;

import cu.kushe.groups.Groups;
import cu.kushe.groups.GroupsController;


public class KusheConfig extends JFinalConfig {

	@Override
	public void configConstant(Constants me) {
		
		loadPropertyFile("/resources/config.properties");
		me.setDevMode(getPropertyToBoolean("devMode", false));
	}

	@Override
	public void configRoute(Routes me) {
		
		me.add("/", IndexController.class,"/ishetuan");
		me.add("/user",UserController.class,"/ishetuan/user");
		me.add("/shirt", ShirtController.class,"/ishetuan/shirt");
		me.add("/groups",GroupsController.class, "/ishetuan/groups");
		me.add("/topic", TopicController.class,"/ishetuan/groups");
		me.add("/reply", ReplyController.class, "/ishetuan/groups");
		me.add("/collect", CollectController.class, "/ishetuan");
		me.add("/notification",NotificationController.class,"/ishetuan");
	}

	@Override
	public void configPlugin(Plugins me) {
		C3p0Plugin c3p0Plugin = new C3p0Plugin(getProperty("jdbcUrl"), getProperty("user"), getProperty("password").trim());
		me.add(c3p0Plugin);
		
		// 配置ActiveRecord插件
		ActiveRecordPlugin arp = new ActiveRecordPlugin(c3p0Plugin);
		me.add(arp);
		arp.setShowSql(true);
		arp.addMapping("user" ,  User.class);
		arp.addMapping("topic", Topic.class);
		arp.addMapping("shirt", Shirt.class);
		arp.addMapping("groups", Groups.class);
		arp.addMapping("member", Member.class);
		arp.addMapping("reply", Reply.class);
		arp.addMapping("collect", Collect.class);
		arp.addMapping("notification", Notification.class);
	}

	@Override
	public void configInterceptor(Interceptors me) {
		
		me.add(new CommonInterceptor());
		me.add(new SessionInViewInterceptor());
		
	}

	@Override
	public void configHandler(Handlers me) {
		
		 me.add(new ContextPathHandler("base"));
	}
}
