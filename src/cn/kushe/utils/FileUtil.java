package cn.kushe.utils;
import com.jfinal.kit.PathKit;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
 
public class FileUtil{
	  public String upload(HttpServletRequest request){
		  	String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
			System.out.println(basePath);
			DiskFileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(factory);
			String finalPath="";
			try {
				List<FileItem> files=upload.parseRequest(request);
				String va=null;
				for(FileItem item:files){
					String name=item.getFieldName();
					if(item.isFormField()){
						va=item.getString("UTF-8");
						System.out.println(name+" "+va);
						request.setAttribute(name, va);
					}else{
						if (item.getName() != null && !item.getName().equals("")) {// 判断是否选择了文件
							String path = new SimpleDateFormat("yyyy/MM/dd").format(new Date());
	                        // 此时文件暂存在服务器的内存当中
	                        File tempFile = new File(item.getName());// 构造临时对象
	                        String FileName=tempFile.getName();
	                        String extension = FileName.substring(FileName.lastIndexOf("."));
	                        if(".png".equals(extension) || ".jpg".equals(extension) || ".gif".equals(extension)){
	                            FileName = generateWord() + extension;
	                        }
	                        finalPath=basePath+"/static/images/"+path+"/"+FileName;
	                        String fpath=PathKit.getWebRootPath().replaceAll("\\\\","/")+"/static/images/"+path;
	                        File targetDir=new File(fpath);
	                        if (!targetDir.exists()) {
	                            targetDir.mkdirs();
	                        }
	                        File target = new File(fpath,FileName);
	                        if(!target.exists()){
	                        	target.createNewFile();
	                        }
	                        // 获取根目录对应的真实物理路径
	                        item.write(target);// 保存文件在服务器的物理磁盘中
	                        request.setAttribute("upload.message", "上传文件成功！");// 返回上传结果
	                    } else {
	                    	request.setAttribute("upload.message", "没有选择上传文件！");
	                    }
					}
				}
			} catch (FileUploadException e) {
				e.printStackTrace();
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return finalPath;
	  }
  /*  public String upload(UploadFile file) {
        String path = new SimpleDateFormat("yyyy/MM/dd").format(new Date());
        File source = file.getFile();
        String fileName = file.getFileName();
        String extension = fileName.substring(fileName.lastIndexOf("."));
        String prefix;
        if(".png".equals(extension) || ".jpg".equals(extension) || ".gif".equals(extension)){
            prefix = "img";
            fileName = generateWord() + extension;
        }else{
            prefix = "file";
        }
        String finalPath="/" + prefix + "/u/" + path + "/" + fileName;
        try {
            FileInputStream fis = new FileInputStream(source);
            File targetDir = new File(PathKit.getWebRootPath() + "/" + prefix + "/u/"
                    + path);
            if (!targetDir.exists()) {
                targetDir.mkdirs();
            }
            File target = new File(targetDir, fileName);
            if (!target.exists()) {
                target.createNewFile();
            }
            FileOutputStream fos = new FileOutputStream(target);
            byte[] bts = new byte[300];
            while (fis.read(bts, 0, 300) != -1) {
                fos.write(bts, 0, 300);
            }
            fos.close();
            fis.close();
            source.delete();          
        } catch (FileNotFoundException e) {
            return null;
        } catch (IOException e) {
            return null;
        }
		return finalPath;
    }*/
   /* public void download(){
        String path = getPara(0);
        String img = PathKit.getWebRootPath() + "/img/u/" + path.replaceAll("_", "/");
        ZipUtil.zip(img, PathKit.getWebRootPath() + "/img/temp/" + path);
        renderFile("/img/temp/" + path + ".zip");
    }*/
    public String generateWord() {
        String[] beforeShuffle = new String[] { "2", "3", "4", "5", "6", "7",
                "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
                "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
                "W", "X", "Y", "Z" };
        List<String> list = Arrays.asList(beforeShuffle);
        Collections.shuffle(list);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < list.size(); i++) {
            sb.append(list.get(i));
        }
        String afterShuffle = sb.toString();
        String result = afterShuffle.substring(5, 9);
        return result;
    }
}
