package cn.kushe.user;

import com.jfinal.plugin.activerecord.Model;

@SuppressWarnings("serial")
public class User extends Model<User> {
	
	public static final User me = new User();
	
	public User findByOpenID(String openId, String type) {
        String sql = "select u.* from user u where u.open_id = ? and u.thirdlogin_type = ?";
        return super.findFirst(sql, openId, type);
    }

    public User findByToken(String token) {
        return super.findFirst("select u.* from user u where u.token = ?", token);
    }
    
	public User localLogin(String email, String password) {
        return super.findFirst("select * from user where email = ? and password = ?", email, password);
    }
	
	public User findByEmail(String email) {
	    return super.findFirst("select * from user where email = ?", email);
	}
	
}
