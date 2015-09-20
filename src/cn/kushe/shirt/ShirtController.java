package cn.kushe.shirt;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.util.Base64;
import com.jfinal.aop.Before;
import com.jfinal.kit.PathKit;

import cn.kushe.common.BaseController;
import cn.kushe.common.Constants;
import cn.kushe.interceptor.UserInterceptor;
import cn.kushe.user.User;
import cn.kushe.utils.FileUtil;
import cn.kushe.utils.StrUtil;

public class ShirtController extends BaseController {
	//显示一个作者的全部t-shirt作品
	@Before(UserInterceptor.class)
	public void index(){
		User user=(User)getSessionAttr(Constants.USER_SESSION);
		Shirt shirt=getModel(Shirt.class);
		List<Shirt> shirts=shirt.findByAuthor_id(user.getStr("id"));
		setAttr("shirt", shirts);
		render("index.html");
	}
	public void design(){
		render("design.html");
	}
	//保存设计好的shirt
	@SuppressWarnings("static-access")
	@Before(UserInterceptor.class)
	public void save(){
		String path=new SimpleDateFormat("yyyy/MM/dd").format(new Date());
		HttpServletRequest request=getRequest();
		String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
		String FileName=new FileUtil().generateWord()+".jpg";
		String pathname=PathKit.getWebRootPath()+"/static/images/"+path+"/";
		Base64 decoder=new Base64();
		try {
		byte[] img=decoder.decodeFast(getPara("data"));
			File targetDir=new File(pathname);
			if(!targetDir.exists()){
				targetDir.mkdirs();
			}
			 File target = new File(pathname,FileName);
             if(!target.exists()){
             	target.createNewFile();
             }
			FileOutputStream fos=new FileOutputStream(target);
			fos.write(img);
			fos.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		User user=(User)getSessionAttr(Constants.USER_SESSION);
		
        String imgq = basePath + "/static/images/"+path+"/"+FileName;//数据库路径
		Shirt shirt=getModel(Shirt.class);
		shirt.set("id", StrUtil.getUUID())
		.set("title", getPara("name"))
		.set("image", imgq)
		.set("author_id", user.get("id"))
		.set("in_time", new Date())
		.set("top",0)
		.set("good", 0)
		.save();
	}
}
