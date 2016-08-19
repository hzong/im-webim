package cn.hz.im.util;

import javax.servlet.http.HttpServletRequest;

/** 
* @className  SysMode 
*  系统模式
* @author  hzong
* @datetime  2016年4月8日 下午2:43:48  
*/ 
public class SysMode {
	private SysMode(){};
	
	/**
	 * @字段：webRoot
	 * @描述：WEB根目录
	 * @类型 : String  
	 * @作者 : hzong
	 */
	private static  String webRoot;
	
	/**
	 * @方法名: getWebRoot
	 * @描述:获取当前地址以及项目名
	 * @参数: @param request 请求
	 * @返回值: String
	 * @类: SysMode
	 * @作者:hzong
	 * @创建时间:2014-12-8 - 下午09:14:22
	 */
	public static String getWebRoot(HttpServletRequest request){
		String path = request.getContextPath();
		return webRoot = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	}
	
	/**
	 * @方法名: getWebRoot
	 * @描述:获取当前地址以及项目名
	 * @参数: @return
	 * @返回值: String
	 * @类: SysMode
	 * @作者:hzong
	 * @创建时间:2014-12-8 - 下午09:55:42
	 */
	public static String getWebRoot(){
		return webRoot;
	}
	
}
