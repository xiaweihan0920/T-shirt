package cn.kushe.topic;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import cu.kushe.groups.Groups;

/**
 * Topic相当于T_shirt
 */
@SuppressWarnings("serial")
public class Topic extends Model<Topic> {

    public static final Topic me = new Topic();
    
    public Page<Topic> paginateAll(int pageNumber, int pageSize) {
    	
		return super.paginate(pageNumber, pageSize, "select t.*,g.groupname", "from topic t left join groups g on t.gid=g.id");
	
    }
    public Page<Topic> paginateByGid(int pageNumber, int pageSize,String gid) {
    	System.out.println("hello");
		return super.paginate(pageNumber, pageSize,"select t.*,u.username"," from topic t left join user u on t.author_id=u.id where t.gid= ?", gid);
	}
    public Topic findByTid(String tid){
		return super.findFirst("select t.*,u.avatar,u.username,g.id as gid,g.groupname "
				+ "from topic t left join user u on t.author_id=u.id left join groups g on t.gid=g.id where t.id = ?", tid);
    	
    }
    
}

