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
		<tr height="70%">
			<td colspan="2">
				<div id="msg_chat" style="width: 100%;height: 100%">
					
				</div>
			</td>
		</tr>
	</table>
</body>
</html>