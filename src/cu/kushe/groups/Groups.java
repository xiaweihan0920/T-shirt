package cu.kushe.groups;



import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

@SuppressWarnings("serial")
public class Groups extends Model<Groups> {
	
	public static final Groups me=new Groups();
	//显示全部小组及组长名
	 public Page<Groups> paginate(int pageNumber, int pageSize) {
			return paginate(pageNumber, pageSize, 
					"select g.id,g.groupname,g.avatar,u.username as username",
					"from groups g left join user u on g.uid=u.id");
		}
	 //随机找出10个没参加的小组，显示小组人数
	 public List<Groups> findGuess(String uid){

		 return super.find("SELECT g.id, g.avatar, g.groupname ,(SELECT COUNT(m.gid) FROM member m WHERE m.uid !='"+ uid +"') as m_count "
		 		+ " FROM groups g WHERE g.id IN (SELECT m.gid FROM member m WHERE m.uid != ?) order by rand() LIMIT 5",uid);
		 
	 }
}
