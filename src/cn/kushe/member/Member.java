package cn.kushe.member;

import com.jfinal.plugin.activerecord.Model;

@SuppressWarnings("serial")
public class Member extends Model<Member> {
	
	public static final Member me=new Member();
	//查询该成员是否在该小组中
	public Member findById(String userId,String groupId){
		
		return findFirst("select id from member where uid= ? and gid = ?",userId,groupId);
	
	}
}
