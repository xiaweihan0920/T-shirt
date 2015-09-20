package cn.kushe.shirt;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;

@SuppressWarnings("serial")
public class Shirt extends Model<Shirt> {
	
	public static final Shirt me=new Shirt();
	
	//根据作者名字查找该作者的所有作品
	//如果作品是经典放入缓存
	public List<Shirt> findByAuthor_id(String authorId){
		
		return super.find("select s.* from shirt s where s.author_id = ? "
				+ "order by in_time desc",authorId);
		
	}
	public List<Shirt> findBySize(int size){
        return super.find("select u.*, (select count(s.id) from shirt s where s.author_id = u.id) as shirt_count, " +
                "(select count(r.id) from reply r where r.author_id = u.id) as reply_count " +
                "from shirt s desc limit 0, ?", size);
    }
}
