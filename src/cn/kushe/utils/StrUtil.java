package cn.kushe.utils;

import java.util.UUID;

import com.jfinal.kit.StrKit;

public class StrUtil extends StrKit {
	
	public static String getUUID(){
		String uuid=UUID.randomUUID().toString();
		return uuid.replaceAll("-", "");
	}
	
	public static String getEncryptionToken(String token){
		for(int i=0; i<6; i++){
			token=EncryptionUtil.encoderBase64(token.getBytes());
		}
		return token;
	}
	
	public static String getDecryptToken(String encryptionToken){
		for(int i = 0; i<6 ;i++){
			encryptionToken=EncryptionUtil.decoderBase64(encryptionToken.getBytes());
		}
		return encryptionToken;
	}
}
