<%@page import="cn.hz.im.util.SysMode"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <% 
 	String chat_webroot = SysMode.getWebRoot(request);
 	String im_sdk = "http://192.168.56.1:8888/im-service/";
 %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<!-- BOSH核心包 -->

<script type="text/javascript" src="<%=im_sdk%>script/chat/plugin/WEB_SDK_IM.js"></script>

<!-- jquery 插件 -->
 <script type="text/javascript" src="<%=chat_webroot%>js/common/jquery/jquery.min.js"></script>
<script type="text/javascript" src="<%=chat_webroot%>js/common/jquery/jquery-migrate.js"></script>
<script type="text/javascript" src="<%=chat_webroot%>js/common/jquery/jquery.json-2.3.min.js"></script>
<%--<script type="text/javascript" src="<%=chat_webroot%>js/common/jquery/jquery.cookie.js"></script> --%>
<!-- 渲染包 -->
<script type="text/javascript">
	var account = '<%=request.getAttribute("un")%>';
</script>
 <script type="text/javascript" src="<%=chat_webroot%>js/im/imchat.js"></script> 

</head>
<body>
	<div  id = "conn" style="width: 100%;" align="center">正在连接。。。。。</div>
	<table width="100%" height="100%">
		<tr height="200px">
			<td width="30%">
				<div><input id = "sessionType" name = "sessionType" type="radio" value="0" checked="checked" />：单聊 &nbsp;&nbsp;&nbsp;&nbsp; <input id = "sessionType" name = "sessionType" type="radio" value="1" />:群聊 </div>
				to:<input id="to" type="text" value="caocao" /><br/> 
				content:<input id="content" type = "text" value = "" /><input id="send" value="发送"  type="button"/>
				<ul>
					<li>申请好友（输入用户的IM账号）：<input id="sqhy_text" type="text" value="" /><input id="sqhy" type="button" value="申请好友" /> <li>
					<li>
						创建群：<br/>
						群名称：<input id="cjq_name" type="text" value="" /><br/>
						群描述：<input id="cjq_ms" type="text" value="" /><br/>
						<div id = "cjq_member">
						</div>
						<input id="cjq" type="button" value="创建群" align="right" style="float: right;" /><br/>
					</li>
					
					<li>
						直接邀请入群：<br/>
						群id：<input id="zjyqrq_id" type="text" value="" /><br/>
						<div id = "zjyqrq_member">
						</div>
						<input id="zjyqrq" type="button" value="直接邀请入群" align="right" style="float: right;" /><br/>
					</li>
					<li>
						间接邀请入群：(暂定)<br/>
						群id：<input id="jjyqrq_id" type="text" value="" /><br/>
						<div id = "jjyqrq_member">
						</div>
						<input id="jjyqrq" type="button" value="间接邀请入群" align="right" style="float: right;" /><br/>
					</li>
					<li>
						退群：<br/>
						群id：<input id="tq_id" type="text" value="" /><br/>
						<input id="tq" type="button" value="退群" align="right" style="float: right;" />
					</li>
					<li>
						获取群成员：<br/>
						群id：<input id="hqqcy_id" type="text" value="" /><br/>
						<div id = "hqqcy_member">
						</div>
						<input id="xhq" type="button" value="销毁群" align="right" style="float: right;" />
						<input id="tcy" type="button" value="踢成员" align="right" style="float: right;" />
						<input id="hqqcy" type="button" value="获取群成员" align="right" style="float: right;" /><br/>
					</li>
<<<<<<< HEAD
					<li>
						申请入群：<br/>
						群id：<input id="sqq_id" type="text" value="" /><br/>
						<input id="sqq" type="button" value="申请" align="right" style="float: right;" /><br/>
					</li>
=======
>>>>>>> branch 'master' of https://github.com/hzong/im-webim.git
				</ul>				
			</td>
			<td>
				<table width="100%" height="100%" border="1">
				<tr>
					<td>
					群列表：<div id="grouplist"></div>
					</td>
				</tr>
				<tr>
					<td>
					好友列表：<div id="rosterlist"></div>
					</td>
				</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td colspan="2" align="center">
				<dl id = "tsk" style="display: none;">
					<dt>哈哈哈哈哈哈哈哈</dt>
					<dd><input type="button" id="but_ty"  value="同意"/> &nbsp;&nbsp;&nbsp;&nbsp; <input type="button" id="but_jj"  value="拒绝"/> </dd>
				</dl>
			</td>
		</tr>
		<tr height="70%">
			<td colspan="2">
				<div id="msg_chat" style="width: 100%;height: 100%">
					
				</div>
			</td>
		</tr>
	</table>
</body>
</html>